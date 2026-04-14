import type { FC } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from '../../../../store/store';
import { Link } from 'react-scroll';

import { ESECTION } from '../../lib/sections';

import styles from './stages.module.scss';

export const Stages: FC = () => {
	const { t } = useTranslation();

	const stages = useSelector((state) => state.team.registrationStages);

	const stagesList = [
		{
			id: ESECTION.TEAM,
			key: 'team',
			number: '01',
			title: t('registration-stages.0.title'),
			subtitle: t('registration-stages.0.text'),
		},
		{
			id: ESECTION.PROBLEM,
			key: 'problem',
			number: '02',
			title: t('registration-stages.1.title'),
			subtitle: t('registration-stages.1.text'),
		},
		{
			id: ESECTION.PARTICIPANT,
			key: 'participant',
			number: '03',
			title: t('registration-stages.2.title'),
			subtitle: t('registration-stages.2.text'),
		},
		{
			id: ESECTION.PERSON_DATA,
			key: 'personData',
			number: '04',
			title: t('registration-stages.3.title'),
			subtitle: t('registration-stages.3.text'),
		},
	];

	return (
		<section id={ESECTION.STAGES} className={styles.stages}>
			<h4 className={styles.title}>{t('registration-stages-title')}</h4>

			<ul className={styles.list}>
				{stagesList.map((stage) => {
					const isActive = stages[stage.key as keyof typeof stages];

					return (
						<li
							key={stage.id}
							className={`${styles.stage} ${
								isActive ? styles.stage_active : ''
							}`}>
							<Link
								className={styles.stage__number}
								to={stage.id}
								smooth={true}
								offset={-20}
								duration={500}>
								{stage.number}
							</Link>

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
