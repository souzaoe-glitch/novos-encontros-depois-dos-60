/**
 * ============================================================
 *  CONFIGURAÇÃO CENTRAL DO SITE — Novos Encontros Depois dos 60
 * ============================================================
 *
 *  Tudo que precisa ser preenchido antes de abrir as vendas fica aqui.
 *  Campos vazios ('') NÃO aparecem no site. Nunca invente dados.
 *
 *  IMPORTANTE: o PDF completo do e-book NUNCA deve ser colocado na
 *  pasta /public. A entrega é feita pela plataforma de pagamento.
 */

export const siteConfig = {
  // ----------------------------------------------------------
  // PRODUTO (fatos fixos)
  // ----------------------------------------------------------
  product: {
    name: 'Novos Encontros Depois dos 60',
    subtitle: 'Um guia para conhecer pessoas, conversar com confiança e se abrir para um novo amor.',
    price: 19.9,
    pages: 30,
    format: 'E-book digital em PDF',
  },

  // ----------------------------------------------------------
  // CHECKOUT
  // Cole aqui o link HTTPS da página de pagamento (Kirvano, Hotmart etc.).
  // Todos os botões de compra usam este único endereço.
  // Enquanto estiver vazio, o botão mostra:
  // "As vendas ainda não estão disponíveis. Volte em breve."
  // ----------------------------------------------------------
  checkoutUrl: '',

  // ----------------------------------------------------------
  // ENTREGA
  // Texto exibido na oferta e no FAQ sobre como o comprador recebe o e-book.
  // Confirme com a plataforma de pagamento antes de ativar as vendas.
  // ----------------------------------------------------------
  deliveryText:
    'O e-book é digital. As instruções para acessar o arquivo são enviadas pela plataforma de pagamento na confirmação da compra.',

  // ----------------------------------------------------------
  // ATENDIMENTO E VENDEDOR (preencha somente com dados reais)
  // ----------------------------------------------------------
  supportEmail: '',
  supportWhatsapp: '', // Só dígitos, com código do país. Ex.: 5511999999999
  sellerName: '',
  sellerDocument: '', // CPF ou CNPJ
  sellerAddress: '',
  privacyEmail: '',

  // ----------------------------------------------------------
  // DOMÍNIO (preencha quando o site for publicado, ex.: https://seudominio.com.br)
  // Usado para canonical e imagem de compartilhamento.
  // ----------------------------------------------------------
  siteUrl: '',

  // ----------------------------------------------------------
  // FACEBOOK / META PIXEL
  // Deixe vazio para não carregar nenhum rastreamento.
  // Ao preencher, o site passa a enviar PageView e InitiateCheckout
  // (este último só quando há checkout válido e a pessoa clica em comprar).
  // Purchase NÃO é disparado aqui: depende da compra confirmada na plataforma.
  // Atualize o texto de Privacidade (src/content/content.ts → legal.privacy) antes de ativar.
  // ----------------------------------------------------------
  facebookPixelId: '',

  // ----------------------------------------------------------
  // DEPOIMENTOS
  // Somente relatos REAIS, com autorização de uso. A seção fica oculta
  // enquanto não houver nenhum item com approved: true.
  // Exemplo de formato:
  // { quote: 'Texto exato do relato', name: 'Nome autorizado', approved: true }
  // ----------------------------------------------------------
  testimonials: [] as Testimonial[],
};

export type Testimonial = {
  quote: string;
  name: string;
  approved: boolean;
};

export function formatPrice(value: number = siteConfig.product.price): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/** Aceita apenas URL HTTPS válida e sem credenciais. Retorna '' se inválida. */
export function getCheckoutUrl(): string {
  const raw = (siteConfig.checkoutUrl || '').trim();
  if (!raw) return '';
  try {
    const u = new URL(raw);
    if (u.protocol !== 'https:' || u.username || u.password) return '';
    return u.href;
  } catch {
    return '';
  }
}

export function getWhatsappLink(): string {
  const digits = (siteConfig.supportWhatsapp || '').replace(/\D/g, '');
  return /^\d{10,15}$/.test(digits) ? `https://wa.me/${digits}` : '';
}

export function getApprovedTestimonials(): Testimonial[] {
  return siteConfig.testimonials.filter((t) => t.approved === true && t.quote && t.name);
}
