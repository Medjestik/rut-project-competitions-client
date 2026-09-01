import { Route, Routes } from 'react-router-dom';

import { useEffect } from 'react';
import { useDispatch } from '../store/store';

import { Landing } from '../pages/Landing/ui/landing';
import { Registration } from '../pages/Registration/ui/registration';
import { Main } from '../pages/Main/ui/main';
import { Consent } from '../pages/Consent/ui/consent';
import { Privacy } from '../pages/Privacy/ui/privacy';
import { NotFound } from '../pages/NotFound/ui/not-found';
import { CertificateDownload } from '../features/CertificateDownload/ui/certificate-download';

import {
	OnlyAuth,
	OnlyUnAuth,
} from '../shared/components/ProtectedRoute/protected-route';
import { ToastProvider } from '../shared/components/ToastProvider/ui/ToastProvider';
import { ScrollToTop } from '../features/ScrollToTop/ui/scroll-to-top';
import { EROUTES } from '../shared/utils/routes';

import { checkUserAuth } from '../store/user/actions';

import styles from './app.module.scss';

export const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkUserAuth());
	}, [dispatch]);

	return (
		<ToastProvider>
			<div className={styles.page}>
				<ScrollToTop />
				<Routes>
					<Route
						path={EROUTES.LANDING}
						element={<OnlyUnAuth component={<Landing />} />}
					/>
					<Route
						path={EROUTES.REGISTRATION}
						element={<OnlyUnAuth component={<Registration />} />}
					/>
					<Route
						path={EROUTES.MAIN}
						element={<OnlyAuth component={<Main />} />}
					/>

					<Route path={EROUTES.CONSENT} element={<Consent />} />
					<Route path={EROUTES.PRIVACY} element={<Privacy />} />

					<Route path='/certificate/:token' element={<CertificateDownload />} />
					<Route path='*' element={<NotFound />} />
				</Routes>

				<div id='modal-root'></div>
				<div id='toast-root'></div>
			</div>
		</ToastProvider>
	);
};
