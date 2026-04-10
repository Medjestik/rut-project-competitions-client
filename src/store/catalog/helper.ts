import type { IUniversity } from './types';

export const getUniversityLabel = (u: IUniversity) =>
	`${u.name}${u.country ? ` (${u.country})` : ''}`;
