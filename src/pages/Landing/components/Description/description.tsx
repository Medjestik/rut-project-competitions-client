import type { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { Caption } from '../../shared/Caption/caption';
import { GradientText } from '../../shared/GradientText/gradient-text';
import { Button } from '../../../../shared/components/Button/ui/button';

import styles from './description.module.scss';

export const Description: FC = () => {
	const { t } = useTranslation();

	return (
		<section id='description' className={styles.description}>
			<div className={styles.row}>
				<Caption text={t('description-caption')} />
				<h2 className={styles.title}>
					{t('description-title.0')} <br></br>{' '}
					<GradientText text={t('description-title.1')} />{' '}
					{t('description-title.2')}
				</h2>
			</div>
			<ul className={styles.list}>
				<li className={styles.item}>
					<h4 className={styles.item__title}>
						{t('description-cards.0.title.0')}{' '}
						<GradientText text={t('description-cards.0.title.1')} />{' '}
						{t('description-cards.0.title.2')}
					</h4>
					<p className={styles.item__text}>{t('description-cards.0.text')}</p>
				</li>
				<li className={styles.item}>
					<h4 className={styles.item__title}>
						{t('description-cards.1.title.0')}
						<br></br>
						{t('description-cards.1.title.1')}
					</h4>
					<p className={styles.item__text}>{t('description-cards.1.text')}</p>
				</li>
				<li className={styles.item}>
					<h4 className={styles.item__title}>
						{t('description-cards.2.title')}
					</h4>
					<p className={styles.item__text}>{t('description-cards.2.text')}</p>
					<Button text={t('description-card-btn')} color='gradient' />
				</li>
			</ul>
		</section>
	);
};
