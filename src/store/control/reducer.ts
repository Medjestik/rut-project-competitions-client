import type { IControlStore } from './types';

import { createSlice } from '@reduxjs/toolkit';

import * as actions from './actions';

const initialState: IControlStore = {
	cases: [],
	teams: [],
	isLoading: false,
	error: null,
};

export const controlSlice = createSlice({
	name: 'control',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(actions.getTeamsAction.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(actions.getTeamsAction.fulfilled, (state, action) => {
				state.isLoading = false;
				state.teams = action.payload;
			})
			.addCase(actions.getTeamsAction.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error?.message || 'Не удалось загрузить команды';
			})
			.addCase(actions.getRegisteredCasesAction.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(actions.getRegisteredCasesAction.fulfilled, (state, action) => {
				state.isLoading = false;
				state.cases = action.payload;
			})
			.addCase(actions.getRegisteredCasesAction.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error?.message || 'Не удалось загрузить проблемы';
			});
	},
});
