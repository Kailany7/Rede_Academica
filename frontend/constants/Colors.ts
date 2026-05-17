export const Colors = {
  background: '#BDD8E9',      // azul claro (fundo principal)
  surface: '#FFFFFF',         // branco (cards)
  subtleBlock: '#E8F2F7',     // azul muito claro (elementos muted)
  
  primary: '#0A4174',         // azul escuro (botões primários, logo)
  secondary: '#7BBDE8',       // azul céu (elementos secundários)
  accent: '#4E8EA2',          // azul médio (accent)
  
  text: '#001D39',            // azul muito escuro (textos principais)
  textMuted: '#49769F',       // azul acinzentado (textos secundários)
  
  error: '#d4183d',           // vermelho (botão de sair/deletar/erros)

  // variações de azul para o icon, a depender da primeira letra do nome do usuário
  avatarPalette: [
    '#0A4174', // azul escuro
    '#49769F', // azul médio
    '#4E8EA2', // azul turquesa
    '#6EA2B3', // azul claro
    '#7BBDE8', // azul céu
  ]
};

export const Typography = {
  size: {
    small: 12,
    regular: 14,
    medium: 16,
    title: 20,
    heading: 24,
  },
  weight: {
    regular: '400' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};