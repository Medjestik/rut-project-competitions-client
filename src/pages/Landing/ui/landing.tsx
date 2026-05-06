import type { FC } from 'react';

import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../../store/store';

import { Main } from '../components/Main/main';
import { Stages } from '../components/Stages/stages';
import { Problems } from '../components/Problems/problems';
import { Prize } from '../components/Prize/prize';
import { Reasons } from '../components/Reasons/reasons';
import { Invite } from '../components/Invite/invite';
import { FAQ } from '../components/FAQ/faq';
import { Partners } from '../components/Partners/partners';
import { Document } from '../components/Document/document';
import { Footer } from '../components/Footer/footer';
import { Preloader } from '../../../shared/components/Preloader/ui/preloader';

import { getProblemsAction } from '../../../store/catalog/actions';

import styles from '../styles/landing.module.scss';

export const Landing: FC = () => {
	const dispatch = useDispatch();
	const { isLoadingCatalog } = useSelector((state) => state.catalog);

	useEffect(() => {
		dispatch(getProblemsAction());
	}, [dispatch]);

	if (isLoadingCatalog) {
		return <Preloader />;
	}

	return (
		<div className={styles.landing}>
			<Main />
			<Stages />
			<Problems />
			<Prize />
			<Reasons />
			<Invite />
			<FAQ />
			<Partners />
			<Document />
			<Footer />
		</div>
	);
};
