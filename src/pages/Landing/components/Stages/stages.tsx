import type { FC } from 'react';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useWindowWidth } from '../../../../hooks/useWindowWidth';
import { useInView } from '../../../../hooks/useInView';

import { StageCard } from './stage-card';
import { Caption } from '../../shared/Caption/caption';
import { Button } from '../../../../shared/components/Button/ui/button';

import { EROUTES } from '../../../../shared/utils/routes';
import { ESECTION } from '../../lib/sections';

import styles from './stages.module.scss';

export const Stages: FC = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const width = useWindowWidth();
	const { ref, isVisible } = useInView({ threshold: 0.2 });

	return (
		<div id={ESECTION.STAGES} className={styles.container}>
			<section
				ref={ref}
				className={`${styles.stages} ${styles.fadeUp} ${
					isVisible ? styles.visible : ''
				}`}>
				<Caption text={t('stages-caption')} />
				<h2 className={styles.title}>{t('stages-title')}</h2>
				<div className={`${styles.row} ${styles.row_top}`}>
					<StageCard
						id={t('stages-cards.0.id')}
						title={t('stages-cards.0.title')}
						duration={t('stages-cards.0.duration')}
						content={t('stages-cards.0.content')}
						isVisible={isVisible}
						transitionDelay='0.2'
					/>
					<StageCard
						id={t('stages-cards.1.id')}
						title={t('stages-cards.1.title')}
						duration={t('stages-cards.1.duration')}
						content={t('stages-cards.1.content')}
						isVisible={isVisible}
						transitionDelay='0.4'
					/>
					<div className={styles.stage__stub}>{t('stages-stub.0')}</div>
					<StageCard
						id={t('stages-cards.2.id')}
						title={t('stages-cards.2.title')}
						duration={t('stages-cards.2.duration')}
						content={t('stages-cards.2.content')}
						isVisible={isVisible}
						transitionDelay='0.6'
					/>
				</div>
				<div className={`${styles.row} ${styles.row_bottom}`}>
					{width > 1000 && (
						<div className={styles.caption}>
							<p className={styles.caption__text}>
								{t('stages-stub.1.0')}{' '}
								<span className={styles.caption__text_color}>
									{t('stages-stub.1.1')}
								</span>{' '}
								{t('stages-stub.1.2')}
							</p>
							<Button
								text={t('join-button')}
								color='arrow'
								onClick={() => navigate(EROUTES.REGISTRATION)}
							/>
						</div>
					)}
					<StageCard
						id={t('stages-cards.3.id')}
						title={t('stages-cards.3.title')}
						duration={t('stages-cards.3.duration')}
						content={t('stages-cards.3.content')}
						isVisible={isVisible}
						transitionDelay='0.8'
					/>
					<StageCard
						id={t('stages-cards.4.id')}
						title={t('stages-cards.4.title')}
						duration={t('stages-cards.4.duration')}
						content={t('stages-cards.4.content')}
						isVisible={isVisible}
						transitionDelay='1'
					/>
				</div>
				{width <= 1000 && (
					<div className={styles.caption}>
						<p className={styles.caption__text}>
							{t('stages-stub.1.0')}{' '}
							<span className={styles.caption__text_color}>
								{t('stages-stub.1.1')}
							</span>{' '}
							{t('stages-stub.1.2')}
						</p>
						<Button
							text={t('join-button')}
							color='gradient'
							width='full'
							onClick={() => navigate(EROUTES.REGISTRATION)}
						/>
					</div>
				)}
			</section>
		</div>
	);
};
