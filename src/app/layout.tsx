import type { Metadata, Viewport } from 'next';
import { Fraunces, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/config/site';
import Providers from '@/components/Providers';
import FacebookPixel from '@/components/FacebookPixel';

const serif = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  axes: ['opsz', 'SOFT'],
});

const sans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-sans',
  display: 'swap',
});

const title = 'Novos Encontros Depois dos 60 | E-book por R$ 19,90';
const description =
  'E-book de 30 páginas com reflexões, exemplos de mensagens e cuidados práticos para conhecer pessoas, conversar com confiança e se abrir para um novo amor, no seu ritmo. Pagamento único de R$ 19,90.';

export const metadata: Metadata = {
  ...(siteConfig.siteUrl ? { metadataBase: new URL(siteConfig.siteUrl), alternates: { canonical: '/' } } : {}),
  title,
  description,
  openGraph: {
    title: siteConfig.product.name,
    description: `${siteConfig.product.subtitle} E-book digital de 30 páginas por R$ 19,90.`,
    type: 'website',
    locale: 'pt_BR',
    ...(siteConfig.siteUrl
      ? { images: [{ url: '/images/01_casal_no_cafe.webp', width: 1536, height: 1024, alt: 'Duas pessoas maduras conversando num café' }] }
      : {}),
  },
  twitter: { card: 'summary_large_image', title: siteConfig.product.name, description },
};

export const viewport: Viewport = {
  themeColor: '#23483D',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <Providers>{children}</Providers>
        <FacebookPixel />
      </body>
    </html>
  );
}
