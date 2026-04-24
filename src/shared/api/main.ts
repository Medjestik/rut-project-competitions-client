import type {
	IUploadLinkData,
	IUploadFileData,
} from '../../pages/Main/components/Forms/types';

import { request } from './utils';

export const getStages = () => {
	const token = localStorage.getItem('token');
	return request('/stages', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
	});
};

export const getStage = (stageId: number) => {
	const token = localStorage.getItem('token');
	return request(`/stages/${stageId}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
	});
};

export const nextStage = () => {
	const token = localStorage.getItem('token');
	return request('/next_stage/', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
	});
};

export const uploadLink = (data: IUploadLinkData) => {
	const token = localStorage.getItem('token');
	return request('/upload-url/', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
		body: JSON.stringify({
			url: data.link,
			name: data.name,
			stage: data.stage,
		}),
	});
};

export const uploadFile = (data: IUploadFileData) => {
	const token = localStorage.getItem('token');
	return request('/upload-file/', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
		body: JSON.stringify({
			file: data.file,
			name: data.name,
			filename: data.fileName,
			stage: data.stage,
		}),
	});
};

export const uploadVideo = (data: IUploadLinkData) => {
	const token = localStorage.getItem('token');
	return request('/upload-video/', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
		body: JSON.stringify({
			url: data.link,
			name: data.name,
			stage: data.stage,
		}),
	});
};
