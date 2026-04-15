import type { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { Button } from '../../../../shared/components/Button/ui/button';
import { Link } from '../../../../shared/components/Link/ui/link';

import { ESECTION } from '../../lib/sections';

import styles from './footer.module.scss';

export const Footer: FC = () => {
	const { t } = useTranslation();

	return (
		<section id={ESECTION.FOOTER} className={styles.footer}>
			<div className={styles.social}>
				<div
					className={`${styles.social__icon} ${styles.social__icon_type_vk}`}></div>
				<div
					className={`${styles.social__icon} ${styles.social__icon_type_max}`}></div>
				<div className={`${styles.social__icon}`}></div>
				<Button text={t('support-button')} color='arrow' />
			</div>
			<p className={styles.support}>
				{t('registration-footer-text')}{' '}
				<Link text={t('registration-footer-support')} path='' />
			</p>
		</section>
	);
};
