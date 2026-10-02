import type { IExpertStore } from './types';

import { createSlice } from '@reduxjs/toolkit';

import * as actions from './actions';

const initialState: IExpertStore = {
	cases: [],
	teams: [],
	criterias: [],
	isLoadingCases: false,
	isLoadingTeams: false,
	isLoadingScore: false,
	isSaving: false,
	error: null,
};

export const expertSlice = createSlice({
	name: 'expert',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(actions.getExpertCasesAction.pending, (state) => {
				state.isLoadingCases = true;
				state.error = null;
			})
			.addCase(actions.getExpertCasesAction.fulfilled, (state, action) => {
				state.isLoadingCases = false;
				state.cases = action.payload;
			})
			.addCase(actions.getExpertCasesAction.rejected, (state, action) => {
				state.isLoadingCases = false;
				state.error = action.error?.message || 'Не удалось загрузить проблемы';
			})
			.addCase(actions.getExpertTeamsAction.pending, (state) => {
				state.isLoadingTeams = true;
				state.error = null;
			})
			.addCase(actions.getExpertTeamsAction.fulfilled, (state, action) => {
				state.isLoadingTeams = false;
				state.teams = action.payload;
			})
			.addCase(actions.getExpertTeamsAction.rejected, (state, action) => {
				state.isLoadingTeams = false;
				state.error = action.error?.message || 'Не удалось загрузить работы';
			})
			.addCase(actions.getExpertScoreAction.pending, (state) => {
				state.isLoadingScore = true;
				state.error = null;
			})
			.addCase(actions.getExpertScoreAction.fulfilled, (state, action) => {
				state.isLoadingScore = false;
				state.criterias = action.payload.criterias;
			})
			.addCase(actions.getExpertScoreAction.rejected, (state, action) => {
				state.isLoadingScore = false;
				state.error = action.error?.message || 'Не удалось загрузить оценку';
			})
			.addCase(actions.submitExpertScoresAction.pending, (state) => {
				state.isSaving = true;
				state.error = null;
			})
			.addCase(actions.submitExpertScoresAction.fulfilled, (state) => {
				state.isSaving = false;
			})
			.addCase(actions.submitExpertScoresAction.rejected, (state, action) => {
				state.isSaving = false;
				state.error = action.error?.message || 'Не удалось сохранить оценку';
			});
	},
});
