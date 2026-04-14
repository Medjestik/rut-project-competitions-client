import type { FC } from 'react';

import { useTranslation } from 'react-i18next';

import styles from '../styles/preloader.module.scss';

export const Preloader: FC = () => {
	const { t } = useTranslation();

	return (
		<figure className={styles.preloader}>
			<i className={styles.circle}></i>
			<figcaption className={styles.caption}>{t('preloader')}</figcaption>
		</figure>
	);
};
