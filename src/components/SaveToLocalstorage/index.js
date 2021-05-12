import React, { useState } from 'react';

const SaveToLocalstorage = () => {
  const [value, setValue] = useState();
  const handleChange = () => {
    localStorage.setItem('name', value);
  };
  return (
    <>
      <input
        data-testid='input'
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button data-testid='button' onClick={handleChange}>
        save in storage
      </button>
    </>
  );
};
export default SaveToLocalstorage;
