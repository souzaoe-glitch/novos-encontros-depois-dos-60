'use client';

import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';

const messages = [
  { from: 'me', text: 'Olá! Vi que você gosta de música brasileira. Qual cantor você tem ouvido ultimamente?' },
  { from: 'other', text: 'Oi! Tenho ouvido muito Djavan. E você, o que gosta de ouvir?' },
  { from: 'me', text: 'Também gosto dele! Tem alguma música que você mais gosta?' },
] as const;

export default function ChatDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -120px 0px' });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setShown(messages.length);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    let t = 300;
    messages.forEach((_, i) => {
      timers.push(setTimeout(() => setTyping(true), t));
      t += 1100;
      timers.push(
        setTimeout(() => {
          setTyping(false);
          setShown(i + 1);
        }, t),
      );
      t += 700;
    });
    return () => timers.forEach(clearTimeout);
  }, [inView, reduce]);

  const nextFrom = messages[shown]?.from;

  return (
    <section aria-labelledby="chat-title" className="relative overflow-hidden py-20 sm:py-28">
      <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="eyebrow">Da leitura para a conversa</p>
          <h2 id="chat-title" className="mt-5 text-4xl font-medium sm:text-5xl">
            Às vezes, falta só <em className="italic-accent">uma forma de começar.</em>
          </h2>
          <p className="mt-6 text-lg">
            O e-book traz exemplos de mensagens para diferentes situações. Você adapta as palavras ao seu jeito e ao contexto, sem precisar decorar um roteiro.
          </p>
          <p className="mt-4 text-lg text-muted">
            Neste exemplo, a conversa começa a partir de um interesse em comum, com uma pergunta simples e espaço para a outra pessoa responder.
          </p>
        </Reveal>

        <Reveal delay={0.1} y={40}>
          <div ref={ref} className="relative mx-auto max-w-md" aria-label="Demonstração de conversa">
            <div aria-hidden="true" className="absolute -inset-6 -z-10 rotate-3 rounded-[2.5rem] bg-sage" />
            <div className="overflow-hidden rounded-[2rem] bg-white shadow-soft ring-1 ring-forest/10">
              <div className="flex items-center gap-3 bg-forest px-5 py-4 text-ivory">
                <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ivory/15 font-serif text-lg">
                  ♪
                </span>
                <div>
                  <p className="font-serif text-lg font-semibold leading-tight">Uma conversa possível</p>
                  <p className="text-sm text-ivory/75">A partir de um gosto em comum</p>
                </div>
              </div>

              <div className="paper-grain flex min-h-[360px] flex-col gap-3 bg-cream/60 p-5 sm:p-6">
                <AnimatePresence initial={false}>
                  {messages.slice(0, shown).map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 14, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-[1.02rem] leading-snug shadow-sm ${
                        m.from === 'me' ? 'self-end rounded-br-md bg-forest text-ivory' : 'self-start rounded-bl-md bg-white text-ink ring-1 ring-forest/10'
                      }`}
                    >
                      {m.text}
                    </motion.div>
                  ))}
                  {typing && (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`flex gap-1.5 rounded-2xl px-4 py-4 ${nextFrom === 'me' ? 'self-end bg-forest/80' : 'self-start bg-white ring-1 ring-forest/10'}`}
                      aria-hidden="true"
                    >
                      {[0, 1, 2].map((d) => (
                        <span
                          key={d}
                          className={`typing-dot h-2 w-2 rounded-full ${nextFrom === 'me' ? 'bg-ivory' : 'bg-forest'}`}
                          style={{ animationDelay: `${d * 0.15}s` }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {shown === messages.length && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-auto pt-4 text-center font-serif text-lg italic text-forest"
                  >
                    Sem resposta pronta para tudo. Com espaço para uma troca.
                  </motion.p>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
