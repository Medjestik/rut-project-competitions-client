import type { IRegisterData } from '../../pages/Registration/types/types';
import type { IMessageResponse } from './types';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { registration } from '../../shared/api/team';

export const registrationAction = createAsyncThunk<
	IMessageResponse,
	IRegisterData
>('user/login', registration);
