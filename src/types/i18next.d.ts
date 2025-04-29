import "i18next";
import enJson from "../lib/i18n/locales/en.json";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      translation: typeof enJson;
    };
  }
}
