import type { FC } from 'react';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useKeenSlider } from 'keen-slider/react';
import { useWindowWidth } from '../../../../hooks/useWindowWidth';

import { Caption } from '../../shared/Caption/caption';
import { GradientText } from '../../shared/GradientText/gradient-text';

import { ESECTION } from '../../lib/sections';

import 'keen-slider/keen-slider.min.css';
import styles from './problems.module.scss';

type TProblemCard = {
	'card-id': string;
	'card-title': string;
	'card-situation-title': string;
	'card-situation-text': string;
	'card-problem-title': string;
	'card-problem-text': string;
};

export const Problems: FC = () => {
	const { t } = useTranslation();
	const [currentSlide, setCurrentSlide] = useState(0);
	const width = useWindowWidth();

	const problemsCards = t('problems-cards', {
		returnObjects: true,
	}) as Array<TProblemCard>;

	const [sliderRef, instanceRef] = useKeenSlider({
		loop: false,
		slides: {
			perView: width > 1366 ? 3.2 : 2.2,
			spacing: 20,
		},
		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel);
		},
	});

	const total = problemsCards.length;
	const maxIndex = total - 3;
	const progress = (currentSlide / maxIndex) * 100;

	const handlePrev = () => instanceRef.current?.prev();
	const handleNext = () => instanceRef.current?.next();

	return (
		<div id={ESECTION.PROBLEMS} className={styles.container}>
			<section className={styles.problems}>
				<Caption text={t('problems-caption')} />
				<h2 className={styles.title}>
					<GradientText text={t('problems-title.0')} /> {t('problems-title.1')}
				</h2>
				<div className={styles.row}>
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
					<div className={styles.carousel}>
						<div ref={sliderRef} className='keen-slider'>
							{problemsCards.map((elem: TProblemCard, index) => (
								<div
									key={elem['card-id']}
									className={`keen-slider__slide ${styles.item}`}>
									<div className={styles.item__container}>
										<div className={styles.item__main}>
											<span className={styles.item__count}>0{index + 1}</span>
											<h3 className={styles.item__title}>
												{elem['card-title']}
											</h3>
										</div>
										<div className={styles.item__hover}>
											<span className={styles.item__count}>0{index + 1}</span>
											<h4 className={styles.item__subtitle}>
												{elem['card-situation-title']}
											</h4>
											<p className={styles.item__text}>
												{elem['card-situation-text']}
											</p>
											<h4 className={styles.item__subtitle}>
												{elem['card-problem-title']}
											</h4>
											<p className={styles.item__text}>
												{elem['card-problem-text']}
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
					</div>
				</div>
			</section>
		</div>
	);
};
