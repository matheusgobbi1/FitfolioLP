import { CSSProperties } from "react";
import { colors, typography, spacing } from "../appStyles";

export const footerSectionStyles: Record<string, CSSProperties> = {
  footer: {
    paddingTop: spacing["3xl"],
    paddingBottom: spacing["3xl"],
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
    textAlign: "center",
    borderTop: `1px solid ${colors.grayLight}`,
    backgroundColor: colors.secondaryDark,
    position: "relative",
    overflow: "hidden",
  },

  footerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: spacing.xl,
    position: "relative",
    zIndex: 2,
  },

  footerTitle: {
    fontSize: typography.fontSizes["3xl"],
    fontWeight: typography.fontWeights.bold,
    marginBottom: spacing.lg,
    color: colors.primary,
    letterSpacing: "0.05em",
    position: "relative",
    display: "inline-block",
  },

  footerTitleUnderline: {
    position: "absolute",
    bottom: "-8px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "60px",
    height: "2px",
    backgroundColor: colors.primary,
    borderRadius: "2px",
  },

  footerText: {
    color: colors.gray,
    marginBottom: spacing.lg,
    maxWidth: "600px",
    lineHeight: 1.6,
    fontSize: typography.fontSizes.lg,
  },

  footerLinks: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.xl,
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
    width: "100%",
  },

  footerLinkGroup: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.md,
    alignItems: "center",
  },

  footerLinkTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    color: colors.dark,
    marginBottom: spacing.sm,
  },

  footerLink: {
    color: colors.gray,
    textDecoration: "none",
    transition: "color 0.2s, transform 0.2s",
    fontSize: typography.fontSizes.base,
    padding: spacing.sm,
  },

  footerLinkHover: {
    color: colors.primary,
    transform: "translateY(-2px)",
  },

  socialLinks: {
    display: "flex",
    gap: spacing.lg,
    justifyContent: "center",
    marginTop: spacing.xl,
  },

  socialLink: {
    color: colors.gray,
    transition: "all 0.3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "transparent",
    border: `1px solid ${colors.grayLight}`,
  },

  socialLinkHover: {
    color: colors.light,
    backgroundColor: colors.primary,
    transform: "translateY(-3px)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    border: `1px solid ${colors.primary}`,
  },

  footerBottom: {
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTop: `1px solid ${colors.grayLight}`,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: spacing.md,
  },

  footerCopyright: {
    color: colors.gray,
    fontSize: typography.fontSizes.sm,
  },

  footerNav: {
    display: "flex",
    gap: spacing.lg,
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: spacing.lg,
  },

  footerNavLink: {
    color: colors.gray,
    textDecoration: "none",
    fontSize: typography.fontSizes.sm,
    transition: "color 0.2s",
    padding: `${spacing.xs} ${spacing.sm}`,
  },

  footerNavLinkHover: {
    color: colors.primary,
  },

  newsletterContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: spacing.md,
    width: "100%",
    maxWidth: "500px",
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },

  newsletterTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.semibold,
    color: colors.dark,
    marginBottom: spacing.sm,
  },

  newsletterText: {
    color: colors.gray,
    fontSize: typography.fontSizes.base,
    marginBottom: spacing.md,
    textAlign: "center",
  },

  newsletterForm: {
    display: "flex",
    width: "100%",
    gap: spacing.sm,
    flexDirection: "column",
  },

  newsletterInput: {
    padding: `${spacing.md} ${spacing.lg}`,
    borderRadius: "8px",
    border: `2px solid ${colors.primary}`,
    fontSize: typography.fontSizes.base,
    width: "100%",
    outline: "none",
    transition: "all 0.3s ease",
    boxShadow: "2px 2px 0px 0px rgba(0, 0, 0, 0.8)",
    fontFamily: "'Geist', sans-serif",
  },

  newsletterInputFocus: {
    borderColor: colors.primary,
    outline: "none",
    transform: "translateY(-2px)",
    boxShadow: "3px 3px 0px 0px rgba(0, 0, 0, 0.8)",
  },

  newsletterButton: {
    backgroundColor: colors.primary,
    color: colors.light,
    border: "none",
    borderRadius: "8px",
    padding: `${spacing.md} ${spacing.lg}`,
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.medium,
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "2px 2px 0px 0px rgba(0, 0, 0, 0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    minWidth: "140px",
  },

  newsletterButtonHover: {
    transform: "translateY(-2px)",
    boxShadow: "3px 3px 0px 0px rgba(0, 0, 0, 0.8)",
  },

  newsletterStatus: {
    marginTop: spacing.md,
    display: "flex",
    alignItems: "center",
    gap: spacing.sm,
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
  },

  newsletterStatusSuccess: {
    color: colors.success,
  },

  newsletterStatusError: {
    color: colors.error,
  },

  footerDecoration: {
    position: "absolute",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    background: `radial-gradient(circle, ${colors.grayLight} 0%, transparent 70%)`,
    opacity: 0.5,
    zIndex: 1,
  },

  footerDecorationLeft: {
    left: "-100px",
    bottom: "-100px",
  },

  footerDecorationRight: {
    right: "-100px",
    top: "-100px",
  },

  // Animações com transições em vez de keyframes
  footerAnimated: {
    transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
  },

  footerTitleAnimated: {
    transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
  },

  footerContentAnimated: {
    transition: "opacity 1s ease-out, transform 1s ease-out",
    transitionDelay: "0.2s",
  },

  footerBottomAnimated: {
    transition: "opacity 1.2s ease-out, transform 1.2s ease-out",
    transitionDelay: "0.4s",
  },

  backToTopButton: {
    position: "absolute",
    right: spacing.xl,
    bottom: spacing.xl,
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: colors.primary,
    color: colors.light,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s, background-color 0.3s",
    zIndex: 10,
  },

  backToTopButtonHover: {
    transform: "translateY(-3px)",
    backgroundColor: colors.primaryDark,
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
  },
};

// Estilos para media queries
export const footerSectionMediaStyles = {
  sm: {
    footerLinks: {
      flexDirection: "row" as const,
      justifyContent: "space-around",
    },
    newsletterForm: {
      flexDirection: "row" as const,
      alignItems: "flex-start",
      gap: spacing.md,
    },
    newsletterInput: {
      flex: "1",
      marginBottom: 0,
    },
  },
  md: {
    footerBottom: {
      flexDirection: "row" as const,
      justifyContent: "space-between",
    },
    footer: {
      paddingLeft: spacing.xl,
      paddingRight: spacing.xl,
    },
    newsletterTitle: {
      fontSize: typography.fontSizes["2xl"],
    },
    newsletterText: {
      fontSize: typography.fontSizes.lg,
    },
    newsletterForm: {
      gap: spacing.lg,
    },
  },
  lg: {
    footer: {
      paddingLeft: spacing["2xl"],
      paddingRight: spacing["2xl"],
    },
  },
};

export default footerSectionStyles;
