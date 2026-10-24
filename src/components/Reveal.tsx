'use client';

import { motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
  as?: 'div' | 'li' | 'article' | 'figure';
};

/** Entrada suave ao rolar. Com movimento reduzido, só faz fade. */
export default function Reveal({ children, delay = 0, y = 28, x = 0, className, as = 'div' }: Props) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}
