import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import styles from '../styles/language-switcher.module.scss';

export const LanguageSwitcher: FC = () => {
	const { i18n } = useTranslation();

	const currentLang = i18n.language;

	return (
		<div className={styles.switcher}>
			<div
				className={`${styles.lang} ${
					currentLang === 'ru' ? styles.active : ''
				}`}
				onClick={() => i18n.changeLanguage('ru')}>
				RU
			</div>

			<span>/</span>

			<div
				className={`${styles.lang} ${
					currentLang === 'en' ? styles.active : ''
				}`}
				onClick={() => i18n.changeLanguage('en')}>
				EN
			</div>
		</div>
	);
};
