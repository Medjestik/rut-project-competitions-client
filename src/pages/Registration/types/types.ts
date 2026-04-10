import type { IUniversity, IProblem } from '../../../store/catalog/types';

export interface IParticipantForm {
	last_name: string;
	first_name: string;
	middle_name: string;
	level: number | null;
	group_name: string;
	email: string;
	phone: string;
}

export interface IParticipantData {
	id: string;
	last_name: string;
	first_name: string;
	middle_name?: string;
	level: number;
	group_name: string;
	email: string;
	phone: string;
}

export interface IRegisterForm {
	name: string;
	login: string;
	password: string;
	university: IUniversity | null;
	case: IProblem | null;
	code: string;
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
	promocode: string;
	participants: IParticipantData[];
}

export interface IParticipantFormProps {
	onSubmit: (participant: IParticipantData) => void;
	initialData?: IParticipantData | null;
}
