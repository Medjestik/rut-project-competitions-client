import type { FC } from 'react';

import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from '../../../store/store';

import { downloadCertificate } from '../../../store/user/actions';

export const CertificateDownload: FC = () => {
	const { token } = useParams<{ token: string }>();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const run = async () => {
			if (!token) return;

			try {
				const { url } = await dispatch(downloadCertificate()).unwrap();

				const a = document.createElement('a');
				a.href = url;
				a.download = '';
				document.body.appendChild(a);
				a.click();
				a.remove();
			} finally {
				navigate(-1);
			}
		};

		run();
	}, [token, dispatch, navigate]);

	return null;
};
