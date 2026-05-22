// Cores do app baseadas no design do Figma
const Colors = {
  // Cores principais
  primary: "#0A4174", // Azul escuro (botões, títulos)
  primaryForeground: "#ffffff", // Texto em cima do azul escuro

  // Fundo
  background: "#BDD8E9", // Azul claro (fundo da tela)

  // Card
  card: "#ffffff", // Fundo do card branco
  cardForeground: "#001D39", // Texto dentro do card

  // Texto
  foreground: "#001D39", // Texto principal
  mutedForeground: "#49769F", // Texto secundário (placeholder)

  // Input
  inputBackground: "#ffffff", // Fundo dos campos
  border: "rgba(10, 65, 116, 0.15)", // Borda dos campos

  // Outros
  muted: "#E8F2F7", // Fundo do botão não selecionado
  secondary: "#7BBDE8", // Azul médio
  accent: "#4E8EA2", // Azul accent

  destructive: "#d4183d", // Vermelho para ações destrutivas
};
export const Typography = {
  size: {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
  },

  weight: {
    regular: "400",
    medium: "500",
    bold: "700",
  },
};

export default Colors;
