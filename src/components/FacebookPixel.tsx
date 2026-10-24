'use client';

import Script from 'next/script';
import { siteConfig } from '@/config/site';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const pixelId = (siteConfig.facebookPixelId || '').replace(/\D/g, '');

/** Dispara InitiateCheckout somente se o Pixel estiver configurado. */
export function trackInitiateCheckout() {
  if (!pixelId || typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', 'InitiateCheckout', {
    value: siteConfig.product.price,
    currency: 'BRL',
    content_name: siteConfig.product.name,
  });
}

/**
 * Meta Pixel. Não carrega NADA enquanto facebookPixelId estiver vazio.
 */
export default function FacebookPixel() {
  if (!pixelId) return null;
  return (
    <Script id="fb-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${pixelId}');fbq('track','PageView');`}
    </Script>
  );
}
