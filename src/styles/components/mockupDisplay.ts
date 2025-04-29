import { CSSProperties } from "react";

export const mockupDisplayStyles: Record<string, CSSProperties> = {
  mockupsSection: {
    width: "100%",
    maxWidth: "100%",
    position: "relative",
    marginBottom: "10px",
    padding: "80px 0",
    overflow: "visible",
    perspective: "1000px",
    minHeight: "600px",
  },

  mockupContainer: {
    position: "relative",
    width: "100%",
    height: "auto",
    minHeight: "700px",
    marginTop: "10px",
    padding: "80px 0",
    overflow: "visible",
    transformStyle: "preserve-3d",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  mockup: {
    position: "absolute",
    width: "320px",
    willChange: "transform, opacity",
    maxWidth: "none",
    transformOrigin: "center center",
    backfaceVisibility: "hidden",
    boxShadow: "none",
    filter: "none",
    borderRadius: "24px",
    pointerEvents: "none",
  },

  mockup1: {
    left: "35%",
    zIndex: 10,
  },

  mockup2: {
    left: "70%",
  },
};

// Estilos para media queries
export const mockupDisplayMediaStyles = {
  sm: {
    mockupsSection: {
      minHeight: "450px",
      padding: "40px 0",
    },
    mockupContainer: {
      minHeight: "550px",
      padding: "40px 0",
    },
    mockup: {
      width: "230px",
      borderRadius: "18px",
    },
  },
  md: {
    mockupsSection: {
      minHeight: "500px",
      padding: "60px 0",
    },
    mockupContainer: {
      minHeight: "600px",
      padding: "50px 0",
    },
    mockup: {
      width: "280px",
      borderRadius: "20px",
    },
  },
  lg: {
    mockupsSection: {
      minHeight: "550px",
      padding: "80px 0",
    },
    mockupContainer: {
      minHeight: "700px",
      padding: "60px 0",
    },
    mockup: {
      width: "400px",
      borderRadius: "24px",
    },
  },
};

export default mockupDisplayStyles;
