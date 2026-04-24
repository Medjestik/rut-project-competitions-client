import type { FC, FormEvent } from 'react';
import type { IUploadVideoForm, IUploadVideoData } from './types';

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
import { Checkbox } from '../../../../shared/components/Checkbox/ui/checkbox';

import {
	initialUploadVideoFormValues,
	validationSchema,
	shouldBlockVideoFormSubmit,
} from './helpers';
import { uploadVideoAction } from '../../../../store/main/actions';
import { getErrorMessage } from '../../../../shared/lib/getErrorMessage';

export const UploadVideoForm: FC = () => {
	const dispatch = useDispatch();
	const { showToast } = useToast();
	const { currentStageId, isLoadingUpload } = useSelector(
		(state) => state.main
	);
	const { user } = useSelector((state) => state.user);
	const [isBlockSubmit, setIsBlockSubmit] = useState<boolean>(true);
	const { t } = useTranslation();

	const { values, handleChange, handleSelectChange, errors } =
		useForm<IUploadVideoForm>(initialUploadVideoFormValues, validationSchema);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isBlockSubmit && user) {
			const data: IUploadVideoData = {
				name: `Видеозащита команды «${user.name}»`,
				link: values.link,
				stage: currentStageId,
			};
			try {
				await dispatch(uploadVideoAction(data)).unwrap();
				showToast({
					title: t('toasts.success-upload-link.title'),
					text: t('toasts.success-upload-link.text'),
					type: 'success',
				});
			} catch (err) {
				console.error(err);
				showToast({
					title: t('toasts.error-upload-link.title'),
					text: getErrorMessage(err),
					type: 'error',
				});
			}
		}
	};

	useEffect(() => {
		setIsBlockSubmit(shouldBlockVideoFormSubmit(values, errors));
	}, [values, errors]);

	return (
		<Form name='form-upload-video' onSubmit={handleSubmit}>
			<FormField
				title={t('upload-video-form-input-title-link')}
				fieldError={{
					text: errors.link ? t(errors.link) : '',
					isShow: !!errors.link,
				}}>
				<FormInput
					name='link'
					placeholder={t('upload-video-form-input-placeholder-link')}
					value={values.link}
					onChange={handleChange}
				/>
			</FormField>
			<Checkbox
				label={t('upload-video-form-checkbox')}
				checked={values.isConfirmLink}
				onChange={() =>
					handleSelectChange('isConfirmLink', !values.isConfirmLink)
				}></Checkbox>
			<FormButtons>
				<Button
					type='submit'
					text={t('upload-button')}
					color='gradient'
					isBlock={isBlockSubmit || isLoadingUpload}
				/>
			</FormButtons>
		</Form>
	);
};
