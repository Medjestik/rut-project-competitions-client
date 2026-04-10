import type { ICatalogStore } from './types';

import { createSlice } from '@reduxjs/toolkit';

import * as actions from './actions';

const initialState: ICatalogStore = {
	universities: [],
	problems: [],
	isLoadingCatalog: false,
	error: null,
};

export const catalogSlice = createSlice({
	name: 'catalog',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(actions.getUniversitiesAction.pending, (state) => {
				state.isLoadingCatalog = true;
				state.error = null;
			})
			.addCase(actions.getUniversitiesAction.fulfilled, (state, action) => {
				state.isLoadingCatalog = false;
				state.universities = action.payload;
			})
			.addCase(actions.getUniversitiesAction.rejected, (state, action) => {
				state.isLoadingCatalog = false;
				state.error = action.error?.message || 'Не удалось загрузить каталог';
			})
			.addCase(actions.getProblemsAction.pending, (state) => {
				state.isLoadingCatalog = true;
				state.error = null;
			})
			.addCase(actions.getProblemsAction.fulfilled, (state, action) => {
				state.isLoadingCatalog = false;
				state.problems = action.payload;
			})
			.addCase(actions.getProblemsAction.rejected, (state, action) => {
				state.isLoadingCatalog = false;
				state.error = action.error?.message || 'Не удалось загрузить каталог';
			});
	},
});
