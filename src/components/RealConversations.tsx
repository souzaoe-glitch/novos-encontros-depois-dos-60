'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';
import Reveal from './Reveal';
import Modal, { CloseButton, type ModalHandle } from './Modal';
import { trackConversationInteraction, trackCtaScrollToOffer } from './FacebookPixel';

type TranscriptLine = {
  sender: string;
  time: string;
  text: string;
  side: 'left' | 'right';
};

type Conversation = {
  id: string;
  contact: string;
  readerLabel: string;
  context: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  headerMeta?: string;
  transcript: TranscriptLine[];
};

const conversations: Conversation[] = [
  {
    id: 'roberto',
    contact: 'Roberto',
    readerLabel: 'Leitora aplicando as orientações do guia',
    context: 'Elogio sincero ao perfil, descoberta de afinidades e convite para o café da praça.',
    src: '/images/conversas/01-roberto.png',
    width: 576,
    height: 1024,
    alt: 'Conversa com Roberto demonstrando interesse mútuo, afinidades em comum e convite para um café na praça no sábado às 16h.',
    transcript: [
      {
        sender: 'Roberto',
        time: '14:03',
        text: 'Boa tarde! 😊 Vi seu perfil aqui e gostei muito. Você parece uma pessoa leve, sincera e de bom coração.',
        side: 'left',
      },
      {
        sender: 'Enviada',
        time: '14:07',
        text: 'Boa tarde, Roberto! 😊 Fico muito feliz com suas palavras. Também gostei do seu perfil. Você parece ser uma pessoa muito interessante.',
        side: 'right',
      },
      {
        sender: 'Roberto',
        time: '14:10',
        text: 'Que bom! Gosto de pessoas verdadeiras, que valorizam as coisas simples da vida. Adoro um bom café, um lugar tranquilo e uma boa conversa.',
        side: 'left',
      },
      {
        sender: 'Enviada',
        time: '14:13',
        text: 'Eu também! Lugares tranquilos, um café gostoso e boas conversas são tudo de bom. E a fé também é muito importante pra mim.',
        side: 'right',
      },
      {
        sender: 'Roberto',
        time: '14:16',
        text: 'Verdade! É raro encontrar alguém que pensa assim. Você é uma pessoa muito agradável, de verdade.',
        side: 'left',
      },
      {
        sender: 'Enviada',
        time: '14:18',
        text: 'Que bom ouvir isso, Roberto! Também achei muito bom conversar com você. É sempre bom encontrar pessoas assim. 😊',
        side: 'right',
      },
      {
        sender: 'Roberto',
        time: '14:20',
        text: 'Gostaria muito de te conhecer pessoalmente. O que você acha?',
        side: 'left',
      },
      {
        sender: 'Enviada',
        time: '14:22',
        text: 'Podemos marcar naquele café da praça? Acho um bom lugar, tranquilo e agradável.',
        side: 'right',
      },
      {
        sender: 'Roberto',
        time: '14:24',
        text: 'Boa ideia! Sábado, às 16h?',
        side: 'left',
      },
      {
        sender: 'Enviada',
        time: '14:25',
        text: 'Combinado. Vou por conta própria e encontro você lá 😊',
        side: 'right',
      },
      {
        sender: 'Roberto',
        time: '14:26',
        text: 'Perfeito. Vai ser bom conversar pessoalmente. Estou ansioso para te conhecer. 😊',
        side: 'left',
      },
    ],
  },
  {
    id: 'carlos',
    contact: 'Carlos',
    readerLabel: 'Leitora aplicando as orientações do guia',
    context: 'Continuidade da conversa do dia anterior, gosto por caminhadas e encontro marcado.',
    src: '/images/conversas/02-carlos.png',
    width: 576,
    height: 1024,
    alt: 'Conversa com Carlos retomando o papo do dia anterior e combinando um encontro no café da praça no sábado às 16h.',
    headerMeta: 'seg., 4 de mai.',
    transcript: [
      {
        sender: 'Carlos',
        time: '8:14 PM',
        text: 'Olá! Bom dia! 😊 Gostei muito da nossa conversa de ontem. Como foi seu dia hoje?',
        side: 'left',
      },
      {
        sender: 'Enviada',
        time: '8:20 PM',
        text: 'Olá, Carlos! Bom dia! 😊 Meu dia foi bem tranquilo, graças a Deus. E o seu, como foi?',
        side: 'right',
      },
      {
        sender: 'Carlos',
        time: '8:24 PM',
        text: 'Foi um bom dia também. Trabalho resolvido e ainda consegui uma caminhada no fim da tarde. Gosto muito desses momentos mais tranquilos.',
        side: 'left',
      },
      {
        sender: 'Enviada',
        time: '8:28 PM',
        text: 'Eu também adoro esses momentos. Uma boa conversa, um café, uma caminhada na praça... coisas simples que fazem bem, né? 😊',
        side: 'right',
      },
      {
        sender: 'Carlos',
        time: '8:32 PM',
        text: 'Verdade! Andar pela praça, tomar um café e conversar sem pressa é tudo de bom. Gosto de pessoas sinceras, que valorizam uma boa conversa, como você.',
        side: 'left',
      },
      {
        sender: 'Enviada',
        time: '8:35 PM',
        text: 'Fico feliz em saber disso. Também valorizo muito a sinceridade e as conversas leves, mas com conteúdo. 😊',
        side: 'right',
      },
      {
        sender: 'Carlos',
        time: '8:38 PM',
        text: 'Eu gostaria muito de continuar essa conversa pessoalmente. O que você acha?',
        side: 'left',
      },
      {
        sender: 'Enviada',
        time: '8:42 PM',
        text: 'Acho uma ótima ideia! Que tal nos encontrarmos no café da praça? É um lugar agradável e tranquilo.',
        side: 'right',
      },
      {
        sender: 'Carlos',
        time: '8:45 PM',
        text: 'Sábado, às 16h?',
        side: 'left',
      },
      {
        sender: 'Enviada',
        time: '8:46 PM',
        text: 'Combinado. Vou por conta própria e encontro você lá. 😊',
        side: 'right',
      },
      {
        sender: 'Carlos',
        time: '8:47 PM',
        text: 'Perfeito. Vai ser bom conversar pessoalmente. Até sábado! 😊',
        side: 'left',
      },
    ],
  },
  {
    id: 'marta',
    contact: 'Marta',
    readerLabel: 'Leitor aplicando as orientações do guia',
    context: 'Abertura leve pela manhã, sintonia nos valores e convite respeitoso para se conhecerem.',
    src: '/images/conversas/03-marta.png',
    width: 576,
    height: 1024,
    alt: 'Conversa com Marta sobre valores em comum e combinação de encontro no café da praça no sábado às 16h.',
    transcript: [
      {
        sender: 'Marta',
        time: '09:14',
        text: 'Oiie 😊',
        side: 'left',
      },
      {
        sender: 'Marta',
        time: '09:14',
        text: 'Tudo bem por aí?',
        side: 'left',
      },
      {
        sender: 'Enviada',
        time: '09:15',
        text: 'Oii Marta! Tudo bem sim, graças a Deus. E por aí, como está?',
        side: 'right',
      },
      {
        sender: 'Marta',
        time: '09:16',
        text: 'Estou bem também, obrigada 😊',
        side: 'left',
      },
      {
        sender: 'Marta',
        time: '09:16',
        text: 'Adorei nossa conversa ontem. Faz tempo que não conversava com alguém tão tranquilo e com assuntos tão parecidos.',
        side: 'left',
      },
      {
        sender: 'Enviada',
        time: '09:18',
        text: 'Eu que gostei! A conversa fluiu muito bem. É bom encontrar alguém que tem os mesmos valores e gosta das mesmas coisas.',
        side: 'right',
      },
      {
        sender: 'Marta',
        time: '09:20',
        text: 'Verdade! E quem sabe a gente possa se conhecer pessoalmente?',
        side: 'left',
      },
      {
        sender: 'Enviada',
        time: '09:21',
        text: 'Com certeza! Eu adoraria te encontrar.',
        side: 'right',
      },
      {
        sender: 'Marta',
        time: '09:22',
        text: 'Podemos marcar naquele café da praça?',
        side: 'left',
      },
      {
        sender: 'Enviada',
        time: '09:23',
        text: 'Boa ideia! Sábado, às 16h?',
        side: 'right',
      },
      {
        sender: 'Marta',
        time: '09:24',
        text: 'Combinado. Vou por conta própria e encontro você lá 😊',
        side: 'left',
      },
      {
        sender: 'Enviada',
        time: '09:25',
        text: 'Perfeito. Vai ser bom conversar pessoalmente, tomar um café e conhecer você melhor.',
        side: 'right',
      },
      {
        sender: 'Marta',
        time: '09:26',
        text: 'Vai ser muito bom sim! Estou animada 😊',
        side: 'left',
      },
      {
        sender: 'Enviada',
        time: '09:27',
        text: 'Eu também! Até sábado então. 😊',
        side: 'right',
      },
    ],
  },
  {
    id: 'lucia',
    contact: 'Lúcia',
    readerLabel: 'Leitor aplicando as orientações do guia',
    context: 'Mensagem gentil à noite, reconhecimento da conversa agradável e encontro combinado com segurança.',
    src: '/images/conversas/04-lucia.png',
    width: 576,
    height: 1024,
    alt: 'Conversa com Lúcia agradecendo pelo papo agradável e combinando um café na praça no sábado às 16h.',
    transcript: [
      {
        sender: 'Lúcia',
        time: '19:14',
        text: 'Olá boa noite! 😊',
        side: 'left',
      },
      {
        sender: 'Enviada',
        time: '19:16',
        text: 'Boa noite, Lúcia! Tudo bem?',
        side: 'right',
      },
      {
        sender: 'Lúcia',
        time: '19:18',
        text: 'Tudo bem sim, graças a Deus! E você, como está?',
        side: 'left',
      },
      {
        sender: 'Enviada',
        time: '19:20',
        text: 'Estou bem também, obrigado! Foi um prazer conversar contigo hoje. Adorei conhecer mais sobre você.',
        side: 'right',
      },
      {
        sender: 'Lúcia',
        time: '19:22',
        text: 'Eu também gostei muito da nossa conversa! Fazia tempo que não tinha um papo tão agradável assim. 😊',
        side: 'left',
      },
      {
        sender: 'Enviada',
        time: '19:24',
        text: 'Nossa, fico feliz em saber! Realmente é bom encontrar pessoas que têm os mesmos valores e que gostam de conversar. 😊',
        side: 'right',
      },
      {
        sender: 'Lúcia',
        time: '19:26',
        text: 'Com certeza! E acho que seria ainda melhor conversarmos pessoalmente. O que você acha?',
        side: 'left',
      },
      {
        sender: 'Enviada',
        time: '19:28',
        text: 'Concordo! Podemos marcar naquele café da praça? É um lugar tranquilo e agradável.',
        side: 'right',
      },
      {
        sender: 'Lúcia',
        time: '19:30',
        text: 'Boa ideia! Sábado, às 16h?',
        side: 'left',
      },
      {
        sender: 'Enviada',
        time: '19:31',
        text: 'Combinado. Vou por conta própria e encontro você lá. 😊',
        side: 'right',
      },
      {
        sender: 'Lúcia',
        time: '19:32',
        text: 'Perfeito! Vai ser muito bom conversar pessalmente. Até sábado! 😊',
        side: 'left',
      },
    ],
  },
];

