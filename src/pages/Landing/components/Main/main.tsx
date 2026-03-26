import type { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { Header } from '../Header/header';
import { Description } from '../Description/description';
import { Caption } from '../../shared/Caption/caption';
import { Button } from '../../../../shared/components/Button/ui/button';
import { CountdownTimer } from '../../../../widgets/CountdownTimer/ui/CountdownTimer';
import backgroundImg from '../../../../shared/images/main-background.png';

import styles from './main.module.scss';

export const Main: FC = () => {
	const { t } = useTranslation();

	return (
		<div className={styles.container}>
			<img
				src={backgroundImg}
				alt=''
				className={styles.background}
				aria-hidden='true'
			/>
			<section className={styles.main}>
				<Header />
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
				<p className={styles.subtitle}>{t('main-text')}</p>
				<div className={styles.button}>
					<Button text={t('join-button')} color='arrow' />
					<Caption text={t('main-reg-caption')} />
				</div>
				<ul className={styles.cards}>
					<li className={`${styles.card} ${styles.card_direction_right}`}>
						<span className={styles.card__count}>
							{t('main-cards.0.count')}
						</span>
						<span className={styles.card__caption}>
							{t('main-cards.0.caption')}
						</span>
						<p className={styles.card__text}>{t('main-cards.0.text')}</p>
					</li>
					<li className={`${styles.card} ${styles.card_direction_right}`}>
						<span className={styles.card__count}>
							{t('main-cards.1.count')}
						</span>
						<span className={styles.card__caption}>
							{t('main-cards.1.caption')}
						</span>
						<p className={styles.card__text}>{t('main-cards.1.text')}</p>
					</li>
					<li
						className={`${styles.card} ${styles.card_direction_left} ${styles.card_number_3}`}>
						<span className={styles.card__count}>
							{t('main-cards.2.count')}
						</span>
						<span className={styles.card__caption}>
							{t('main-cards.2.caption')}
						</span>
						<p className={styles.card__text}>{t('main-cards.2.text')}</p>
					</li>
					<li
						className={`${styles.card} ${styles.card_direction_left} ${styles.card_number_4}`}>
						<span
							className={`${styles.card__count} ${styles.card__count_timer}`}>
							<CountdownTimer targetDate={t('main-cards.3.count')} />
						</span>
						<span className={styles.card__caption}>
							{t('main-cards.3.caption')}
						</span>
						<p className={styles.card__text}>{t('main-cards.3.text')}</p>
					</li>
				</ul>
			</section>
			<Description />
		</div>
	);
};
