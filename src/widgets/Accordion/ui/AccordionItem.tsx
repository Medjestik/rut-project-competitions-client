import type { FC } from 'react';
import type { IAccordionItemProps } from '../interface/interface';

import { useState, useRef } from 'react';

import styles from '../styles/accordion.module.scss';

export const AccordionItem: FC<IAccordionItemProps> = ({ item }) => {
	const mainRef = useRef<HTMLDivElement>(null);
	const childrenRef = useRef<HTMLDivElement>(null);

	const [isOpenAccordion, setIsOpenAccordion] = useState<boolean>(false);
	const [height, setHeight] = useState<string>('0px');

	const handleToggleAccordion = () => {
		setIsOpenAccordion((prevState) => !prevState);

		if (childrenRef.current) {
			setHeight(
				isOpenAccordion ? '0px' : `${childrenRef.current.scrollHeight}px`
			);
		}
	};

	return (
		<div
			className={`${styles.accordion__item} ${
				isOpenAccordion ? styles.accordion__item_state_open : ''
			}`}>
			<div
				ref={mainRef}
				className={styles.accordion__main}
				onClick={handleToggleAccordion}>
				<h4 className={styles.accordion__title}>{item.title}</h4>
				<div className={styles.accordion__icon}>
					{' '}
					<svg
						width='21'
						height='16'
						viewBox='0 0 29 22'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M9.71445 0.750002L1.48222 8.98223C0.505907 9.95855 0.505906 11.5415 1.48222 12.5178L9.71445 20.75M2.21446 10.75L27.75 10.75'
							stroke='#070707'
							strokeWidth='1.5'
							strokeLinecap='round'
						/>
					</svg>
				</div>
			</div>

			<div
				style={{ maxHeight: height }}
				ref={childrenRef}
				className={styles.accordion__children}>
				<p className={styles.accordion__text}>{item.content}</p>
			</div>
		</div>
	);
};
