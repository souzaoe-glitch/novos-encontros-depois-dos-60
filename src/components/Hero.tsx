'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { formatPrice } from '@/config/site';
import { trackCtaScrollToOffer } from './FacebookPixel';

const ease = [0.22, 1, 0.36, 1] as const;

const lines = [
  { text: 'Novas conversas.', accent: false },
  { text: 'Novas possibilidades.', accent: false },
  { text: 'No seu tempo.', accent: true },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const cardY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);

  return (
    <section ref={ref} id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-40">
      {/* Fundo decorativo */}
      <div aria-hidden="true" className="paper-grain pointer-events-none absolute inset-0 opacity-60" />
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease }}
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-terracotta-pale/70 blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease }}
        className="pointer-events-none absolute -left-40 bottom-0 h-[26rem] w-[26rem] rounded-full bg-moss/70 blur-3xl"
      />

      <div className="container-site relative grid items-center gap-12 lg:grid-cols-[1.02fr_1fr] lg:gap-14">
        {/* Texto */}
        <div>
          <motion.p className="eyebrow" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2, ease }}>
            Um novo capítulo, no seu ritmo
          </motion.p>

          <h1 id="hero-title" className="mt-6 text-[2.6rem] font-medium sm:text-6xl lg:text-[4.4rem]">
            {lines.map((l, i) => (
              <span key={l.text} className="block overflow-hidden pb-1">
                <motion.span
                  className={`block ${l.accent ? 'italic text-terracotta' : ''}`}
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.35 + i * 0.14, ease }}
                >
                  {l.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.85, ease }}>
            <p className="mt-7 max-w-xl text-lg text-ink sm:text-xl">
              Conheça o <strong className="text-forest">Novos Encontros Depois dos 60</strong>: um guia para conhecer pessoas, conversar com confiança e se abrir para um novo amor.
            </p>
            <p className="mt-4 max-w-xl text-muted">
              Reflexões, exemplos de mensagens e cuidados práticos para dar o próximo passo com calma, sem deixar de ser quem você é.
            </p>

            <div className="mt-9 flex flex-col items-start gap-4">
              <a href="#oferta" onClick={() => trackCtaScrollToOffer('hero_abertura')} className="btn-primary w-full sm:w-auto">
                Quero meu e-book por {formatPrice()} <span aria-hidden="true">→</span>
              </a>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.98rem] text-muted">
                <span>Pagamento único</span>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-terracotta" />
                <span>E-book digital em PDF</span>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-terracotta" />
                <span>30 páginas</span>
              </p>
              <a href="#por-dentro" className="link-underline">
                Prefiro ver algumas páginas primeiro <span aria-hidden="true">↓</span>
                <span className="line" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Imagem */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.5, ease }}
        >
          <div className="absolute -inset-3 -rotate-2 rounded-[2.4rem] border border-terracotta/30 sm:-inset-4" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[2rem] shadow-soft">
            <motion.div style={{ y: imgY }} className="relative aspect-[4/3.4] scale-[1.12] sm:aspect-[3/2.3]">
              <Image
                src="/images/01_casal_no_cafe.webp"
                alt="Duas pessoas maduras sorrindo e conversando à mesa de um café ao ar livre."
                fill
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover object-[45%_30%]"
              />
            </motion.div>
            <span className="absolute left-4 top-4 rounded-full bg-ivory/90 px-4 py-1.5 text-sm font-bold text-forest backdrop-blur">
              A vida ainda tem boas conversas pela frente
            </span>
          </div>

          <motion.div
            style={{ y: cardY }}
            className="relative -mt-12 ml-auto mr-3 w-[86%] max-w-sm sm:absolute sm:-bottom-8 sm:-left-8 sm:mr-0 sm:mt-0 sm:w-auto"
          >
            <div className="animate-float-slow flex items-center gap-4 rounded-2xl bg-ivory p-4 pr-6 shadow-soft ring-1 ring-forest/10">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-forest font-serif text-xl font-semibold text-ivory">60+</span>
              <p className="font-serif text-lg leading-snug text-forest">
                Conhecer alguém pode começar com <em className="text-terracotta">uma conversa simples.</em>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
