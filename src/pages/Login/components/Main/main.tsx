import type { FC } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './main.module.scss';

export const Main: FC = () => {
	const { t } = useTranslation();

	return (
		<section className={styles.main}>
			<p className={styles.subtitle}>{t('login-main-subtitle')}</p>
			<h1 className={styles.title}>{t('login-main-title')}</h1>
			<p className={styles.text}>{t('login-main-text')}</p>
		</section>
	);
};
