import type { FC } from 'react';

import { useTranslation } from 'react-i18next';
import { useWindowWidth } from '../../../../hooks/useWindowWidth';
import { useInView } from '../../../../hooks/useInView';

import { Caption } from '../../shared/Caption/caption';
import { GradientText } from '../../shared/GradientText/gradient-text';

import { ESECTION } from '../../lib/sections';

import styles from './prize.module.scss';

export const Prize: FC = () => {
	const { t } = useTranslation();
	const width = useWindowWidth();
	const { ref, isVisible } = useInView({ threshold: 0.2 });

	return (
		<div id={ESECTION.PRIZE} className={styles.container}>
			<section
				ref={ref}
				className={`${styles.prize} ${styles.fadeUp} ${
					isVisible ? styles.visible : ''
				}`}>
				<div className={styles.row}>
					<Caption text={t('prize-caption')} />
					<h2 className={styles.title}>
						<GradientText text={t('prize-title.0')} /> {t('prize-title.1')}
					</h2>
				</div>
				{width <= 1600 && (
					<div className={styles.caption}>
						<span className={styles.caption__count}>
							<GradientText text='2 000 000 ₽' />
						</span>
						<p className={styles.caption__text}>{t('prize-text')}</p>
					</div>
				)}
				<div className={styles.cards}>
					<div
						className={`${styles.card} ${styles.fadeUp} ${
							isVisible ? styles.visible : ''
						}`}
						style={{ transitionDelay: '0.2s' }}>
						<span className={styles.card__count}>200 000 ₽</span>
						<p className={styles.card__text}>
							{t('prize-cards.0.text.0')} <br></br> {t('prize-cards.0.text.1')}
						</p>
					</div>
					<div className={`${styles.card} ${styles.card_type_inherit}`}>
						{width > 1600 && (
							<>
								<span className={styles.card__count}>2 000 000 ₽</span>
								<p className={styles.card__text}>{t('prize-text')}</p>
							</>
						)}
					</div>
					<div></div>
					<div
						className={`${styles.card} ${styles.fadeUp} ${
							isVisible ? styles.visible : ''
						}`}
						style={{ transitionDelay: '0.4s' }}>
						<span className={styles.card__count}>200 000 ₽</span>
						<p className={styles.card__text}>
							{t('prize-cards.1.text.0')} <br></br> {t('prize-cards.1.text.1')}
						</p>
					</div>
					<div
						className={`${styles.card} ${styles.fadeUp} ${
							isVisible ? styles.visible : ''
						}`}
						style={{ transitionDelay: '0.6s' }}>
						<span className={styles.card__count}>200 000 ₽</span>
						<p className={styles.card__text}>
							{t('prize-cards.2.text.0')} <br></br> {t('prize-cards.2.text.1')}
						</p>
					</div>
					<div
						className={`${styles.card} ${styles.fadeUp} ${
							isVisible ? styles.visible : ''
						}`}
						style={{ transitionDelay: '0.8s' }}>
						<span className={styles.card__count}>200 000 ₽</span>
						<p className={styles.card__text}>
							{t('prize-cards.3.text.0')} <br></br> {t('prize-cards.3.text.1')}
						</p>
					</div>
					<div
						className={`${styles.card} ${styles.card_type_white} ${
							styles.fadeUp
						} ${isVisible ? styles.visible : ''}`}
						style={{ transitionDelay: '1s' }}>
						<span className={styles.card__count}>1 000 000 ₽</span>
						<p className={styles.card__text}>
							{t('prize-cards.grand-prix.text.0')} <br></br>{' '}
							{t('prize-cards.grand-prix.text.1')}
						</p>
					</div>
					<div></div>
					<div
						className={`${styles.card} ${styles.fadeUp} ${
							isVisible ? styles.visible : ''
						}`}
						style={{ transitionDelay: '1.2s' }}>
						<span className={styles.card__count}>200 000 ₽</span>
						<p className={styles.card__text}>
							{t('prize-cards.4.text.0')} <br></br> {t('prize-cards.4.text.1')}
						</p>
					</div>
					<div
						className={`${styles.card} ${styles.fadeUp} ${
							isVisible ? styles.visible : ''
						}`}
						style={{ transitionDelay: '1.4s' }}>
						<span className={styles.card__count}>200 000 ₽</span>
						<p className={styles.card__text}>
							{t('prize-cards.5.text.0')} <br></br> {t('prize-cards.5.text.1')}
						</p>
					</div>
				</div>
			</section>
		</div>
	);
};
