import type { IControlTeam, IRegisteredCase } from './types';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { getTeams, getRegisteredCases } from '../../shared/api/control';

export const getTeamsAction = createAsyncThunk<IControlTeam[]>(
	'catalog/getTeams',
	getTeams
);

export const getRegisteredCasesAction = createAsyncThunk<IRegisteredCase[]>(
	'catalog/getRegisteredCases',
	getRegisteredCases
);
