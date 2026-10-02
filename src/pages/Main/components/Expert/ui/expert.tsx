import type { FC } from 'react';

import { Routes, Route } from 'react-router-dom';

import { ExpertCases } from './expert-cases';
import { ExpertTeams } from './expert-teams';
import { ExpertScore } from './expert-score';

import styles from '../styles/expert.module.scss';

export const Expert: FC = () => {
	return (
		<div className={styles.container}>
			<Routes>
				<Route index element={<ExpertCases />} />
				<Route path='nomination/:nominationId' element={<ExpertTeams />} />
				<Route
					path='nomination/:nominationId/form/:formId'
					element={<ExpertScore />}
				/>
			</Routes>
		</div>
	);
};
