import type { FC } from 'react';

import { IAccordion } from '../interface/interface';
import { AccordionItem } from './AccordionItem';

import styles from '../styles/accordion.module.scss';

export const Accordion: FC<IAccordion> = ({ items }) => {
	return (
		<ul className={styles.accordion}>
			{items.map((item) => (
				<AccordionItem key={item.id} item={item} />
			))}
		</ul>
	);
};
