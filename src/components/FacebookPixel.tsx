'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { siteConfig } from '@/config/site';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    __ne60PageViewId?: string;
  }
}

const pixelId = (siteConfig.facebookPixelId || '1115403534180898').replace(/\D/g, '');

const STANDARD_EVENTS = new Set([
  'PageView',
  'ViewContent',
  'InitiateCheckout',
  'Lead',
  'Contact',
  'AddToCart',
  'Purchase',
]);

function getCookie(name: string): string {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : '';
}

function setCookie(name: string, value: string, days = 90) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function getOrCreateExternalId(): string {
  if (typeof window === 'undefined') return '';
  const storageKey = 'ne60_external_id';
  try {
    let id = localStorage.getItem(storageKey) || getCookie(storageKey);
    if (!id) {
      id = `ne60_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    }
    localStorage.setItem(storageKey, id);
    setCookie(storageKey, id, 180);
    return id;
  } catch {
    return getCookie(storageKey) || '';
  }
}

function ensureFbcAndFbpCookies(): { fbp: string; fbc: string } {
  if (typeof window === 'undefined') return { fbp: '', fbc: '' };

  let fbp = getCookie('_fbp');
  if (!fbp) {
    fbp = `fb.1.${Date.now()}.${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    setCookie('_fbp', fbp, 90);
  }

  let fbc = getCookie('_fbc');
  try {
    const params = new URLSearchParams(window.location.search);
    const fbclid = params.get('fbclid');
    if (fbclid) {
      fbc = `fb.1.${Date.now()}.${fbclid}`;
      setCookie('_fbc', fbc, 90);
    }

    // Salva UTMs e fbclid na sessão para repassar ao checkout
    const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'src', 'sck'];
    const captured: Record<string, string> = {};
    let hasAny = false;
    for (const k of keys) {
      const val = params.get(k);
      if (val) {
        captured[k] = val;
        hasAny = true;
      }
    }
    if (hasAny) {
      sessionStorage.setItem('ne60_tracking_params', JSON.stringify(captured));
    }
  } catch {
    // ignore URL/storage errors
  }

  return { fbp, fbc };
}

function generateEventId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Envia qualquer evento simultaneamente para o Meta Pixel (Navegador)
 * e para a API de Conversões (Servidor /api/meta-capi) com o mesmo event_id (desduplicação).
 */
export function trackMetaEvent(
  eventName: string,
  customData: Record<string, unknown> = {},
  options: { useBeacon?: boolean } = {},
) {
  if (!pixelId || typeof window === 'undefined') return;

  const eventId = generateEventId(eventName.toLowerCase());
  const { fbp, fbc } = ensureFbcAndFbpCookies();
  const externalId = getOrCreateExternalId();

  const mergedCustomData: Record<string, unknown> = {
    content_name: siteConfig.product.name,
    content_ids: ['ebook-novos-encontros-60'],
    content_type: 'product',
    content_category: 'E-book Digital',
    value: siteConfig.product.price,
    currency: 'BRL',
    ...customData,
  };

  // 1. Disparo no Navegador (Meta Pixel) com eventID para desduplicação
  if (typeof window.fbq === 'function') {
    const method = STANDARD_EVENTS.has(eventName) ? 'track' : 'trackCustom';
    window.fbq(method, eventName, mergedCustomData, { eventID: eventId });
  }

  // 2. Disparo no Servidor (Meta Conversions API - CAPI) com o mesmo eventId
  let testEventCode: string | undefined;
  try {
    const tc = new URLSearchParams(window.location.search).get('fb_test_code');
    if (tc) testEventCode = tc;
  } catch {
    // ignore
  }

  const payload = JSON.stringify({
    eventName,
    eventId,
    eventSourceUrl: window.location.href,
    customData: mergedCustomData,
    userData: {
      fbp,
      fbc,
      externalId,
    },
    ...(testEventCode ? { testEventCode } : {}),
  });

  if (options.useBeacon && typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
    try {
      const blob = new Blob([payload], { type: 'application/json' });
      navigator.sendBeacon('/api/meta-capi', blob);
      return;
    } catch {
      // fallback to fetch keepalive
    }
  }

  fetch('/api/meta-capi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
    keepalive: true,
  }).catch(() => {
    // Falha silenciosa para não afetar a experiência do usuário
  });
}

/** Dispara InitiateCheckout (Navegador + CAPI) quando a pessoa clica em comprar. */
export function trackInitiateCheckout(source = 'botao_comprar') {
  trackMetaEvent(
    'InitiateCheckout',
    {
      value: siteConfig.product.price,
      currency: 'BRL',
      content_name: siteConfig.product.name,
      content_ids: ['ebook-novos-encontros-60'],
      content_type: 'product',
      num_items: 1,
      cta_source: source,
    },
    { useBeacon: true },
  );
}

