import { useEffect, useState, type FC } from 'react';

import { useSelector, useDispatch } from '../../../../store/store';
import { useTranslation } from 'react-i18next';
import { useWindowWidth } from '../../../../hooks/useWindowWidth';

import { Card } from '../../../../shared/components/Card/ui';
import { Button } from '../../../../shared/components/Button/ui/button';
import { VideoStage } from './video-stage';

import { setCurrentStage } from '../../../../store/main/reducer';
import { SOCIAL_TG } from '../../../../shared/lib/lib';

import styles from './stage.module.scss';

const btnStyle = {
	margin: '20px 0 0 auto',
};

export const InitialStage: FC = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);
	const { i18n, t } = useTranslation();
	const width = useWindowWidth();

	const [videoLink, setVideoLink] = useState<string | null>(null);
	const [templateLink, setTemplateLink] = useState<string | null>(null);

	const handleContinueWork = () => {
		if (user?.current_stage) {
			dispatch(setCurrentStage(user.current_stage));
		}
	};

	useEffect(() => {
		if (user) {
			if (i18n.language === 'en') {
				setVideoLink(null);
				if (user.case) {
					setTemplateLink(user.case.files[1].url);
				}
			} else {
				setVideoLink(
					'https://storage.yandexcloud.net/files-competitions/video/ru/intro.mp4'
				);
				if (user.case) {
					setTemplateLink(user.case.files[0].url);
				}
			}
		}
	}, [user, i18n.language]);

	return (
		<div className={styles.stage}>
			{user && (
				<Card
					title={t('main-stage-initial-title')}
					subtitle={t('main-stage-initial-subtitle')}
					titleSize='large'
					withBackground={width >= 768}>
					<div className={styles.stage__row}>
						<VideoStage url={videoLink} />
						<div className={styles.card}>
							<div className={styles.card__main}>
								<h4 className={styles.card__title}>
									{t('main-stage-initial-card-info.title')}
								</h4>
								<p className={styles.card__text}>
									{t('main-stage-initial-card-info.text-1')}
								</p>
								<p className={styles.card__text}>
									{t('main-stage-initial-card-info.text-2')}
								</p>
								<p className={styles.card__text}>
									{t('main-stage-initial-card-info.text-3')}
								</p>
							</div>
						</div>
					</div>
					<div className={styles.stage__row}>
						<div className={styles.stage__column}>
							{/*
							<div className={styles.card}>
								<div className={styles.card__main}>
									<h4 className={styles.card__title}>
										{t('main-stage-initial-card-chat.title')}
									</h4>
									<p className={styles.card__subtitle}>
										{t('main-stage-initial-card-chat.text')}
									</p>
								</div>
								<Button text={t('join-light-button')} color='arrow' />
							</div>
							*/}
							<div className={styles.card}>
								<div className={styles.card__main}>
									<h4 className={styles.card__title}>
										{t('main-stage-initial-card-channel.title')}
									</h4>
									<p className={styles.card__subtitle}>
										{t('main-stage-initial-card-channel.text')}
									</p>
								</div>
								<Button
									text={t('subscribe-button')}
									color='arrow'
									type='link'
									href={SOCIAL_TG}
								/>
							</div>
							<div className={styles.card}>
								<div className={styles.card__main}>
									<h4 className={styles.card__title}>
										{t('main-stage-initial-card-description.title')}
									</h4>
									<p className={styles.card__subtitle}>
										{t('main-stage-initial-card-description.text')}
									</p>
								</div>
								{templateLink ? (
									<Button
										text={t('download-button')}
										color='gradient'
										type='link'
										href={templateLink}
									/>
								) : (
									<Button text={t('download-button')} isBlock />
								)}
							</div>
						</div>
						<div className={styles.card}>
							<div className={styles.card__main}>
								<h4 className={styles.card__title}>
									{t('main-stage-initial-card-problem.title-1')}
								</h4>
								<p className={styles.card__text}>
									{i18n.language === 'en'
										? user.case.situation_eng
										: user.case.situation}
								</p>
								<h4
									className={`${styles.card__title} ${styles.card__title_color}`}>
									{t('main-stage-initial-card-problem.title-2')}
								</h4>
								<p className={styles.card__text}>
									{i18n.language === 'en'
										? user.case.problem_eng
										: user.case.problem}
								</p>
							</div>
						</div>
					</div>
					<Button
						text={t('continue-button')}
						color='gradient'
						style={btnStyle}
						onClick={handleContinueWork}
					/>
				</Card>
			)}
		</div>
	);
};
