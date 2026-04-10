import type { ITeamStore } from './types';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as actions from './actions';

const initialState: ITeamStore = {
	registrationStages: {
		team: false,
		problem: false,
		participant: false,
		personData: false,
	},
	isLoading: false,
	error: null,
};

export const teamSlice = createSlice({
	name: 'team',
	initialState,
	reducers: {
		setRegistrationStages(
			state,
			action: PayloadAction<ITeamStore['registrationStages']>
		) {
			state.registrationStages = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(actions.registrationAction.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(actions.registrationAction.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(actions.registrationAction.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error?.message || 'Ошибка при регистрации';
			});
	},
});

export const { setRegistrationStages } = teamSlice.actions;
