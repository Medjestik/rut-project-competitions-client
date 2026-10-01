import type { FC } from 'react';

import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../../../store/store';
import { useTranslation } from 'react-i18next';

import { Stages } from '../../components/Stages/stages';
import { Stage } from '../../components/Stage/stage';
import { InitialStage } from '../../components/Stage/initial-stage';
import { Preloader } from '../../../../shared/components/Preloader/ui/preloader';
import { Modal } from '../../../../shared/components/Modal/ui/modal';
import { UploadLinkForm } from '../../components/Forms/upload-link-form';
import { UploadFileForm } from '../../components/Forms/upload-file-form';
import { UploadVideoForm } from '../../components/Forms/upload-video-form';

import { Card } from '../../../../shared/components/Card/ui';

import { getStagesAction } from '../../../../store/main/actions';
import {
	setUploadLinkPopupOpen,
	setUploadFilePopupOpen,
	setUploadVideoPopupOpen,
} from '../../../../store/main/reducer';

import styles from './participant.module.scss';

export const Participant: FC = () => {
	const dispatch = useDispatch();
	const {
		currentStageId,
		isOpenUploadLinkPopup,
		isOpenUploadFilePopup,
		isOpenUploadVideoPopup,
		isLoadingStages,
	} = useSelector((state) => state.main);
	const { user } = useSelector((state) => state.user);
	const { t } = useTranslation();
	const isCaseClosed = Boolean(user?.case?.is_closed);

	useEffect(() => {
		if (!isCaseClosed) {
			dispatch(getStagesAction());
		}
	}, [dispatch, isCaseClosed]);

	if (isCaseClosed) {
		return (
			<div className={styles.container}>
				<div className={styles.waiting}>
					<Card
						title={t('main-stage-card-result.title')}
						subtitle={t('main-stage-card-result.text')}
						titleSize='large'
						width='full'
					/>
				</div>
			</div>
		);
	}

	if (isLoadingStages) {
		return <Preloader />;
	}

	return (
		<div className={styles.container}>
			<Stages />
			{currentStageId !== 0 ? <Stage /> : <InitialStage />}
			{isOpenUploadLinkPopup && (
				<Modal
					title={t('upload-link-form-title')}
					description={t('upload-link-form-subtitle')}
					isOpen={isOpenUploadLinkPopup}
					onClose={() => dispatch(setUploadLinkPopupOpen(false))}>
					<UploadLinkForm />
				</Modal>
			)}
			{isOpenUploadFilePopup && (
				<Modal
					title={t('upload-file-form-title')}
					description={t('upload-file-form-subtitle')}
					isOpen={isOpenUploadFilePopup}
					onClose={() => dispatch(setUploadFilePopupOpen(false))}>
					<UploadFileForm />
				</Modal>
			)}
			{isOpenUploadVideoPopup && (
				<Modal
					title={t('upload-video-form-title')}
					description={t('upload-video-form-subtitle')}
					isOpen={isOpenUploadVideoPopup}
					onClose={() => dispatch(setUploadVideoPopupOpen(false))}>
					<UploadVideoForm />
				</Modal>
			)}
		</div>
	);
};
