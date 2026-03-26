import type { FC } from 'react';
import type { IAccordionItem } from '../../../../widgets/Accordion/interface/interface';

import { useTranslation } from 'react-i18next';
import { useInView } from '../../../../hooks/useInView';

import { Caption } from '../../shared/Caption/caption';
import { Accordion } from '../../../../widgets/Accordion/ui/Accordion';

import { ESECTION } from '../../lib/sections';

import styles from './faq.module.scss';

export const FAQ: FC = () => {
	const { t } = useTranslation();
	const faqItems = t('faq-items', { returnObjects: true }) as IAccordionItem[];

	// Хук для скролл-анимации
	const { ref, isVisible } = useInView({ threshold: 0.2 });

	return (
		<div id={ESECTION.FAQ} className={styles.container}>
			<section
				ref={ref}
				className={`${styles.faq} ${styles.fadeUp} ${
					isVisible ? styles.visible : ''
				}`}>
				<Caption text={t('faq-caption')} />
				<h2 className={styles.title}>{t('faq-title')}</h2>

				<div className={styles.accordion}>
					{faqItems.map((item, i) => (
						<div
							key={i}
							className={`${styles.accordionItem} ${styles.fadeUp} ${
								isVisible ? styles.visible : ''
							}`}
							style={{ transitionDelay: `${i * 0.2}s` }}>
							<Accordion items={[item]} />
						</div>
					))}
				</div>
			</section>
		</div>
	);
};
