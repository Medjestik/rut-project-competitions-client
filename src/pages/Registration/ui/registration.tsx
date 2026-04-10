import type { FC } from 'react';

import { Header } from '../components/Header/header';
import { Main } from '../components/Main/main';
import { Stages } from '../components/Stages/stages';
import { RegistrationForm } from '../components/RegistrationForm/registration-form';
import { Footer } from '../components/Footer/footer';

import backgroundImg from '../../../shared/images/registration-background.png';

import styles from '../styles/registration.module.scss';

export const Registration: FC = () => {
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
