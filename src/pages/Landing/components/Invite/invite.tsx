import type { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { Caption } from '../../shared/Caption/caption';
import { GradientText } from '../../shared/GradientText/gradient-text';

import { ESECTION } from '../../lib/sections';

import styles from './invite.module.scss';

export const Invite: FC = () => {
	const { t } = useTranslation();

	return (
		<div id={ESECTION.INVITE} className={styles.container}>
			<section className={styles.invite}>
				<div className={styles.row}>
					<Caption text={t('invite-caption')} />
					<h2 className={styles.title}>
						{t('invite-title.0')} <GradientText text={t('invite-title.1')} />
					</h2>
				</div>
				<ul className={styles.cards}>
					<li className={styles.card}>
						<h4 className={styles.card__title}>{t('invite-cards.0.title')}</h4>
						<p className={styles.card__text}>{t('invite-cards.0.text')}</p>
					</li>
					<li className={styles.card}>
						<h4 className={styles.card__title}>{t('invite-cards.1.title')}</h4>
						<p className={styles.card__text}>{t('invite-cards.1.text')}</p>
					</li>
					<li className={styles.card}>
						<h4 className={styles.card__title}>
							{t('invite-cards.2.title.0')}{' '}
							<GradientText text={t('invite-cards.2.title.1')} /> <br></br>
							<GradientText text={t('invite-cards.2.title.2')} />
						</h4>
					</li>
				</ul>
			</section>
		</div>
	);
};
