import type { FC } from 'react';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../../../../store/store';
import { useToast } from '../../../../../shared/components/ToastProvider/ui/ToastProvider';

import { Preloader } from '../../../../../shared/components/Preloader/ui/preloader';
import { Button } from '../../../../../shared/components/Button/ui/button';
import { Card } from '../../../../../shared/components/Card/ui';

import { getExpertCasesAction } from '../../../../../store/expert/actions';
import { getErrorMessage } from '../../../../../shared/lib/getErrorMessage';

import styles from '../styles/expert.module.scss';

export const ExpertCases: FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { showToast } = useToast();
	const { cases, isLoadingCases } = useSelector((state) => state.expert);

	useEffect(() => {
		dispatch(getExpertCasesAction())
			.unwrap()
			.catch((err) => {
				showToast({
					title: 'Не удалось загрузить проблемы',
					text: getErrorMessage(err),
					type: 'error',
				});
			});
	}, [dispatch, showToast]);

	if (isLoadingCases) {
		return <Preloader />;
	}

	return (
		<Card
			title='Выберите проблему для оценки решений'
			titleSize='default'
			width='full'>
			{cases.length > 0 ? (
				<ul className={styles.cases}>
					{cases.map((item) => (
						<li className={styles.case} key={item.id}>
							<img className={styles.caseIcon} src={item.icon} alt='' />
							<h3 className={styles.caseTitle}>{item.title}</h3>
							<p className={styles.caseText}>{item.problem}</p>
							<Button
								text='Выбрать'
								color='gradient'
								width='full'
								onClick={() => navigate(`/main/nomination/${item.id}`)}
							/>
						</li>
					))}
				</ul>
			) : (
				<p className={styles.empty}>Список проблем пуст.</p>
			)}
		</Card>
	);
};
