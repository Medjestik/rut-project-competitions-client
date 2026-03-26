import type { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { Link } from 'react-scroll';
import { Button } from '../../../../shared/components/Button/ui/button';
import { GradientText } from '../../shared/GradientText/gradient-text';

import { navLinks } from './data';
import { getCurrentYear } from '../../../../shared/utils/getCurrentYear';

import styles from './footer.module.scss';

export const Footer: FC = () => {
	const { t } = useTranslation();

	return (
		<div id='footer' className={styles.container}>
			<section className={styles.footer}>
				<div className={styles.row}>
					<div className={styles.logos}>
						<div className={`${styles.logo} ${styles.logo_min}`}></div>
						<div className={`${styles.logo} ${styles.logo_rut}`}></div>
					</div>
					<nav className={styles.nav}>
						<div className={styles.nav__column}>
							{navLinks.slice(0, 4).map((item) => (
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
						</div>
						<div className={styles.nav__column}>
							{navLinks.slice(4).map((item) => (
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
						</div>
					</nav>
					<div className={styles.contacts}>
						<h2 className={styles.title}>
							{t('footer-title.0')} <br />
							<GradientText text={t('footer-title.1')} />
						</h2>
						<div className={styles.social}>
							<div
								className={`${styles.social__icon} ${styles.social__icon_type_vk}`}></div>
							<div
								className={`${styles.social__icon} ${styles.social__icon_type_max}`}></div>
							<Button text={t('support-button')} color='arrow' />
						</div>
					</div>
				</div>
				<p className={styles.copy}>
					&copy; {getCurrentYear()} {t('footer-copy')}
				</p>
			</section>
		</div>
	);
};
