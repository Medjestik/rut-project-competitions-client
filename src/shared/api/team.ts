import type { IRegisterData } from '../../pages/Registration/types/types';

import { request } from './utils';

export const registration = (data: IRegisterData) => {
	return request('/register/', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
};
