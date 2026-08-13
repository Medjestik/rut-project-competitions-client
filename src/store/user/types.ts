import type { IUniversity, IProblem } from '../catalog/types';

export interface IAuthResponse {
	key: string;
}

export interface IUser {
	id: number;
	name: string;
	current_stage: number | null;
	role: string;
	tutor_email: string;
	tutor_fullname: string;
	university: IUniversity;
	case: IProblem;
	passed: boolean;
}

export interface IUserStore {
	user: IUser | null;
	isAuthChecked: boolean;
	isLoading: boolean;
	isLoadingRequest: boolean;
	error: string | null;
}

export interface ITokenRequest {
	token: string;
}

export interface IMessageResponse {
	id?: number;
	message: string;
}
