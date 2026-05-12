import type { FC } from 'react';

import { useState } from 'react';
import { useSelector } from '../../../../store/store';
import { useTranslation } from 'react-i18next';
import { useKeenSlider } from 'keen-slider/react';
import { useWindowWidth } from '../../../../hooks/useWindowWidth';
import { useInView } from '../../../../hooks/useInView';

import { Caption } from '../../shared/Caption/caption';
import { GradientText } from '../../shared/GradientText/gradient-text';

import { ESECTION } from '../../lib/sections';

import 'keen-slider/keen-slider.min.css';
import styles from './problems.module.scss';

export const Problems: FC = () => {
	const { problems } = useSelector((state) => state.catalog);
	const { i18n, t } = useTranslation();
	const width = useWindowWidth();
	const { ref, isVisible } = useInView({ threshold: 0.2 });

	const [currentSlide, setCurrentSlide] = useState(0);

	const [sliderRef, instanceRef] = useKeenSlider({
		loop: false,
		slides: {
			perView: width > 1366 ? 3.2 : width > 1000 ? 2.2 : 1,
			spacing: 20,
		},
		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel);
		},
	});

	const total = problems.length;
	const perView = width > 1366 ? 3 : width > 1000 ? 2 : 1;
	const maxIndex = total - perView;
	const progress = (currentSlide / maxIndex) * 100;

	const handlePrev = () => instanceRef.current?.prev();
	const handleNext = () => instanceRef.current?.next();

	return (
		<div id={ESECTION.PROBLEMS} className={styles.container}>
			<section
				ref={ref}
				className={`${styles.problems} ${styles.fadeUp} ${
					isVisible ? styles.visible : ''
				}`}>
				<Caption text={t('problems-caption')} />
				<h2 className={styles.title}>
					<GradientText text={t('problems-title.0')} /> {t('problems-title.1')}
				</h2>
				<div className={styles.row}>
					{width > 1000 && (
						<div className={styles.info}>
							<p className={styles.text}>{t('problems-text')}</p>
							<div className={styles.control}>
								<div
									onClick={handlePrev}
									className={`${styles.arrow} ${styles.arrow_type_left}`}>
									<svg
										width='29'
										height='22'
										viewBox='0 0 29 22'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											d='M9.71445 0.750002L1.48222 8.98223C0.505907 9.95855 0.505906 11.5415 1.48222 12.5178L9.71445 20.75M2.21446 10.75L27.75 10.75'
											stroke='#F1F1F1'
											strokeWidth='1.5'
											strokeLinecap='round'
										/>
									</svg>
								</div>
								<div
									onClick={handleNext}
									className={`${styles.arrow} ${styles.arrow_type_right}`}>
									<svg
										width='29'
										height='22'
										viewBox='0 0 29 22'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											d='M18.7856 20.75L27.0178 12.5178C27.9941 11.5415 27.9941 9.95854 27.0178 8.98223L18.7856 0.750002M26.2855 10.75L0.75 10.75'
											stroke='#F1F1F1'
											strokeWidth='1.5'
											strokeLinecap='round'
										/>
									</svg>
								</div>
							</div>
						</div>
					)}
					<div className={styles.carousel}>
						<div ref={sliderRef} className='keen-slider'>
							{problems.map((elem, index) => (
								<div
									key={elem.id}
									className={`keen-slider__slide ${styles.item}`}>
									<div
										className={`${styles.item__container} ${styles.fadeCard} ${
											isVisible ? styles.visibleCard : ''
										}`}
										style={{ transitionDelay: `${index * 0.2}s` }}>
										<div className={styles.item__main}>
											<span className={styles.item__count}>0{index + 1}</span>
											<img
												className={`${styles.item__icon} ${
													elem.id === '72523429-1873-45d3-bf05-59e1a01ea3e1'
														? styles.item__icon_height_large
														: ''
												}`}
												src={elem.icon}
												alt='icon'></img>
											<h3 className={styles.item__title}>
												{i18n.language === 'en' ? elem.title_eng : elem.title}
											</h3>
										</div>
										<div className={styles.item__hover}>
											<span className={styles.item__count}>0{index + 1}</span>
											<h4 className={styles.item__subtitle}>
												{t('problems-card-situation-title')}
											</h4>
											<p className={styles.item__text}>
												{i18n.language === 'en'
													? elem.situation_eng
													: elem.situation}
											</p>
											<h4 className={styles.item__subtitle}>
												{t('problems-card-problem-title')}
											</h4>
											<p className={styles.item__text}>
												{i18n.language === 'en'
													? elem.problem_eng
													: elem.problem}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
						<div className={styles.progress}>
							<div
								className={styles.progress__bar}
								style={{ width: `${progress}%` }}
							/>
						</div>
						{width <= 1000 && (
							<div className={styles.dots}>
								{problems.map((_, idx) => (
									<div
										key={idx}
										onClick={() => instanceRef.current?.moveToIdx(idx)}
										className={`${styles.dot} ${
											currentSlide === idx ? styles.dot_active : ''
										}`}
									/>
								))}
							</div>
						)}
					</div>
				</div>
			</section>
		</div>
	);
};
