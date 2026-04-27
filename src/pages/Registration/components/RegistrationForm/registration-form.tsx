import type { FC, FormEvent, MouseEvent } from 'react';
import type {
	IRegisterForm,
	IRegisterData,
	IParticipantData,
} from '../../types/types';
import type { IProblem } from '../../../../store/catalog/types';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../../../store/store';
import { useForm } from '../../../../hooks/useForm';
import { useToast } from '../../../../shared/components/ToastProvider/ui/ToastProvider';
import { useTranslation, Trans } from 'react-i18next';

import { Form } from '../../../../shared/components/Form/ui/form';
import {
	FormField,
	FormInput,
} from '../../../../shared/components/Form/components';
import { SelectWithSearch } from '../../../../shared/components/Select/ui/select-with-search';
import { Checkbox } from '../../../../shared/components/Checkbox/ui/checkbox';
import { Button } from '../../../../shared/components/Button/ui/button';
import { Card } from '../../../../shared/components/Card/ui';
import { Link } from '../../../../shared/components/Link/ui/link';
import { Modal } from '../../../../shared/components/Modal/ui/modal';
import { ParticipantForm } from './participant-form';

import {
	initialRegistrationValues,
	validationRegistrationSchema,
	shouldBlockRegistrationSubmit,
	getStagesValidation,
} from '../../lib/helpers';
import { ESECTION } from '../../lib/sections';
import { EROUTES } from '../../../../shared/utils/routes';
import { getErrorMessage } from '../../../../shared/lib/getErrorMessage';
import { getUniversityLabel } from '../../../../store/catalog/helper';
import { PARTICIPANTS_COUNT, CONFIRM_LINKS } from '../../lib/lib';

import { registrationAction } from '../../../../store/team/actions';
import { setRegistrationStages } from '../../../../store/team/reducer';

import styles from './registration-form.module.scss';

const submitStyle = {
	margin: '20px 0 0 0',
};

