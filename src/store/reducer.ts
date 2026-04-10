import { combineSlices } from '@reduxjs/toolkit';
import { userSlice } from './user/reducer';
import { teamSlice } from './team/reducer';
import { catalogSlice } from './catalog/reducer';

export const rootReducer = combineSlices(userSlice, teamSlice, catalogSlice);
