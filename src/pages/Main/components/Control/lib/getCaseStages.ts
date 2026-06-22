import type {
	IControlTeam,
	IInstituteStages,
} from '../../../../../store/control/types';

// Переиспользуем ту же модель, что и для институтов, только поле university заменим на caseTitle
export interface ICaseStages extends Omit<IInstituteStages, 'university'> {
	caseTitle: string;
}

export const getCaseStages = (teams: IControlTeam[]): ICaseStages[] => {
	const totalTeams = teams.length;

	// Группируем команды по кейсам
	const caseMap: Record<string, IControlTeam[]> = {};
	teams.forEach((team) => {
		const caseTitle = team.case.title;
		if (!caseMap[caseTitle]) {
			caseMap[caseTitle] = [];
		}
		caseMap[caseTitle].push(team);
	});

	// Формируем массив статистики
	const stats: ICaseStages[] = Object.entries(caseMap).map(
		([caseTitle, caseTeams]) => {
			const row: ICaseStages = {
				caseTitle,
				totalTeams: caseTeams.length,
				percentOfTotal: +((caseTeams.length / totalTeams) * 100).toFixed(1),
				stage1: 0,
				stage2: 0,
				stage3: 0,
				stage4: 0,
				stage5: 0,
				stage6: 0,
				percentProgress: 0,
			};

			let progressSum = 0;

			// Считаем команды по этапам и прогресс
			caseTeams.forEach((team) => {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				const { id, is_completed } = team.current_stage;

				if (id === 5 && is_completed) {
					row.stage6 += 1;
					progressSum += 100;
				} else {
					switch (id) {
						case 1:
							row.stage1 += 1;
							progressSum += 0;
							break;
						case 2:
							row.stage2 += 1;
							progressSum += 20;
							break;
						case 3:
							row.stage3 += 1;
							progressSum += 40;
							break;
						case 4:
							row.stage4 += 1;
							progressSum += 60;
							break;
						case 5:
							row.stage5 += 1;
							progressSum += 80;
							break;
						default:
							break;
					}
				}
			});

			// Средний прогресс по кейсу
			row.percentProgress = +(progressSum / row.totalTeams).toFixed(1);

			return row;
		}
	);

	return stats.sort((a, b) => b.totalTeams - a.totalTeams);
};
