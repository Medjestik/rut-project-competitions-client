import type { IControlTeam } from '../../../../../store/control/types';

export interface ISubdivisionStages {
	subdivision: string;
	totalTeams: number;
	stage1: number;
	stage2: number;
	stage3: number;
	stage4: number;
	stage5: number;
	stage6: number;
	percentProgress: number;
}

export const getSubdivisionStages = (
	teams: IControlTeam[],
	universityId: number
): ISubdivisionStages[] => {
	const filteredTeams = teams.filter(
		(team) => team.university.id === universityId
	);

	const subdivisionMap: Record<string, ISubdivisionStages> = {};

	filteredTeams.forEach((team) => {
		const participantsWithSubdivision = team.participants.filter(
			(p) => !!p.subdivision
		);
		if (participantsWithSubdivision.length === 0) return;

		const share = 1 / participantsWithSubdivision.length;

		// Определяем прогресс и этап
		// eslint-disable-next-line @typescript-eslint/naming-convention
		const { id, is_completed } = team.current_stage;
		let progress = 0;
		let stageKey: keyof Pick<
			ISubdivisionStages,
			'stage1' | 'stage2' | 'stage3' | 'stage4' | 'stage5' | 'stage6'
		>;

		if (id === 5 && is_completed) {
			progress = 100;
			stageKey = 'stage6';
		} else {
			switch (id) {
				case 1:
					progress = 0;
					stageKey = 'stage1';
					break;
				case 2:
					progress = 20;
					stageKey = 'stage2';
					break;
				case 3:
					progress = 40;
					stageKey = 'stage3';
					break;
				case 4:
					progress = 60;
					stageKey = 'stage4';
					break;
				case 5:
					progress = 80;
					stageKey = 'stage5';
					break;
				default:
					progress = 0;
					stageKey = 'stage1';
					break;
			}
		}

		participantsWithSubdivision.forEach((p) => {
			const sub = p.subdivision;
			if (!sub) return;

			if (!subdivisionMap[sub]) {
				subdivisionMap[sub] = {
					subdivision: sub,
					totalTeams: 0,
					stage1: 0,
					stage2: 0,
					stage3: 0,
					stage4: 0,
					stage5: 0,
					stage6: 0,
					percentProgress: 0,
				};
			}

			const row = subdivisionMap[sub];
			row.totalTeams += share;
			row[stageKey] = row[stageKey] + share; // TS видит stageKey только как stageN
			row.percentProgress += progress * share;
		});
	});

	return Object.values(subdivisionMap)
		.map((row) => ({
			...row,
			totalTeams: Math.round(row.totalTeams),
			stage1: Math.round(row.stage1),
			stage2: Math.round(row.stage2),
			stage3: Math.round(row.stage3),
			stage4: Math.round(row.stage4),
			stage5: Math.round(row.stage5),
			stage6: Math.round(row.stage6),
			percentProgress: +(row.percentProgress / row.totalTeams).toFixed(1),
		}))
		.sort((a, b) => b.totalTeams - a.totalTeams);
};
