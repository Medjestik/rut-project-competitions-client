import type { ILoginData } from '../../pages/Login/types/types';

import type { IAuthResponse } from '../../store/user/types';

import { request } from './utils';

const setTokens = (accessToken: string) => {
	localStorage.setItem('token', accessToken);
};

function handleResponse(res: Response) {
	if (res.ok) {
		return res.json();
	} else {
		return Promise.reject(res);
	}
}

export const getTeam = (token: string) => {
	return fetch('https://contest-api.emiit.ru/api/current-team', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
	}).then((res) => handleResponse(res));
};

function checkResponse(res: Response) {
	if (res.status === 201) {
		return res;
	} else {
		return Promise.reject(res);
	}
}

export const login = (data: ILoginData) => {
	return request('/auth/login/', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			username: data.login,
			password: data.password,
		}),
	}).then((res: IAuthResponse) => {
		if (res.key) {
			setTokens(res.key);
		}
		return res;
	});
};

export const getUser = (token: string) => {
	return request('/current-team', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
	});
};

export const changePassword = ({
	current_password,
	new_password,
}: {
	current_password: string;
	new_password: string;
}) => {
	return request('/accounts/password/change/', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
		body: JSON.stringify({ current_password, new_password }),
	});
};

export const forgotPassword = ({ email }: { email: string }) => {
	return request('/auth/password/reset/', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email }),
	});
};

export const resetPassword = ({
	uid,
	token,
	new_password,
}: {
	uid: string;
	token: string;
	new_password: string;
}) => {
	return request('/auth/password/reset/confirm/', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ uid, token, new_password }),
	});
};
