import React, { useEffect, useState } from 'react';

const Dropdown = ({ toggler, children }) => {
  const [visible, setVisible] = useState(false);

  const toggle = (event) => {
    event.stopPropagation();
    setVisible(!visible);
  };

  const handleClickOutside = (event) => {
    if (!event.target.classList.contains('Dropdown2__button')) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className='Dropdown2'>
      {React.cloneElement(toggler, {
        className: `${toggler?.props?.className} Dropdown2__button`,
        onClick: toggle,
      })}
      {visible && (
        <div
          className='Dropdown2__content'
          onClick={(event) => event.stopPropagation()}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
