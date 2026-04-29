import type { FC } from 'react';

import { useTranslation } from 'react-i18next';
import { useInView } from '../../../../hooks/useInView';
import { useWindowWidth } from '../../../../hooks/useWindowWidth';

import { Link } from 'react-scroll';
import { Button } from '../../../../shared/components/Button/ui/button';
import { GradientText } from '../../shared/GradientText/gradient-text';

import { navLinks } from './data';
import { getCurrentYear } from '../../../../shared/utils/getCurrentYear';
import { ESECTION } from '../../lib/sections';
import {
	SUPPORT_MAIL,
	SOCIAL_TG,
	SOCIAL_MAX,
	SOCIAL_VK,
} from '../../../../shared/lib/lib';

import styles from './footer.module.scss';

export const Footer: FC = () => {
	const width = useWindowWidth();
	const { t } = useTranslation();

	const { ref, isVisible } = useInView({ threshold: 0.2 });

	return (
		<div id={ESECTION.FOOTER} className={styles.container}>
			<section
				ref={ref}
				className={`${styles.footer} ${styles.fadeUp} ${
					isVisible ? styles.visible : ''
				}`}>
				<div className={styles.row}>
					<div
						className={`${styles.logos} ${styles.fadeUp} ${
							isVisible ? styles.visible : ''
						}`}
						style={{ transitionDelay: '0.2s' }}>
						<div className={`${styles.logo} ${styles.logo_min}`}></div>
						<div className={`${styles.logo} ${styles.logo_rut}`}></div>
					</div>
					<nav
						className={`${styles.nav} ${styles.fadeUp} ${
							isVisible ? styles.visible : ''
						}`}
						style={{ transitionDelay: '0.3s' }}>
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
					<div
						className={`${styles.contacts} ${styles.fadeUp} ${
							isVisible ? styles.visible : ''
						}`}
						style={{ transitionDelay: width > 1000 ? '0.6s' : '0.1s' }}>
						<h2 className={styles.title}>
							{t('footer-title.0')} <br />
							<GradientText text={t('footer-title.1')} />
						</h2>
						<div className={styles.social}>
							<a
								className={`${styles.social__icon} ${styles.social__icon_type_vk}`}
								href={SOCIAL_VK}
								target='_blank'
								rel='noreferrer'>
								{' '}
							</a>
							<a
								className={`${styles.social__icon} ${styles.social__icon_type_max}`}
								href={SOCIAL_MAX}
								target='_blank'
								rel='noreferrer'>
								{' '}
							</a>
							<a
								className={`${styles.social__icon} ${styles.social__icon_type_tg}`}
								href={SOCIAL_TG}
								target='_blank'
								rel='noreferrer'>
								{' '}
							</a>
							<Button
								text={t('support-button')}
								color={width > 1000 ? 'arrow' : 'gradient'}
								type='link'
								href={SUPPORT_MAIL}
							/>
						</div>
					</div>
				</div>
				<p
					className={`${styles.copy} ${styles.fadeUp} ${
						isVisible ? styles.visible : ''
					}`}
					style={{ transitionDelay: '0.8s' }}>
					&copy; {getCurrentYear()} {t('footer-copy')}
				</p>
			</section>
		</div>
	);
};
