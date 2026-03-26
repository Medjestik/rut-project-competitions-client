import type { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { Caption } from '../../shared/Caption/caption';
import { GradientText } from '../../shared/GradientText/gradient-text';

import styles from './reasons.module.scss';

export const Reasons: FC = () => {
	const { t } = useTranslation();

	return (
		<div id='reasons' className={styles.container}>
			<section className={styles.reasons}>
				<Caption text={t('reasons-caption')} />
				<h2 className={styles.title}>
					<GradientText text={t('reasons-title.0')} /> {t('reasons-title.1')}
				</h2>
				<div className={styles.cards}>
					<div className={`${styles.card} ${styles.card_type_1}`}>
						<span className={styles.card__number}>01</span>
						<h4 className={styles.card__title}>{t('reasons-cards.0')}</h4>
					</div>
					<div className={styles.card__stub}>{t('reasons-cards.stub-1')}</div>
					<div className={`${styles.card} ${styles.card_type_2}`}>
						<span className={styles.card__number}>02</span>
						<h4 className={styles.card__title}>{t('reasons-cards.1')}</h4>
					</div>
					<div className={`${styles.card} ${styles.card_type_3}`}>
						<span className={styles.card__number}>03</span>
						<h4 className={styles.card__title}>{t('reasons-cards.2')}</h4>
					</div>
					<div className={styles.card__stub}>{t('reasons-cards.stub-2')}</div>
					<div className={`${styles.card} ${styles.card_type_4}`}>
						<span className={styles.card__number}>04</span>
						<h4 className={styles.card__title}>{t('reasons-cards.3')}</h4>
					</div>
					<div className={`${styles.card} ${styles.card_type_5}`}>
						<span className={styles.card__number}>05</span>
						<h4 className={styles.card__title}>{t('reasons-cards.4')}</h4>
					</div>
					<div className={`${styles.card} ${styles.card_type_6}`}>
						<span className={styles.card__number}>06</span>
						<h4 className={styles.card__title}>{t('reasons-cards.5')}</h4>
					</div>
				</div>
			</section>
		</div>
	);
};
