import type { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { Link } from 'react-scroll';
import { Button } from '../../../../shared/components/Button/ui/button';
import { CountdownTimer } from '../../../../widgets/CountdownTimer/ui/CountdownTimer';

import { ESECTION } from '../../lib/sections';

import styles from './main.module.scss';

export const Main: FC = () => {
	const { t } = useTranslation();

	return (
		<section id={ESECTION.MAIN} className={`${styles.main}`}>
			<p className={styles.subtitle}>{t('registration-main-subtitle')}</p>
			<h1 className={styles.title}>{t('registration-main-title')}</h1>
			<p className={styles.text}>{t('registration-main-text')}</p>
			<div className={styles.tags}>
				<div className={styles.tag}>{t('registration-main-tags.0')}</div>
				<div className={styles.tag}>{t('registration-main-tags.1')}</div>
				<Link
					key={ESECTION.TEAM}
					to={ESECTION.TEAM}
					smooth={true}
					offset={-20}
					duration={500}
					spy={true}>
					<Button text={t('registration-main-tags.2')} color='arrow' />
				</Link>
			</div>
			<div className={styles.card}>
				<span className={styles.card__count}>
					<CountdownTimer targetDate={t('main-cards.3.count')} />
				</span>
				<span className={styles.card__caption}>
					{t('main-cards.3.caption')}
				</span>
				<p className={styles.card__text}>{t('main-cards.3.text')}</p>
			</div>
		</section>
	);
};
