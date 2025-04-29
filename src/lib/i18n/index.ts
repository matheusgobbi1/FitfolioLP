import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslation from "./locales/en.json";
import ptTranslation from "./locales/pt.json";

const resources = {
  en: {
    translation: enTranslation,
  },
  pt: {
    translation: ptTranslation,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "pt",
    lng: "pt",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "querystring", "navigator"],
      lookupQuerystring: "lng",
      caches: ["localStorage"],
    },
  });

// Atualiza o atributo lang do documento HTML quando o idioma muda
i18n.on("languageChanged", (lng) => {
  document.documentElement.setAttribute("lang", lng === "pt" ? "pt-BR" : "en");
});

// Forçar configuração inicial do atributo lang do documento HTML
document.documentElement.setAttribute("lang", "pt-BR");

export default i18n;
