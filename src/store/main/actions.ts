import type { IStage, IStageData, IVideo, IMessageResponse } from './types';
import type {
	IUploadLinkData,
	IUploadFileData,
	IUploadVideoData,
} from '../../pages/Main/components/Forms/types';

import { createAsyncThunk } from '@reduxjs/toolkit';

import {
	getStages,
	getStage,
	nextStage,
	uploadLink,
	uploadFile,
	uploadVideo,
} from '../../shared/api/main';

export const getStagesAction = createAsyncThunk<IStage[]>(
	'main/getStages',
	getStages
);

export const getStageAction = createAsyncThunk<IStageData, number>(
	'main/getStage',
	getStage
);

export const nextStageAction = createAsyncThunk<IMessageResponse>(
	'main/nextStage',
	nextStage
);

export const uploadLinkAction = createAsyncThunk<
	IMessageResponse,
	IUploadLinkData
>('main/uploadLink', uploadLink);

export const uploadFileAction = createAsyncThunk<
	IMessageResponse,
	IUploadFileData
>('main/uploadFile', uploadFile);

export const uploadVideoAction = createAsyncThunk<IVideo, IUploadVideoData>(
	'main/uploadVideo',
	uploadVideo
);
