'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useEffect, useState } from 'react';
import CheckoutButton from './CheckoutButton';

export function LeafMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 44" aria-hidden="true" className={className}>
      <path
        d="M8 39C17 30 22 19 28 5M18 26C6 26 4 18 5 11c10 0 16 7 13 15ZM24 17C22 7 29 3 37 3c1 8-4 15-13 14Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <a href="#inicio" className={`group flex min-h-[44px] items-center gap-2.5 ${light ? 'text-ivory' : 'text-forest'}`} aria-label="Novos Encontros Depois dos 60, voltar ao início">
      <span className={`transition-transform duration-500 group-hover:-rotate-12 ${light ? 'text-terracotta-light' : 'text-terracotta'}`}>
        <LeafMark />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.3rem] font-semibold tracking-tight">Novos Encontros</span>
        <span className={`mt-1 text-[0.68rem] font-bold tracking-[0.28em] ${light ? 'text-ivory/80' : 'text-terracotta'}`}>DEPOIS DOS 60</span>
      </span>
    </a>
  );
}

function FontSizeToggle() {
  const [large, setLarge] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem('ne60-text-large') === '1';
    setLarge(saved);
    document.documentElement.classList.toggle('text-large', saved);
  }, []);

  function toggle() {
    const next = !large;
    setLarge(next);
    document.documentElement.classList.toggle('text-large', next);
    window.localStorage.setItem('ne60-text-large', next ? '1' : '0');
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={large}
      aria-label={large ? 'Voltar o texto ao tamanho padrão' : 'Aumentar o tamanho do texto'}
      title={large ? 'Tamanho padrão' : 'Aumentar texto'}
      className="inline-flex h-12 min-w-[48px] items-center justify-center rounded-full border-2 border-forest/20 px-3 font-serif text-lg font-bold text-forest transition hover:border-forest hover:bg-forest hover:text-ivory aria-pressed:border-forest aria-pressed:bg-forest aria-pressed:text-ivory"
    >
      {large ? 'A−' : 'A+'}
    </button>
  );
}

const links = [
  { href: '#conteudo-do-guia', label: 'O que tem no guia' },
  { href: '#por-dentro', label: 'Veja por dentro' },
  { href: '#duvidas', label: 'Dúvidas' },
];

export default function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24));

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:text-ivory"
      >
        Pular para o conteúdo
      </a>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'border-b border-forest/10 bg-ivory/90 py-2 shadow-[0_8px_30px_-20px_rgba(23,53,44,0.5)] backdrop-blur-md' : 'bg-transparent py-4'
        }`}
      >
        <div className="container-site flex items-center justify-between gap-4">
          <Brand />
          <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="group relative py-2 font-bold text-ink/80 transition hover:text-forest">
                {l.label}
                <span className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-left scale-x-0 bg-terracotta transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <FontSizeToggle />
            <CheckoutButton className="hidden min-h-[48px] items-center gap-2 rounded-full bg-forest px-6 font-bold text-ivory transition hover:-translate-y-0.5 hover:bg-forest-deep sm:inline-flex">
              Comprar agora <span aria-hidden="true">↗</span>
            </CheckoutButton>
          </div>
        </div>
      </motion.header>
    </>
  );
}
