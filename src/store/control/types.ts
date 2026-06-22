export interface IControlStore {
	cases: IRegisteredCase[];
	teams: IControlTeam[];
	isLoading: boolean;
	error: string | null;
}

export interface IRegisteredCase {
	id: string;
	situation: string;
	problem: string;
	title: string;
	icon: string;
	company: string;
}

export interface IControlTeam {
	id: number;
	date_joined: string;
	current_stage: IControlStage;
	name: string;
	case: IControlCase;
	participants: IControlParticipant[];
	university: IControlUniversity;
}

export interface IControlStage {
	id: number;
	is_active: boolean;
	is_completed: boolean;
	name: string;
	position: number;
}

export interface IControlCase {
	id: string;
	title: string;
}

export interface IControlUniversity {
	id: number;
	name: string;
	short_name: string;
}

export interface IControlParticipant {
	id: number;
	full_name: string;
	subdivision: string;
}

export interface IInstituteStat {
	university: string;
	totalTeams: number;
	percentOfTotal: number;
	[caseTitle: string]: string | number;
}

export interface IInstituteStages {
	university: string;
	totalTeams: number;
	percentOfTotal: number;
	percentProgress: number;
	stage1: number;
	stage2: number;
	stage3: number;
	stage4: number;
	stage5: number;
	stage6: number;
}

export interface IRegistrationStat {
	date: string;
	dailyCount: number;
	cumulativeCount: number;
	percentOfTotal: number;
}
