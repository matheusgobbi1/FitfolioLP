import { CSSProperties } from "react";
import { colors, typography, spacing } from "../appStyles";

export const buttonStyles: Record<string, CSSProperties> = {
  btnPrimary: {
    backgroundColor: colors.primary,
    color: colors.light,
    padding: `${spacing.sm} ${spacing["2xl"]}`,
    borderRadius: "0.5rem",
    border: "2px solid transparent",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "140px",
    fontWeight: typography.fontWeights.semibold,
    fontSize: typography.fontSizes.base,
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "visible",
    letterSpacing: "0.01em",
    textTransform: "none",
    fontFamily: "'Geist', sans-serif",
    textAlign: "center",
    whiteSpace: "nowrap",
  },

  btnPrimaryHover: {
    transform: "translateY(-2px)",
  },

  btnPrimaryDisabled: {
    backgroundColor: colors.grayLight,
    color: colors.gray,
    cursor: "not-allowed",
    transform: "none",
    opacity: 0.7,
  },

  // Botão secundário
  btnSecondary: {
    backgroundColor: "transparent",
    color: colors.primary,
    padding: `${spacing.sm} ${spacing["2xl"]}`,
    borderRadius: "0.5rem",
    border: `2px solid ${colors.primary}`,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "140px",
    fontWeight: typography.fontWeights.semibold,
    fontSize: typography.fontSizes.base,
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "visible",
    letterSpacing: "0.01em",
    textTransform: "none",
    fontFamily: "'Geist', sans-serif",
    textAlign: "center",
    whiteSpace: "nowrap",
  },

  btnSecondaryHover: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    transform: "translateY(-2px)",
  },

  btnSecondaryDisabled: {
    borderColor: colors.grayLight,
    color: colors.gray,
    cursor: "not-allowed",
    transform: "none",
    opacity: 0.7,
  },

  // Efeito de ripple para os botões
  btnRipple: {
    position: "absolute",
    borderRadius: "50%",
    transform: "scale(0)",
    animation: "ripple 0.6s linear",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
};

// Estilos para media queries
export const buttonMediaStyles = {
  sm: {
    btnPrimary: {
      fontSize: typography.fontSizes.sm,
      padding: `${spacing.sm} ${spacing.xl}`,
      minWidth: "120px",
      width: "100%",
    },
    btnSecondary: {
      fontSize: typography.fontSizes.sm,
      padding: `${spacing.sm} ${spacing.xl}`,
      minWidth: "120px",
      width: "100%",
    },
  },
  md: {
    btnPrimary: {
      fontSize: typography.fontSizes.base,
      padding: `${spacing.sm} ${spacing["2xl"]}`,
      minWidth: "140px",
    },
    btnSecondary: {
      fontSize: typography.fontSizes.base,
      padding: `${spacing.sm} ${spacing["2xl"]}`,
      minWidth: "140px",
    },
  },
  lg: {
    btnPrimary: {
      fontSize: typography.fontSizes.lg,
      padding: `${spacing.md} ${spacing["2xl"]}`,
      minWidth: "160px",
    },
    btnSecondary: {
      fontSize: typography.fontSizes.lg,
      padding: `${spacing.md} ${spacing["2xl"]}`,
      minWidth: "160px",
    },
  },
};

export default buttonStyles;
