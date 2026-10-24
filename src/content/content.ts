import { siteConfig, formatPrice } from '@/config/site';

const price = formatPrice();

export const parts = [
  {
    n: '01',
    pages: 'Páginas 1 a 5',
    title: 'Confiança para recomeçar',
    text: 'Entender o seu momento, seus desejos, sua história, seus valores e os limites que você quer manter numa relação.',
  },
  {
    n: '02',
    pages: 'Páginas 6 a 10',
    title: 'Onde conhecer pessoas e como se apresentar',
    text: 'Manter a própria vida, conhecer gente presencialmente, escolher ambientes digitais, criar uma apresentação honesta e iniciar conversas.',
  },
  {
    n: '03',
    pages: 'Páginas 11 a 15',
    title: 'Conversas e limites',
    text: 'Perguntas para conversar, escuta, demonstração de interesse, o que fazer quando não há resposta e como estabelecer limites.',
  },
  {
    n: '04',
    pages: 'Páginas 16 a 20',
    title: 'Segurança e preparação',
    text: 'Proteção de dados, sinais de possíveis golpes, cuidados com identidade, o que fazer diante de uma suspeita e como se preparar para um encontro.',
  },
  {
    n: '05',
    pages: 'Páginas 21 a 25',
    title: 'O primeiro encontro',
    text: 'Do convite à chegada, a conversa presencial, carinho, consentimento, autonomia e a relação com a família.',
  },
  {
    n: '06',
    pages: 'Páginas 26 a 30',
    title: 'Próximos passos',
    text: 'Avaliar a experiência, reciprocidade, encerrar com respeito quando for o caso, um plano de pequenos passos e leituras de apoio.',
  },
];

export const situations = [
  {
    title: 'A vontade existe, mas falta o primeiro passo',
    text: 'Você gostaria de conhecer alguém, só não sabe muito bem por onde começar.',
  },
  {
    title: 'O que escrever na primeira mensagem?',
    text: 'Bate a dúvida entre ser simpático demais, formal demais ou simplesmente não enviar.',
  },
  {
    title: 'Se apresentar sem fingir ser outra pessoa',
    text: 'Você quer mostrar quem é hoje, com naturalidade, sem precisar parecer mais jovem.',
  },
  {
    title: 'Conhecer pessoas sem se apressar',
    text: 'Você prefere ir com calma, no seu ritmo, e sem pressão para decidir nada.',
  },
  {
    title: 'Segurança na internet',
    text: 'Você quer conversar on-line com tranquilidade e saber reconhecer quando algo não está certo.',
  },
];

export const benefits = [
  {
    title: 'Clareza sobre o que você deseja',
    text: 'Reflexões para entender o que você quer viver agora: amizade, companhia ou namoro.',
  },
  {
    title: 'Formas simples de começar',
    text: 'Caminhos práticos para puxar assunto, presencialmente ou pela internet.',
  },
  {
    title: 'Mensagens para adaptar',
    text: 'Exemplos curtos que você ajusta ao seu jeito, sem precisar decorar roteiro.',
  },
  {
    title: 'Limites com respeito',
    text: 'Como reconhecer e comunicar seus limites e respeitar os da outra pessoa.',
  },
  {
    title: 'Privacidade e encontros',
    text: 'Cuidados com seus dados, sinais de alerta e uma preparação tranquila para o encontro.',
  },
];

export const samples = [
  {
    src: '/images/04_amostra_perfil_pagina_09.webp',
    page: 9,
    tag: 'Apresentação',
    title: 'Um perfil que tenha a sua cara',
    caption: 'Como escolher a foto e escrever uma apresentação simples e honesta.',
    alt: 'Página 9 do e-book: “Um perfil que tenha a sua cara”, com dicas para a foto e um exemplo de apresentação fictícia.',
  },
  {
    src: '/images/05_amostra_mensagens_pagina_10.webp',
    page: 10,
    tag: 'Conversas',
    title: 'Como puxar assunto sem complicar',
    caption: 'Três exemplos de primeiras mensagens para situações diferentes.',
    alt: 'Página 10 do e-book: “Como puxar assunto sem complicar”, com três exemplos de primeiras mensagens.',
  },
  {
    src: '/images/06_amostra_seguranca_pagina_17.webp',
    page: 17,
    tag: 'Segurança',
    title: 'Quando o afeto vem acompanhado de pressão',
    caption: 'Sinais para interromper a conversa e verificar antes de confiar.',
    alt: 'Página 17 do e-book: “Quando o afeto vem acompanhado de pressão”, com sinais de possíveis golpes.',
  },
];

export const offerItems = [
  `E-book completo com ${siteConfig.product.pages} páginas ilustradas`,
  'Exemplos de mensagens para adaptar ao seu jeito',
  'Perguntas e exercícios de reflexão',
  'Cuidados com privacidade, segurança e encontros',
  'Arquivo PDF para ler no celular, tablet ou computador',
];

