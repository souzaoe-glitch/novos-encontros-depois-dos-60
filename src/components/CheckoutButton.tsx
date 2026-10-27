'use client';

import { getCheckoutUrl, formatPrice } from '@/config/site';
import { useToast } from './Providers';
import { trackInitiateCheckout } from './FacebookPixel';

type Props = {
  className?: string;
  children?: React.ReactNode;
};

/**
 * Botão de compra. Usa o checkoutUrl de src/config/site.ts.
 * Sem URL válida: apenas mostra o aviso, sem enviar dados.
 */
export default function CheckoutButton({ className = 'btn-primary w-full sm:w-auto', children }: Props) {
  const { notify } = useToast();

  function handleClick() {
    trackInitiateCheckout();
    const url = getCheckoutUrl();
    if (!url) {
      notify('As vendas ainda não estão disponíveis. Volte em breve.');
      return;
    }
    window.location.assign(url);
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children ?? (
        <>
          Quero meu e-book por {formatPrice()} <span aria-hidden="true">→</span>
        </>
      )}
    </button>
  );
}