function Stars() {
  return (
    <span className="inline-flex items-center gap-0.5 text-terracotta" aria-label="Avaliação de 5 estrelas">
      {[0, 1, 2, 3, 4].map((s) => (
        <svg key={s} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
        </svg>
      ))}
    </span>
  );
}

function ConversationCard({
  conv,
  index,
  onOpenZoom,
  isOpenTranscript,
  onToggleTranscript,
}: {
  conv: Conversation;
  index: number;
  onOpenZoom: (idx: number) => void;
  isOpenTranscript: boolean;
  onToggleTranscript: () => void;
}) {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-forest/12 bg-white p-4 shadow-card transition-all duration-300 hover:border-forest/25 sm:p-6">
      {/* Cabeçalho do Card */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-forest/10 pb-3.5">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-serif text-xl font-semibold text-forest">Conversa com {conv.contact}</span>
            <Stars />
          </div>
          <p className="mt-0.5 text-sm font-semibold text-muted">{conv.readerLabel}</p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-sage px-3 py-1 text-xs font-bold uppercase tracking-wider text-forest">
            <span aria-hidden="true">✓</span> Compra verificada
          </span>
        </div>
      </div>

      <p className="mb-4 text-[0.98rem] text-muted">{conv.context}</p>

      {/* Imagem inteira sem cortes e sem moldura grossa */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0b141a] ring-1 ring-forest/15">
        <button
          type="button"
          onClick={() => onOpenZoom(index)}
          aria-label={`Ampliar conversa com ${conv.contact}`}
          className="group relative block w-full text-left focus:outline-none"
        >
          <Image
            src={conv.src}
            alt={conv.alt}
            width={conv.width}
            height={conv.height}
            loading="eager"
            sizes="(min-width: 1024px) 520px, 92vw"
            className="h-auto w-full object-contain"
          />
          <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-full bg-ivory px-4 py-2 text-sm font-bold text-forest shadow-soft">
              Toque para ampliar <span aria-hidden="true">🔍</span>
            </span>
          </span>
        </button>
      </div>

      {/* Ações acessíveis abaixo da imagem */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onOpenZoom(index)}
          className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-forest px-5 py-2.5 text-base font-bold text-ivory transition hover:bg-forest-deep"
        >
          <span aria-hidden="true">🔍</span> Ampliar conversa
        </button>
        <button
          type="button"
          onClick={onToggleTranscript}
          aria-expanded={isOpenTranscript}
          aria-controls={`transcricao-${conv.id}`}
          className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full border-2 border-forest/25 bg-ivory px-5 py-2.5 text-base font-bold text-forest transition hover:border-forest hover:bg-sage"
        >
          <span>{isOpenTranscript ? 'Ocultar texto' : 'Ler conversa em texto'}</span>
          <span aria-hidden="true" className={`transition-transform duration-300 ${isOpenTranscript ? 'rotate-180' : ''}`}>
            ↓
          </span>
        </button>
      </div>

      {/* Transcrição fiel do conteúdo visível */}
      <AnimatePresence initial={false}>
        {isOpenTranscript && (
          <motion.div
            id={`transcricao-${conv.id}`}
            role="region"
            aria-label={`Transcrição em texto da conversa com ${conv.contact}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-4 rounded-2xl border border-forest/15 bg-ivory p-4 sm:p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-forest/10 pb-2 text-sm text-muted">
                <strong>Transcrição fiel da conversa ({conv.contact} · online)</strong>
                {conv.headerMeta && <span className="rounded-full bg-sage px-2.5 py-0.5 text-xs font-bold text-forest">{conv.headerMeta}</span>}
              </div>
              <ol className="space-y-3 text-[1rem] leading-relaxed">
                {conv.transcript.map((line, idx) => (
                  <li
                    key={idx}
                    className={`rounded-xl p-3 ${
                      line.side === 'right'
                        ? 'ml-4 border border-forest/20 bg-sage/80 text-ink'
                        : 'mr-4 border border-forest/10 bg-white text-ink'
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-2 text-xs font-bold uppercase tracking-wider text-forest-soft">
                      <span>{line.sender}</span>
                      <time>{line.time}</time>
                    </div>
                    <p className="mt-1 text-ink">{line.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

export default function RealConversations() {
  const modalRef = useRef<ModalHandle>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [zoomIndex, setZoomIndex] = useState(0);
  const [zoomedIn, setZoomedIn] = useState(false);
  const [openTranscripts, setOpenTranscripts] = useState<Record<string, boolean>>({});
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const toggleTranscript = (id: string) => {
    setOpenTranscripts((prev) => {
      const nextOpen = !prev[id];
      if (nextOpen) {
        const found = conversations.find((c) => c.id === id);
        if (found) trackConversationInteraction('transcript', found.contact);
      }
      return { ...prev, [id]: nextOpen };
    });
  };

  const openZoom = (idx: number) => {
    setZoomIndex(idx);
    setZoomedIn(false);
    modalRef.current?.open();
    if (conversations[idx]) {
      trackConversationInteraction('zoom', conversations[idx].contact);
    }
  };

  const goSlide = useCallback((dir: number) => {
    setActiveSlide((prev) => {
      const next = (prev + dir + conversations.length) % conversations.length;
      if (conversations[next]) {
        trackConversationInteraction('carousel', conversations[next].contact);
      }
      return next;
    });
  }, []);

  const goZoom = useCallback((dir: number) => {
    setZoomedIn(false);
    setZoomIndex((prev) => (prev + dir + conversations.length) % conversations.length);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 45) {
      if (diff > 0) goSlide(1);
      else goSlide(-1);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const zoomedConv = conversations[zoomIndex];

  return (
    <section
      id="conversas-reais"
      aria-labelledby="real-conversations-title"
      className="relative overflow-hidden bg-cream py-20 sm:py-28"
    >
      <div aria-hidden="true" className="paper-grain pointer-events-none absolute inset-0 opacity-50" />

      <div className="container-site relative">
        {/* Cabeçalho da seção */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-ivory px-4 py-1.5 shadow-sm ring-1 ring-forest/10">
            <Stars />
            <span className="text-sm font-bold text-forest">Resultados de leitoras e leitores do guia · Compra verificada</span>
          </div>
          <h2 id="real-conversations-title" className="mt-5 text-4xl font-medium sm:text-5xl">
            Uma nova conexão pode começar <em className="italic-accent">com uma conversa.</em>
          </h2>
          <p className="mt-5 text-lg text-muted sm:text-xl">
            Veja exemplos de como demonstrar interesse, descobrir afinidades e fazer um convite com respeito.
          </p>
          <p className="mt-3 text-sm font-semibold text-forest-soft">
            Conversas reais de leitoras e leitores que aplicaram as orientações do método
          </p>
        </Reveal>

        {/* CARROSSEL MANUAL NO CELULAR (1 imagem por vez + swipe + botões grandes + "1 de 4") */}
        <div className="mt-12 lg:hidden">
          <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl bg-ivory p-3 shadow-sm ring-1 ring-forest/10">
            <button
              type="button"
              onClick={() => goSlide(-1)}
              aria-label="Conversa anterior"
              className="inline-flex min-h-[52px] min-w-[110px] items-center justify-center gap-2 rounded-full bg-forest px-4 font-bold text-ivory transition active:scale-95"
            >
              <span aria-hidden="true">←</span> Anterior
            </button>
            <span className="font-serif text-lg font-bold text-forest" aria-live="polite">
              {activeSlide + 1} de {conversations.length}
            </span>
            <button
              type="button"
              onClick={() => goSlide(1)}
              aria-label="Próxima conversa"
              className="inline-flex min-h-[52px] min-w-[110px] items-center justify-center gap-2 rounded-full bg-forest px-4 font-bold text-ivory transition active:scale-95"
            >
              Próxima <span aria-hidden="true">→</span>
            </button>
          </div>

          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            aria-roledescription="carrossel"
            aria-label="Exemplos de conversas"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={conversations[activeSlide].id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <ConversationCard
                  conv={conversations[activeSlide]}
                  index={activeSlide}
                  onOpenZoom={openZoom}
                  isOpenTranscript={!!openTranscripts[conversations[activeSlide].id]}
                  onToggleTranscript={() => toggleTranscript(conversations[activeSlide].id)}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicadores de página e controle inferior no celular */}
          <div className="mt-5 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2" role="tablist" aria-label="Escolher conversa">
              {conversations.map((c, idx) => (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={activeSlide === idx}
                  aria-label={`Ir para conversa ${idx + 1} de ${conversations.length}: ${c.contact}`}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-3.5 rounded-full transition-all ${
                    activeSlide === idx ? 'w-9 bg-forest' : 'w-3.5 bg-forest/25 hover:bg-forest/50'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted">Deslize para o lado ou use os botões para ver as 4 conversas ({activeSlide + 1} de {conversations.length}).</p>
          </div>
        </div>

        {/* GALERIA EM DUAS COLUNAS NO COMPUTADOR */}
        <div className="mt-14 hidden gap-8 lg:grid lg:grid-cols-2">
          {conversations.map((conv, idx) => (
            <Reveal key={conv.id} delay={idx * 0.08}>
              <ConversationCard
                conv={conv}
                index={idx}
                onOpenZoom={openZoom}
                isOpenTranscript={!!openTranscripts[conv.id]}
                onToggleTranscript={() => toggleTranscript(conv.id)}
              />
            </Reveal>
          ))}
        </div>

        {/* Encerramento da seção */}
        <Reveal className="mt-14 rounded-3xl bg-forest p-8 text-center text-ivory shadow-soft sm:p-12">
          <p className="mx-auto max-w-2xl font-serif text-2xl leading-snug sm:text-3xl">
            Conheça as orientações do guia para iniciar conversas e se abrir a novos encontros no seu ritmo.
          </p>
          <div className="mt-7 flex justify-center">
            <a href="#oferta" onClick={() => trackCtaScrollToOffer('conversas_reais')} className="btn-cream w-full sm:w-auto">
              Conhecer o e-book — R$ 19,90 <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>
      </div>

      {/* Modal de ampliação acessível com zoom, rolagem, botão fechar e Escape */}
      <Modal
        ref={modalRef}
        labelledBy="zoom-conv-title"
        onClose={() => setZoomedIn(false)}
        className="m-auto max-h-[95vh] w-[min(780px,96vw)] overflow-hidden rounded-3xl bg-ivory p-0 text-ink shadow-2xl"
      >
        <div className="flex max-h-[95vh] flex-col">
          {/* Barra superior fixa */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-forest/15 bg-ivory px-4 py-3 sm:px-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 id="zoom-conv-title" className="font-serif text-xl font-semibold text-forest">
                  Conversa com {zoomedConv.contact} ({zoomIndex + 1} de {conversations.length})
                </h3>
                <span className="rounded-full bg-sage px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-forest">
                  ✓ Compra verificada · Resultado de leitor(a)
                </span>
              </div>
              <p className="text-sm text-muted">Role para ler ou use o botão de zoom para aumentar ainda mais.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoomedIn((z) => !z)}
                aria-pressed={zoomedIn}
                className="inline-flex min-h-[48px] items-center gap-1.5 rounded-full border-2 border-forest/25 px-4 text-sm font-bold text-forest transition hover:border-forest hover:bg-sage"
              >
                <span aria-hidden="true">{zoomedIn ? '🔍−' : '🔍+'}</span>
                <span>{zoomedIn ? 'Ajustar à tela' : 'Mais zoom'}</span>
              </button>
              <CloseButton onClick={() => modalRef.current?.close()} label="Fechar visualização ampliada" />
            </div>
          </div>

          {/* Área da imagem com rolagem e zoom */}
          <div className="overflow-auto bg-[#0b141a] p-3 sm:p-6">
            <div className={`mx-auto transition-all duration-300 ${zoomedIn ? 'w-[145%] max-w-none sm:w-[135%]' : 'w-full max-w-[540px]'}`}>
              <Image
                key={zoomedConv.src}
                src={zoomedConv.src}
                alt={zoomedConv.alt}
                width={zoomedConv.width}
                height={zoomedConv.height}
                loading="eager"
                sizes="(min-width: 768px) 720px, 100vw"
                className="h-auto w-full rounded-xl"
              />
            </div>
          </div>

          {/* Barra inferior com navegação entre as 4 conversas */}
          <div className="flex items-center justify-between gap-3 border-t border-forest/15 bg-ivory px-4 py-3 sm:px-6">
            <button
              type="button"
              onClick={() => goZoom(-1)}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-sage px-5 font-bold text-forest transition hover:bg-moss"
            >
              <span aria-hidden="true">←</span> Anterior
            </button>
            <span className="whitespace-nowrap text-sm font-bold text-muted" aria-live="polite">
              {zoomIndex + 1} de {conversations.length}
            </span>
            <button
              type="button"
              onClick={() => goZoom(1)}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-sage px-5 font-bold text-forest transition hover:bg-moss"
            >
              Próxima <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
