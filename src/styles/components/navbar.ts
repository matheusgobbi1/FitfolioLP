import { CSSProperties } from "react";
import { colors, typography, spacing } from "../appStyles";

// Keyframes para animações
const navbarKeyframes = `
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  
  @keyframes floatIn {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Adicionar keyframe ao cabeçalho
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = navbarKeyframes;
  document.head.appendChild(style);
}

export const navbarStyles: Record<string, CSSProperties> = {
  navbar: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
    padding: `${spacing.sm} ${spacing.md}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "60px",
    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    color: colors.primary,
    borderRadius: 0,
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "100%",
  },

  navbarScrolled: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(15px)",
    WebkitBackdropFilter: "blur(15px)",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
  },

  navbarHidden: {
    transform: "translateY(-100%)",
    opacity: 0,
    pointerEvents: "none" as const,
    transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
  },

  navbarVisible: {
    transform: "translateY(0)",
    opacity: 1,
    transition:
      "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  },

  navbarLogo: {
    position: "fixed" as const,
    top: spacing.lg,
    left: spacing.xl,
    zIndex: 1001,
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.primary,
    textDecoration: "none",
    letterSpacing: "0.05em",
    display: "flex",
    alignItems: "center",
    gap: spacing.sm,
    transition: "all 0.3s ease",
    backgroundColor: "transparent",
    backdropFilter: "none",
    WebkitBackdropFilter: "none",
    padding: `${spacing.xs} ${spacing.md}`,
    borderRadius: "25px",
    boxShadow: "none",
  },

  navbarLogoText: {
    display: "inline-block",
    position: "relative",
    color: "#000",
    textDecoration: "none",
    borderBottom: "none",
    borderColor: "transparent",
    border: "none",
  },

  navbarLogoHighlight: {
    position: "relative",
    color: "#000",
    borderBottom: "none",
    borderColor: "transparent",
    border: "none",
    textDecoration: "none",
  },

  navbarLinks: {
    display: "none",
    gap: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },

  navbarLink: {
    color: colors.primary,
    textDecoration: "none",
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    padding: `${spacing.xs} ${spacing.sm}`,
    borderRadius: "20px",
    transition: "all 0.3s ease",
    position: "relative" as const,
    opacity: 0.7,
  },

  navbarLinkActive: {
    opacity: 1,
    fontWeight: typography.fontWeights.semibold,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },

  navbarLinkHover: {
    opacity: 1,
    transform: "translateY(-1px)",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },

  navbarLinkIndicator: {
    position: "absolute" as const,
    bottom: "-2px",
    left: "0",
    width: "100%",
    height: "2px",
    background: colors.primary,
    transform: "scaleX(0)",
    transformOrigin: "center",
    transition: "transform 0.3s ease",
  },

  navbarLinkIndicatorActive: {
    transform: "scaleX(1)",
  },

  navbarCTA: {
    backgroundColor: colors.primary,
    color: colors.light,
    border: "none",
    borderRadius: "20px",
    padding: `${spacing.xs} ${spacing.lg}`,
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.semibold,
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    marginLeft: spacing.md,
  },

  navbarCTAHover: {
    transform: "translateY(-2px) scale(1.03)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
  },

  navbarCTAIcon: {
    transition: "transform 0.3s ease",
  },

  navbarCTAIconHover: {
    transform: "translateX(3px)",
  },

  navbarMobileToggle: {
    display: "flex",
    background: "transparent",
    border: "none",
    color: colors.primary,
    cursor: "pointer",
    padding: spacing.sm,
    transition: "all 0.3s ease",
    position: "relative" as const,
    width: "40px",
    height: "40px",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    outline: "none",
    zIndex: 1001,
  },

  navbarMobileToggleActive: {
    background: colors.light,
    color: colors.primary,
    position: "fixed" as const,
    top: "10px",
    right: "20px",
    zIndex: 1010,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  navbarMobileMenu: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0,
    pointerEvents: "none" as const,
    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    zIndex: 1005,
    transform: "translateY(30px)",
  },

  navbarMobileMenuOpen: {
    opacity: 1,
    pointerEvents: "auto" as const,
    transform: "translateY(0)",
  },

  navbarMobileContent: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.xl,
    padding: spacing["2xl"],
    width: "100%",
    maxWidth: "500px",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "80px",
    height: "100%",
    overflowY: "auto" as const,
  },

  navbarMobileLink: {
    color: colors.primary,
    textDecoration: "none",
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.medium,
    padding: spacing.md,
    width: "80%",
    textAlign: "center",
    transition: "all 0.3s ease",
    borderBottom: `1px solid ${colors.grayLight}`,
    marginBottom: spacing.lg,
    letterSpacing: "0.05em",
    borderRadius: "10px",
  },

  navbarMobileLinkActive: {
    backgroundColor: `${colors.grayLight}`,
    fontWeight: typography.fontWeights.semibold,
  },

  navbarMobileCTA: {
    backgroundColor: colors.primary,
    color: colors.light,
    border: "none",
    borderRadius: "25px",
    padding: `${spacing.md} ${spacing.lg}`,
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    cursor: "pointer",
    transition: "all 0.3s ease",
    width: "80%",
    maxWidth: "300px",
    marginTop: spacing.lg,
    marginBottom: "100px", // Espaço extra para o botão não ficar coberto pela barra do iPhone
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
    alignSelf: "center",
    letterSpacing: "0.05em",
    position: "relative" as const,
    zIndex: 1006,
  },

  navbarMobileCTAHover: {
    transform: "translateY(-2px) scale(1.02)",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
  },

  navbarFloatingLinksContainer: {
    display: "flex",
    gap: spacing.xs,
    alignItems: "center",
    justifyContent: "center",
  },

  // Estilo simplificado para navbar mobile
  navbarMobile: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "60px",
    padding: `0 ${spacing.md}`,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1000,
    borderRadius: 0,
    maxWidth: "100%",
    transform: "none",
  },

  navbarMobileHidden: {
    transform: "translateY(-100%)",
    opacity: 0,
    pointerEvents: "none" as const,
    transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
  },

  navbarMobileVisible: {
    transform: "translateY(0)",
    opacity: 1,
    transition:
      "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  },

  navbarLogoMobile: {
    display: "flex",
    alignItems: "center",
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.bold,
    color: colors.primary,
    textDecoration: "none",
    letterSpacing: "0.05em",
    gap: spacing.xs,
    backgroundColor: "transparent",
    boxShadow: "none",
    padding: 0,
    borderRadius: 0,
    position: "static" as const,
  },
};

