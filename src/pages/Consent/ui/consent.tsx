import type { FC } from 'react';

import { useTranslation } from 'react-i18next';

import styles from '../styles/consent.module.scss';

export const Consent: FC = () => {
	const { t } = useTranslation();

	const list = t('consent.list', { returnObjects: true }) as Record<
		string,
		string
	>;
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>{t('consent.title')}</h1>

			<p className={styles.text}>{t('consent.p1')}</p>

			<ul>
				{Object.values(list).map((item, i) => (
					<li key={i}>{item}</li>
				))}
			</ul>

			<p className={styles.text}>{t('consent.p2')}</p>
			<p className={styles.text}>{t('consent.p3')}</p>
			<p className={styles.text}>{t('consent.p4')}</p>
			<p className={styles.text}>{t('consent.p5')}</p>
			<p className={styles.text}>{t('consent.p6')}</p>
			<p className={styles.text}>{t('consent.p7')}</p>

			<p className={styles.text}>
				{t('consent.footer')
					.split('\n')
					.map((line, i) => (
						<span key={i}>
							{line}
							<br />
						</span>
					))}
			</p>
		</div>
	);
};
