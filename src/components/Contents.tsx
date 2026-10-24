'use client';

import Image from 'next/image';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import Reveal from './Reveal';
import { parts } from '@/content/content';

export default function Contents() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="conteudo-do-guia" aria-labelledby="contents-title" className="py-20 sm:py-28">
      <div className="container-site grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="eyebrow">O que você vai encontrar</p>
            <h2 id="contents-title" className="mt-5 text-4xl font-medium sm:text-5xl">
              Um guia para cada passo <em className="italic-accent">dessa aproximação.</em>
            </h2>
            <p className="mt-6 text-lg text-muted">
              Um único e-book de 30 páginas ilustradas, organizado em seis partes. Para ler aos poucos e voltar quando precisar.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-10 flex items-center gap-5 rounded-3xl bg-cream p-5 ring-1 ring-forest/10 sm:gap-6 sm:p-6">
            <div className="relative w-20 shrink-0 -rotate-3 overflow-hidden rounded-md shadow-book sm:w-28">
              <Image src="/images/03_capa_do_ebook.webp" alt="Capa do e-book Novos Encontros Depois dos 60." width={1054} height={1493} sizes="112px" className="h-auto w-full" />
            </div>
            <dl className="grid flex-1 grid-cols-3 gap-2 text-center sm:gap-5">
              {[
                ['1', 'e-book'],
                ['6', 'partes'],
                ['30', 'páginas'],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd>
                    <span className="block font-serif text-3xl font-semibold text-forest sm:text-4xl">{n}</span>
                    <span className="whitespace-nowrap text-[0.78rem] font-bold uppercase tracking-wider text-terracotta sm:text-sm">{l}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <ol ref={listRef} className="relative space-y-4 pl-8 sm:pl-12">
          {/* Linha que acompanha a rolagem */}
          <span aria-hidden="true" className="absolute bottom-6 left-[11px] top-6 w-[2px] bg-forest/10 sm:left-[19px]" />
          <motion.span aria-hidden="true" style={{ scaleY }} className="absolute bottom-6 left-[11px] top-6 w-[2px] origin-top bg-terracotta sm:left-[19px]" />

          {parts.map((p, i) => (
            <Reveal as="li" key={p.n} delay={i * 0.05} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-8 top-8 flex h-6 w-6 items-center justify-center rounded-full border-2 border-terracotta bg-ivory sm:-left-12 sm:h-10 sm:w-10"
              >
                <span className="h-2 w-2 rounded-full bg-terracotta sm:h-3 sm:w-3" />
              </span>
              <article className="group rounded-3xl border border-forest/10 bg-white/70 p-6 transition-all duration-500 hover:border-forest/25 hover:bg-white hover:shadow-card sm:p-8">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-serif text-5xl font-light text-terracotta/80 transition-colors group-hover:text-terracotta">{p.n}</span>
                  <span className="text-sm font-bold uppercase tracking-[0.16em] text-forest-soft">Parte {Number(p.n)} · {p.pages}</span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold sm:text-[1.7rem]">{p.title}</h3>
                <p className="mt-3 text-muted">{p.text}</p>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