export const RegistrationForm: FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { showToast } = useToast();
	const { universities, problems } = useSelector((state) => state.catalog);
	const { isLoading } = useSelector((state) => state.team);
	const { t } = useTranslation();

	const [currentParticipant, setCurrentParticipant] =
		useState<IParticipantData | null>(null);
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

	const { values, handleChange, handleSelectChange, errors } =
		useForm<IRegisterForm>(
			initialRegistrationValues,
			validationRegistrationSchema
		);

	const [isBlockSubmit, setIsBlockSubmit] = useState<boolean>(true);

	const handleViewProblem = (
		event: MouseEvent<HTMLButtonElement>,
		problem: IProblem
	) => {
		event.stopPropagation();
		console.log(problem);
	};

	const openAddParticipantModal = () => {
		setIsOpenModal(true);
	};

	const handleAddParticipant = (participant: IParticipantData) => {
		handleSelectChange('participants', [...values.participants, participant]);

		setIsOpenModal(false);
	};

	const openEditParticipantModal = (elem: IParticipantData) => {
		setCurrentParticipant(elem);
		setIsOpenModal(true);
	};

	const handleEditParticipant = (elem: IParticipantData) => {
		handleSelectChange(
			'participants',
			values.participants.map((p) => (p.id === elem.id ? elem : p))
		);

		setCurrentParticipant(null);
		setIsOpenModal(false);
	};

	const handleDeleteParticipant = (id: string) => {
		handleSelectChange(
			'participants',
			values.participants.filter((p) => p.id !== id)
		);
	};

	const closeModal = () => {
		setIsOpenModal(false);
		setCurrentParticipant(null);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!isBlockSubmit && values.university && values.case) {
			const registrationData: IRegisterData = {
				name: values.name,
				login: values.login,
				password: values.password,
				university: values.university.id,
				case: values.case.id,
				promocode: values.code,
				tutor_fullname: values.tutor_fullname,
				tutor_email: values.tutor_email,
				participants: values.participants,
			};

			try {
				await dispatch(registrationAction(registrationData)).unwrap();
				showToast({
					title: t('toasts.success-registration.title'),
					text: t('toasts.success-registration.text'),
					type: 'success',
				});
				navigate(EROUTES.LANDING);
			} catch (err) {
				console.error(err);
				showToast({
					title: t('toasts.error-registration.title'),
					text: getErrorMessage(err),
					type: 'error',
				});
			}
		}
	};

	useEffect(() => {
		setIsBlockSubmit(shouldBlockRegistrationSubmit(values, errors));
	}, [values, errors]);

	useEffect(() => {
		dispatch(setRegistrationStages(getStagesValidation(values, errors)));
	}, [values, errors, dispatch]);

	return (
		<section className={styles.form}>
			<Form name='form-registration' onSubmit={handleSubmit}>
				<div className={styles.container}>
					<Card
						title={t('registration-form-section-team-title')}
						titleSize='large'
						subtitle={t('registration-form-section-team-subtitle')}
						id={ESECTION.TEAM}>
						<div className={styles.form__column}>
							<FormField
								title={t('registration-form-section-team-input-title-name')}
								caption={t('registration-form-section-team-input-caption-name')}
								fieldError={{
									text: errors.name ? t(errors.name) : '',
									isShow: !!errors.name,
								}}>
								<FormInput
									name='name'
									placeholder={t(
										'registration-form-section-team-input-placeholder-name'
									)}
									value={values.name}
									onChange={handleChange}
								/>
							</FormField>
							<div className={styles.form__row}>
								<FormField
									title={t('registration-form-section-team-input-title-login')}
									fieldError={{
										text: errors.login ? t(errors.login) : '',
										isShow: !!errors.login,
									}}>
									<FormInput
										name='login'
										placeholder={t(
											'registration-form-section-team-input-placeholder-login'
										)}
										value={values.login}
										onChange={handleChange}
									/>
								</FormField>
								<FormField
									title={t(
										'registration-form-section-team-input-title-password'
									)}
									fieldError={{
										text: errors.password ? t(errors.password) : '',
										isShow: !!errors.password,
									}}>
									<FormInput
										name='password'
										placeholder={t(
											'registration-form-section-team-input-placeholder-password'
										)}
										value={values.password}
										onChange={handleChange}
									/>
								</FormField>
							</div>
							<FormField
								title={t(
									'registration-form-section-team-input-title-university'
								)}
								caption={t(
									'registration-form-section-team-input-caption-university'
								)}>
								<SelectWithSearch
									options={universities.map((elem) => ({
										...elem,
										name: getUniversityLabel(elem),
									}))}
									currentOption={values.university}
									onChooseOption={(option) =>
										handleSelectChange('university', option)
									}
									placeholder={t(
										'registration-form-section-team-input-placeholder-university'
									)}
								/>
							</FormField>
						</div>
					</Card>
					<Card
						title={t('registration-form-section-problem-title')}
						titleSize='large'
						subtitle={t('registration-form-section-problem-subtitle')}
						id={ESECTION.PROBLEM}>
						<ul className={styles.problem__list}>
							{problems.map((elem, i) => (
								<li
									key={elem.id}
									className={`${styles.problem__item} ${
										elem.id === values.case?.id
											? styles.problem__item_active
											: ''
									}`}
									onClick={() => handleSelectChange('case', elem)}>
									<div className={styles.problem__header}>
										<span className={styles.problem__count}>0{i + 1}</span>
										{elem.id === values.case?.id && (
											<div className={styles.problem__tag}>
												{t('registration-form-section-problem-active')}
											</div>
										)}
									</div>
									<div className={styles.problem__main}>
										<h6 className={styles.problem__title}>{elem.title}</h6>
										<Button
											text={t('detail-button')}
											color={
												elem.id === values.case?.id ? 'arrow-white' : 'arrow'
											}
											onClick={(e) => handleViewProblem(e, elem)}
										/>
									</div>
								</li>
							))}
						</ul>
					</Card>
					<Card
						title={t('registration-form-section-participant-title')}
						titleSize='large'
						subtitle={t('registration-form-section-participant-subtitle')}
						id={ESECTION.PARTICIPANT}>
						<ul className={styles.participant__list}>
							{values.participants.length < PARTICIPANTS_COUNT && (
								<li className={styles.participant__item}>
									<div className={styles.participant__header}>
										<div
											className={styles.participant__plus}
											onClick={() => openAddParticipantModal()}></div>
										<h6 className={styles.participant__title}>
											{t('registration-form-section-participant-add-btn')}
										</h6>
									</div>
									<p className={styles.participant__subtitle}>
										{t('registration-form-section-participant-add-text')}
									</p>
								</li>
							)}
							{values.participants.map((elem, i) => (
								<li key={i} className={styles.participant__item}>
									<h6 className={styles.participant__title}>
										{elem.first_name} {elem.last_name}
									</h6>
									<p className={styles.participant__subtitle}>
										{`${elem.level} курс  ${elem.group_name}`}
									</p>
									<div className={styles.participant__control}>
										<Button
											text={t('delete-button')}
											color='cancel'
											onClick={() => handleDeleteParticipant(elem.id)}
										/>
										<Button
											text={t('edit-button')}
											color='arrow'
											onClick={() => openEditParticipantModal(elem)}
										/>
									</div>
								</li>
							))}
						</ul>
					</Card>
					<Card
						title={t('registration-form-section-tutor-title')}
						titleSize='large'
						subtitle={t('registration-form-section-tutor-subtitle')}
						id={ESECTION.TUTOR}>
						<div className={styles.form__row}>
							<FormField
								title={t(
									'registration-form-section-tutor-input-title-tutor-fullname'
								)}>
								<FormInput
									name='tutor_fullname'
									placeholder={t(
										'registration-form-section-tutor-input-placeholder-tutor-fullname'
									)}
									value={values.tutor_fullname}
									onChange={handleChange}
								/>
							</FormField>
							<FormField
								title={t(
									'registration-form-section-tutor-input-title-tutor-email'
								)}>
								<FormInput
									name='tutor_email'
									placeholder={t(
										'registration-form-section-tutor-input-placeholder-tutor-email'
									)}
									value={values.tutor_email}
									onChange={handleChange}
								/>
							</FormField>
						</div>
					</Card>
					<Card
						title={t('registration-form-section-data-title')}
						titleSize='large'
						subtitle={t('registration-form-section-data-subtitle')}
						id={ESECTION.PERSON_DATA}>
						<FormField
							title={t('registration-form-section-data-input-title-promo')}
							fieldError={{
								text: errors.code ? t(errors.code) : '',
								isShow: !!errors.code,
							}}>
							<FormInput
								name='code'
								placeholder={t(
									'registration-form-section-data-input-placeholder-promo'
								)}
								value={values.code}
								onChange={handleChange}
							/>
						</FormField>
						<Checkbox
							checked={values.isConfirmOne}
							onChange={() =>
								handleSelectChange('isConfirmOne', !values.isConfirmOne)
							}>
							<Trans
								i18nKey='registration-form-section-data-checkbox-one-text'
								components={{
									link: (
										<Link
											text={t(
												'registration-form-section-data-checkbox-one-link'
											)}
											path={CONFIRM_LINKS[0]}
										/>
									),
								}}
							/>
						</Checkbox>
						<Checkbox
							checked={values.isConfirmTwo}
							onChange={() =>
								handleSelectChange('isConfirmTwo', !values.isConfirmTwo)
							}>
							<Trans
								i18nKey='registration-form-section-data-checkbox-two-text'
								components={{
									link: (
										<Link
											text={t(
												'registration-form-section-data-checkbox-two-link'
											)}
											path={CONFIRM_LINKS[1]}
										/>
									),
								}}
							/>
						</Checkbox>
						<Checkbox
							checked={values.isConfirmThree}
							onChange={() =>
								handleSelectChange('isConfirmThree', !values.isConfirmThree)
							}>
							<Trans
								i18nKey='registration-form-section-data-checkbox-three-text'
								components={{
									link: (
										<Link
											text={t(
												'registration-form-section-data-checkbox-three-link'
											)}
											path={CONFIRM_LINKS[2]}
										/>
									),
								}}
							/>
						</Checkbox>
						<Checkbox
							checked={values.isConfirmFour}
							onChange={() =>
								handleSelectChange('isConfirmFour', !values.isConfirmFour)
							}>
							<Trans
								i18nKey='registration-form-section-data-checkbox-four-text'
								components={{
									link1: (
										<Link
											text={t(
												'registration-form-section-data-checkbox-four-link1'
											)}
											path={CONFIRM_LINKS[3]}
										/>
									),
									link2: (
										<Link
											text={t(
												'registration-form-section-data-checkbox-four-link2'
											)}
											path={CONFIRM_LINKS[4]}
										/>
									),
								}}
							/>
						</Checkbox>

						<Button
							type='submit'
							text={t('registration-button')}
							color='gradient'
							isBlock={isBlockSubmit || isLoading}
							style={submitStyle}
						/>
					</Card>
				</div>
			</Form>
			{isOpenModal && (
				<Modal
					title={
						currentParticipant
							? t('participant-form-edit-title')
							: t('participant-form-title')
					}
					description={
						currentParticipant
							? t('participant-form-edit-subtitle')
							: t('participant-form-subtitle')
					}
					isOpen={isOpenModal}
					onClose={closeModal}>
					<ParticipantForm
						onSubmit={
							currentParticipant ? handleEditParticipant : handleAddParticipant
						}
						initialData={currentParticipant}
					/>
				</Modal>
			)}
		</section>
	);
};
