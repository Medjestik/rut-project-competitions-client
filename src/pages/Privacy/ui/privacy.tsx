import type { FC } from 'react';

import { useTranslation } from 'react-i18next';

import styles from '../styles/privacy.module.scss';

export const Privacy: FC = () => {
	const { t } = useTranslation();

	const list = t('privacy.list', { returnObjects: true }) as Record<
		string,
		string
	>;
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>{t('privacy.title')}</h1>

			<p className={styles.text}>{t('privacy.p1')}</p>

			<ul>
				{Object.values(list).map((item, i) => (
					<li key={i}>{item}</li>
				))}
			</ul>

			<p className={styles.text}>{t('privacy.p2')}</p>
			<p className={styles.text}>{t('privacy.p3')}</p>
			<p className={styles.text}>{t('privacy.p4')}</p>
			<p className={styles.text}>{t('privacy.p5')}</p>
			<p className={styles.text}>{t('privacy.p6')}</p>
			<p className={styles.text}>{t('privacy.p7')}</p>

			<p className={styles.text}>
				{t('privacy.footer')
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
