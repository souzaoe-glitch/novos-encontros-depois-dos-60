import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { siteConfig } from '@/config/site';

const PIXEL_ID = (process.env.NEXT_PUBLIC_FB_PIXEL_ID || siteConfig.facebookPixelId || '1115403534180898').replace(/\D/g, '');
const CAPI_TOKEN =
  process.env.META_CAPI_TOKEN ||
  'EAAZBABp5Ctv0BSw9iDnG9aGAX2i6w7kh3g6QfzmA3Qy9TOottjNarRl5KJLIpYBUn4MjFFGHobABrFrQiblRerRuNGvOMWXTsZATcZA1PgaqhnMZCerVvDRekhmW9tOuLiFocqMEuG4qjZCuKZA4TYTrxq5kgAmvtfqLxpbBaUundfv1aHxT8yZCZA7YUmXP6wZDZD';

function sha256(value: string): string {
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

function getClientIp(req: NextRequest): string | undefined {
  const nfIp = req.headers.get('x-nf-client-connection-ip');
  if (nfIp) return nfIp.trim();

  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0]?.trim();
    if (first) return first;
  }

  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  return undefined;
}

export async function POST(req: NextRequest) {
  if (!PIXEL_ID || !CAPI_TOKEN) {
    return NextResponse.json({ ok: false, reason: 'missing_credentials' }, { status: 200 });
  }

  try {
    const body = await req.json();
    const {
      eventName,
      eventId,
      eventSourceUrl,
      customData = {},
      userData = {},
      testEventCode,
    } = body || {};

    if (!eventName || typeof eventName !== 'string') {
      return NextResponse.json({ ok: false, reason: 'missing_event_name' }, { status: 400 });
    }

    const clientIp = getClientIp(req);
    const userAgent = req.headers.get('user-agent') || undefined;

    const cookieFbp = req.cookies.get('_fbp')?.value;
    const cookieFbc = req.cookies.get('_fbc')?.value;

    const fbp = userData.fbp || cookieFbp || undefined;
    const fbc = userData.fbc || cookieFbc || undefined;
    const externalId = userData.externalId ? [sha256(String(userData.externalId))] : undefined;

    const capiUserData: Record<string, unknown> = {
      country: [sha256('br')],
    };

    if (clientIp) capiUserData.client_ip_address = clientIp;
    if (userAgent) capiUserData.client_user_agent = userAgent;
    if (fbp) capiUserData.fbp = fbp;
    if (fbc) capiUserData.fbc = fbc;
    if (externalId) capiUserData.external_id = externalId;

    const eventPayload: Record<string, unknown> = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId || `evt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
      event_source_url: eventSourceUrl || req.headers.get('referer') || undefined,
      action_source: 'website',
      user_data: capiUserData,
      custom_data: {
        content_name: siteConfig.product.name,
        content_ids: ['ebook-novos-encontros-60'],
        content_type: 'product',
        content_category: 'E-book Digital',
        value: siteConfig.product.price,
        currency: 'BRL',
        ...customData,
      },
    };

    const graphBody: Record<string, unknown> = {
      data: [eventPayload],
    };

    if (testEventCode && typeof testEventCode === 'string') {
      graphBody.test_event_code = testEventCode.trim();
    }

    const endpoint = `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${encodeURIComponent(CAPI_TOKEN)}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(graphBody),
      cache: 'no-store',
    });

    const result = await response.json().catch(() => ({}));
    return NextResponse.json({ ok: response.ok, status: response.status, result });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'unknown_error' },
      { status: 200 },
    );
  }
}
