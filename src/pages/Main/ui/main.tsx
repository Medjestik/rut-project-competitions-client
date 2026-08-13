import type { FC } from 'react';

import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../../store/store';

import { Header } from '../components/Header/header';
import { Participant } from '../components/Participant/participant';
import { Result } from '../components/Result/result';
import { Control } from '../components/Control/control';
import { PublicFooter } from '../../../shared/components/Layout/PublicLayout/ui';
import { Preloader } from '../../../shared/components/Preloader/ui/preloader';

import { getStagesAction } from '../../../store/main/actions';

import styles from '../styles/main.module.scss';

export const Main: FC = () => {
	const dispatch = useDispatch();
	const { user, isLoading } = useSelector((state) => state.user);

	useEffect(() => {
		dispatch(getStagesAction());
	}, [dispatch]);

	if (isLoading) {
		return <Preloader />;
	}

	return (
		<div className={styles.main}>
			<Header />
			{user && user.role === 'team' && <Result />}
			{user && user.role === 'admin' && <Control />}
			<PublicFooter />
		</div>
	);
};
