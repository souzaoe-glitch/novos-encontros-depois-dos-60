import Reveal from './Reveal';

export default function Refund() {
  return (
    <section aria-labelledby="refund-title" className="pb-20 sm:pb-28">
      <div className="container-site">
        <Reveal>
          <div className="grid items-center gap-8 rounded-[2rem] border border-forest/15 bg-white/60 p-7 sm:grid-cols-[auto_1fr] sm:gap-12 sm:p-12">
            <div className="relative mx-auto flex h-36 w-36 items-center justify-center sm:mx-0" aria-hidden="true">
              <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full animate-[spin_40s_linear_infinite] text-terracotta">
                <defs>
                  <path id="circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
                </defs>
                <text fontSize="10.5" letterSpacing="3" fill="currentColor" fontWeight="700">
                  <textPath href="#circle">DIREITO DE ARREPENDIMENTO · CDC ART. 49 ·</textPath>
                </text>
              </svg>
              <span className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-forest text-ivory">
                <span className="font-serif text-4xl font-semibold leading-none">7</span>
                <span className="text-sm font-bold uppercase tracking-widest">dias</span>
              </span>
            </div>
            <div>
              <p className="eyebrow">Escolha com tranquilidade</p>
              <h2 id="refund-title" className="mt-4 text-3xl font-medium sm:text-4xl">
                Seu direito de arrependimento <em className="italic-accent">será respeitado.</em>
              </h2>
              <p className="mt-4 text-lg">
                Nas compras pela internet, você pode solicitar o cancelamento e o reembolso dentro do prazo legal de 7 dias, conforme o artigo 49 do Código de Defesa do Consumidor. Use o canal informado na confirmação da compra ou o atendimento do vendedor.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
