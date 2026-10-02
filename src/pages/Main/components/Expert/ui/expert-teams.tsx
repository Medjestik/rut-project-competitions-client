import type { FC } from 'react';

import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../../../../store/store';
import { useToast } from '../../../../../shared/components/ToastProvider/ui/ToastProvider';

import { Preloader } from '../../../../../shared/components/Preloader/ui/preloader';
import { Button } from '../../../../../shared/components/Button/ui/button';

import { getExpertTeamsAction } from '../../../../../store/expert/actions';
import { getErrorMessage } from '../../../../../shared/lib/getErrorMessage';
import { stageMaterialUrl } from '../lib/material-url';

import styles from '../styles/expert.module.scss';

const stepTitles = ['Шаг 1', 'Шаг 2', 'Шаг 3', 'Шаг 4'];

export const ExpertTeams: FC = () => {
	const { nominationId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { showToast } = useToast();
	const { teams, isLoadingTeams } = useSelector((state) => state.expert);

	useEffect(() => {
		if (!nominationId) {
			return;
		}

		dispatch(getExpertTeamsAction(nominationId))
			.unwrap()
			.catch((err) => {
				showToast({
					title: 'Не удалось загрузить работы',
					text: getErrorMessage(err),
					type: 'error',
				});
			});
	}, [dispatch, nominationId, showToast]);

	const openScore = (teamId: number) => {
		navigate(`/main/nomination/${nominationId}/form/${teamId}`);
	};

	if (isLoadingTeams) {
		return <Preloader />;
	}

	return (
		<div className={styles.teams}>
			<div className={styles.teamsHead}>
				<div>
					<h2 className={styles.title}>Выберите работу и оцените её</h2>
					<p className={styles.caption}>Количество работ: {teams.length}</p>
				</div>
				<Button
					text='Вернуться к проблемам'
					color='cancel'
					onClick={() => navigate('/main')}
				/>
			</div>
			{teams.length > 0 ? (
				<ul className={styles.list}>
					{teams.map((team, index) => {
						const finalStage = team.stages[4];
						const videoUrl = finalStage?.video?.url || '';
						const slidesUrl = stageMaterialUrl(finalStage);

						return (
							<li className={styles.team} key={team.team_id}>
								<span className={styles.index}>{index + 1}.</span>
								<div className={styles.teamMain}>
									<h3 className={styles.teamName}>{team.team_name}</h3>
									<p className={styles.teamUniversity}>{team.university_name}</p>
									<div className={styles.materials}>
										{videoUrl && (
											<Button
												text='Видеозащита'
												type='link'
												color='cancel'
												href={videoUrl}
											/>
										)}
										{slidesUrl && (
											<Button
												text='Финальные слайды'
												type='link'
												color='cancel'
												href={slidesUrl}
											/>
										)}
										{stepTitles.map((title, stepIndex) => {
											const url = stageMaterialUrl(team.stages[stepIndex]);

											if (!url) {
												return null;
											}

											return (
												<Button
													key={title}
													text={title}
													type='link'
													color='cancel'
													href={url}
												/>
											);
										})}
										<Button
											text='Оценить работу'
											color='gradient'
											onClick={() => openScore(team.team_id)}
										/>
									</div>
								</div>
								<span className={styles.score}>
									{team.expert_total_value || '0'}
								</span>
							</li>
						);
					})}
				</ul>
			) : (
				<p className={styles.empty}>Список работ пуст.</p>
			)}
		</div>
	);
};
