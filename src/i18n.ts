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
		fallbackLng: 'ru',
		supportedLngs: ['en', 'ru', 'cn', 'fr'],
		debug: false,
		detection: {
			order: ['querystring', 'localStorage', 'navigator'],
			caches: ['localStorage'],
		},
		interpolation: {
			escapeValue: false,
		},
		backend: {
			loadPath: '/locales/{{lng}}-translation.json',
		},
		resources: {
			en: { translation: en },
			ru: { translation: ru },
		},
	});

export default i18n;
