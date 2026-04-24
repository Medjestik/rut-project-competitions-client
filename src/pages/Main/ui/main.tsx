import type { FC } from 'react';

import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../../store/store';
import { useTranslation } from 'react-i18next';

import { Header } from '../components/Header/header';
import { Stages } from '../components/Stages/stages';
import { Stage } from '../components/Stage/stage';
import { InitialStage } from '../components/Stage/initial-stage';
import { PublicFooter } from '../../../shared/components/Layout/PublicLayout/ui';
import { Preloader } from '../../../shared/components/Preloader/ui/preloader';
import { Modal } from '../../../shared/components/Modal/ui/modal';
import { UploadLinkForm } from '../components/Forms/upload-link-form';
import { UploadFileForm } from '../components/Forms/upload-file-form';
import { UploadVideoForm } from '../components/Forms/upload-video-form';

import { getStagesAction } from '../../../store/main/actions';
import {
	setUploadLinkPopupOpen,
	setUploadFilePopupOpen,
	setUploadVideoPopupOpen,
} from '../../../store/main/reducer';

import styles from '../styles/main.module.scss';

export const Main: FC = () => {
	const dispatch = useDispatch();
	const {
		currentStageId,
		isOpenUploadLinkPopup,
		isOpenUploadFilePopup,
		isOpenUploadVideoPopup,
		isLoadingStages,
	} = useSelector((state) => state.main);
	const { t } = useTranslation();

	useEffect(() => {
		dispatch(getStagesAction());
	}, [dispatch]);

	if (isLoadingStages) {
		return <Preloader />;
	}

	return (
		<div className={styles.main}>
			<Header />
			<div className={styles.container}>
				<Stages />
				{currentStageId !== 0 ? <Stage /> : <InitialStage />}
			</div>
			<PublicFooter />
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
