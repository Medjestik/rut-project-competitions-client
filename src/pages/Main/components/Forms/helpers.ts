import type {
	IUploadLinkForm,
	IUploadFileForm,
	IUploadVideoForm,
} from './types';
import type { TFormValidationErrors } from '../../../../shared/components/Form/types/types';

import {
	required,
	minLength,
	maxLength,
	linkFormat,
} from '../../../../shared/lib/validationRules';

export const validationSchema = {
	title: [
		required('validation.required'),
		minLength(3, 'validation.min.length.3'),
		maxLength(25, 'validation.max.length.25'),
	],
	link: [required('validation.required'), linkFormat('validation.email')],
};

export const initialUploadLinkFormValues: IUploadLinkForm = {
	title: '',
	link: '',
	isConfirmLink: false,
};

export const initialUploadFileFormValues: IUploadFileForm = {
	title: '',
	file: '',
	fileName: '',
};

export const initialUploadVideoFormValues: IUploadVideoForm = {
	link: '',
	isConfirmLink: false,
};

export const shouldBlockLinkFormSubmit = (
	values: IUploadLinkForm,
	errors: TFormValidationErrors
): boolean => {
	return (
		!values.title.trim() ||
		!!errors.title ||
		!values.link.trim() ||
		!!errors.link ||
		!values.isConfirmLink
	);
};

export const shouldBlockFileFormSubmit = (
	values: IUploadFileForm,
	errors: TFormValidationErrors
): boolean => {
	return !values.title.trim() || !!errors.title || !values.file;
};

export const shouldBlockVideoFormSubmit = (
	values: IUploadVideoForm,
	errors: TFormValidationErrors
): boolean => {
	return !values.link.trim() || !!errors.link || !values.isConfirmLink;
};
