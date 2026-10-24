import Reveal from './Reveal';
import { LeafMark } from './Header';
import { formatPrice } from '@/config/site';

export default function FinalCTA() {
  return (
    <section aria-labelledby="final-title" className="relative overflow-hidden bg-forest-deep py-24 text-ivory sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-forest-soft/40 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-10 bottom-0 text-ivory/5">
        <LeafMark className="h-[22rem] w-[22rem]" />
      </div>
      <div className="container-site relative text-center">
        <Reveal>
          <p className="eyebrow justify-center text-terracotta-light before:bg-terracotta-light">No seu jeito, no seu tempo</p>
          <h2 id="final-title" className="mx-auto mt-6 max-w-3xl text-4xl font-medium text-ivory sm:text-6xl">
            Uma nova conversa pode ser <em className="font-serif italic text-terracotta-light">um bom começo.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-ivory/85 sm:text-xl">
            Não é preciso decidir tudo hoje. Pequenos passos, dados no seu ritmo, já contam. Leve um guia para consultar enquanto descobre o que deseja viver daqui para a frente.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <a href="#oferta" className="btn-cream w-full sm:w-auto">
              Quero conhecer o guia completo <span aria-hidden="true">→</span>
            </a>
            <p className="text-ivory/75">E-book digital · 30 páginas · {formatPrice()} · Pagamento único</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
