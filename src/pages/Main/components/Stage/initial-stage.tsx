import type { FC } from 'react';

import { useSelector, useDispatch } from '../../../../store/store';
import { useTranslation } from 'react-i18next';

import { Card } from '../../../../shared/components/Card/ui';
import { Button } from '../../../../shared/components/Button/ui/button';
import { VideoStage } from './video-stage';

import { setCurrentStage } from '../../../../store/main/reducer';

import styles from './stage.module.scss';

const btnStyle = {
	margin: '20px 0 0 auto',
};

export const InitialStage: FC = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);
	const { t } = useTranslation();

	const handleContinueWork = () => {
		if (user?.current_stage) {
			dispatch(setCurrentStage(user.current_stage));
		}
	};

	return (
		<div className={styles.stage}>
			{user && (
				<Card
					title={t('main-stage-initial-title')}
					subtitle={t('main-stage-initial-subtitle')}
					titleSize='large'>
					<div className={styles.stage__row}>
						<VideoStage url='https://getfile.dokpub.com/yandex/get/https://disk.yandex.ru/i/DkqqYrmoerzqAQ' />
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
								<Button text={t('subscribe-button')} color='arrow' />
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
								<Button text={t('download-button')} color='gradient' />
							</div>
						</div>
						<div className={styles.card}>
							<div className={styles.card__main}>
								<h4 className={styles.card__title}>
									{t('main-stage-initial-card-problem.title-1')}
								</h4>
								<p className={styles.card__text}>{user.case.situation}</p>
								<h4
									className={`${styles.card__title} ${styles.card__title_color}`}>
									{t('main-stage-initial-card-problem.title-2')}
								</h4>
								<p className={styles.card__text}>{user.case.problem}</p>
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
