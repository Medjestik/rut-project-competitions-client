import type { IApplicationForm } from '../types/types';

import {
	required,
	phoneFormat,
	emailFormat,
} from '../../../shared/lib/validationRules';

export const validationSchema = {
	name: [required('Введите имя')],
	phone: [
		required('Введите номер телефона'),
		phoneFormat('Неверный формат номера телефона'),
	],
	email: [
		required('Введите электронную почту'),
		emailFormat('Неверный формат электронной почты'),
	],
};

export const initialFormValues: IApplicationForm = {
	name: '',
	phone: '',
	email: '',
	agreement: false,
};

export const shouldBlockSubmit = (
	values: IApplicationForm,
	errors: Record<string, string | undefined>
): boolean => {
	return (
		!values.name.trim() ||
		!!errors.name ||
		!values.phone.trim() ||
		!!errors.phone ||
		!values.email.trim() ||
		!!errors.email ||
		!values.agreement
	);
};
