import type { FC, FormEvent } from 'react';
import type {
	IParticipantForm,
	IParticipantData,
	IParticipantFormProps,
} from '../../types/types';

import { useState, useEffect } from 'react';
import { useForm } from '../../../../hooks/useForm';
import { useTranslation } from 'react-i18next';

import { Form } from '../../../../shared/components/Form/ui/form';
import {
	FormField,
	FormInput,
	FormInputNumber,
	FormButtons,
} from '../../../../shared/components/Form/components';
import { Button } from '../../../../shared/components/Button/ui/button';

import {
	initialParticipantValues,
	validationParticipantSchema,
	shouldBlockParticipantSubmit,
} from '../../lib/helpers';

export const ParticipantForm: FC<IParticipantFormProps> = ({
	onSubmit,
	initialData,
}) => {
	const { values, handleChange, setValues, errors } = useForm<IParticipantForm>(
		initialParticipantValues,
		validationParticipantSchema
	);
	const [isBlockSubmit, setIsBlockSubmit] = useState<boolean>(true);
	const { t } = useTranslation();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data: IParticipantData = {
			id: initialData?.id ?? crypto.randomUUID(),
			last_name: values.last_name,
			first_name: values.first_name,
			middle_name: values.middle_name || '',
			level: values.level ?? 0,
			group_name: values.group_name,
			email: values.email,
			phone: values.phone,
		};

		onSubmit(data);
	};

	useEffect(() => {
		setIsBlockSubmit(shouldBlockParticipantSubmit(values, errors));
	}, [values, errors]);

	useEffect(() => {
		if (initialData) {
			setValues({
				last_name: initialData.last_name,
				first_name: initialData.first_name,
				middle_name: initialData.middle_name || '',
				level: initialData.level,
				group_name: initialData.group_name,
				email: initialData.email,
				phone: initialData.phone,
			});
		}
	}, [initialData]);

	return (
		<Form name='form-participant' onSubmit={handleSubmit}>
			<FormField
				title={t('participant-form-input-title-lastname')}
				fieldError={{
					text: errors.last_name ? t(errors.last_name) : '',
					isShow: !!errors.last_name,
				}}>
				<FormInput
					name='last_name'
					placeholder={t('participant-form-input-placeholder-lastname')}
					value={values.last_name}
					onChange={handleChange}
				/>
			</FormField>
			<FormField
				title={t('participant-form-input-title-firstname')}
				fieldError={{
					text: errors.first_name ? t(errors.first_name) : '',
					isShow: !!errors.first_name,
				}}>
				<FormInput
					name='first_name'
					placeholder={t('participant-form-input-placeholder-firstname')}
					value={values.first_name}
					onChange={handleChange}
				/>
			</FormField>
			<FormField title={t('participant-form-input-title-middlename')}>
				<FormInput
					name='middle_name'
					placeholder={t('participant-form-input-placeholder-middlename')}
					value={values.middle_name}
					onChange={handleChange}
				/>
			</FormField>
			<FormField
				title={t('participant-form-input-title-level')}
				caption={t('participant-form-input-caption-level')}
				fieldError={{
					text: errors.level ? t(errors.level) : '',
					isShow: !!errors.level,
				}}>
				<FormInputNumber
					name='level'
					placeholder={t('participant-form-input-placeholder-level')}
					value={values.level}
					onChange={handleChange}
				/>
			</FormField>
			<FormField
				title={t('participant-form-input-title-group-name')}
				caption={t('participant-form-input-caption-group-name')}
				fieldError={{
					text: errors.group_name ? t(errors.group_name) : '',
					isShow: !!errors.group_name,
				}}>
				<FormInput
					name='group_name'
					placeholder={t('participant-form-input-placeholder-group-name')}
					value={values.group_name}
					onChange={handleChange}
				/>
			</FormField>
			<FormField
				title={t('participant-form-input-title-group-email')}
				fieldError={{
					text: errors.email ? t(errors.email) : '',
					isShow: !!errors.email,
				}}>
				<FormInput
					name='email'
					placeholder={t('participant-form-input-placeholder-group-email')}
					value={values.email}
					onChange={handleChange}
				/>
			</FormField>
			<FormField
				title={t('participant-form-input-title-group-phone')}
				fieldError={{
					text: errors.phone ? t(errors.phone) : '',
					isShow: !!errors.phone,
				}}>
				<FormInput
					name='phone'
					placeholder={t('participant-form-input-placeholder-group-phone')}
					value={values.phone}
					onChange={handleChange}
				/>
			</FormField>
			<FormButtons>
				<Button
					type='submit'
					text={t('save-button')}
					color='gradient'
					isBlock={isBlockSubmit}
				/>
			</FormButtons>
		</Form>
	);
};
