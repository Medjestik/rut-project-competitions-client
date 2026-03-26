import type { FC } from 'react';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { navLinks } from './data';

import { Link } from 'react-scroll';
import { Button } from '../../../../shared/components/Button/ui/button';

import styles from './header.module.scss';

export const Header: FC = () => {
	const { t, i18n } = useTranslation();
	const [lang, setLang] = useState<string>(i18n.language);

	const handleChangeLanguage = (lang: string) => {
		i18n.changeLanguage(lang);
		setLang(lang);
	};

	return (
		<header className={styles.header}>
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
				<div className={styles.langSwitcher}>
					<div
						className={`${styles.lang} ${lang === 'ru' ? styles.active : ''}`}
						onClick={() => handleChangeLanguage('ru')}>
						RU
					</div>

					<span>/</span>

					<div
						className={`${styles.lang} ${lang === 'en' ? styles.active : ''}`}
						onClick={() => handleChangeLanguage('en')}>
						EN
					</div>
				</div>
				<Button text={t('main-registration')} color='gradient' />
			</div>
		</header>
	);
};
