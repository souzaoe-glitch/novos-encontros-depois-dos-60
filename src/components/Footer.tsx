'use client';

import { useRef, useState } from 'react';
import { Brand } from './Header';
import Modal, { CloseButton, type ModalHandle } from './Modal';
import { siteConfig, getWhatsappLink } from '@/config/site';
import { legal } from '@/content/content';

type Kind = 'support' | 'terms' | 'privacy';
const titles: Record<Kind, string> = { support: 'Atendimento', terms: 'Termos de compra', privacy: 'Privacidade' };

function SellerInfo() {
  const lines = [
    siteConfig.sellerName && `Vendedor responsável: ${siteConfig.sellerName}`,
    siteConfig.sellerDocument && `CPF/CNPJ: ${siteConfig.sellerDocument}`,
    siteConfig.sellerAddress && `Endereço: ${siteConfig.sellerAddress}`,
  ].filter(Boolean) as string[];
  if (!lines.length) return null;
  return (
    <div className="mt-5 space-y-1 border-t border-forest/10 pt-5">
      {lines.map((l) => (
        <p key={l}>{l}</p>
      ))}
    </div>
  );
}

function SupportInfo() {
  const wa = getWhatsappLink();
  if (!siteConfig.supportEmail && !wa) {
    return <p>O canal de atendimento será informado junto às informações de compra quando as vendas forem abertas.</p>;
  }
  return (
    <div className="space-y-3">
      {siteConfig.supportEmail && (
        <p>
          E-mail de atendimento:{' '}
          <a className="font-bold text-forest underline underline-offset-4" href={`mailto:${siteConfig.supportEmail}`}>
            {siteConfig.supportEmail}
          </a>
        </p>
      )}
      {wa && (
        <p>
          <a className="font-bold text-forest underline underline-offset-4" href={wa} target="_blank" rel="noopener noreferrer">
            Falar com o atendimento pelo WhatsApp
          </a>
        </p>
      )}
    </div>
  );
}

export default function Footer() {
  const modal = useRef<ModalHandle>(null);
  const [kind, setKind] = useState<Kind>('support');

  const open = (k: Kind) => {
    setKind(k);
    modal.current?.open();
  };

  const sellerLine = [siteConfig.sellerName, siteConfig.sellerDocument, siteConfig.sellerAddress].filter(Boolean).join(' · ');

  return (
    <footer className="bg-ink pb-32 pt-16 text-ivory/85 md:pb-14">
      <div className="container-site">
        <div className="flex flex-col gap-8 border-b border-ivory/10 pb-10 md:flex-row md:items-center md:justify-between">
          <Brand light />
          <nav aria-label="Informações" className="flex flex-wrap gap-2">
            {(Object.keys(titles) as Kind[]).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => open(k)}
                className="min-h-[48px] rounded-full border border-ivory/20 px-5 font-bold text-ivory transition hover:border-ivory hover:bg-ivory hover:text-forest"
              >
                {titles[k]}
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-8 space-y-2 text-[0.95rem] text-ivory/70">
          <p>{sellerLine || `${siteConfig.product.name} · Material educativo digital.`}</p>
          <p>Fotos ilustrativas de pessoas fictícias. Exemplos de conversa não são depoimentos.</p>
          <p>Este site não é afiliado ao WhatsApp, Facebook ou Instagram.</p>
          <p>© {new Date().getFullYear()} {siteConfig.product.name}. Todos os direitos reservados.</p>
        </div>
      </div>

      <Modal ref={modal} labelledBy="info-title" className="m-auto max-h-[90vh] w-[min(640px,92vw)] overflow-y-auto rounded-3xl bg-ivory p-0 text-ink shadow-2xl">
        <div className="p-6 sm:p-9">
          <div className="flex items-start justify-between gap-4">
            <h2 id="info-title" className="text-3xl font-medium">
              {titles[kind]}
            </h2>
            <CloseButton onClick={() => modal.current?.close()} label="Fechar janela" />
          </div>
          <div className="mt-6 space-y-4 text-[1.02rem] leading-relaxed">
            {kind === 'support' && <SupportInfo />}
            {kind === 'terms' && (
              <>
                {legal.terms.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                <SupportInfo />
              </>
            )}
            {kind === 'privacy' && (
              <>
                {legal.privacy.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {siteConfig.privacyEmail ? <p>Contato para dúvidas sobre privacidade: {siteConfig.privacyEmail}</p> : <SupportInfo />}
              </>
            )}
            <SellerInfo />
          </div>
        </div>
      </Modal>
    </footer>
  );
}
