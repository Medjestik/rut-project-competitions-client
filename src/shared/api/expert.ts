import type { ICriteriaScore } from '../../store/expert/types';

import { request } from './utils';

const authHeaders = () => ({
	Accept: 'application/json',
	'Content-Type': 'application/json',
	Authorization: `Token ${localStorage.getItem('token') || ''}`,
});

export const getExpertTeams = (caseId: string) => {
	return request(`/expert/teams?case_id=${caseId}`, {
		method: 'GET',
		headers: authHeaders(),
	});
};

export const getCriterias = () => {
	return request('/criterias', {
		method: 'GET',
		headers: authHeaders(),
	});
};

export const getTeamMarks = (teamId: number) => {
	return request(`/expert/team-marks?team_id=${teamId}`, {
		method: 'GET',
		headers: authHeaders(),
	});
};

export const submitTeamScores = (scores: ICriteriaScore[]) => {
	return request('/expert/rate-team/', {
		method: 'POST',
		headers: authHeaders(),
		body: JSON.stringify(scores),
	});
};
