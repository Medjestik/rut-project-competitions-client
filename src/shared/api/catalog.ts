import { request } from './utils';

export const getUniversitiesCatalog = (scope: string) => {
	return request(`/universities/`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});
};

export const getProblemsCatalog = () => {
	return request('/cases', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});
};
