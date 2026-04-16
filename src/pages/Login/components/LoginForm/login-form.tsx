import type { FC, FormEvent } from 'react';
import type { ILoginForm } from '../../types/types';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from '../../../../store/store';
import { useForm } from '../../../../hooks/useForm';
import { useToast } from '../../../../shared/components/ToastProvider/ui/ToastProvider';
import { useTranslation } from 'react-i18next';

import { Form } from '../../../../shared/components/Form/ui/form';
import {
	FormField,
	FormInput,
	FormButtons,
} from '../../../../shared/components/Form/components';
import { Button } from '../../../../shared/components/Button/ui/button';
import { Card } from '../../../../shared/components/Card/ui';

import {
	initialLoginValues,
	validationSchema,
	shouldBlockSubmit,
} from '../../lib/helpers';
import { loginUser } from '../../../../store/user/actions';
import { getErrorMessage } from '../../../../shared/lib/getErrorMessage';

export const LoginForm: FC = () => {
	const dispatch = useDispatch();
	const { showToast } = useToast();
	const { isLoading } = useSelector((state) => state.user);
	const [isBlockSubmit, setIsBlockSubmit] = useState<boolean>(true);
	const { t } = useTranslation();

	const { values, handleChange, errors } = useForm<ILoginForm>(
		initialLoginValues,
		validationSchema
	);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isBlockSubmit) {
			try {
				await dispatch(loginUser(values)).unwrap();
			} catch (err) {
				showToast({
					title: 'Ошибка авторизации',
					text: getErrorMessage(err),
					type: 'error',
				});
			}
		}
	};

	useEffect(() => {
		setIsBlockSubmit(shouldBlockSubmit(values, errors));
	}, [values, errors]);

	return (
		<Card
			title={t('login-form-title')}
			titleSize='large'
			subtitle={t('login-form-subtitle')}>
			<Form name='form-login' onSubmit={handleSubmit}>
				<FormField
					title={t('login-form-input-title-login')}
					fieldError={{
						text: errors.login ? t(errors.login) : '',
						isShow: !!errors.login,
					}}>
					<FormInput
						name='login'
						placeholder={t('login-form-input-placeholder-login')}
						value={values.login}
						onChange={handleChange}
					/>
				</FormField>
				<FormField
					title={t('login-form-input-title-password')}
					fieldError={{
						text: errors.password ? t(errors.password) : '',
						isShow: !!errors.password,
					}}>
					<FormInput
						type='password'
						name='password'
						placeholder={t('login-form-input-placeholder-password')}
						value={values.password}
						onChange={handleChange}
						autoComplete='on'
					/>
				</FormField>
				<FormButtons>
					<Button
						type='submit'
						text={t('login-button')}
						color='gradient'
						isBlock={isBlockSubmit || isLoading}
					/>
				</FormButtons>
			</Form>
		</Card>
	);
};
