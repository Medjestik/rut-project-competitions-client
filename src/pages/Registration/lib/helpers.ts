import type { IRegisterForm, IParticipantForm } from '../types/types';
import type { TFormValidationErrors } from '../../../shared/components/Form/types/types';

import { required, emailFormat } from '../../../shared/lib/validationRules';
import { PARTICIPANTS_COUNT } from './lib';

export const validationRegistrationSchema = {
	name: [required('Поле не может быть пустым')],
	login: [required('Поле не может быть пустым')],
	password: [required('Поле не может быть пустым')],
	code: [required('Поле не может быть пустым')],
};

export const validationParticipantSchema = {
	last_name: [required('Поле не может быть пустым')],
	first_name: [required('Поле не может быть пустым')],
	level: [required('Поле не может быть пустым')],
	group_name: [required('Поле не может быть пустым')],
	email: [
		required('Поле не может быть пустым'),
		emailFormat('Неправильный формат почты'),
	],
	phone: [required('Поле не может быть пустым')],
};

export const initialParticipantValues: IParticipantForm = {
	last_name: '',
	first_name: '',
	middle_name: '',
	level: null,
	group_name: '',
	email: '',
	phone: '',
};

export const initialRegistrationValues: IRegisterForm = {
	name: '',
	login: '',
	password: '',
	university: null,
	case: null,
	participants: [],
	code: '',
	isConfirmOne: false,
	isConfirmTwo: false,
	isConfirmThree: false,
	isConfirmFour: false,
};

export const shouldBlockParticipantSubmit = (
	values: IParticipantForm,
	errors: TFormValidationErrors
): boolean => {
	return (
		!values.last_name.trim() ||
		!!errors.last_name ||
		!values.first_name.trim() ||
		!!errors.first_name ||
		!values.level ||
		!!errors.level ||
		!values.group_name.trim() ||
		!!errors.group_name ||
		!values.email.trim() ||
		!!errors.email ||
		!values.phone.trim() ||
		!!errors.phone
	);
};

export const shouldBlockRegistrationSubmit = (
	values: IRegisterForm,
	errors: TFormValidationErrors
): boolean => {
	return (
		!values.name.trim() ||
		!!errors.name ||
		!values.login.trim() ||
		!!errors.login ||
		!values.password.trim() ||
		!!errors.password ||
		!values.code.trim() ||
		!!errors.code ||
		values.university === null ||
		values.case === null ||
		values.participants.length !== PARTICIPANTS_COUNT ||
		!values.isConfirmOne ||
		!values.isConfirmTwo ||
		!values.isConfirmThree ||
		!values.isConfirmFour
	);
};

export const getStagesValidation = (values: IRegisterForm) => {
	return {
		team:
			!!values.name &&
			!!values.login &&
			!!values.password &&
			!!values.university,

		problem: !!values.case,

		participant: values.participants.length === PARTICIPANTS_COUNT,

		personData:
			!!values.code &&
			values.isConfirmOne &&
			values.isConfirmTwo &&
			values.isConfirmThree &&
			values.isConfirmFour,
	};
};
