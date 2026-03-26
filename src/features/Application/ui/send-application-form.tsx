import type { FC, FormEvent } from 'react';
import type {
	ISendApplicationFormProps,
	IApplicationForm,
} from '../types/types';

import { useForm } from '../../../hooks/useForm';
import { useDispatch } from '../../../store/store';
import { useToast } from '../../../shared/components/ToastProvider/ui/ToastProvider';

import { Form } from '../../../shared/components/Form/ui/form';
import {
	FormField,
	FormInput,
} from '../../../shared/components/Form/components';
import { Button } from '../../../shared/components/Button/ui/button';
import { Checkbox } from '../../../shared/components/Checkbox/ui/checkbox';

import {
	validationSchema,
	initialFormValues,
	shouldBlockSubmit,
} from '../lib/helpers';
import { getErrorMessage } from '../../../shared/lib/getErrorMessage';
import { subscribeAction } from '../../../store/programs/actions';

import styles from '../styles/send-application-form.module.scss';

export const SendApplicationForm: FC<ISendApplicationFormProps> = ({
	direction = 'column',
	onSubmit,
}) => {
	const dispatch = useDispatch();
	const { showToast } = useToast();
	const { values, handleChange, handleCheckboxToggle, errors } =
		useForm<IApplicationForm>(initialFormValues, validationSchema);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isBlockSubmit) {
			const data = {
				name: values.name,
				phone: values.phone,
				email: values.email,
			};
			try {
				await dispatch(subscribeAction(data))
					.unwrap()
					.then(() => {
						onSubmit();
						showToast({
							title: 'Отправлено',
							text: 'Заявка успешно отправлена, скоро с вами свяжется наш специалист.',
							type: 'success',
						});
					});
			} catch (err) {
				showToast({
					title: 'Ошибка при отправке заявки',
					text: getErrorMessage(err),
					type: 'error',
				});
			}
		}
	};

	const isBlockSubmit = shouldBlockSubmit(values, errors);

	return (
		<div className={styles.container}>
			<div className={styles.form}>
				<Form
					name='send-application-form'
					onSubmit={handleSubmit}
					direction={direction}>
					<FormField
						fieldError={{ text: errors.name || '', isShow: !!errors.name }}>
						<FormInput
							name='name'
							placeholder='Имя'
							value={values.name}
							onChange={handleChange}
						/>
					</FormField>
					<FormField
						fieldError={{ text: errors.phone || '', isShow: !!errors.phone }}>
						<FormInput
							name='phone'
							placeholder='Телефон'
							value={values.phone}
							onChange={handleChange}
						/>
					</FormField>
					<FormField
						fieldError={{ text: errors.email || '', isShow: !!errors.email }}>
						<FormInput
							name='email'
							placeholder='Электронная почта'
							value={values.email}
							onChange={handleChange}
						/>
					</FormField>
					<Button
						text='Получить консультацию'
						type='submit'
						color='blue'
						isBlock={isBlockSubmit}
						width='full'
					/>
				</Form>
				<Checkbox
					checked={values.agreement}
					onChange={() => handleCheckboxToggle('agreement')}
					label='Я даю согласие на обработку персональных данных и соглашаюсь с политикой конфиденциальности'
				/>
			</div>
			<span className={styles.caption}>
				Мы не передаём данные третьим лицам и используем их только для связи по
				вопросам обучения.
			</span>
		</div>
	);
};
