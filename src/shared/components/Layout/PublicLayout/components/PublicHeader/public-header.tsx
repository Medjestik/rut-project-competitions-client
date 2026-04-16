import type { FC } from 'react';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button } from '../../../../Button/ui/button';
import { LanguageSwitcher } from '../../../../../../widgets/LanguageSwitcher/ui/language-switcher';

import { EROUTES } from '../../../../../utils/routes';

import styles from './public-header.module.scss';

export const PublicHeader: FC = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	return (
		<header id='header' className={styles.header}>
			<div className={styles.logos}>
				<div className={`${styles.logo} ${styles.logo_min}`}></div>
				<div className={`${styles.logo} ${styles.logo_rut}`}></div>
			</div>
			<div className={styles.control}>
				<LanguageSwitcher />
				<Button
					text={t('registration-btn-back')}
					color='gradient'
					onClick={() => navigate(EROUTES.LANDING)}
				/>
			</div>
		</header>
	);
};
