import type { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { Button } from '../../../../Button/ui/button';

import {
	SUPPORT_MAIL,
	SOCIAL_TG,
	SOCIAL_MAX,
	SOCIAL_VK,
} from '../../../../../lib/lib';

import styles from './public-footer.module.scss';

export const PublicFooter: FC = () => {
	const { t } = useTranslation();

	return (
		<section id='footer' className={styles.footer}>
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
					color='arrow'
					type='link'
					href={SUPPORT_MAIL}
				/>
			</div>
		</section>
	);
};
