import type { FC } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from '../../../../store/store';

import { setCurrentStage } from '../../../../store/main/reducer';

import styles from './stages.module.scss';

export const Stages: FC = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);
	const { stages, currentStageId } = useSelector((state) => state.main);
	const { t } = useTranslation();

	const handleChangeStage = (id: number) => {
		dispatch(setCurrentStage(id));
	};

	const stagesList = [
		{
			id: 0,
			number: '',
			title: t('main-stages.0.title'),
			subtitle: t('main-stages.0.text'),
			isActive: true,
			isCurrent: currentStageId === 0,
		},
		...stages.map((stage, index) => ({
			id: stage.id,
			number: String(index + 1).padStart(2, '0'),
			title: t(`main-stages.${index + 1}.title`),
			subtitle: t(`main-stages.${index + 1}.text`),
			isActive: (user?.current_stage ?? 0) >= stage.id,
			isCurrent: currentStageId === stage.id,
		})),
	];

	return (
		<section id='stages' className={styles.stages}>
			<h4 className={styles.title}>{t('main-stages-title')}</h4>

			<ul className={styles.list}>
				{stagesList.map((stage) => {
					return (
						<li
							key={stage.id}
							className={`${styles.stage} ${
								stage.id === 0 ? styles.stage_initial : ''
							} ${stage.isActive ? styles.stage_active : ''} ${
								stage.isCurrent ? styles.stage_current : ''
							}`}>
							{stage.isActive ? (
								<span
									className={`${styles.stage__number} ${styles.stage__number_active}`}
									onClick={() => handleChangeStage(stage.id)}>
									{stage.number}
								</span>
							) : (
								<span className={styles.stage__number}>{stage.number}</span>
							)}
							<div className={styles.stage__info}>
								<h6 className={styles.stage__title}>{stage.title}</h6>
								<p className={styles.stage__subtitle}>{stage.subtitle}</p>
							</div>
						</li>
					);
				})}
			</ul>
		</section>
	);
};
