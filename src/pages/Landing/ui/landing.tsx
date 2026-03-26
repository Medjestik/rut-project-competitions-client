import type { FC } from 'react';

import { Main } from '../components/Main/main';
import { Stages } from '../components/Stages/stages';
import { Problems } from '../components/Problems/problems';
import { Prize } from '../components/Prize/prize';
import { Reasons } from '../components/Reasons/reasons';
import { Invite } from '../components/Invite/invite';
import { FAQ } from '../components/FAQ/faq';
import { Document } from '../components/Document/document';
import { Footer } from '../components/Footer/footer';

import styles from '../styles/landing.module.scss';

export const Landing: FC = () => {
	return (
		<div className={styles.landing}>
			<Main />
			<Stages />
			<Problems />
			<Prize />
			<Reasons />
			<Invite />
			<FAQ />
			<Document />
			<Footer />
		</div>
	);
};
