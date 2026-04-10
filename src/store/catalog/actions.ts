import type { IUniversity, IProblem } from './types';

import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	getUniversitiesCatalog,
	getProblemsCatalog,
} from '../../shared/api/catalog';

export const getUniversitiesAction = createAsyncThunk<IUniversity[], string>(
	'catalog/getUniversities',
	async (scope) => {
		return getUniversitiesCatalog(scope);
	}
);

export const getProblemsAction = createAsyncThunk<IProblem[]>(
	'catalog/getProblems',
	getProblemsCatalog
);
