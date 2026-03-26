import type { FC } from 'react';
import type { IAccordionItem } from '../../../../widgets/Accordion/interface/interface';

import { useTranslation } from 'react-i18next';

import { Caption } from '../../shared/Caption/caption';
import { Accordion } from '../../../../widgets/Accordion/ui/Accordion';

import styles from './faq.module.scss';

export const FAQ: FC = () => {
	const { t } = useTranslation();
	const faqItems = t('faq-items', { returnObjects: true }) as IAccordionItem[];

	return (
		<div id='faq' className={styles.container}>
			<section className={styles.faq}>
				<Caption text={t('faq-caption')} />
				<h2 className={styles.title}>{t('faq-title')}</h2>
				<div className={styles.accordion}>
					<Accordion items={faqItems} />
				</div>
			</section>
		</div>
	);
};
