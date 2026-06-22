import type {
	IControlTeam,
	IInstituteStages,
} from '../../../../../store/control/types';

export const getInstituteStages = (
	teams: IControlTeam[]
): IInstituteStages[] => {
	const totalTeams = teams.length;

	// Группируем команды по институтам
	const universityMap: Record<string, IControlTeam[]> = {};
	teams.forEach((team) => {
		const uniName = team.university.short_name;
		if (!universityMap[uniName]) {
			universityMap[uniName] = [];
		}
		universityMap[uniName].push(team);
	});

	// Формируем массив статистики
	const stats: IInstituteStages[] = Object.entries(universityMap).map(
		([university, uniTeams]) => {
			const row: IInstituteStages = {
				university,
				totalTeams: uniTeams.length,
				percentOfTotal: +((uniTeams.length / totalTeams) * 100).toFixed(1),
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
			uniTeams.forEach((team) => {
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

			// Средний прогресс института
			row.percentProgress = +(progressSum / row.totalTeams).toFixed(1);

			return row;
		}
	);

	return stats.sort((a, b) => b.totalTeams - a.totalTeams);
};
