import type { IControlTeam } from '../../../../../store/control/types';

export interface IPieData {
	id: string;
	label: string;
	value: number;
}

export const getSubdivisionStats = (
	teams: IControlTeam[],
	universityId: number
): IPieData[] => {
	const filteredTeams = teams.filter(
		(team) => team.university.id === universityId
	);

	const subdivisions: string[] = [];
	filteredTeams.forEach((team) => {
		team.participants.forEach((p) => {
			if (p.subdivision) {
				subdivisions.push(p.subdivision);
			}
		});
	});

	const countMap: Record<string, number> = {};
	subdivisions.forEach((sub) => {
		countMap[sub] = (countMap[sub] || 0) + 1;
	});

	return Object.entries(countMap).map(([subdivision, count]) => ({
		id: subdivision,
		label: subdivision,
		value: count,
	}));
};

export const getCaseStats = (
	teams: IControlTeam[],
	universityId: number
): IPieData[] => {
	const filteredTeams = teams.filter(
		(team) => team.university.id === universityId
	);

	const countMap: Record<string, number> = {};
	filteredTeams.forEach((team) => {
		const caseTitle = team.case.title;
		countMap[caseTitle] = (countMap[caseTitle] || 0) + 1;
	});

	return Object.entries(countMap).map(([caseTitle, count]) => ({
		id: caseTitle,
		label: caseTitle,
		value: count,
	}));
};
