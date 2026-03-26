import type { FC } from 'react';

import { useTranslation } from 'react-i18next';
import { useInView } from '../../../../hooks/useInView';

import { Caption } from '../../shared/Caption/caption';
import { Button } from '../../../../shared/components/Button/ui/button';

import { ESECTION } from '../../lib/sections';

import styles from './document.module.scss';

const btnStyle = {
	margin: '40px 0 0 auto',
};

export const Document: FC = () => {
	const { t } = useTranslation();

	const { ref, isVisible } = useInView({ threshold: 0.2 });

	return (
		<div id={ESECTION.DOCUMENT} className={styles.container}>
			<section
				ref={ref}
				className={`${styles.document} ${styles.fadeUp} ${
					isVisible ? styles.visible : ''
				}`}>
				<Caption text={t('document-caption')} />

				<h2 className={styles.title}>{t('document-title')}</h2>

				<ul className={styles.cards}>
					{[0, 1, 2].map((i) => (
						<li
							key={i}
							className={`${styles.card} ${styles.fadeUp} ${
								isVisible ? styles.visible : ''
							}`}
							style={{ transitionDelay: `${i * 0.2}s` }}>
							<h4 className={styles.card__title}>
								{t(`document-cards.${i}.title`)}
							</h4>
							<p className={styles.card__text}>
								{t(`document-cards.${i}.text`)}
							</p>
							<Button
								text={t('download-button')}
								color='arrow'
								style={btnStyle}
							/>
						</li>
					))}
				</ul>
			</section>
		</div>
	);
};
