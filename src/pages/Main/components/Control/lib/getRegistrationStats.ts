import type {
	IControlTeam,
	IRegistrationStat,
} from '../../../../../store/control/types';

export const getRegistrationStats = (
	teams: IControlTeam[]
): IRegistrationStat[] => {
	if (teams.length === 0) return [];

	const totalTeams = teams.length;

	const dayMap: Record<string, number> = {};

	teams.forEach((team) => {
		const day = team.date_joined.slice(0, 10); // YYYY-MM-DD
		dayMap[day] = (dayMap[day] || 0) + 1;
	});

	const start = new Date('2026-06-15');
	const end = new Date('2026-07-15');

	const days: string[] = [];

	const current = new Date(start);

	while (current <= end) {
		days.push(current.toISOString().split('T')[0]);
		current.setDate(current.getDate() + 1);
	}

	let cumulative = 0;
	let afterJuly15 = 0;

	const result: IRegistrationStat[] = [];

	for (const date of days) {
		const dailyCount = dayMap[date] || 0;

		cumulative += dailyCount;

		result.push({
			date,
			dailyCount,
			cumulativeCount: cumulative,
			percentOfTotal:
				totalTeams > 0 ? +((dailyCount / totalTeams) * 100).toFixed(2) : 0,
		});
	}

	// Всё после 15 июля
	Object.entries(dayMap).forEach(([date, count]) => {
		if (new Date(date) > end) {
			afterJuly15 += count;
		}
	});

	if (afterJuly15 > 0) {
		cumulative += afterJuly15;

		result.push({
			date: 'после 15 июля',
			dailyCount: afterJuly15,
			cumulativeCount: cumulative,
			percentOfTotal:
				totalTeams > 0 ? +((afterJuly15 / totalTeams) * 100).toFixed(2) : 0,
		});
	}

	return result;
};
