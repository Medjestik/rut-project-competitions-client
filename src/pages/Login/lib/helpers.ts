import type { ILoginForm } from '../types/types';
import type { TFormValidationErrors } from '../../../shared/components/Form/types/types';

import {
	required,
	minLength,
	maxLength,
} from '../../../shared/lib/validationRules';

export const validationSchema = {
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
};

export const initialLoginValues: ILoginForm = {
	login: '',
	password: '',
};

export const shouldBlockSubmit = (
	values: ILoginForm,
	errors: TFormValidationErrors
): boolean => {
	return (
		!values.login.trim() ||
		!!errors.login ||
		!values.password.trim() ||
		!!errors.password
	);
};
