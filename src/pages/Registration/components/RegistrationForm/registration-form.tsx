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
import { Preloader } from '../../../../shared/components/Preloader/ui/preloader';
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
import { PARTICIPANTS_COUNT } from '../../lib/lib';

import {
	getUniversitiesAction,
	getProblemsAction,
} from '../../../../store/catalog/actions';
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
	const { isLoadingCatalog, universities, problems } = useSelector(
		(state) => state.catalog
	);
	const { isLoading } = useSelector((state) => state.team);

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
				participants: values.participants,
			};

			try {
				await dispatch(registrationAction(registrationData)).unwrap();
				showToast({
					title: 'Вы успешно завершили регистрацию!',
					text: 'Ожидайте начала соревнований, вы получите данные для входа в личный кабинет на электронную почту.',
					type: 'success',
				});
				navigate(EROUTES.LANDING);
			} catch (err) {
				console.error(err);
				showToast({
					title: 'Ошибка при регистрации!',
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
		dispatch(getUniversitiesAction('foreign'));
		dispatch(getProblemsAction());
	}, [dispatch]);

	useEffect(() => {
		dispatch(setRegistrationStages(getStagesValidation(values)));
	}, [values, dispatch]);

	if (isLoadingCatalog) {
		return <Preloader />;
	}

	return (
		<section className={styles.form}>
			<Form name='form-registration' onSubmit={handleSubmit}>
				<div className={styles.container}>
					<Card
						title='Создание команды'
						titleSize='large'
						subtitle='Придумайте название команды, информацию об образовательной организации, которую представляет команда и данные для входа.'
						id={ESECTION.TEAM}>
						<div className={styles.form__column}>
							<FormField
								title='Название команды'
								caption='Например: Транспортный импульс'
								fieldError={{
									text: errors.name || '',
									isShow: !!errors.name,
								}}>
								<FormInput
									name='name'
									placeholder='Введите название команды'
									value={values.name}
									onChange={handleChange}
								/>
							</FormField>
							<div className={styles.form__row}>
								<FormField
									title='Логин команды'
									fieldError={{
										text: errors.login || '',
										isShow: !!errors.login,
									}}>
									<FormInput
										name='login'
										placeholder='Введите логин команды'
										value={values.login}
										onChange={handleChange}
									/>
								</FormField>
								<FormField
									title='Пароль команды'
									fieldError={{
										text: errors.password || '',
										isShow: !!errors.password,
									}}>
									<FormInput
										name='password'
										placeholder='Введите пароль команды'
										value={values.password}
										onChange={handleChange}
									/>
								</FormField>
							</div>
							<FormField
								title='Информация о вузе'
								caption='Например: РУТ (МИИТ)'>
								<SelectWithSearch
									options={universities.map((elem) => ({
										...elem,
										name: getUniversityLabel(elem),
									}))}
									currentOption={values.university}
									onChooseOption={(option) =>
										handleSelectChange('university', option)
									}
									placeholder='Выберите вашу образовательную организацию'
								/>
							</FormField>
						</div>
					</Card>
					<Card
						title='Выбор проблемы'
						titleSize='large'
						subtitle='Выберите проблему, с которой будет работать команда.'
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
											<div className={styles.problem__tag}>Выбрана</div>
										)}
									</div>
									<div className={styles.problem__main}>
										<h6 className={styles.problem__title}>{elem.title}</h6>
										<Button
											text='Подробнее'
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
						title='Участники команды'
						titleSize='large'
						subtitle='Сформируйте вашу команду. Добавьте участников команды.'
						id={ESECTION.PARTICIPANT}>
						<ul className={styles.participant__list}>
							{values.participants.length < PARTICIPANTS_COUNT && (
								<li className={styles.participant__item}>
									<div className={styles.participant__header}>
										<div
											className={styles.participant__plus}
											onClick={() => openAddParticipantModal()}></div>
										<h6 className={styles.participant__title}>
											Добавить участника
										</h6>
									</div>
									<p className={styles.participant__subtitle}>
										Откроется модальное окно с персональными данными участника.
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
											text='Удалить'
											color='cancel'
											onClick={() => handleDeleteParticipant(elem.id)}
										/>
										<Button
											text='Редактировать'
											color='arrow'
											onClick={() => openEditParticipantModal(elem)}
										/>
									</div>
								</li>
							))}
						</ul>
					</Card>
					<Card
						title='Подтверждение данных'
						titleSize='large'
						subtitle='Введите промо-код подтверждения регистрации международных команд и ознакомьтесь с согласиями о персональных данных.'
						id={ESECTION.PERSON_DATA}>
						<FormField
							title='Промо-код регистрации'
							fieldError={{
								text: errors.code || '',
								isShow: !!errors.code,
							}}>
							<FormInput
								name='code'
								placeholder='Введите промо-код'
								value={values.code}
								onChange={handleChange}
							/>
						</FormField>
						<Checkbox
							checked={values.isConfirmOne}
							onChange={() =>
								handleSelectChange('isConfirmOne', !values.isConfirmOne)
							}>
							<>
								Выражаю <Link text='согласие на обработку' path='' />{' '}
								персональных данных и подтверждаю получение согласия на передачу
								персональных данных третьих лиц на обработку.
							</>
						</Checkbox>
						<Checkbox
							checked={values.isConfirmTwo}
							onChange={() =>
								handleSelectChange('isConfirmTwo', !values.isConfirmTwo)
							}>
							<>
								Подтверждаю, что участники команды ознакомились с{' '}
								<Link
									text='Положением об обработке персональных данных РУТ (МИИТ)'
									path='https://rut-miit.ru/org/privacy'
								/>{' '}
								и принимают его условия.
							</>
						</Checkbox>
						<Checkbox
							checked={values.isConfirmThree}
							onChange={() =>
								handleSelectChange('isConfirmThree', !values.isConfirmThree)
							}>
							<>
								Выражаю <Link text='согласие на распространение' path='' />{' '}
								персональных данных в целях освещения соревнований.
							</>
						</Checkbox>
						<Checkbox
							checked={values.isConfirmFour}
							onChange={() =>
								handleSelectChange('isConfirmFour', !values.isConfirmFour)
							}>
							<>
								Подтверждаю, что участники команды ознакомились с{' '}
								<Link text='Положением' path='' /> и{' '}
								<Link text='Регламентом соревнований.' path='' />
							</>
						</Checkbox>

						<Button
							type='submit'
							text='Отправить анкету'
							color='gradient'
							isBlock={isBlockSubmit || isLoading}
							style={submitStyle}
						/>
					</Card>
				</div>
			</Form>
			{isOpenModal && (
				<Modal
					title={currentParticipant ? 'Редактирование' : 'Новый участник'}
					description={
						currentParticipant
							? 'Отредактируйте данные участника'
							: 'Добавьте данные по новому участнику'
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
