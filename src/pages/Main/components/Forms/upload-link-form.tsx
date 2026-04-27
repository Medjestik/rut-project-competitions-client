import type { FC, FormEvent } from 'react';
import type { IUploadLinkForm, IUploadLinkData } from './types';

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
	initialUploadLinkFormValues,
	validationSchema,
	shouldBlockLinkFormSubmit,
} from './helpers';
import { uploadLinkAction } from '../../../../store/main/actions';
import { getErrorMessage } from '../../../../shared/lib/getErrorMessage';

export const UploadLinkForm: FC = () => {
	const dispatch = useDispatch();
	const { showToast } = useToast();
	const { currentStageId, isLoadingUpload } = useSelector(
		(state) => state.main
	);
	const [isBlockSubmit, setIsBlockSubmit] = useState<boolean>(true);
	const { t } = useTranslation();

	const { values, handleChange, handleSelectChange, errors } =
		useForm<IUploadLinkForm>(initialUploadLinkFormValues, validationSchema);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isBlockSubmit) {
			const data: IUploadLinkData = {
				name: values.title,
				link: values.link,
				stage: currentStageId,
			};
			try {
				await dispatch(uploadLinkAction(data)).unwrap();
				showToast({
					title: t('toasts.success-upload-link.title'),
					text:
						currentStageId === 5 ? '' : t('toasts.success-upload-link.text'),
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
		setIsBlockSubmit(shouldBlockLinkFormSubmit(values, errors));
	}, [values, errors]);

	return (
		<Form name='form-upload-link' onSubmit={handleSubmit}>
			<FormField
				title={t('upload-link-form-input-title-title')}
				fieldError={{
					text: errors.title ? t(errors.title) : '',
					isShow: !!errors.title,
				}}>
				<FormInput
					name='title'
					placeholder={t('upload-link-form-input-placeholder-title')}
					value={values.title}
					onChange={handleChange}
				/>
			</FormField>
			<FormField
				title={t('upload-link-form-input-title-link')}
				fieldError={{
					text: errors.link ? t(errors.link) : '',
					isShow: !!errors.link,
				}}>
				<FormInput
					name='link'
					placeholder={t('upload-link-form-input-placeholder-link')}
					value={values.link}
					onChange={handleChange}
				/>
			</FormField>
			<Checkbox
				label={t('upload-link-form-checkbox')}
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
