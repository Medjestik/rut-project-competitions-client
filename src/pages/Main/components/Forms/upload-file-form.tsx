import type { FC, FormEvent } from 'react';
import type { IUploadFileData, IUploadFileForm } from './types';

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

import {
	initialUploadFileFormValues,
	validationSchema,
	shouldBlockFileFormSubmit,
} from './helpers';
import { GetBase64File } from '../../../../shared/lib/getBase64File';
import { uploadFileAction } from '../../../../store/main/actions';
import { getErrorMessage } from '../../../../shared/lib/getErrorMessage';

import styles from '../../../../shared/components/Form/styles/form.module.scss';

export const UploadFileForm: FC = () => {
	const dispatch = useDispatch();
	const { showToast } = useToast();
	const { currentStageId, isLoadingUpload } = useSelector(
		(state) => state.main
	);
	const [isBlockSubmit, setIsBlockSubmit] = useState<boolean>(true);
	const { t } = useTranslation();

	const { values, handleChange, setFieldValue, errors } =
		useForm<IUploadFileForm>(initialUploadFileFormValues, validationSchema);

	const [fileError, setFileError] = useState<{
		isShow: boolean;
		text: string;
	}>({
		isShow: false,
		text: '',
	});

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isBlockSubmit) {
			const data: IUploadFileData = {
				name: values.title,
				file: values.file,
				fileName: values.fileName,
				stage: currentStageId,
			};
			try {
				await dispatch(uploadFileAction(data)).unwrap();
				showToast({
					title: t('toasts.success-upload-file.title'),
					text: t('toasts.success-upload-file.text'),
					type: 'success',
				});
			} catch (err) {
				console.error(err);
				showToast({
					title: t('toasts.error-upload-file.title'),
					text: getErrorMessage(err),
					type: 'error',
				});
			}
		}
	};

	const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setFileError({ isShow: false, text: '' });

		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];

			if (file.size > 10 * 1024 * 1024) {
				setFileError({
					isShow: true,
					text: t('validation.file.size'),
				});
				return;
			}

			try {
				const base64 = await GetBase64File(file);

				setFieldValue('file', base64);
				setFieldValue('fileName', file.name);
			} catch (err) {
				console.error(err);
			}
		}
	};

	useEffect(() => {
		setIsBlockSubmit(
			shouldBlockFileFormSubmit(values, errors) || fileError.isShow
		);
	}, [values, errors, fileError]);

	return (
		<Form name='form-upload-file' onSubmit={handleSubmit}>
			<FormField
				title={t('upload-file-form-input-title-title')}
				fieldError={{
					text: errors.title ? t(errors.title) : '',
					isShow: !!errors.title,
				}}>
				<FormInput
					name='title'
					placeholder={t('upload-file-form-input-placeholder-title')}
					value={values.title}
					onChange={handleChange}
				/>
			</FormField>
			<FormField
				title={t('upload-file-form-input-title-file')}
				fieldError={{
					text: fileError.text,
					isShow: fileError.isShow,
				}}>
				<div className={styles.upload}>
					<label htmlFor='file-upload' className={styles.upload__field}>
						<p className={styles.upload__text}>
							{values.fileName || t('upload-file-form-input-placeholder-file')}
						</p>
						<div className={styles.upload__icon} />
					</label>

					<input
						id='file-upload'
						type='file'
						className={styles.upload__input}
						onChange={handleChangeFile}
					/>
				</div>
			</FormField>
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
