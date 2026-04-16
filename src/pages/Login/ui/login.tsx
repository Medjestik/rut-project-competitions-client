import type { FC } from 'react';

import {
	PublicHeader,
	PublicFooter,
} from '../../../shared/components/Layout/PublicLayout/ui';
import { Main } from '../components/Main/main';
import { LoginForm } from '../components/LoginForm/login-form';

import backgroundImg from '../../../shared/images/login-background.png';

import styles from '../styles/login.module.scss';

export const Login: FC = () => {
	return (
		<div className={styles.login}>
			<img
				src={backgroundImg}
				alt='background'
				className={styles.background}
				aria-hidden='true'
			/>
			<PublicHeader />
			<div className={styles.container}>
				<Main />
				<div className={styles.form}>
					<LoginForm />
				</div>
			</div>
			<PublicFooter />
		</div>
	);
};
