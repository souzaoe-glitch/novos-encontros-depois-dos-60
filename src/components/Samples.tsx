'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import Reveal from './Reveal';
import Modal, { CloseButton, type ModalHandle } from './Modal';
import { samples } from '@/content/content';
import { trackSampleView, trackCtaScrollToOffer } from './FacebookPixel';

export default function Samples() {
  const modal = useRef<ModalHandle>(null);
  const [index, setIndex] = useState(0);
  const current = samples[index];

  const open = (i: number) => {
    setIndex(i);
    modal.current?.open();
    if (samples[i]) {
      trackSampleView(samples[i].page, samples[i].title);
    }
  };
  const go = useCallback((dir: number) => setIndex((i) => (i + dir + samples.length) % samples.length), []);

  return (
    <section id="por-dentro" aria-labelledby="samples-title" className="relative overflow-hidden bg-forest py-20 text-ivory sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-forest-soft/50 blur-3xl" />
      <div className="container-site relative">
        <div className="grid items-end gap-6 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-terracotta-light before:bg-terracotta-light">Páginas reais do e-book</p>
            <h2 id="samples-title" className="mt-5 text-4xl font-medium text-ivory sm:text-5xl">
              Veja por dentro <em className="font-serif italic text-terracotta-light">antes de escolher.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-ivory/85 lg:pb-2">
              Estas são três páginas do material que você vai receber. Toque em uma delas para ampliar e ler com calma.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {samples.map((s, i) => (
            <Reveal key={s.src} delay={i * 0.12} className={i === 2 ? 'sm:col-span-2 sm:mx-auto sm:max-w-sm lg:col-span-1 lg:max-w-none' : ''}>
              <button
                type="button"
                onClick={() => open(i)}
                aria-label={`Ampliar página ${s.page}: ${s.title}`}
                className="group block w-full text-left"
              >
                <span
                  className={`relative block overflow-hidden rounded-xl bg-ivory p-2 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)] transition-all duration-500 group-hover:-translate-y-2 group-hover:rotate-0 ${
                    i === 0 ? 'lg:-rotate-2' : i === 2 ? 'lg:rotate-2' : ''
                  }`}
                >
                  <Image
                    src={s.src}
                    alt={s.alt}
                    width={1054}
                    height={1492}
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 100vw"
                    className="h-auto w-full rounded-lg"
                  />
                  <span className="absolute inset-2 flex items-center justify-center rounded-lg bg-forest-deep/0 transition-colors duration-500 group-hover:bg-forest-deep/35">
                    <span className="flex scale-75 items-center gap-2 rounded-full bg-ivory px-5 py-3 font-bold text-forest opacity-0 shadow-soft transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                      Ampliar página <span aria-hidden="true">↗</span>
                    </span>
                  </span>
                </span>
                <span className="mt-5 block">
                  <span className="text-sm font-bold uppercase tracking-[0.16em] text-terracotta-light">
                    {s.tag} · Página {s.page}
                  </span>
                  <span className="mt-1 block font-serif text-2xl font-semibold leading-snug text-ivory">{s.title}</span>
                  <span className="mt-1 block text-ivory/80">{s.caption}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-col items-start justify-between gap-5 border-t border-ivory/15 pt-8 sm:flex-row sm:items-center">
          <p className="text-lg text-ivory/85">Conteúdo prático, exemplos curtos e espaço para refletir.</p>
          <a href="#oferta" onClick={() => trackCtaScrollToOffer('amostras_ebook')} className="btn-cream w-full sm:w-auto">
            Quero ter o guia completo <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>

      <Modal
        ref={modal}
        labelledBy="sample-dialog-title"
        className="m-auto max-h-[94vh] w-[min(760px,94vw)] overflow-hidden rounded-3xl bg-ivory p-0 text-ink shadow-2xl"
      >
        <div className="flex max-h-[94vh] flex-col">
          <div className="flex items-center justify-between gap-4 border-b border-forest/10 px-5 py-3 sm:px-6">
            <p id="sample-dialog-title" className="font-serif text-lg font-semibold text-forest sm:text-xl">
              Página {current.page} · {current.title}
            </p>
            <CloseButton onClick={() => modal.current?.close()} label="Fechar página ampliada" />
          </div>
          <div className="overflow-y-auto bg-cream p-3 sm:p-5">
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              width={1054}
              height={1492}
              sizes="(min-width: 800px) 720px, 94vw"
              className="mx-auto h-auto w-full rounded-lg shadow-card"
            />
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-forest/10 px-5 py-3 sm:px-6">
            <button type="button" onClick={() => go(-1)} className="min-h-[48px] rounded-full px-4 font-bold text-forest transition hover:bg-sage">
              <span aria-hidden="true">←</span> Anterior
            </button>
            <span className="text-sm text-muted" aria-live="polite">
              {index + 1} de {samples.length}
            </span>
            <button type="button" onClick={() => go(1)} className="min-h-[48px] rounded-full px-4 font-bold text-forest transition hover:bg-sage">
              Próxima <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
