import type { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { Link } from 'react-scroll';
import { Button } from '../../../../shared/components/Button/ui/button';
import { LanguageSwitcher } from '../../../../widgets/LanguageSwitcher/ui/language-switcher';

import { navLinks } from './data';
import { ESECTION } from '../../lib/sections';

import styles from './header.module.scss';

export const Header: FC = () => {
	const { t } = useTranslation();

	return (
		<header id={ESECTION.HEADER} className={styles.header}>
			<div className={styles.logos}>
				<div className={`${styles.logo} ${styles.logo_min}`}></div>
				<div className={`${styles.logo} ${styles.logo_rut}`}></div>
			</div>
			<nav className={styles.nav}>
				{navLinks.map((item) => (
					<Link
						key={item.id}
						className={styles.link}
						to={item.id}
						smooth={true}
						offset={item.offset}
						duration={item.duration}
						spy={true}>
						{t(`nav.${item.position}`)}
					</Link>
				))}
			</nav>
			<div className={styles.control}>
				<LanguageSwitcher />
				<Button text={t('main-registration')} color='gradient' />
			</div>
		</header>
	);
};
