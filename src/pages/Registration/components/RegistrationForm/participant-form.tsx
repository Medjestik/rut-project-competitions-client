import type { FC, FormEvent } from 'react';
import type {
	IParticipantForm,
	IParticipantData,
	IParticipantFormProps,
} from '../../types/types';

import { useState, useEffect } from 'react';
import { useForm } from '../../../../hooks/useForm';

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
				title='Фамилия'
				fieldError={{
					text: errors.last_name || '',
					isShow: !!errors.last_name,
				}}>
				<FormInput
					name='last_name'
					placeholder='Введите фамилию'
					value={values.last_name}
					onChange={handleChange}
				/>
			</FormField>
			<FormField
				title='Имя'
				fieldError={{
					text: errors.first_name || '',
					isShow: !!errors.first_name,
				}}>
				<FormInput
					name='first_name'
					placeholder='Введите имя'
					value={values.first_name}
					onChange={handleChange}
				/>
			</FormField>
			<FormField title='Отчество (при наличии)'>
				<FormInput
					name='middle_name'
					placeholder='Введите отчество'
					value={values.middle_name}
					onChange={handleChange}
				/>
			</FormField>
			<FormField
				title='Курс'
				fieldError={{
					text: errors.level || '',
					isShow: !!errors.level,
				}}>
				<FormInputNumber
					name='level'
					placeholder='Введите курс'
					value={values.level}
					onChange={handleChange}
				/>
			</FormField>
			<FormField
				title='Учебная группа'
				fieldError={{
					text: errors.group_name || '',
					isShow: !!errors.group_name,
				}}>
				<FormInput
					name='group_name'
					placeholder='Введите учебную группу'
					value={values.group_name}
					onChange={handleChange}
				/>
			</FormField>
			<FormField
				title='Электронная почта'
				fieldError={{
					text: errors.email || '',
					isShow: !!errors.email,
				}}>
				<FormInput
					name='email'
					placeholder='Введите электронную почту'
					value={values.email}
					onChange={handleChange}
				/>
			</FormField>
			<FormField
				title='Телефон'
				fieldError={{
					text: errors.phone || '',
					isShow: !!errors.phone,
				}}>
				<FormInput
					name='phone'
					placeholder='Введите номер телефона'
					value={values.phone}
					onChange={handleChange}
				/>
			</FormField>
			<FormButtons>
				<Button
					type='submit'
					text='Сохранить'
					color='gradient'
					isBlock={isBlockSubmit}
				/>
			</FormButtons>
		</Form>
	);
};
