import type { IRegisteredCase } from '../control/types';
import type { ICriteriaScore, IExpertScoreData, IExpertTeam } from './types';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { getRegisteredCases } from '../../shared/api/control';
import {
	getCriterias,
	getExpertTeams,
	getTeamMarks,
	submitTeamScores,
} from '../../shared/api/expert';

export const getExpertCasesAction = createAsyncThunk<IRegisteredCase[]>(
	'expert/getCases',
	() => getRegisteredCases()
);

export const getExpertTeamsAction = createAsyncThunk<IExpertTeam[], string>(
	'expert/getTeams',
	(caseId) => getExpertTeams(caseId)
);

export const getExpertScoreAction = createAsyncThunk<IExpertScoreData, number>(
	'expert/getScore',
	async (teamId) => {
		const [criterias, marks] = await Promise.all([
			getCriterias(),
			getTeamMarks(teamId),
		]);

		return { criterias, marks };
	}
);

export const submitExpertScoresAction = createAsyncThunk<
	unknown,
	ICriteriaScore[]
>('expert/submitScores', (scores) => submitTeamScores(scores));
