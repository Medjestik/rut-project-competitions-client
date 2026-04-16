export interface IAuthResponse {
	key: string;
}

export interface IUser {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	middle_name: string;
	role: string;
	phone: string;
	department: {
		id: number;
		name: string;
		short_name: string;
	};
	institute_code: string | null;
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
