import type { FC } from 'react';

import { useTranslation } from 'react-i18next';
import { useInView } from '../../../../hooks/useInView';

import { Caption } from '../../shared/Caption/caption';

import { ESECTION } from '../../lib/sections';

import styles from './partners.module.scss';

export const Partners: FC = () => {
	const { t } = useTranslation();

	const { ref, isVisible } = useInView({ threshold: 0.2 });

	return (
		<div id={ESECTION.PARTNERS} className={styles.container}>
			<section
				ref={ref}
				className={`${styles.partners} ${styles.fadeUp} ${
					isVisible ? styles.visible : ''
				}`}>
				<Caption text={t('partners-caption')} />

				<h2 className={styles.title}>{t('partners-title')}</h2>

				<ul className={styles.cards}>
					<li
						className={`${styles.card} ${styles.card_type_1} ${styles.fadeUp} ${
							isVisible ? styles.visible : ''
						}`}
						style={{ transitionDelay: `${0.2}s` }}>
						<div
							className={`${styles.card__logo} ${styles.card__logo_type_1}`}></div>
					</li>
					<li
						className={`${styles.card} ${styles.card_type_2} ${styles.fadeUp} ${
							isVisible ? styles.visible : ''
						}`}
						style={{ transitionDelay: `${0.4}s` }}>
						{' '}
						<div
							className={`${styles.card__logo} ${styles.card__logo_type_2}`}></div>
					</li>
					<li
						className={`${styles.card} ${styles.card_type_3} ${styles.fadeUp} ${
							isVisible ? styles.visible : ''
						}`}
						style={{ transitionDelay: `${0.6}s` }}>
						{' '}
						<div
							className={`${styles.card__logo} ${styles.card__logo_type_3}`}></div>
					</li>
				</ul>
			</section>
		</div>
	);
};
