import type { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { Button } from '../../../../Button/ui/button';
import { Link } from '../../../../Link/ui/link';

import styles from './public-footer.module.scss';

export const PublicFooter: FC = () => {
	const { t } = useTranslation();

	return (
		<section id='footer' className={styles.footer}>
			<div className={styles.social}>
				<div
					className={`${styles.social__icon} ${styles.social__icon_type_vk}`}></div>
				<div
					className={`${styles.social__icon} ${styles.social__icon_type_max}`}></div>
				<div
					className={`${styles.social__icon} ${styles.social__icon_type_tg}`}></div>
				<Button text={t('support-button')} color='arrow' />
			</div>
			<p className={styles.support}>
				{t('registration-footer-text')}{' '}
				<Link text={t('registration-footer-support')} path='' />
			</p>
		</section>
	);
};
