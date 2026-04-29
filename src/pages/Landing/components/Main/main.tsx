import type { FC } from 'react';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useWindowWidth } from '../../../../hooks/useWindowWidth';
import { useInView } from '../../../../hooks/useInView';

import { Header } from '../Header/header';
import { Description } from '../Description/description';
import { Caption } from '../../shared/Caption/caption';
import { Button } from '../../../../shared/components/Button/ui/button';
import { CountdownTimer } from '../../../../widgets/CountdownTimer/ui/CountdownTimer';

import { EROUTES } from '../../../../shared/utils/routes';
import { ESECTION } from '../../lib/sections';

import backgroundImg from '../../../../shared/images/main-background.png';
import styles from './main.module.scss';

export const Main: FC = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const width = useWindowWidth();
	const { ref, isVisible } = useInView({ threshold: 0.2 });

	return (
		<div className={styles.container}>
			<img
				src={backgroundImg}
				alt=''
				className={styles.background}
				aria-hidden='true'
			/>
			<section id={ESECTION.MAIN} ref={ref} className={`${styles.main}`}>
				<Header />
				{width > 1000 ? (
					<div className={styles.title}>
						<div className={styles.row}>
							<h2 className={styles.title__text}>{t('main-title.0')}</h2>
							<Caption text={t('main-title-caption')} />
						</div>
						<div className={styles.row}>
							<h2 className={styles.title__text}>{t('main-title.1')}</h2>
						</div>
						<div className={styles.row}>
							<h2 className={styles.title__text}>{t('main-title.2')}</h2>
						</div>
					</div>
				) : (
					<div className={styles.title}>
						<Caption text={t('main-title-caption')} />
						<h2 className={styles.title__text}>
							{t('main-title.0')} {t('main-title.1')} {t('main-title.2')}
						</h2>
					</div>
				)}

				<p className={styles.subtitle}>
					{width > 1000 ? t('main-text') : t('main-mobile-text')}
				</p>
				<div className={styles.button}>
					{width > 1000 ? (
						<>
							<Button
								text={t('join-button')}
								color='arrow'
								onClick={() => navigate(EROUTES.REGISTRATION)}
							/>
							<Caption text={t('main-reg-caption')} />
						</>
					) : (
						<Button
							text={t('join-button')}
							color='gradient'
							onClick={() => navigate(EROUTES.REGISTRATION)}
						/>
					)}
				</div>
				<ul className={styles.cards}>
					<li
						className={`${styles.card} ${styles.card_direction_right} ${
							styles.fadeUp
						} ${isVisible ? styles.visible : ''}`}
						style={{ transitionDelay: width > 1000 ? '0.2s' : '0.6s' }}>
						<span className={styles.card__count}>
							{t('main-cards.0.count')}
						</span>
						<span className={styles.card__caption}>
							{t('main-cards.0.caption')}
						</span>
						<p className={styles.card__text}>
							{width > 1000
								? t('main-cards.0.text')
								: t('main-mobile-cards.0.text')}
						</p>
					</li>
					<li
						className={`${styles.card} ${styles.card_direction_right} ${
							styles.fadeUp
						} ${isVisible ? styles.visible : ''}`}
						style={{ transitionDelay: '0.4s' }}>
						<span className={styles.card__count}>
							{t('main-cards.1.count')}
						</span>
						<span className={styles.card__caption}>
							{t('main-cards.1.caption')}
						</span>
						<p className={styles.card__text}>
							{width > 1000
								? t('main-cards.1.text')
								: t('main-mobile-cards.1.text')}
						</p>
					</li>
					<li
						className={`${styles.card} ${styles.card_direction_left} ${
							styles.card_number_3
						} ${styles.fadeUp} ${isVisible ? styles.visible : ''}`}
						style={{ transitionDelay: width > 1000 ? '0.6s' : '0.2s' }}>
						<span className={styles.card__count}>
							{t('main-cards.2.count')}
						</span>
						<span className={styles.card__caption}>
							{t('main-cards.2.caption')}
						</span>
						<p className={styles.card__text}>
							{width > 1000
								? t('main-cards.2.text')
								: t('main-mobile-cards.2.text')}
						</p>
					</li>
					{width > 1000 && (
						<li
							className={`${styles.card} ${styles.card_direction_left} ${
								styles.card_number_4
							} ${styles.fadeUp} ${isVisible ? styles.visible : ''}`}
							style={{ transitionDelay: '0.8s' }}>
							<span
								className={`${styles.card__count} ${styles.card__count_timer}`}>
								<CountdownTimer targetDate={t('main-cards.3.count')} />
							</span>
							<span className={styles.card__caption}>
								{t('main-cards.3.caption')}
							</span>
							<p className={styles.card__text}>{t('main-cards.3.text')}</p>
						</li>
					)}
				</ul>
				{width <= 1000 && (
					<div
						className={`${styles.timer} ${styles.fadeUp} ${
							isVisible ? styles.visible : ''
						}`}
						style={{ transitionDelay: '0.8s' }}>
						<span className={`${styles.timer__count}`}>
							<CountdownTimer targetDate={t('main-cards.3.count')} />
						</span>
						<span className={styles.timer__text}>
							{t('main-cards.3.caption')}
						</span>
					</div>
				)}
			</section>
			<Description />
		</div>
	);
};
