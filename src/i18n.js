import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.json';
import myTranslation from './locales/my/translation.json';
import thTranslation from './locales/th/translation.json';

i18n
    .use(LanguageDetector) // Detect user language
    .use(initReactI18next) // Pass i18n instance to react-i18next
    .init({
        resources: {
            en: {
                translation: enTranslation
            },
            my: {
                translation: myTranslation
            },
            th: {
                translation: thTranslation
            }
        },
        fallbackLng: 'en', // Fallback language if translation is missing
        debug: false, // Set to true for debugging

        interpolation: {
            escapeValue: false // React already escapes values
        },

        detection: {
            // Order of language detection
            order: ['localStorage', 'navigator'],
            caches: ['localStorage']
        }
    });

export default i18n;
