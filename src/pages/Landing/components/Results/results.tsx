import type { FC } from 'react';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from '../../../../hooks/useInView';

import { Caption } from '../../shared/Caption/caption';
import { GradientText } from '../../shared/GradientText/gradient-text';

import { ESECTION } from '../../lib/sections';
import { PROTOCOL_LINK } from '../../../../shared/lib/lib';
import { Button } from '../../../../shared/components/Button/ui/button';
import { Select } from '../../../../shared/components/Select/ui/select';
import { nominations } from './data';

import styles from './results.module.scss';

export const Results: FC = () => {
	const { t } = useTranslation();
	const { ref, isVisible } = useInView({ threshold: 0.15 });
	const [activeId, setActiveId] = useState(nominations[0].id);
	const nomination =
		nominations.find((item) => item.id === activeId) ?? nominations[0];

	return (
		<div id={ESECTION.RESULTS} className={styles.container}>
			<section
				ref={ref}
				className={`${styles.results} ${styles.fadeUp} ${
					isVisible ? styles.visible : ''
				}`}>
				<Caption text={t('results-caption')} />
				<h2 className={styles.title}>
					<GradientText text={t('results-title.0')} /> {t('results-title.1')}
				</h2>

				<div className={styles.tabs} role='tablist'>
					{nominations.map((item) => (
						<button
							key={item.id}
							type='button'
							role='tab'
							aria-selected={item.id === nomination.id}
							className={
								item.id === nomination.id ? styles.tab_active : styles.tab
							}
							onClick={() => setActiveId(item.id)}>
							{item.title}
						</button>
					))}
				</div>
				<div className={styles.select}>
					<Select
						options={nominations}
						currentOption={nomination}
						onChooseOption={(option) => setActiveId(option.id)}
						valueKey='id'
						labelKey='title'
						width='full'
						placeholder={t('results-nomination')}
					/>
				</div>

				<div className={styles.tableWrap}>
					<table className={styles.table}>
						<thead>
							<tr>
								<th>{t('results-columns.place')}</th>
								<th>{t('results-columns.team')}</th>
								<th className={styles.university}>
									{t('results-columns.university')}
								</th>
								<th>{t('results-columns.score')}</th>
							</tr>
						</thead>
						<tbody>
							{nomination.rows.map((row) => (
								<tr key={row.place}>
									<td>{row.place}</td>
									<td>
										<span className={styles.teamRow}>
											<span className={styles.team}>{row.team}</span>
											{row.finalist ? (
												<span className={styles.badge}>
													{t('results-finalist')}
												</span>
											) : null}
										</span>
										<span className={styles.teamUniversity}>
											{row.university}
										</span>
									</td>
									<td className={styles.university}>{row.university}</td>
									<td>{row.score}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<Button
					text={t('results-download')}
					color='arrow'
					type='link'
					href={PROTOCOL_LINK}
					style={{ margin: '32px 0 0 0' }}
				/>
			</section>
		</div>
	);
};
