import { CSSProperties } from "react";
import { colors, typography, spacing } from "../appStyles";

// Keyframes simplificados - removendo animações de fundo
const keyframes = `
@keyframes cardEntrance {
  from {
    opacity: 0;
    transform: translateY(20px) translateZ(0);
  }
  to {
    opacity: 1;
    transform: translateY(0) translateZ(0);
  }
}
`;

// Adicionar keyframe ao cabeçalho
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = keyframes;
  document.head.appendChild(style);
}

export const valuePropositionStyles: Record<string, CSSProperties> = {
  valueProposition: {
    textAlign: "center",
    marginTop: spacing["2xl"],
    marginBottom: spacing["4xl"],
    padding: spacing.xl,
    position: "relative",
    overflow: "hidden",
    willChange: "contents",
  },

  valueTitle: {
    fontSize: "3.5rem",
    fontWeight: typography.fontWeights.bold,
    marginBottom: spacing.lg,
    color: colors.dark,
    maxWidth: "800px",
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: 1.2,
    position: "relative",
    zIndex: 2,
    willChange: "opacity, transform",
  },

  valueDescription: {
    fontSize: typography.fontSizes.lg,
    color: colors.gray,
    marginTop: spacing.md,
    marginBottom: spacing["2xl"],
    maxWidth: "600px",
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: 1.6,
    position: "relative",
    zIndex: 2,
    willChange: "opacity, transform",
  },

  valueCardsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "24px",
    marginTop: spacing["2xl"],
    width: "100%",
    maxWidth: "1200px",
    marginLeft: "auto",
    marginRight: "auto",
    position: "relative",
    zIndex: 2,
    perspective: "1000px",
  },

  valueCard: {
    backgroundColor: colors.light,
    borderRadius: "20px",
    padding: spacing["2xl"],
    boxShadow: "4px 4px 0px 0px rgba(0, 0, 0, 0.8)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    textAlign: "left",
    transition:
      "transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 0.2s ease",
    border: `2px solid #000000`,
    position: "relative",
    overflow: "hidden",
    width: "100%",
    maxWidth: "100%",
    opacity: 1,
    willChange: "transform, opacity",
    backfaceVisibility: "hidden",
    transform: "translateZ(0)",
  },

  valueCardHover: {
    transform: "translateY(-5px) translateZ(0)",
    boxShadow: "6px 6px 0px 0px rgba(0, 0, 0, 0.8)",
  },

  valueCardIcon: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xl,
    transition: "all 0.2s ease",
    color: "#FFFFFF",
    border: "2px solid #000000",
    boxShadow: "3px 3px 0px 0px rgba(0, 0, 0, 0.8)",
    opacity: 1,
    willChange: "transform, opacity",
    transform: "translateZ(0)",
  },

  valueCardTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    marginBottom: spacing.md,
    color: colors.dark,
    overflow: "visible",
    display: "block",
  },

  valueCardDescription: {
    fontSize: typography.fontSizes.base,
    color: colors.gray,
    lineHeight: 1.6,
    overflow: "visible",
  },
};

export const valuePropositionMediaStyles = {
  sm: {
    valueCardsContainer: {
      flexDirection: "column" as const,
      alignItems: "center",
    },
    valueCard: {
      width: "100%",
      maxWidth: "100%",
    },
  },
  md: {
    valueTitle: {
      fontSize: typography.fontSizes["4xl"],
    },
    valueDescription: {
      fontSize: typography.fontSizes.xl,
    },
    valueCardsContainer: {
      flexDirection: "row" as const,
      flexWrap: "wrap" as const,
      justifyContent: "center",
    },
    valueCard: {
      width: "calc(50% - 12px)",
      maxWidth: "calc(50% - 12px)",
    },
  },
  lg: {
    valueTitle: {
      fontSize: "4rem",
      maxWidth: "100%",
      padding: "0 20px",
    },
    valueCardsContainer: {
      flexDirection: "row" as const,
      flexWrap: "nowrap" as const,
      justifyContent: "center",
    },
    valueCard: {
      width: "calc(33.333% - 16px)",
      maxWidth: "calc(33.333% - 16px)",
    },
  },
};

export default valuePropositionStyles;
