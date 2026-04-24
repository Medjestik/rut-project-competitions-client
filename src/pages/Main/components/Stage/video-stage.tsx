import type { FC } from 'react';

import { useRef, useState, useEffect } from 'react';

import poster from '../../../../shared/images/poster.png';

import styles from './stage.module.scss';

interface IVideoStage {
	url: string | null;
}

export const VideoStage: FC<IVideoStage> = ({ url }) => {
	const [isVideoPlay, setIsVideoPlay] = useState(false);
	const vidRef = useRef<HTMLVideoElement>(null);

	const handlePlayVideo = async () => {
		if (!vidRef.current || isVideoPlay) return;

		try {
			await vidRef.current.play();
			setIsVideoPlay(true);
		} catch (e) {
			if ((e as DOMException).name !== 'AbortError') {
				console.error(e);
			}
		}
	};

	useEffect(() => {
		setIsVideoPlay(false);
	}, [url]);

	if (!url) {
		return (
			<div className={styles.video}>
				<div className={styles.video__placeholder}>
					<span>No video available</span>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.video}>
			{/* eslint-disable-next-line jsx-a11y/media-has-caption */}
			<video
				key={url}
				className={styles.video__player}
				ref={vidRef}
				poster={poster}
				controls={isVideoPlay}>
				<source src={url} type='video/mp4' />
			</video>

			{!isVideoPlay && (
				<>
					<div className={styles.video__overlay} />
					<button className={styles.video__btn} onClick={handlePlayVideo} />
				</>
			)}
		</div>
	);
};
