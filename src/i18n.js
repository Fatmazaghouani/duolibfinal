import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization'; 

import en from '../locales/en.json';
import fr from '../locales/fr.json';


i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
  },
  lng: Localization.locale.startsWith('fr') ? 'fr' : 'en', // Détection automatique
  fallbackLng: 'en', // Langue par défaut si non trouvée
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
