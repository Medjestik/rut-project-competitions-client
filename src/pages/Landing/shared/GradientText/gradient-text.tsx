import type { FC } from 'react';

import styles from './gradient-text.module.scss';

interface IGradientText {
	text: string;
}

export const GradientText: FC<IGradientText> = ({ text }) => {
	return <span className={styles.text}>{text}</span>;
};
