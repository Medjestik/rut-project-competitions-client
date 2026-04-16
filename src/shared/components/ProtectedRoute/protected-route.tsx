import type { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from '../../../store/store';
import { getIsAuthChecked, getUser } from '../../../store/user/reducer';
import { Preloader } from '../Preloader/ui/preloader';

interface IProtectedProps {
	onlyUnAuth?: boolean;
	component: ReactElement;
}

const Protected: FC<IProtectedProps> = ({ onlyUnAuth = false, component }) => {
	const isAuthChecked = useSelector(getIsAuthChecked);
	const user = useSelector(getUser);

	console.log('Auth checked:', isAuthChecked, 'User:', user);

	if (!isAuthChecked) return <Preloader />;

	if (!user && !onlyUnAuth) {
		return <Navigate to='/login' replace />;
	}

	if (onlyUnAuth && user) {
		return <Navigate to='/main' replace />;
	}

	return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: { component: ReactElement }) => (
	<Protected onlyUnAuth component={component} />
);
