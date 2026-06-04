import type { FC } from 'react';

import { useTranslation } from 'react-i18next';
import { useWindowWidth } from '../../../../hooks/useWindowWidth';
import { useSelector, useDispatch } from '../../../../store/store';

import { Button } from '../../../../shared/components/Button/ui/button';
import { LanguageSwitcher } from '../../../../widgets/LanguageSwitcher/ui/language-switcher';

import { logoutUser } from '../../../../store/user/actions';

import styles from './header.module.scss';

export const Header: FC = () => {
	const { i18n, t } = useTranslation();
	const width = useWindowWidth();
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logoutUser());
	};

	return (
		<header id='header' className={styles.header}>
			<div className={styles.logos}>
				<div
					className={`${styles.logo} ${
						i18n.language === 'en' ? styles.logo_min_en : styles.logo_min
					}`}></div>
				<div
					className={`${styles.logo} ${
						i18n.language === 'en' ? styles.logo_rut_en : styles.logo_rut
					}`}></div>
			</div>
			<div className={styles.control}>
				<LanguageSwitcher />
				{user && width > 1000 && <Button text={user.name} color='cancel' />}

				<Button
					text={t('logout-button')}
					color='gradient'
					onClick={handleLogout}
				/>
			</div>
		</header>
	);
};
