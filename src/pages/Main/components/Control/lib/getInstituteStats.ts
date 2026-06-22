import type {
	IControlTeam,
	IInstituteStat,
} from '../../../../../store/control/types';

export const getInstituteStats = (teams: IControlTeam[]): IInstituteStat[] => {
	const totalTeams = teams.length;

	// Список уникальных кейсов
	const uniqueCases = Array.from(new Set(teams.map((team) => team.case.title)));

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
	const stats: IInstituteStat[] = Object.entries(universityMap).map(
		([university, uniTeams]) => {
			const row: IInstituteStat = {
				university,
				totalTeams: uniTeams.length,
				percentOfTotal: +((uniTeams.length / totalTeams) * 100).toFixed(1),
			};

			// Считаем команды по каждому кейсу
			uniqueCases.forEach((caseTitle) => {
				row[caseTitle] = uniTeams.filter(
					(team) => team.case.title === caseTitle
				).length;
			});

			return row;
		}
	);

	return stats.sort((a, b) => b.totalTeams - a.totalTeams);
};
