import type { IMainStore } from './types';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as actions from './actions';

const initialState: IMainStore = {
	stages: [],
	stage: null,
	stageTemplate: null,
	stageVideo: null,
	currentStageId: 0,
	currentPathPosition: 1,
	isOpenUploadLinkPopup: false,
	isOpenUploadFilePopup: false,
	isOpenUploadVideoPopup: false,
	isLoading: false,
	isLoadingUpload: false,
	isLoadingStageData: false,
	isLoadingStages: false,
	error: null,
};

export const mainSlice = createSlice({
	name: 'main',
	initialState,
	reducers: {
		setCurrentStage(state, action: PayloadAction<number>) {
			state.currentStageId = action.payload;
		},
		setCurrentPath(state, action: PayloadAction<number>) {
			state.currentPathPosition = action.payload;
		},
		setStageTemplate(state, action: PayloadAction<string | null>) {
			state.stageTemplate = action.payload;
		},
		setStageVideo(state, action: PayloadAction<string | null>) {
			state.stageVideo = action.payload;
		},
		setUploadLinkPopupOpen(state, action: PayloadAction<boolean>) {
			state.isOpenUploadLinkPopup = action.payload;
		},
		setUploadFilePopupOpen(state, action: PayloadAction<boolean>) {
			state.isOpenUploadFilePopup = action.payload;
		},
		setUploadVideoPopupOpen(state, action: PayloadAction<boolean>) {
			state.isOpenUploadVideoPopup = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(actions.getStagesAction.pending, (state) => {
				state.isLoadingStages = true;
				state.error = null;
			})
			.addCase(actions.getStagesAction.fulfilled, (state, action) => {
				state.isLoadingStages = false;
				state.stages = action.payload;
			})
			.addCase(actions.getStagesAction.rejected, (state, action) => {
				state.isLoadingStages = false;
				state.error = action.error?.message || 'Не удалось загрузить этапы';
			})
			.addCase(actions.getStageAction.pending, (state) => {
				state.isLoadingStageData = true;
				state.error = null;
			})
			.addCase(actions.getStageAction.fulfilled, (state, action) => {
				state.isLoadingStageData = false;
				state.stage = action.payload;
			})
			.addCase(actions.getStageAction.rejected, (state, action) => {
				state.isLoadingStageData = false;
				state.error = action.error?.message || 'Не удалось загрузить этапы';
			})
			.addCase(actions.nextStageAction.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(actions.nextStageAction.fulfilled, (state) => {
				state.isLoading = false;

				state.currentStageId += 1;

				console.log(state.currentStageId);

				state.stages = state.stages.map((stage) => ({
					...stage,
					is_active: stage.id <= state.currentStageId,
				}));
			})
			.addCase(actions.nextStageAction.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error?.message || 'Не удалось сменить этап';
			})
			.addCase(actions.uploadLinkAction.pending, (state) => {
				state.isLoadingUpload = true;
				state.error = null;
			})
			.addCase(actions.uploadLinkAction.fulfilled, (state) => {
				state.isLoadingUpload = false;
				if (state.stage) {
					state.stage = {
						...state.stage,
						team_file_count: state.stage.team_file_count + 1,
					};
				}
				state.isOpenUploadLinkPopup = false;
			})
			.addCase(actions.uploadLinkAction.rejected, (state, action) => {
				state.isLoadingUpload = false;
				state.error = action.error?.message || 'Не загрузить ссылку';
			})
			.addCase(actions.uploadFileAction.pending, (state) => {
				state.isLoadingUpload = true;
				state.error = null;
			})
			.addCase(actions.uploadFileAction.fulfilled, (state) => {
				state.isLoadingUpload = false;
				if (state.stage) {
					state.stage = {
						...state.stage,
						team_file_count: state.stage.team_file_count + 1,
					};
				}
				state.isOpenUploadFilePopup = false;
			})
			.addCase(actions.uploadFileAction.rejected, (state, action) => {
				state.isLoadingUpload = false;
				state.error = action.error?.message || 'Не загрузить файл';
			})
			.addCase(actions.uploadVideoAction.pending, (state) => {
				state.isLoadingUpload = true;
				state.error = null;
			})
			.addCase(actions.uploadVideoAction.fulfilled, (state, action) => {
				state.isLoadingUpload = false;
				if (state.stage) {
					state.stage.team_videos.push(action.payload);
				}
				state.isOpenUploadVideoPopup = false;
			})
			.addCase(actions.uploadVideoAction.rejected, (state, action) => {
				state.isLoadingUpload = false;
				state.error = action.error?.message || 'Не загрузить ссылку';
			});
	},
});

export const {
	setCurrentStage,
	setCurrentPath,
	setStageTemplate,
	setStageVideo,
	setUploadLinkPopupOpen,
	setUploadFilePopupOpen,
	setUploadVideoPopupOpen,
} = mainSlice.actions;
