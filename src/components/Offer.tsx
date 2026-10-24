'use client';

import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import Reveal from './Reveal';
import CheckoutButton from './CheckoutButton';
import { offerItems } from '@/content/content';
import { siteConfig } from '@/config/site';

function BookMockup() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-26, -8]), { stiffness: 150, damping: 18 });
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 18 });

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div onPointerMove={onMove} onPointerLeave={onLeave} className="relative mx-auto w-[64%] max-w-[300px] py-6 [perspective:1400px] sm:w-[52%] lg:w-[78%]">
      <motion.div style={{ rotateY: reduce ? -14 : rotY, rotateX: reduce ? 0 : rotX, transformStyle: 'preserve-3d' }} className="relative">
        {/* lombada */}
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-6 origin-left bg-gradient-to-r from-forest-deep to-forest"
          style={{ transform: 'rotateY(90deg) translateX(-100%)' }}
        />
        {/* páginas */}
        <span aria-hidden="true" className="absolute inset-y-1 -right-2 w-3 rounded-r-sm bg-gradient-to-r from-sand to-ivory shadow-inner" />
        <div className="relative overflow-hidden rounded-r-md rounded-l-sm shadow-book">
          <Image
            src="/images/03_capa_do_ebook.webp"
            alt="Capa do e-book Novos Encontros Depois dos 60: Um guia para conhecer pessoas, conversar com confiança e se abrir para um novo amor."
            width={1054}
            height={1493}
            sizes="(min-width: 1024px) 300px, 60vw"
            className="h-auto w-full"
          />
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-5 bg-gradient-to-r from-black/25 to-transparent" />
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/25" />
        </div>
      </motion.div>
      <span aria-hidden="true" className="absolute -bottom-2 left-1/2 h-6 w-3/4 -translate-x-1/2 rounded-[50%] bg-forest-deep/25 blur-xl" />
    </div>
  );
}

export default function Offer() {
  return (
    <section id="oferta" aria-labelledby="offer-title" className="relative py-20 sm:py-28">
      <div className="container-site">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <p className="eyebrow justify-center">Seu próximo capítulo começa aqui</p>
        </Reveal>

        <Reveal y={40}>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-cream shadow-soft ring-1 ring-forest/10">
            <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-terracotta-pale blur-3xl" />
            <div className="relative grid lg:grid-cols-[0.9fr_1.1fr]">
              {/* Produto */}
              <div className="flex flex-col items-center justify-center bg-gradient-to-b from-sage to-moss/60 px-6 py-12 lg:justify-start lg:py-16">
                <div className="flex w-full flex-col items-center lg:sticky lg:top-28">
                  <BookMockup />
                  <p className="mt-8 max-w-xs text-center text-[0.95rem] text-muted">
                    Produto digital em PDF. A apresentação da capa é ilustrativa; não há envio de livro físico.
                  </p>
                </div>
              </div>

              {/* Detalhes */}
              <div className="px-6 py-12 sm:px-12 lg:py-16">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-terracotta">Um guia para ter por perto</p>
                <h2 id="offer-title" className="mt-3 text-4xl font-medium sm:text-5xl">
                  Novos Encontros <em className="italic-accent">Depois dos 60</em>
                </h2>
                <p className="mt-4 text-lg text-muted">{siteConfig.product.subtitle}</p>

                <ul className="mt-8 space-y-3.5">
                  {offerItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span aria-hidden="true" className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest text-sm text-ivory">
                        ✓
                      </span>
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 rounded-3xl bg-ivory p-6 ring-1 ring-forest/10 sm:p-8">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-forest-soft">Pagamento único</p>
                  <p className="mt-1 flex items-start font-serif font-semibold leading-none text-forest" aria-label="19 reais e 90 centavos">
                    <span className="mt-3 text-2xl">R$</span>
                    <span className="text-[5.5rem] tracking-tight sm:text-8xl">19</span>
                    <span className="mt-3 text-4xl">,90</span>
                  </p>
                  <p className="mt-2 text-muted">Sem mensalidade. Sem assinatura.</p>
                  <div className="mt-6">
                    <CheckoutButton className="btn-primary w-full" />
                  </div>
                  <p className="mt-3 text-center text-[0.95rem] text-muted">Você será direcionado à página de pagamento para concluir a compra.</p>
                </div>

                <div className="mt-6 flex items-start gap-4 rounded-2xl border border-dashed border-forest/25 p-5">
                  <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage text-lg text-forest">
                    ↓
                  </span>
                  <p className="text-[1rem]">
                    <strong className="text-forest">Recebimento digital.</strong> {siteConfig.deliveryText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
