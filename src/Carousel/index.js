import React, { useEffect, useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './styles.scss';

const images = [
  'https://randomuser.me/api/portraits/women/52.jpg',
  'https://randomuser.me/api/portraits/women/2.jpg',
  'https://randomuser.me/api/portraits/women/62.jpg',
  'https://randomuser.me/api/portraits/women/54.jpg',
  'https://randomuser.me/api/portraits/women/59.jpg',
  'https://randomuser.me/api/portraits/women/51.jpg',
];

const Carousel = (props) => {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };
  const handleNext = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <section className='image-slider'>
      <button onClick={handlePrev}>previous</button>
      {images.map((url, index) => {
        return (
          <button
            key={index}
            className={index === current ? 'button active' : 'button'}
            onClick={() => setCurrent(index)}
          >
            {index + 1}
          </button>
        );
      })}
      <button onClick={handleNext}>next</button>
      <TransitionGroup>
        {images.map((url, index) => (
          <CSSTransition
            key={url}
            classNames='customer'
            timeout={{ enter: 500, exit: 1200 }}
          >
            <div className={index === current ? 'slide active' : 'slide'}>
              {index === current && <img src={url} alt='' />}
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </section>
  );
};

export default Carousel;
