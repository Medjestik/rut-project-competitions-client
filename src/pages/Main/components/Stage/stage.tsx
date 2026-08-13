import type { FC } from 'react';
import type { IStageData, IPath } from '../../../../store/main/types';

import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from '../../../../store/store';
import { useToast } from '../../../../shared/components/ToastProvider/ui/ToastProvider';
import { useTranslation } from 'react-i18next';
import { useWindowWidth } from '../../../../hooks/useWindowWidth';

import { Preloader } from '../../../../shared/components/Preloader/ui/preloader';
import { Button } from '../../../../shared/components/Button/ui/button';
import { Card } from '../../../../shared/components/Card/ui';
import { VideoStage } from './video-stage';

import { getStageAction } from '../../../../store/main/actions';
import {
	setCurrentPath,
	setStageTemplate,
	setStageVideo,
} from '../../../../store/main/reducer';
import { getErrorMessage } from '../../../../shared/lib/getErrorMessage';

import styles from './stage.module.scss';

const btnStyle = {
	margin: 'auto 0 0 auto',
};

export const Stage: FC = () => {
	const dispatch = useDispatch();
	const {
		stage,
		stageVideo,
		stageTemplate,
		currentStageId,
		currentPathPosition,
		isLoadingStageData,
	} = useSelector((state) => state.main);
	const { user } = useSelector((state) => state.user);
	const { showToast } = useToast();
	const { i18n, t } = useTranslation();
	const width = useWindowWidth();

	const renderPathName = (position: number) => {
		if (width > 768) {
			switch (position) {
				case 1:
					return t('main-stage-paths.path-1');
				case 2:
					return t('main-stage-paths.path-2');
				case 3:
					return t('main-stage-paths.path-3');
				default:
					return 'undefined';
			}
		} else {
			switch (position) {
				case 1:
					return t('main-stage-paths-mobile.path-1');
				case 2:
					return t('main-stage-paths-mobile.path-2');
				case 3:
					return t('main-stage-paths-mobile.path-3');
				default:
					return 'undefined';
			}
		}
	};

	const applyStageData = (
		stage: IStageData,
		position: number,
		lang: string
	) => {
		const isEn = lang.startsWith('en');

		if (stage.id < 5) {
			const path = stage.stage_paths[position - 1];

			dispatch(
				setStageTemplate(isEn ? path.url_template_eng : path.url_template)
			);
			dispatch(setStageVideo(isEn ? path.url_video_eng : path.url_video));
		} else {
			dispatch(
				setStageTemplate(isEn ? stage.url_template_eng : stage.url_template)
			);
			dispatch(setStageVideo(isEn ? stage.url_video_eng : stage.url_video));
		}
	};

	const handleChangePath = (path: IPath, position: number) => {
		localStorage.setItem('pathPosition', position.toString());
		dispatch(setCurrentPath(position));

		if (stage) {
			applyStageData(stage, position, i18n.language);
		}
	};

	const getStageData = useCallback(async () => {
		try {
			const data = await dispatch(getStageAction(currentStageId)).unwrap();

			const saved = localStorage.getItem('pathPosition');
			const position = saved ? Number(saved) : 1;

			dispatch(setCurrentPath(position));

			if (data) {
				applyStageData(data, position, i18n.language);
			}
		} catch (err) {
			console.error(err);
			showToast({
				title: t('toasts.error-loading.title'),
				text: getErrorMessage(err),
				type: 'error',
			});
		}
	}, [currentStageId]);

	useEffect(() => {
		if (stage) {
			applyStageData(stage, currentPathPosition, i18n.language);
		}
	}, [stage, currentPathPosition, i18n.language]);

	useEffect(() => {
		getStageData();
	}, [getStageData]);

	if (isLoadingStageData) {
		return <Preloader />;
	}

	return (
		<div className={styles.stage}>
			{stage && user && (
				<Card
					titleSize='large'
					title={t(`main-stages-data.${stage.id}.title`)}
					subtitle={t(`main-stages-data.${stage.id}.subtitle`)}
					withBackground={width >= 768}>
					<ul className={styles.paths}>
						{stage.stage_paths.map((path, i) =>
							currentPathPosition === i + 1 ? (
								<li
									className={`${styles.path} ${styles.path_active}`}
									key={path.id}>
									{renderPathName(i + 1)}
								</li>
							) : (
								<li
									className={styles.path}
									key={path.id}
									onClick={() => handleChangePath(path, i + 1)}>
									{renderPathName(i + 1)}
								</li>
							)
						)}
					</ul>
					<div className={styles.card}>
						<div className={styles.card__main}>
							<p className={styles.card__text}>
								{t(`main-stages-data.${stage.id}.text`)}
							</p>
						</div>
					</div>
					<div className={styles.stage__row}>
						<VideoStage url={stageVideo} />
						<div className={styles.stage__column}>
							<div className={styles.card}>
								<div className={styles.card__main}>
									<h4 className={styles.card__title}>
										{t('main-stage-card-template.title')}
									</h4>
									<p className={styles.card__subtitle}>
										{t('main-stage-card-template.text')}
									</p>
								</div>
								{stageTemplate ? (
									<Button
										text={t('download-button')}
										color='arrow'
										type='link'
										href={stageTemplate}
									/>
								) : (
									<Button text={t('download-button')} isBlock />
								)}
							</div>
							<div className={styles.card}>
								<div className={styles.card__main}>
									<h4 className={styles.card__title}>
										{currentStageId === 5
											? t('main-stage-card-presentation.title')
											: t('main-stage-card-task.title')}
									</h4>
									<p className={styles.card__subtitle}>
										{currentStageId === 5
											? t('main-stage-card-presentation.text')
											: t('main-stage-card-task.text')}
									</p>
									{stage.team_file_count > 0 && (
										<p className={styles.card__caption}>
											{currentStageId === 5
												? t('main-stage-card-presentation.caption')
												: t('main-stage-card-task.caption')}
										</p>
									)}
								</div>
								{stage.team_file_count < 1 && (
									<>
										<Button text={t('link-button')} color='gradient' isBlock />
										<Button text={t('file-button')} color='gradient' isBlock />
									</>
								)}
							</div>
							{currentStageId === 5 && (
								<div className={styles.card}>
									<div className={styles.card__main}>
										<h4 className={styles.card__title}>
											{t('main-stage-card-video.title')}
										</h4>
										<p className={styles.card__subtitle}>
											{t('main-stage-card-video.text')}
										</p>
										{stage.team_videos.length > 0 && (
											<p className={styles.card__caption}>
												{t('main-stage-card-video.caption')}
											</p>
										)}
									</div>
									{stage.team_videos.length < 1 && (
										<>
											<Button
												text={t('link-button')}
												color='gradient'
												isBlock
											/>
										</>
									)}
								</div>
							)}
							{currentStageId === 5 &&
								stage.team_videos.length > 0 &&
								stage.team_file_count > 0 && (
									<div className={styles.card}>
										<div className={styles.card__main}>
											<h4 className={styles.card__title}>
												{t('main-stage-card-result.title')}
											</h4>
											<p className={styles.card__subtitle}>
												{t('main-stage-card-result.text')}
											</p>
										</div>
									</div>
								)}
							{currentStageId !== 5 &&
								user.current_stage === currentStageId && (
									<Button
										text={t('complete-button')}
										isBlock
										color='gradient'
										style={btnStyle}
									/>
								)}
						</div>
					</div>
				</Card>
			)}
		</div>
	);
};