// Estilos para media queries
export const navbarMediaStyles = {
  sm: {
    // Estilos específicos para mobile - sem flutuação
    navbar: {
      ...navbarStyles.navbarMobile,
    },
    navbarLogo: {
      ...navbarStyles.navbarLogoMobile,
    },
    navbarHidden: {
      ...navbarStyles.navbarMobileHidden,
    },
    navbarVisible: {
      ...navbarStyles.navbarMobileVisible,
    },
    navbarFloatingLinksContainer: {
      display: "none",
    },
  },
  md: {
    // Desktop - com navbar flutuante
    navbarMobileToggle: {
      display: "none",
    },
    navbarLinks: {
      display: "flex",
    },
    navbar: {
      top: "30px",
      left: "50%",
      transform: "translateX(-50%)",
      padding: `${spacing.sm} ${spacing.md}`,
      width: "auto",
      maxWidth: "680px",
      borderRadius: "30px",
      justifyContent: "center",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    navbarHidden: {
      opacity: 0,
      transform: "translate(-50%, -100px)",
      pointerEvents: "none" as const,
      transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
    },
    navbarVisible: {
      opacity: 1,
      transform: "translate(-50%, 0)",
      transition:
        "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    },
    navbarLogo: {
      position: "fixed" as const,
      top: spacing.lg,
      left: spacing.xl,
      backgroundColor: "transparent",
      borderRadius: "25px",
      padding: `${spacing.xs} ${spacing.md}`,
      boxShadow: "none",
    },
    navbarFloatingLinksContainer: {
      display: "flex",
      gap: spacing.xs,
    },
    navbarLink: {
      fontSize: typography.fontSizes.xs,
      padding: `${spacing.xs} ${spacing.xs}`,
    },
    navbarCTA: {
      padding: `${spacing.xs} ${spacing.sm}`,
      fontSize: typography.fontSizes.xs,
      marginLeft: spacing.xs,
    },
  },
  lg: {
    navbarLinks: {
      gap: spacing.sm,
    },
    navbar: {
      padding: `${spacing.sm} ${spacing.md}`,
      minWidth: "610px",
      maxWidth: "450px",
    },
    navbarFloatingLinksContainer: {
      gap: spacing.sm,
    },
    navbarLink: {
      fontSize: typography.fontSizes.sm,
      padding: `${spacing.xs} ${spacing.xs}`,
    },
    navbarCTA: {
      padding: `${spacing.xs} ${spacing.md}`,
      fontSize: typography.fontSizes.sm,
      marginLeft: spacing.sm,
    },
  },
};

export default navbarStyles;
