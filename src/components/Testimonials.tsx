import Reveal from './Reveal';
import { getApprovedTestimonials } from '@/config/site';

/**
 * Depoimentos REAIS. Fica totalmente oculto (não renderiza nada)
 * enquanto não houver itens aprovados em siteConfig.testimonials.
 */
export default function Testimonials() {
  const items = getApprovedTestimonials();
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="testimonials-title" className="bg-sage py-20 sm:py-28">
      <div className="container-site">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Experiências de leitores</p>
          <h2 id="testimonials-title" className="mt-5 text-4xl font-medium sm:text-5xl">
            O que leitores <em className="italic-accent">compartilham.</em>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <Reveal as="figure" key={i} delay={i * 0.08} className="rounded-3xl bg-ivory p-7 shadow-card">
              <blockquote className="font-serif text-xl leading-relaxed text-forest">“{t.quote}”</blockquote>
              <figcaption className="mt-5 font-bold text-terracotta">{t.name}</figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
