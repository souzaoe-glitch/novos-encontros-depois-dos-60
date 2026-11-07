import Script from 'next/script';
import { siteConfig } from '@/config/site';

/** Microsoft Clarity. Não carrega nada enquanto clarityId estiver vazio. */
export default function Clarity() {
  const id = (siteConfig.clarityId || '').replace(/[^a-z0-9]/gi, '');
  if (!id) return null;
  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${id}");`}
    </Script>
  );
}
