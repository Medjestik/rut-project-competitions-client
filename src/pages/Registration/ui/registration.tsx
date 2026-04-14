import type { FC } from 'react';

import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../../store/store';

import { Header } from '../components/Header/header';
import { Main } from '../components/Main/main';
import { Stages } from '../components/Stages/stages';
import { RegistrationForm } from '../components/RegistrationForm/registration-form';
import { Footer } from '../components/Footer/footer';
import { Preloader } from '../../../shared/components/Preloader/ui/preloader';

import {
	getUniversitiesAction,
	getProblemsAction,
} from '../../../store/catalog/actions';

import backgroundImg from '../../../shared/images/registration-background.png';

import styles from '../styles/registration.module.scss';

export const Registration: FC = () => {
	const dispatch = useDispatch();
	const { isLoadingCatalog } = useSelector((state) => state.catalog);

	useEffect(() => {
		dispatch(getUniversitiesAction('foreign'));
		dispatch(getProblemsAction());
	}, [dispatch]);

	if (isLoadingCatalog) {
		return <Preloader />;
	}

	return (
		<div className={styles.registration}>
			<img
				src={backgroundImg}
				alt='background'
				className={styles.background}
				aria-hidden='true'
			/>
			<Header />
			<Main />
			<div className={styles.container}>
				<Stages />
				<RegistrationForm />
			</div>
			<Footer />
		</div>
	);
};
