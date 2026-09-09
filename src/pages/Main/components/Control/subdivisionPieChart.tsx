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
	'#B8A1E8',
	'#8F8BE8',
	'#7DBDD1',
	'#72D0B4',
	'#91D4B2',
	'#E7B7A1',
	'#E49A98',
	'#D6C28F',
	'#B9A6D6',
	'#9FBBD6',
	'#8F919B',
	'#6F717B',
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
		padAngle: 2,
		cornerRadius: 8,
		activeOuterRadiusOffset: 8,
		colors: pastelPieColors,
		borderWidth: 1,
		borderColor: { from: 'color' },
		arcLinkLabelsSkipAngle: 10,
		arcLinkLabelsThickness: 2,
		arcLinkLabelsColor: { from: 'color' },
		arcLabelsSkipAngle: 10,
		arcLabelsTextColor: '#201a23',
		arcLinkLabelsTextColor: '#ffffff',
		animate: true,
		motionConfig: 'gentle' as const,
		tooltip: ({ datum }: { datum: ComputedDatum<IPieData> }) => (
			<div
				style={{
					padding: '8px 12px',
					background: '#2A232E',
					border: '1px solid #403745',
					borderRadius: '8px',
					color: '#E8E4EA',
				}}>
				<strong>{datum.id}</strong>:&nbsp;{datum.value}
			</div>
		),
	};

	return (
		<div
			style={{
				display: 'flex',
				gap: '40px',
				width: '100%',
				height: '400px',
				flexWrap: 'wrap',
			}}>
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
