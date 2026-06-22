import type { FC } from 'react';

import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../../../store/store';

import { Preloader } from '../../../../shared/components/Preloader/ui/preloader';
import { Button } from '../../../../shared/components/Button/ui/button';
import { Table } from '../../../../shared/components/Table/ui/table';
import { Card } from '../../../../shared/components/Card/ui';
import { RegistrationChart } from './lib/registrationChart';

import {
	getTeamsAction,
	getRegisteredCasesAction,
} from '../../../../store/control/actions';

import { getRegistrationStats } from './lib/getRegistrationStats';
import { getInstituteStats } from './lib/getInstituteStats';
import { getInstituteStages } from './lib/getInstituteStages';
import { getCaseStages } from './lib/getCaseStages';

import styles from './control.module.scss';

export const Control: FC = () => {
	const dispatch = useDispatch();
	const { teams, cases, isLoading } = useSelector((state) => state.control);

	useEffect(() => {
		dispatch(getTeamsAction());
		dispatch(getRegisteredCasesAction());
	}, [dispatch]);

	if (isLoading) {
		return <Preloader />;
	}

	const instituteStagesStats = getInstituteStages(teams);
	const instituteStagesTotalRow = instituteStagesStats.reduce(
		(acc, item) => {
			acc.totalTeams += item.totalTeams;
			acc.stage1 += item.stage1;
			acc.stage2 += item.stage2;
			acc.stage3 += item.stage3;
			acc.stage4 += item.stage4;
			acc.stage5 += item.stage5;
			acc.stage6 += item.stage6;
			acc.percentProgress += item.percentProgress * item.totalTeams;
			return acc;
		},
		{
			university: 'Итого',
			totalTeams: 0,
			percentOfTotal: 100,
			stage1: 0,
			stage2: 0,
			stage3: 0,
			stage4: 0,
			stage5: 0,
			stage6: 0,
			percentProgress: 0,
		}
	);

	instituteStagesTotalRow.percentProgress = +(
		instituteStagesTotalRow.percentProgress / instituteStagesTotalRow.totalTeams
	).toFixed(1);

	const caseStagesStats = getCaseStages(teams);
	const caseStagesTotalRow = caseStagesStats.reduce(
		(acc, item) => {
			acc.totalTeams += item.totalTeams;
			acc.stage1 += item.stage1;
			acc.stage2 += item.stage2;
			acc.stage3 += item.stage3;
			acc.stage4 += item.stage4;
			acc.stage5 += item.stage5;
			acc.stage6 += item.stage6;
			acc.percentProgress += item.percentProgress * item.totalTeams;
			return acc;
		},
		{
			university: 'Итого',
			totalTeams: 0,
			percentOfTotal: 100,
			stage1: 0,
			stage2: 0,
			stage3: 0,
			stage4: 0,
			stage5: 0,
			stage6: 0,
			percentProgress: 0,
		}
	);

	caseStagesTotalRow.percentProgress = +(
		caseStagesTotalRow.percentProgress / caseStagesTotalRow.totalTeams
	).toFixed(1);

	return (
		<div className={styles.container}>
			<div className={styles.buttons}>
				<Button
					text='Экспорт участников'
					type='link'
					href='https://contest-api.emiit.ru/api/report/participants-export/'
					color='gradient'
				/>
				<Button
					text='Экспорт прогресса'
					type='link'
					href='https://contest-api.emiit.ru/api/report/teams-export/'
					color='gradient'
				/>
				<Button
					text='Экспорт оценок экспертов'
					type='link'
					href='https://contest-api.emiit.ru/api/report/summary-export/'
					color='gradient'
				/>
			</div>

			<Card>
				<h2 className={styles.title}>Прогресс команд по институтам</h2>
				<Table>
					<div
						className='table__header'
						style={{ paddingRight: '16px', boxSizing: 'border-box' }}>
						<div className='table__main-column'>
							<div className='table__column table__column_type_header table__column_type_count'>
								<p className='table__text table__text_type_header'>№</p>
							</div>
							<div className='table__column table__column_type_header table__column_type_full'>
								<p className='table__text table__text_type_header'>
									Образовательная организация
								</p>
							</div>
							<div className='table__column table__column_type_header table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_type_header'>Всего</p>
							</div>
							<div className='table__column table__column_type_header table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_type_header'>Этап 1</p>
							</div>
							<div className='table__column table__column_type_header table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_type_header'>Этап 2</p>
							</div>
							<div className='table__column table__column_type_header table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_type_header'>Этап 3</p>
							</div>
							<div className='table__column table__column_type_header table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_type_header'>Этап 4</p>
							</div>
							<div className='table__column table__column_type_header table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_type_header'>Этап 5</p>
							</div>
							<div className='table__column table__column_type_header table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_type_header'>Завершили</p>
							</div>
							<div className='table__column table__column_type_header table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_type_header'>
									Прогресс, %
								</p>
							</div>
						</div>
					</div>
					<ul
						className='table__main'
						style={{ height: '300px', overflowY: 'scroll' }}>
						{instituteStagesStats.map((item, i) => (
							<li className='table__row' key={i}>
								<div className='table__main-column table__main-column_type_full '>
									<div className='table__column table__column_type_count'>
										<p className='table__text'>{i + 1}</p>
									</div>
									<div className='table__column table__column_type_full'>
										<p className='table__text'>{item.university}</p>
									</div>
									<div className='table__column table__column_align_center table__column_type_medium'>
										<p className='table__text table__text_align_center'>
											{item.totalTeams}
										</p>
									</div>
									<div className='table__column table__column_align_center table__column_type_medium'>
										<p className='table__text table__text_align_center'>
											{item.stage1}
										</p>
									</div>
									<div className='table__column table__column_align_center table__column_type_medium'>
										<p className='table__text table__text_align_center'>
											{item.stage2}
										</p>
									</div>
									<div className='table__column table__column_align_center table__column_type_medium'>
										<p className='table__text table__text_align_center'>
											{item.stage3}
										</p>
									</div>
									<div className='table__column table__column_align_center table__column_type_medium'>
										<p className='table__text table__text_align_center'>
											{item.stage4}
										</p>
									</div>
									<div className='table__column table__column_align_center table__column_type_medium'>
										<p className='table__text table__text_align_center'>
											{item.stage5}
										</p>
									</div>
									<div className='table__column table__column_align_center table__column_type_medium'>
										<p className='table__text table__text_align_center'>
											{item.stage6}
										</p>
									</div>
									<div className='table__column table__column_align_center table__column_type_medium'>
										<p className='table__text table__text_align_center table__text_type_header'>
											{item.percentProgress}%
										</p>
									</div>
								</div>
							</li>
						))}
					</ul>
					<div
						className='table__row table__row_type_total'
						style={{ paddingRight: '22.5px', boxSizing: 'border-box' }}>
						<div className='table__main-column table__main-column_type_full '>
							<div className='table__column table__column_type_count'>
								<p className='table__text table__text_type_header'></p>
							</div>
							<div className='table__column table__column_type_full'>
								<p className='table__text table__text_type_header table__text_weight_bold'>
									{instituteStagesTotalRow.university}
								</p>
							</div>
							<div className='table__column table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_align_center table__text_weight_bold'>
									{instituteStagesTotalRow.totalTeams}
								</p>
							</div>
							<div className='table__column table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_align_center table__text_weight_bold'>
									{instituteStagesTotalRow.stage1}
								</p>
							</div>
							<div className='table__column table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_align_center table__text_weight_bold'>
									{instituteStagesTotalRow.stage2}
								</p>
							</div>
							<div className='table__column table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_align_center table__text_weight_bold'>
									{instituteStagesTotalRow.stage3}
								</p>
							</div>
							<div className='table__column table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_align_center table__text_weight_bold'>
									{instituteStagesTotalRow.stage4}
								</p>
							</div>
							<div className='table__column table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_align_center table__text_weight_bold'>
									{instituteStagesTotalRow.stage5}
								</p>
							</div>
							<div className='table__column table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_align_center table__text_weight_bold'>
									{instituteStagesTotalRow.stage6}
								</p>
							</div>
							<div className='table__column table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_align_center table__text_weight_bold'>
									{instituteStagesTotalRow.percentProgress}%
								</p>
							</div>
						</div>
					</div>
				</Table>
			</Card>

			<Card>
				<h2 className={styles.title}>Прогресс команд по проблемам</h2>
				<Table>
					<div className='table__header'>
						<div className='table__main-column'>
							<div className='table__column table__column_type_header table__column_type_count'>
								<p className='table__text table__text_type_header'>№</p>
							</div>
							<div className='table__column table__column_type_header table__column_type_full'>
								<p className='table__text table__text_type_header'>Проблема</p>
							</div>
							<div className='table__column table__column_type_header table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_type_header'>Всего</p>
							</div>
							<div className='table__column table__column_type_header table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_type_header'>Этап 1</p>
							</div>
							<div className='table__column table__column_type_header table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_type_header'>Этап 2</p>
							</div>
							<div className='table__column table__column_type_header table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_type_header'>Этап 3</p>
							</div>
							<div className='table__column table__column_type_header table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_type_header'>Этап 4</p>
							</div>
							<div className='table__column table__column_type_header table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_type_header'>Этап 5</p>
							</div>
							<div className='table__column table__column_type_header table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_type_header'>Завершили</p>
							</div>
							<div className='table__column table__column_type_header table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_type_header'>
									Прогресс, %
								</p>
							</div>
						</div>
					</div>
					<ul className='table__main'>
						{caseStagesStats.map((item, i) => (
							<li className='table__row' key={i}>
								<div className='table__main-column table__main-column_type_full '>
									<div className='table__column table__column_type_count'>
										<p className='table__text'>{i + 1}</p>
									</div>
									<div className='table__column table__column_type_full'>
										<p className='table__text'>{item.caseTitle}</p>
									</div>
									<div className='table__column table__column_align_center table__column_type_medium'>
										<p className='table__text table__text_align_center'>
											{item.totalTeams}
										</p>
									</div>
									<div className='table__column table__column_align_center table__column_type_medium'>
										<p className='table__text table__text_align_center'>
											{item.stage1}
										</p>
									</div>
									<div className='table__column table__column_align_center table__column_type_medium'>
										<p className='table__text table__text_align_center'>
											{item.stage2}
										</p>
									</div>
									<div className='table__column table__column_align_center table__column_type_medium'>
										<p className='table__text table__text_align_center'>
											{item.stage3}
										</p>
									</div>
									<div className='table__column table__column_align_center table__column_type_medium'>
										<p className='table__text table__text_align_center'>
											{item.stage4}
										</p>
									</div>
									<div className='table__column table__column_align_center table__column_type_medium'>
										<p className='table__text table__text_align_center'>
											{item.stage5}
										</p>
									</div>
									<div className='table__column table__column_align_center table__column_type_medium'>
										<p className='table__text table__text_align_center'>
											{item.stage6}
										</p>
									</div>
									<div className='table__column table__column_align_center table__column_type_medium'>
										<p className='table__text table__text_align_center table__text_type_header'>
											{item.percentProgress}%
										</p>
									</div>
								</div>
							</li>
						))}
					</ul>
					<div
						className='table__row table__row_type_total'
						style={{ paddingRight: '7.5px', boxSizing: 'border-box' }}>
						<div className='table__main-column table__main-column_type_full '>
							<div className='table__column table__column_type_count'>
								<p className='table__text table__text_type_header'></p>
							</div>
							<div className='table__column table__column_type_full'>
								<p className='table__text table__text_type_header table__text_weight_bold'>
									{caseStagesTotalRow.university}
								</p>
							</div>
							<div className='table__column table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_align_center table__text_weight_bold'>
									{caseStagesTotalRow.totalTeams}
								</p>
							</div>
							<div className='table__column table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_align_center table__text_weight_bold'>
									{caseStagesTotalRow.stage1}
								</p>
							</div>
							<div className='table__column table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_align_center table__text_weight_bold'>
									{caseStagesTotalRow.stage2}
								</p>
							</div>
							<div className='table__column table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_align_center table__text_weight_bold'>
									{caseStagesTotalRow.stage3}
								</p>
							</div>
							<div className='table__column table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_align_center table__text_weight_bold'>
									{caseStagesTotalRow.stage4}
								</p>
							</div>
							<div className='table__column table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_align_center table__text_weight_bold'>
									{caseStagesTotalRow.stage5}
								</p>
							</div>
							<div className='table__column table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_align_center table__text_weight_bold'>
									{caseStagesTotalRow.stage6}
								</p>
							</div>
							<div className='table__column table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_align_center table__text_weight_bold'>
									{caseStagesTotalRow.percentProgress}%
								</p>
							</div>
						</div>
					</div>
				</Table>
			</Card>

			<Card>
				<RegistrationChart stats={getRegistrationStats(teams)} />
			</Card>

			<Card>
				<h2 className={styles.title}>Регистрации по институтам</h2>
				<Table>
					<div
						className='table__header'
						style={{ paddingRight: '16px', boxSizing: 'border-box' }}>
						<div className='table__main-column'>
							<div className='table__column table__column_type_header table__column_type_count'>
								<p className='table__text table__text_type_header'>№</p>
							</div>
							<div className='table__column table__column_type_header table__column_type_full'>
								<p className='table__text table__text_type_header'>
									Образовательная организация
								</p>
							</div>
							<div className='table__column table__column_type_header table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_type_header'>
									Команд (%)
								</p>
							</div>
							{cases.map((elem) => (
								<div
									key={elem.id}
									className='table__column table__column_type_header table__column_align_center table__column_type_large'>
									<p className='table__text table__text_type_header table__text_fs_small table__text_align_center'>
										{elem.title}
									</p>
									<p className='table__text table__text_type_header table__text_fs_small table__text_align_center'>
										({elem.company})
									</p>
								</div>
							))}
						</div>
					</div>
					<ul
						className='table__main'
						style={{ height: '300px', overflowY: 'scroll' }}>
						{getInstituteStats(teams).map((item, i) => (
							<li className='table__row' key={i}>
								<div className='table__main-column table__main-column_type_full '>
									<div className='table__column table__column_type_count'>
										<p className='table__text'>{i + 1}</p>
									</div>
									<div className='table__column table__column_type_full'>
										<p className='table__text'>{item.university}</p>
									</div>
									<div className='table__column table__column_align_center table__column_type_medium'>
										<p className='table__text table__text_align_center'>
											{item.totalTeams} ({item.percentOfTotal}%)
										</p>
									</div>
									{cases.map((elem) => (
										<div
											key={elem.id}
											className='table__column table__column_align_center table__column_type_large'>
											<p className='table__text table__text_align_center'>
												{item[elem.title] || ''}
											</p>
										</div>
									))}
								</div>
							</li>
						))}
					</ul>
					<div
						className='table__row table__row_type_total'
						style={{ paddingRight: '22.5px', boxSizing: 'border-box' }}>
						<div className='table__main-column table__main-column_type_full '>
							<div className='table__column table__column_type_count'>
								<p className='table__text table__text_type_header'></p>
							</div>
							<div className='table__column table__column_type_full'>
								<p className='table__text table__text_type_header table__text_weight_bold'>
									Итого
								</p>
							</div>
							<div className='table__column table__column_align_center table__column_type_medium'>
								<p className='table__text table__text_type_header table__text_align_center'>
									{teams.length}
								</p>
							</div>
							{cases.map((elem) => {
								const totalPerCase = teams.filter(
									(team) => team.case.title === elem.title
								).length;
								return (
									<div
										key={elem.id}
										className='table__column table__column_align_center table__column_type_large'>
										<p className='table__text table__text_type_header table__text_align_center'>
											{totalPerCase} (
											{((totalPerCase / teams.length) * 100).toFixed(1)}%)
										</p>
									</div>
								);
							})}
						</div>
					</div>
				</Table>
			</Card>
		</div>
	);
};