/** Dispara quando o visitante amplia uma página de amostra do e-book. */
export function trackSampleView(pageNumber: number, sampleTitle: string) {
  trackMetaEvent('ViewSample', {
    sample_page: pageNumber,
    sample_title: sampleTitle,
  });
}

/** Dispara quando o visitante interage com os prints de conversas reais. */
export function trackConversationInteraction(action: 'zoom' | 'transcript' | 'carousel', contactName: string) {
  trackMetaEvent('ViewConversation', {
    interaction_type: action,
    conversation_contact: contactName,
  });
}

/** Dispara quando o visitante abre uma dúvida frequente (FAQ). */
export function trackFaqOpen(question: string, index: number) {
  trackMetaEvent('FAQInteraction', {
    faq_question: question,
    faq_index: index + 1,
  });
}

/** Dispara quando o visitante clica em um botão âncora que leva para a oferta. */
export function trackCtaScrollToOffer(location: string) {
  trackMetaEvent('CTAClickToOffer', {
    cta_location: location,
  });
}

/** Dispara quando o visitante clica em suporte/WhatsApp. */
export function trackContactClick(channel: 'whatsapp' | 'email') {
  trackMetaEvent(
    'Contact',
    {
      contact_channel: channel,
    },
    { useBeacon: true },
  );
}

export default function FacebookPixel() {
  useEffect(() => {
    if (!pixelId || typeof window === 'undefined') return;

    const { fbp, fbc } = ensureFbcAndFbpCookies();
    const externalId = getOrCreateExternalId();

    // 1. PageView inicial sincronizado entre Navegador (<Script>) e CAPI (/api/meta-capi)
    const initialPageViewId = window.__ne60PageViewId || generateEventId('pageview');
    window.__ne60PageViewId = initialPageViewId;

    let testEventCode: string | undefined;
    try {
      const tc = new URLSearchParams(window.location.search).get('fb_test_code');
      if (tc) testEventCode = tc;
    } catch {
      // ignore
    }

    fetch('/api/meta-capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName: 'PageView',
        eventId: initialPageViewId,
        eventSourceUrl: window.location.href,
        userData: { fbp, fbc, externalId },
        ...(testEventCode ? { testEventCode } : {}),
      }),
      keepalive: true,
    }).catch(() => {});

    // 2. ViewContent automático após 3 segundos de leitura ou rolagem
    let viewContentFired = false;
    const fireViewContent = () => {
      if (viewContentFired) return;
      viewContentFired = true;
      trackMetaEvent('ViewContent', {
        content_name: siteConfig.product.name,
        content_ids: ['ebook-novos-encontros-60'],
        content_type: 'product',
        value: siteConfig.product.price,
        currency: 'BRL',
      });
    };

    const vcTimer = setTimeout(fireViewContent, 3000);

    // 3. Rastreamento de Profundidade de Rolagem (25%, 50%, 75%, 90%)
    const scrollMilestones = [25, 50, 75, 90];
    const firedScrolls = new Set<number>();

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop > 250) {
        fireViewContent();
      }
      const docHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      const pct = Math.round((scrollTop / docHeight) * 100);

      for (const milestone of scrollMilestones) {
        if (pct >= milestone && !firedScrolls.has(milestone)) {
          firedScrolls.add(milestone);
          trackMetaEvent('ScrollDepth', {
            percent_scrolled: milestone,
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 4. Rastreamento de Tempo na Página (15s, 30s, 60s, 120s)
    const timeMilestones = [15, 30, 60, 120];
    const timeTimers = timeMilestones.map((seconds) =>
      setTimeout(() => {
        trackMetaEvent('TimeOnPage', {
          seconds_on_page: seconds,
        });
      }, seconds * 1000),
    );

    // 5. Rastreamento de visualização da seção de Oferta (#oferta)
    let offerObserver: IntersectionObserver | null = null;
    const offerEl = document.getElementById('oferta');
    if (offerEl && typeof IntersectionObserver !== 'undefined') {
      let offerViewed = false;
      offerObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && !offerViewed) {
              offerViewed = true;
              trackMetaEvent('ViewOfferSection', {
                section: 'oferta_principal',
                value: siteConfig.product.price,
                currency: 'BRL',
              });
              offerObserver?.disconnect();
            }
          }
        },
        { threshold: 0.25 },
      );
      offerObserver.observe(offerEl);
    }

    return () => {
      clearTimeout(vcTimer);
      timeTimers.forEach(clearTimeout);
      window.removeEventListener('scroll', handleScroll);
      offerObserver?.disconnect();
    };
  }, []);

  if (!pixelId) return null;

  return (
    <>
      <Script id="fb-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
var pvId=window.__ne60PageViewId||('pageview_'+Date.now()+'_'+Math.random().toString(36).slice(2,10));
window.__ne60PageViewId=pvId;
fbq('init','${pixelId}');
fbq('track','PageView',{},{eventID:pvId});`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
