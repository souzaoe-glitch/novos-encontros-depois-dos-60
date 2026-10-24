import Reveal from './Reveal';

const items = [
  {
    title: 'Exemplos para adaptar',
    text: 'Mensagens curtas que você ajusta ao seu jeito.',
    icon: (
      <path d="M4 5h16v10H8l-4 4V5Zm4 4h8M8 12h5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: 'Cuidados com a segurança',
    text: 'Privacidade, sinais de alerta e preparação para encontros.',
    icon: (
      <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Zm-3 9 2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: 'Leitura no seu ritmo',
    text: 'Para ler aos poucos e voltar sempre que precisar.',
    icon: (
      <path d="M12 6c-2-1.5-5-2-8-2v14c3 0 6 .5 8 2 2-1.5 5-2 8-2V4c-3 0-6 .5-8 2Zm0 0v14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
];

export default function Highlights() {
  return (
    <div className="relative bg-forest text-ivory">
      <div className="container-site grid gap-8 py-10 sm:grid-cols-3 sm:gap-6 sm:py-12">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.1} className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ivory/10 text-terracotta-light ring-1 ring-ivory/20">
              <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                {it.icon}
              </svg>
            </span>
            <div>
              <p className="font-serif text-xl font-semibold">{it.title}</p>
              <p className="mt-1 text-[1rem] text-ivory/80">{it.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
