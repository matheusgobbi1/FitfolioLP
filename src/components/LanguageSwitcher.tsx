import React from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  isMinimal?: boolean;
}

const buttonStyle = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: "5px 10px",
  margin: "0 5px",
  fontSize: "14px",
  fontWeight: 600,
  color: "#333",
  transition: "all 0.3s ease",
  borderBottom: "2px solid transparent",
};

const activeButtonStyle = {
  ...buttonStyle,
  borderBottom: "2px solid #4CAF50",
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  margin: "0 15px",
};

const minimalContainerStyle = {
  position: "fixed" as const,
  top: "30px",
  right: "40px",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  padding: "8px 15px",
  borderRadius: "25px",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(5px)" as const,
  WebkitBackdropFilter: "blur(5px)" as const,
  transition: "all 0.3s ease",
};

const minimalButtonStyle = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: "5px 8px",
  fontSize: "14px",
  fontWeight: 600,
  color: "#333",
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  gap: "5px",
};

const minimalActiveButtonStyle = {
  ...minimalButtonStyle,
  color: "#4CAF50",
  fontWeight: 700,
};

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  isMinimal = false,
}) => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  if (isMinimal) {
    return (
      <div style={minimalContainerStyle}>
        <Globe size={16} style={{ marginRight: "8px", color: "#555" }} />
        <button
          type="button"
          onClick={() => changeLanguage("pt")}
          style={
            i18n.language === "pt"
              ? minimalActiveButtonStyle
              : minimalButtonStyle
          }
          aria-label="Mudar para Português"
        >
          PT
        </button>
        <span style={{ margin: "0 4px", color: "#aaa" }}>|</span>
        <button
          type="button"
          onClick={() => changeLanguage("en")}
          style={
            i18n.language === "en"
              ? minimalActiveButtonStyle
              : minimalButtonStyle
          }
          aria-label="Change to English"
        >
          EN
        </button>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <span style={{ marginRight: "10px", fontSize: "14px" }}>
        {t("languageSelector.language")}:
      </span>
      <button
        type="button"
        onClick={() => changeLanguage("pt")}
        style={i18n.language === "pt" ? activeButtonStyle : buttonStyle}
        aria-label="Mudar para Português"
      >
        PT
      </button>
      <button
        type="button"
        onClick={() => changeLanguage("en")}
        style={i18n.language === "en" ? activeButtonStyle : buttonStyle}
        aria-label="Change to English"
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
