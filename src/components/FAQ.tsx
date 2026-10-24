'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import Reveal from './Reveal';
import { faq } from '@/content/content';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="duvidas" aria-labelledby="faq-title" className="bg-sage py-20 sm:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Antes de decidir</p>
          <h2 id="faq-title" className="mt-5 text-4xl font-medium sm:text-5xl">
            Ficou alguma <em className="italic-accent">dúvida?</em>
          </h2>
          <p className="mt-5 text-lg text-muted">Veja as respostas para as perguntas mais comuns sobre o guia.</p>
        </Reveal>

        <div className="divide-y divide-forest/15 rounded-3xl bg-ivory px-5 shadow-card ring-1 ring-forest/5 sm:px-8">
          {faq.map((item, i) => {
            const isOpen = open === i;
            const id = `faq-${i}`;
            return (
              <div key={item.q}>
                <h3 className="font-sans text-inherit">
                  <button
                    type="button"
                    id={`${id}-btn`}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-panel`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex min-h-[64px] w-full items-center justify-between gap-5 py-5 text-left font-sans text-[1.08rem] font-bold text-ink transition-colors hover:text-forest sm:text-xl"
                  >
                    <span>{item.q}</span>
                    <span
                      aria-hidden="true"
                      className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                        isOpen ? 'rotate-45 border-forest bg-forest text-ivory' : 'border-forest/25 text-forest group-hover:border-forest'
                      }`}
                    >
                      <span className="text-2xl leading-none">+</span>
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`${id}-panel`}
                      role="region"
                      aria-labelledby={`${id}-btn`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 text-muted">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
