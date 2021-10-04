import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './Toast.scss';

const Toast = ({ toast }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 2000);
    return () => {
      timeout && clearTimeout(timeout);
    };
  }, []);

  return (
    <CSSTransition
      in={isVisible}
      timeout={{
        appear: 2000,
        exit: 800,
      }}
      classNames='title-screen-'
      unmountOnExit={true}
      appear={true}
      enter={false}
    >
      <div className='toast'>{toast}</div>
    </CSSTransition>
  );
};
export default Toast;
