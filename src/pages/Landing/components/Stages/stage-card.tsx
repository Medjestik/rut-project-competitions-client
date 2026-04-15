import type { FC } from 'react';

import { useEffect, useState } from 'react';

import { GradientText } from '../../shared/GradientText/gradient-text';

import styles from './stage-card.module.scss';

interface IStageCard {
	id: string;
	title: string;
	duration: string;
	content: string;
	isVisible: boolean;
	transitionDelay: string;
}

export const StageCard: FC<IStageCard> = ({
	id,
	title,
	duration,
	content,
	isVisible,
	transitionDelay,
}) => {
	const [isHintActive, setIsHintActive] = useState(false);

	useEffect(() => {
		if (id === '1' && isVisible) {
			const timeout = setTimeout(() => {
				setIsHintActive(true);
			}, 500);

			return () => clearTimeout(timeout);
		}
	}, [isVisible, id]);

	return (
		<div
			className={`${styles.card} ${styles[`card_type_${id}`]} ${
				styles.fadeUp
			} ${isVisible ? styles.visible : ''} ${isHintActive ? styles.hint : ''}`}
			style={{ transitionDelay: `${transitionDelay}s` }}>
			<div className={styles.main}>
				<span className={styles.main__number}>0{id}</span>
				<h4 className={styles.main__title}>{title}</h4>
				<span className={styles.main__duration}>{duration}</span>
			</div>

			<div className={styles.hover}>
				<h4 className={styles.hover__title}>
					<GradientText text={title} />
				</h4>
				<span className={styles.hover__duration}>{duration}</span>
				<p className={styles.hover__text}>{content}</p>
			</div>
		</div>
	);
};
