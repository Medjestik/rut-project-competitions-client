import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en-translation.json';
import ru from './locales/ru-translation.json';

// eslint-disable-next-line import/no-named-as-default-member
i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: 'en',
		supportedLngs: ['en', 'ru'],
		load: 'languageOnly',
		debug: false,
		detection: {
			order: ['localStorage', 'navigator'],
			caches: ['localStorage'],
		},
		interpolation: {
			escapeValue: false,
		},
		resources: {
			en: { translation: en },
			ru: { translation: ru },
		},
	});

export default i18n;
