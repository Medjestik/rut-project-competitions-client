import { request } from './utils';

export const getTeams = () => {
	const token = localStorage.getItem('token');
	return request('/report/teams', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
	});
};

export const getRegisteredCases = () => {
	const token = localStorage.getItem('token');
	return request('/cases?is_registered=true', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
	});
};
