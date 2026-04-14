import type { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button } from '../../../shared/components/Button/ui/button';

import { EROUTES } from '../../../shared/utils/routes';

import styles from '../styles/not-found.module.scss';

export const NotFound: FC = () => {
	const navigate = useNavigate();

	return (
		<div className={styles.container}>
			<div className={styles.count}>404</div>
			<h2 className={styles.title}>Сигнал потерян</h2>
			<p className={styles.subtitle}>
				Мы не можем определить текущую точку назначения
			</p>
			<Button
				text='На главную'
				color='gradient'
				onClick={() => navigate(EROUTES.LANDING)}
			/>
		</div>
	);
};
