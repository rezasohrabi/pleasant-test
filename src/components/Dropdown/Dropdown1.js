import React, { useState } from 'react';
import './styles.scss';

const Dropdown = ({ children }) => {
  const [visible, setVisible] = useState(false);
  window.onclick = (event) => {
    if (!event.target.matches('.Dropdown1__button')) {
      setVisible(false);
    }
  };

  return (
    <div className='Dropdown1'>
      <button
        className='Dropdown1__button'
        onClick={(event) => setVisible(!visible)}
      >
        toggle dropdown
      </button>
      {visible && (
        <div
          className='Dropdown1__wrapper'
          onClick={(event) => event.stopPropagation()}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
