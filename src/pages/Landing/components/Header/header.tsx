import type { FC } from 'react';

import { useState, useEffect } from 'react';
import { useWindowWidth } from '../../../../hooks/useWindowWidth';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-scroll';
import { LanguageSwitcher } from '../../../../widgets/LanguageSwitcher/ui/language-switcher';

import { navLinks } from './data';
import { ESECTION } from '../../lib/sections';

import styles from './header.module.scss';

export const Header: FC = () => {
	const width = useWindowWidth();
	const { i18n, t } = useTranslation();

	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : 'auto';
	}, [isOpen]);

	return (
		<header id={ESECTION.HEADER} className={styles.header}>
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
				{width <= 1000 && (
					<div
						className={styles.menu_btn}
						onClick={() => setIsOpen((prev) => !prev)}></div>
				)}
			</div>
			<div
				className={`${styles.mobileMenu} ${
					isOpen ? styles.mobileMenu_open : ''
				}`}>
				<div
					className={styles.menu_close}
					onClick={() => setIsOpen((prev) => !prev)}></div>
				<div className={styles.mobileMenu__content}>
					{navLinks.map((item) => (
						<Link
							key={item.id}
							className={styles.link}
							to={item.id}
							smooth
							offset={item.offset}
							duration={item.duration}
							onClick={() => setIsOpen(false)}>
							{t(`nav.${item.position}`)}
						</Link>
					))}
				</div>
			</div>
		</header>
	);
};
