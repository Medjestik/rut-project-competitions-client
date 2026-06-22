import type { ComputedDatum } from '@nivo/pie';
import {
	type IPieData,
	getSubdivisionStats,
	getCaseStats,
} from './lib/getSubdivisionStats';
import type { IControlTeam } from '../../../../store/control/types';

import { useMemo } from 'react';

import { ResponsivePie } from '@nivo/pie';

interface IUniversityPieChartsProps {
	teams: IControlTeam[];
	universityId: number;
}

const pastelPieColors = [
	'#CBB4F1', // мягкий фиолетовый
	'#A8A4F3', // пастельный синий
	'#9BCFE1', // голубой
	'#8DE0C7', // пастельный зеленый
	'#ABE2C6', // мягкий мятный
	'#F7D1C0', // пастельный персиковый
	'#F2B5B0', // светлый коралловый
	'#E8D8B0', // песочный
	'#D6C8E5', // лавандовый
	'#C5D6E8', // очень светлый голубой
	'#D9D9D9', // нейтральный серый
	'#BFBFBF', // темно-серый
];

export const SubdivisionPieChart: React.FC<IUniversityPieChartsProps> = ({
	teams,
	universityId,
}) => {
	const subdivisionData = useMemo(
		() => getSubdivisionStats(teams, universityId),
		[teams, universityId]
	);
	const caseData = useMemo(
		() => getCaseStats(teams, universityId),
		[teams, universityId]
	);

	const commonProps = {
		margin: { top: 40, right: 40, bottom: 40, left: 40 },
		innerRadius: 0.4,
		padAngle: 2, // увеличено расстояние между секторами
		cornerRadius: 8,
		activeOuterRadiusOffset: 8,
		colors: pastelPieColors,
		borderWidth: 1,
		borderColor: { from: 'color' },
		arcLinkLabelsSkipAngle: 10,
		arcLinkLabelsTextColor: '#333',
		arcLinkLabelsThickness: 2,
		arcLinkLabelsColor: { from: 'color' },
		arcLabelsSkipAngle: 0, // показывать подписи для всех секторов
		arcLabelsTextColor: () => '#333', // контрастный цвет подписей
		animate: true,
		motionConfig: 'gentle' as const,
		tooltip: ({ datum }: { datum: ComputedDatum<IPieData> }) => (
			<div
				style={{
					padding: '6px 10px',
					background: '#fff',
					border: '1px solid #ccc',
				}}>
				<strong>{datum.id}</strong>:&nbsp;{datum.value}
			</div>
		),
	};

	return (
		<div
			style={{ display: 'flex', gap: '40px', width: '100%', flexWrap: 'wrap' }}>
			<div style={{ flex: '1 1 400px', height: 300 }}>
				<h3 style={{ textAlign: 'center' }}>Распределение по подразделениям</h3>
				<ResponsivePie data={subdivisionData} {...commonProps} />
			</div>

			<div style={{ flex: '1 1 400px', height: 300 }}>
				<h3 style={{ textAlign: 'center' }}>Распределение по кейсам</h3>
				<ResponsivePie data={caseData} {...commonProps} />
			</div>
		</div>
	);
};