export const faq = [
  {
    q: 'É um livro físico?',
    a: 'Não. É um e-book digital em PDF. Não há envio de material impresso para a sua casa.',
  },
  {
    q: 'Quantas páginas tem?',
    a: `São ${siteConfig.product.pages} páginas ilustradas, incluindo a capa e o encerramento, organizadas em seis partes.`,
  },
  {
    q: 'Posso ler pelo celular?',
    a: 'Sim. Você pode abrir o PDF no celular, tablet ou computador com um leitor de PDF. No celular, é só ampliar a página com os dedos quando precisar.',
  },
  {
    q: 'Serve para homens e mulheres?',
    a: 'Sim. As reflexões, exemplos e cuidados podem ser adaptados a diferentes histórias, expectativas e formas de se relacionar.',
  },
  {
    q: 'Faz tempo que não namoro. O material pode me ajudar?',
    a: 'O guia começa com reflexões sobre o seu momento e o recomeço, traz exemplos de conversas e cuidados práticos. Você lê no seu ritmo e usa o que fizer sentido para a sua vida.',
  },
  {
    q: 'O e-book garante que vou encontrar alguém?',
    a: 'Não. É um material educativo, com orientações e exemplos para apoiar suas escolhas. Não garante relacionamento, respostas às mensagens nem resultados em um prazo determinado.',
  },
  {
    q: 'A compra inclui aplicativo ou conversa com pessoas?',
    a: 'Não. Você adquire apenas o e-book em PDF. A compra não inclui aplicativo de relacionamento, acesso a perfis, atendimento por mensagens, mentoria, terapia ou curso em vídeo.',
  },
  {
    q: 'Tem mensalidade?',
    a: `Não. O valor de ${price} corresponde a uma compra única. Não há assinatura nem mensalidade.`,
  },
  {
    q: 'Como recebo o e-book?',
    a: `${siteConfig.deliveryText} Confira seus dados de contato no momento da compra e guarde o comprovante.`,
  },
  {
    q: 'Como peço o cancelamento?',
    a: 'Nas compras pela internet, você tem o direito de arrependimento no prazo legal de 7 dias, conforme o artigo 49 do Código de Defesa do Consumidor. Faça o pedido pelo canal informado na confirmação da compra ou pelo atendimento do vendedor.',
  },
  {
    q: 'O material substitui acompanhamento profissional?',
    a: 'Não. É um conteúdo educativo, com exemplos fictícios e sugestões editoriais. Não substitui apoio psicológico, orientação jurídica ou atendimento de saúde.',
  },
];

export const legal = {
  terms: [
    `Produto: ${siteConfig.product.name}, e-book digital de ${siteConfig.product.pages} páginas em PDF. Valor: ${price}, em pagamento único. Não há assinatura, material físico, acesso a aplicativos ou contato com pessoas incluído.`,
    'A compra é concluída na plataforma de pagamento indicada pelo vendedor. Os meios de pagamento disponíveis são exibidos no checkout.',
    siteConfig.deliveryText,
    'Será respeitado o direito de arrependimento no prazo legal de 7 dias, conforme o artigo 49 do Código de Defesa do Consumidor. O pedido pode ser feito pelo canal informado na confirmação da compra ou pelo atendimento do vendedor.',
    'O conteúdo é educativo, contém exemplos fictícios e sugestões editoriais. Não garante relacionamento ou resultados e não substitui acompanhamento profissional. O material é para uso pessoal; não é permitida a revenda ou redistribuição sem autorização.',
  ],
  privacy: siteConfig.facebookPixelId
    ? [
        'Esta página não possui formulário nem conta de usuário. Para medir o desempenho de anúncios, utilizamos o Meta Pixel, que pode registrar visitas à página e cliques no botão de compra.',
        'Ao acessar um site, o navegador e a hospedagem podem processar informações técnicas necessárias à conexão, como endereço IP e dados de navegação.',
        'Se você comprar ou entrar em contato, os dados fornecidos serão tratados pelos serviços de pagamento ou atendimento utilizados. Consulte também as políticas desses serviços.',
      ]
    : [
        'Esta página não possui formulário, conta de usuário, cookies de publicidade, pixel de rastreamento ou ferramenta de análise de audiência. Os exemplos de conversa são fictícios e não contêm dados de clientes.',
        'Ao acessar um site, o navegador e a hospedagem podem processar informações técnicas necessárias à conexão, como endereço IP e dados de navegação. O tratamento efetivo depende do serviço de hospedagem utilizado.',
        'Se você comprar ou entrar em contato, os dados fornecidos serão tratados pelos serviços de pagamento ou atendimento utilizados. Consulte também as políticas desses serviços. Se forem adicionadas ferramentas de rastreamento, esta informação será atualizada antes da ativação.',
      ],
};
