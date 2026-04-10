import { Route, Routes } from 'react-router-dom';

import { Landing } from '../pages/Landing/ui/landing';
import { Registration } from '../pages/Registration/ui/registration';
import { NotFound } from '../pages/NotFound/ui/not-found';

import { ToastProvider } from '../shared/components/ToastProvider/ui/ToastProvider';
import { ScrollToTop } from '../features/ScrollToTop/ui/scroll-to-top';
import { EROUTES } from '../shared/utils/routes';

import styles from './app.module.scss';

export const App = () => {
	return (
		<ToastProvider>
			<div className={styles.page}>
				<ScrollToTop />
				<Routes>
					<Route path={EROUTES.LANDING} element={<Landing />} />
					<Route path={EROUTES.REGISTRATION} element={<Registration />} />

					<Route path='*' element={<NotFound />} />
				</Routes>

				<div id='modal-root'></div>
				<div id='toast-root'></div>
			</div>
		</ToastProvider>
	);
};
