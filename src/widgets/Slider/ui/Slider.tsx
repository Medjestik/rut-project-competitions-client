import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import img1 from '../../../shared/images/history/case1.png';
import img2 from '../../../shared/images/history/case2.png';
import img3 from '../../../shared/images/history/case3.png';
import img4 from '../../../shared/images/history/case4.png';
import img5 from '../../../shared/images/history/case5.png';

import '../styles/style.css';

const Slider = () => {

  return (
    <Carousel
      emulateTouch
      swipeable
      showThumbs={false}
      showStatus={false}
      infiniteLoop
      autoPlay={true}
    >
      <div className='slider__item'>
        <img className='slider__img' src={img1} />
      </div>
      <div className='slider__item'>
        <img className='slider__img' src={img2} />
      </div>
      <div className='slider__item'>
        <img className='slider__img' src={img3} />
      </div>
      <div className='slider__item'>
        <img className='slider__img' src={img4} />
      </div>
      <div className='slider__item'>
        <img className='slider__img' src={img5} />
      </div>
    </Carousel>
  );
};

export default Slider;
