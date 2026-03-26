import type { IProgram, IStream } from './types';
import type {
	IApplication,
	IApplicationWithBranch,
} from '../../features/Application/types/types';

import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	getPrograms,
	getStreams,
	subscribe,
	subscribeWithBranch,
} from '../../shared/api/programs';

export const getProgramsAction = createAsyncThunk<IProgram[]>(
	'programs/getPrograms',
	getPrograms
);

export const getStreamsAction = createAsyncThunk<IStream[]>(
	'programs/getStreams',
	getStreams
);

export const subscribeAction = createAsyncThunk<IApplication, IApplication>(
	'programs/subscribe',
	subscribe
);

export const subscribeWithBranchAction = createAsyncThunk<
	IApplicationWithBranch,
	IApplicationWithBranch
>('programs/subscribeWithBranch', subscribeWithBranch);
