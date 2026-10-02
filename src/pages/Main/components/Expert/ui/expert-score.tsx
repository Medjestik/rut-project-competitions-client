import type { FC, FormEvent } from 'react';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../../../../store/store';
import { useToast } from '../../../../../shared/components/ToastProvider/ui/ToastProvider';

import { Preloader } from '../../../../../shared/components/Preloader/ui/preloader';
import { Button } from '../../../../../shared/components/Button/ui/button';
import { Card } from '../../../../../shared/components/Card/ui';

import { getExpertScoreAction, submitExpertScoresAction } from '../../../../../store/expert/actions';
import { getErrorMessage } from '../../../../../shared/lib/getErrorMessage';

import styles from '../styles/expert.module.scss';

export const ExpertScore: FC = () => {
	const { nominationId, formId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { showToast } = useToast();
	const { criterias, isLoadingScore, isSaving } = useSelector(
		(state) => state.expert
	);
	const [scores, setScores] = useState<Record<number, number>>({});

	const backToTeams = () => {
		navigate(`/main/nomination/${nominationId}`);
	};

	useEffect(() => {
		if (!formId) {
			return;
		}

		dispatch(getExpertScoreAction(Number(formId)))
			.unwrap()
			.then((data) => {
				const nextScores: Record<number, number> = {};

				data.marks.forEach((mark) => {
					nextScores[mark.criteria_id] = mark.value;
				});

				setScores(nextScores);
			})
			.catch((err) => {
				showToast({
					title: 'Не удалось загрузить оценку',
					text: getErrorMessage(err),
					type: 'error',
				});
			});
	}, [dispatch, formId, showToast]);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!formId) {
			return;
		}

		const payload = Object.entries(scores).map(([criteriaId, value]) => ({
			team_id: Number(formId),
			criteria_id: Number(criteriaId),
			value,
		}));

		try {
			await dispatch(submitExpertScoresAction(payload)).unwrap();
			showToast({
				title: 'Оценка сохранена',
				text: '',
				type: 'success',
			});
			backToTeams();
		} catch (err) {
			showToast({
				title: 'Не удалось сохранить оценку',
				text: getErrorMessage(err),
				type: 'error',
			});
		}
	};

	const isFormValid = criterias.every(
		(criteria) => scores[criteria.id] !== undefined
	);
	const totalScore = Object.values(scores).reduce((sum, value) => sum + value, 0);

	if (isLoadingScore) {
		return <Preloader />;
	}

	return (
		<Card title='Оценка работы' subtitle='Выберите оценку для каждого индикатора' titleSize='default' width='full'>
			<form className={styles.form} onSubmit={handleSubmit}>
				{criterias.map((criteria, index) => (
					<div className={styles.criteria} key={criteria.id}>
						<h3 className={styles.criteriaTitle}>
							{index + 1}. {criteria.name}
						</h3>
							{criteria.description
								?.split('\n')
								.filter(Boolean)
								.map((line, lineIndex) => (
									<p className={styles.criteriaText} key={`${criteria.id}-${lineIndex}`}>
										{line}
									</p>
								))}
						<div className={styles.scores}>
							{Array.from({ length: criteria.max_score + 1 }, (_, score) => (
								<button
									key={score}
									type='button'
									className={`${styles.scoreButton} ${
										scores[criteria.id] === score ? styles.scoreButtonActive : ''
									}`}
									onClick={() =>
										setScores((prev) => ({ ...prev, [criteria.id]: score }))
									}>
									{score}
								</button>
							))}
						</div>
					</div>
				))}
				<p className={styles.total}>Итоговая оценка: {totalScore}</p>
				<div className={styles.actions}>
					<Button text='Отменить' color='cancel' onClick={backToTeams} />
					<Button
						text='Сохранить'
						type='submit'
						color='gradient'
						isBlock={!isFormValid || isSaving}
					/>
				</div>
			</form>
		</Card>
	);
};
