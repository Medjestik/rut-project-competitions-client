import type { IRegisterForm, IParticipantForm } from '../types/types';
import type { TFormValidationErrors } from '../../../shared/components/Form/types/types';

import {
	required,
	emailFormat,
	minLength,
	maxLength,
} from '../../../shared/lib/validationRules';
import { PARTICIPANTS_COUNT } from './lib';

export const validationRegistrationSchema = {
	name: [
		required('validation.required'),
		minLength(3, 'validation.min.length.3'),
		maxLength(25, 'validation.max.length.25'),
	],
	login: [
		required('validation.required'),
		minLength(6, 'validation.min.length.6'),
		maxLength(16, 'validation.max.length.16'),
	],
	password: [
		required('validation.required'),
		minLength(6, 'validation.min.length.6'),
		maxLength(16, 'validation.max.length.16'),
	],
	code: [required('validation.required')],
};

export const validationParticipantSchema = {
	last_name: [required('validation.required')],
	first_name: [required('validation.required')],
	level: [required('validation.required')],
	group_name: [required('validation.required')],
	email: [required('validation.required'), emailFormat('validation.email')],
	phone: [required('validation.required')],
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

export const getStagesValidation = (
	values: IRegisterForm,
	errors: TFormValidationErrors
) => {
	return {
		team:
			values.name.trim().length > 0 &&
			values.login.trim().length > 0 &&
			values.password.trim().length > 0 &&
			!!values.university &&
			!errors.name &&
			!errors.login &&
			!errors.password,

		problem: !!values.case && !errors.case,

		participant:
			values.participants.length === PARTICIPANTS_COUNT && !errors.participants,

		personData:
			values.code.trim().length > 0 &&
			values.isConfirmOne &&
			values.isConfirmTwo &&
			values.isConfirmThree &&
			values.isConfirmFour &&
			!errors.code,
	};
};
