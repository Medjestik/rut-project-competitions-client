export interface IApplication {
	name: string;
	phone: string;
	email: string;
}

export interface IApplicationWithBranch {
	full_name: string;
	program: number;
	batch: number | null;
	email: string;
	phone: string;
	comment: string;
}

export interface IApplicationForm {
	name: string;
	phone: string;
	email: string;
	agreement: boolean;
}

export interface IProgramForm {
	name: string;
	phone: string;
	email: string;
	agreement: boolean;
}

export interface ISendProgramFormProps {
	onSubmit: () => void;
}

export interface ISendApplicationFormProps {
	direction?: 'row' | 'column';
	onSubmit: () => void;
}
