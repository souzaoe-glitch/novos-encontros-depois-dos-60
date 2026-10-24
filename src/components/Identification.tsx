import Image from 'next/image';
import Reveal from './Reveal';
import { situations } from '@/content/content';

export default function Identification() {
  return (
    <section aria-labelledby="ident-title" className="relative py-20 sm:py-28">
      <div className="container-site grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* Foto */}
        <Reveal x={-30} y={0} className="relative lg:sticky lg:top-28">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="relative">
              <div aria-hidden="true" className="absolute -bottom-5 -right-5 h-full w-full rounded-[2rem] bg-terracotta-pale" />
              <div className="relative overflow-hidden rounded-[2rem] shadow-soft">
                <Image
                  src="/images/02_mulher_com_celular.webp"
                  alt="Mulher madura de cabelos grisalhos sorrindo enquanto lê uma mensagem no celular, sentada em casa."
                  width={1122}
                  height={1402}
                  sizes="(min-width: 1024px) 460px, (min-width: 640px) 448px, 100vw"
                  className="h-auto w-full"
                />
                <span className="absolute bottom-4 left-4 right-4 rounded-2xl bg-forest/90 px-5 py-3 font-serif text-lg text-ivory backdrop-blur sm:right-auto">
                  Seu jeito. Sua história. <em className="text-terracotta-light">Seu tempo.</em>
                </span>
              </div>
            </div>
            <p className="mt-8 text-sm text-muted">Imagem ilustrativa.</p>
          </div>
        </Reveal>

        {/* Texto */}
        <div>
          <Reveal>
            <p className="eyebrow">Para quem quer recomeçar</p>
            <h2 id="ident-title" className="mt-5 text-4xl font-medium sm:text-5xl">
              Você não precisa ter todas as respostas <em className="italic-accent">para começar.</em>
            </h2>
            <p className="mt-6 text-lg">
              É possível ter vontade de conhecer alguém e, ao mesmo tempo, não saber como puxar assunto, onde encontrar pessoas ou até onde confiar. Talvez alguma destas situações seja familiar:
            </p>
          </Reveal>

          <ul className="mt-10 space-y-4">
            {situations.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.06}>
                <div className="group flex gap-5 rounded-2xl border border-forest/10 bg-white/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-terracotta/40 hover:bg-white hover:shadow-card sm:p-6">
                  <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-terracotta-pale font-serif text-base font-semibold text-terracotta transition-colors group-hover:bg-terracotta group-hover:text-ivory">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-semibold leading-snug sm:text-[1.35rem]">{s.title}</h3>
                    <p className="mt-1.5 text-muted">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-10 rounded-2xl border-l-4 border-terracotta bg-sage p-6 sm:p-7">
            <p className="text-lg">
              O guia foi pensado para ajudar você a <strong className="text-forest">organizar essas dúvidas</strong> e escolher os próximos passos com mais clareza. Você pode buscar amizade, companhia ou namoro. Não existe uma única forma de viver essa fase.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
