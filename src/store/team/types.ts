export interface ITeamStore {
	registrationStages: {
		team: boolean;
		problem: boolean;
		participant: boolean;
		personData: boolean;
	};
	isLoading: boolean;
	error: string | null;
}

export interface IMessageResponse {
	id?: number;
	message: string;
}
