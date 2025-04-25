import { CSSProperties } from "react";
import { colors, typography, spacing } from "../appStyles";

export const heroSectionStyles: Record<string, CSSProperties> = {
  heroSection: {
    minHeight: "90vh",
    paddingTop: "calc(70px + " + spacing["4xl"] + ")",
    paddingBottom: spacing["2xl"],
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    overflowX: "hidden",
    width: "100%",
    maxWidth: "100%",
    position: "relative",
  },

  heroContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    opacity: 0, // Inicialmente invisível para animação
  },

  heroTitle: {
    fontSize: typography.fontSizes["3xl"],
    fontWeight: typography.fontWeights.bold,
    textAlign: "center",
    maxWidth: "48rem",
    color: colors.dark,
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
    marginBottom: spacing.lg,
    fontFamily: "'Geist', sans-serif",
  },

  heroTitleHighlight: {
    color: colors.primary,
    position: "relative",
    display: "inline-block",
  },

  heroTitleUnderline: {
    position: "absolute",
    bottom: "-5px",
    left: "0",
    width: "100%",
    height: "8px",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: "4px",
    zIndex: -1,
  },

  heroDescription: {
    color: colors.gray,
    textAlign: "center",
    marginTop: spacing.md,
    marginBottom: spacing.xl,
    maxWidth: "36rem",
    fontSize: typography.fontSizes.lg,
    lineHeight: 1.6,
    fontWeight: typography.fontWeights.normal,
    letterSpacing: "-0.01em",
  },

  heroBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    opacity: 0.5,
    backgroundImage:
      "radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
  },

  heroActions: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.md,
    width: "100%",
    maxWidth: "28rem",
    marginBottom: spacing["2xl"],
  },

  heroFeatures: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.md,
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
    width: "100%",
    maxWidth: "28rem",
  },

  heroFeatureItem: {
    display: "flex",
    alignItems: "center",
    gap: spacing.sm,
    fontSize: typography.fontSizes.sm,
    color: colors.gray,
  },

  heroFeatureIcon: {
    color: colors.primary,
  },

  scrollIndicator: {
    position: "absolute",
    bottom: spacing.xl,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: spacing.sm,
    opacity: 0,
    cursor: "pointer",
  },

  scrollIndicatorText: {
    fontSize: typography.fontSizes.xs,
    color: colors.gray,
    fontWeight: typography.fontWeights.medium,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },

  scrollIndicatorIcon: {
    width: "24px",
    height: "24px",
    color: colors.gray,
  },

  mockupsContainer: {
    marginTop: spacing.xl,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    position: "relative",
  },
};

// Estilos para media queries
export const heroSectionMediaStyles = {
  sm: {
    heroTitle: {
      fontSize: typography.fontSizes["4xl"],
    },
    heroActions: {
      flexDirection: "row" as const,
      justifyContent: "center",
    },
    heroFeatures: {
      flexDirection: "row" as const,
      justifyContent: "space-between",
      maxWidth: "36rem",
    },
  },
  md: {
    heroSection: {
      minHeight: "100vh",
      paddingTop: "calc(70px + " + spacing["4xl"] + ")",
    },
    heroTitle: {
      fontSize: typography.fontSizes["5xl"],
      maxWidth: "56rem",
    },
    heroDescription: {
      fontSize: typography.fontSizes.xl,
      maxWidth: "42rem",
    },
  },
  lg: {
    heroTitle: {
      fontSize: "4.5rem", // Tamanho maior para desktop
      letterSpacing: "-0.03em",
    },
    heroDescription: {
      fontSize: "1.35rem",
    },
  },
};

export default heroSectionStyles;
