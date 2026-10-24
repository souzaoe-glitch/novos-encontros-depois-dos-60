import Reveal from './Reveal';
import { benefits } from '@/content/content';

const icons = [
  // bússola
  <path key="a" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm3.5-12.5-2 5-5 2 2-5 5-2Z" />,
  // balão
  <path key="b" d="M4 5h16v10H8l-4 4V5Z" />,
  // lápis
  <path key="c" d="m4 20 4-1 11-11-3-3L5 16l-1 4Zm10-13 3 3" />,
  // coração (respeito)
  <path key="d" d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />,
  // cadeado
  <path key="e" d="M6 11h12v9H6v-9Zm2 0V8a4 4 0 1 1 8 0v3m-4 4v2" />,
];

export default function Benefits() {
  return (
    <section aria-labelledby="benefits-title" className="relative overflow-hidden bg-sage py-20 sm:py-28">
      <div aria-hidden="true" className="paper-grain pointer-events-none absolute inset-0 opacity-50" />
      <div className="container-site relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">O que o guia ajuda você a fazer</p>
          <h2 id="benefits-title" className="mt-5 text-4xl font-medium sm:text-5xl">
            Mais clareza para dar <em className="italic-accent">o próximo passo.</em>
          </h2>
          <p className="mt-5 text-lg text-muted">Benefícios que saem diretamente do conteúdo do e-book, sem fórmulas mágicas.</p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {benefits.map((b, i) => (
            <Reveal
              key={b.title}
              delay={i * 0.08}
              className={`${i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'} ${i === 4 ? 'sm:col-span-2 lg:col-span-3' : ''}`}
            >
              <div className="group h-full rounded-3xl bg-ivory p-7 shadow-card ring-1 ring-forest/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-soft sm:p-8">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-forest text-ivory transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-105">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {icons[i]}
                  </svg>
                </span>
                <h3 className="mt-6 text-2xl font-semibold">{b.title}</h3>
                <p className="mt-3 text-muted">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
