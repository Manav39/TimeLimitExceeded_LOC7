import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translations
import en from "./locales/en.json";
import hi from "./locales/hi.json"; // Hindi// French

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
    },
    fallbackLng: "en", // Default language
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"], // Detect user language from localStorage or browser
    },
  });

export default i18n;
