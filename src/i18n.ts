import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import en from "@/locale/en.json";
import pt from "@/locale/pt.json";
import es from "@/locale/es.json";

// Detect the device system language
const systemLanguage = Localization.getLocales()?.[0]?.languageCode ?? "pt";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    pt: { translation: pt },
  },
  lng: systemLanguage, // Initial language
  fallbackLng: "pt", // Use if device language is missing
  interpolation: {
    escapeValue: false, // React already safeguards against XSS
  },
});

export default i18n;
