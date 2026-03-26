import type { IProgramsStore, IBatch } from './types';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as actions from './actions';

const initialState: IProgramsStore = {
	programs: [],
	streams: [],
	currentProgram: null,
	currentBatch: null,
	isLoadingPrograms: false,
	isLoadingAction: false,
	error: null,
};

export const programsSlice = createSlice({
	name: 'programs',
	initialState,
	reducers: {
		setCurrentProgram(
			state,
			action: PayloadAction<{ name: string; id: number } | null>
		) {
			state.currentProgram = action.payload;
		},
		setCurrentBatch(state, action: PayloadAction<IBatch | null>) {
			state.currentBatch = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(actions.getProgramsAction.pending, (state) => {
				state.isLoadingPrograms = true;
				state.error = null;
			})
			.addCase(actions.getProgramsAction.fulfilled, (state, action) => {
				state.isLoadingPrograms = false;
				state.programs = action.payload;
			})
			.addCase(actions.getProgramsAction.rejected, (state, action) => {
				state.isLoadingPrograms = false;
				state.error = action.error?.message || 'Не удалось загрузить программы';
			})
			.addCase(actions.getStreamsAction.pending, (state) => {
				state.isLoadingPrograms = true;
				state.error = null;
			})
			.addCase(actions.getStreamsAction.fulfilled, (state, action) => {
				state.isLoadingPrograms = false;
				state.streams = action.payload;
			})
			.addCase(actions.getStreamsAction.rejected, (state, action) => {
				state.isLoadingPrograms = false;
				state.error = action.error?.message || 'Не удалось загрузить программы';
			})
			.addCase(actions.subscribeAction.pending, (state) => {
				state.isLoadingAction = true;
				state.error = null;
			})
			.addCase(actions.subscribeAction.fulfilled, (state) => {
				state.isLoadingAction = false;
			})
			.addCase(actions.subscribeAction.rejected, (state, action) => {
				state.isLoadingAction = false;
				state.error = action.error?.message || 'Произошла ошибка';
			})
			.addCase(actions.subscribeWithBranchAction.pending, (state) => {
				state.isLoadingAction = true;
				state.error = null;
			})
			.addCase(actions.subscribeWithBranchAction.fulfilled, (state) => {
				state.isLoadingAction = false;
			})
			.addCase(actions.subscribeWithBranchAction.rejected, (state, action) => {
				state.isLoadingAction = false;
				state.error = action.error?.message || 'Произошла ошибка';
			});
	},
});

export const { setCurrentProgram, setCurrentBatch } = programsSlice.actions;
