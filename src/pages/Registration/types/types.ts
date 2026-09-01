import type { IUniversity, IProblem } from '../../../store/catalog/types';

export interface ISubdivisionOption {
	id: string;
	name: string;
}

export interface IParticipantForm {
	last_name: string;
	first_name: string;
	middle_name: string;
	level: number | null;
	group_name: string;
	email: string;
	phone: string;
	subdivision: ISubdivisionOption | null;
}

export interface IParticipantData {
	id: string;
	last_name: string;
	first_name: string;
	middle_name: string;
	level: number;
	group_name: string;
	email: string;
	phone: string;
	subdivision: string;
}

export interface IRegisterForm {
	name: string;
	login: string;
	password: string;
	university: IUniversity | null;
	case: IProblem | null;
	tutor_fullname: string;
	tutor_email: string;
	participants: IParticipantData[];
	isConfirmOne: boolean;
	isConfirmTwo: boolean;
	isConfirmThree: boolean;
	isConfirmFour: boolean;
}

export interface IRegisterData {
	name: string;
	login: string;
	password: string;
	university: number;
	case: string;
	tutor_fullname: string;
	tutor_email: string;
	participants: IParticipantData[];
}

export interface IParticipantFormProps {
	onSubmit: (data: IParticipantData) => void;
	initialData?: IParticipantData | null;
	universityId: number | null;
}
