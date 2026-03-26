import type { FC } from 'react';

import styles from './caption.module.scss';

interface ICaption {
	text: string;
}

export const Caption: FC<ICaption> = ({ text }) => {
	return <span className={styles.caption}>{text}</span>;
};
