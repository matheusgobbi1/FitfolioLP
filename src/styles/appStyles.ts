import { CSSProperties } from "react";

// Paleta de cores
export const colors = {
  primary: "#000000", // Preto
  primaryDark: "#111827",
  primaryLight: "#4B5563",
  secondary: "#FFFFFF", // Branco
  secondaryDark: "#F3F4F6",
  dark: "#111827",
  light: "#FFFFFF",
  gray: "#6B7280",
  grayLight: "#E5E7EB",
  success: "#10B981",
  error: "#EF4444",
  warning: "#F59E0B",
  background: "#FFFFFF",
};

// Tipografia
export const typography = {
  fontFamily:
    "'Geist', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  titleFontFamily: "'Anton', sans-serif",
  serifFontFamily: "'Playfair Display', Georgia, serif",
  italicFontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

// Espaçamento
export const spacing = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
  "3xl": "4rem",
  "4xl": "6rem",
};

// Breakpoints
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
};

// Estilos globais
export const appStyles: Record<string, CSSProperties> = {
  appContainer: {
    minHeight: "100vh",
    width: "100%",
    maxWidth: "100%",
    overflowX: "visible",
    backgroundColor: colors.background,
    color: colors.dark,
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSizes.base,
    lineHeight: 1.5,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    position: "relative",
  },
};

export default appStyles;
