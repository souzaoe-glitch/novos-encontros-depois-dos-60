'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { formatPrice } from '@/config/site';

/**
 * Barra fixa no celular. Aparece após o topo da página e some
 * quando a oferta ou o rodapé estão visíveis, para não cobrir nada.
 */
export default function MobileStickyCTA() {
  const [pastHero, setPastHero] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const targets = ['oferta', 'site-footer'].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        setHidden(visible.size > 0);
      },
      { threshold: 0.05 },
    );
    targets.forEach((t) => io.observe(t));
    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  const show = pastHero && !hidden;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          id="mobile-cta"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-forest/10 bg-ivory/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-10px_30px_-15px_rgba(23,53,44,0.4)] backdrop-blur-md md:hidden"
        >
          <div className="mx-auto flex max-w-md items-center justify-between gap-3">
            <div className="leading-tight">
              <p className="text-sm text-muted">E-book completo · PDF</p>
              <p className="font-serif text-2xl font-semibold text-forest">{formatPrice()}</p>
            </div>
            <a href="#oferta" className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-forest px-6 font-bold text-ivory transition active:scale-95">
              Quero meu guia <span aria-hidden="true">→</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
