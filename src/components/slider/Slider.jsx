import { useEffect, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

import './Slider.scss';
import { sliderData } from './sliderData';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 6000;

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  //   const auto = () => {
  //     slideInterval = setInterval(nextSlide, intervalTime);
  //   };

  useEffect(() => {
    if (autoScroll) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
      };
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide, autoScroll, slideInterval]);

  const prevSlide = () => {
    setCurrentSlide(
      currentSlide === 0 ? sliderData.length - 1 : currentSlide - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide(
      currentSlide === sliderData.length - 1 ? 0 : currentSlide + 1
    );
  };

  return (
    <div className='slider'>
      <AiOutlineArrowLeft className='arrow prev' onClick={prevSlide} />
      <AiOutlineArrowRight className='arrow next' onClick={nextSlide} />

      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;
        return (
          <div
            key={index}
            className={index === currentSlide ? 'slide current' : 'slide'}
          >
            {index === currentSlide && (
              <>
                <img src={image} alt='slide' />
                <div className='content'>
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr />
                  <a href='#product' className='--btn --btn-danger'>
                    Shop Now
                  </a>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
