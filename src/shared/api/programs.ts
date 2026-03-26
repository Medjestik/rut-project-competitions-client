import type {
	IApplication,
	IApplicationWithBranch,
} from '../../features/Application/types/types';

import { request } from './utils';

export const getPrograms = () => {
	return request('/active-programs/', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});
};

export const getStreams = () => {
	return request('/programs-with-batches/', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});
};

export const subscribe = (data: IApplication) => {
	return request('/callback-requests/', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name: data.name,
			phone: data.phone,
			email: data.email,
		}),
	});
};

export const subscribeWithBranch = (data: IApplicationWithBranch) => {
	return request('/applications/', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			full_name: data.full_name,
			program: data.program,
			batch: data.batch,
			email: data.email,
			phone: data.phone,
			comment: data.comment,
		}),
	});
};
