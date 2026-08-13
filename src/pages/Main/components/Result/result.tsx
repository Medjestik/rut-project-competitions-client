import type { FC } from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from '../../../../store/store';

import { Card } from '../../../../shared/components/Card/ui';
import { Button } from '../../../../shared/components/Button/ui/button';

import {
	downloadCertificate,
	downloadGratitude,
} from '../../../../store/user/actions';

import styles from './result.module.scss';

export const Result: FC = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);

	const handleDownloadCertificate = async () => {
		try {
			const data = await dispatch(downloadCertificate()).unwrap();

			const link = document.createElement('a');
			link.href = data.url;
			link.download = '';
			document.body.appendChild(link);
			link.click();
			link.remove();
		} catch (err) {
			console.error('Ошибка скачивания сертификата', err);
		}
	};

	const handleDownloadGratitude = async () => {
		try {
			const data = await dispatch(downloadGratitude()).unwrap();

			const link = document.createElement('a');
			link.href = data.url;
			link.download = '';
			document.body.appendChild(link);
			link.click();
			link.remove();
		} catch (err) {
			console.error('Ошибка скачивания благодарности', err);
		}
	};

	return (
		user && (
			<div className={styles.container}>
				<Card
					titleSize='large'
					title={t('main-result.title')}
					subtitle={t('main-result.subtitle')}>
					<div className={styles.info}>
						<h3 className={styles.title}>{t('main-result.team-title')}</h3>
						<h4 className={styles.subtitle}>
							{user.passed
								? t('main-result.team-subtitle')
								: t('main-result.team-subtitle-false')}
						</h4>
						<p className={styles.text}>
							{user.passed
								? t('main-result.team-text')
								: t('main-result.team-text-false')}
						</p>
						<Button
							text={t('download-button')}
							color='arrow'
							onClick={handleDownloadCertificate}
						/>
						{user?.tutor_fullname && (
							<Button
								text='Благодарность наставнику'
								color='gradient'
								onClick={handleDownloadGratitude}
							/>
						)}
					</div>
				</Card>
			</div>
		)
	);
};
