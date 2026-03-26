import type { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { Caption } from '../../shared/Caption/caption';
import { Button } from '../../../../shared/components/Button/ui/button';

import { ESECTION } from '../../lib/sections';

import styles from './document.module.scss';

const btnStyle = {
	margin: '40px 0 0 auto',
};

export const Document: FC = () => {
	const { t } = useTranslation();

	return (
		<div id={ESECTION.DOCUMENT} className={styles.container}>
			<section className={styles.document}>
				<Caption text={t('document-caption')} />
				<h2 className={styles.title}>{t('document-title')}</h2>
				<ul className={styles.cards}>
					<li className={styles.card}>
						<h4 className={styles.card__title}>
							{t('document-cards.0.title')}
						</h4>
						<p className={styles.card__text}>{t('document-cards.0.text')}</p>
						<Button
							text={t('download-button')}
							color='arrow'
							style={btnStyle}
						/>
					</li>
					<li className={styles.card}>
						<h4 className={styles.card__title}>
							{t('document-cards.1.title')}
						</h4>
						<p className={styles.card__text}>{t('document-cards.1.text')}</p>
						<Button
							text={t('download-button')}
							color='arrow'
							style={btnStyle}
						/>
					</li>
					<li className={styles.card}>
						<h4 className={styles.card__title}>
							{t('document-cards.2.title')}
						</h4>
						<p className={styles.card__text}>{t('document-cards.2.text')}</p>
						<Button
							text={t('download-button')}
							color='arrow'
							style={btnStyle}
						/>
					</li>
				</ul>
			</section>
		</div>
	);
};
