import React, { useState } from 'react';
import { useCopyToClipboard } from '../../hooks';

const SaveToLocalstorage = () => {
  const [value, setValue] = useState('');
  const copyToClipboard = useCopyToClipboard(value, 'Successfully copied!');
  const handleChange = () => {
    localStorage.setItem('name', value);
    copyToClipboard();
  };
  return (
    <>
      <input
        data-testid='input'
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button data-testid='button' onClick={handleChange}>
        save in storage and copy to clipboard!
      </button>
    </>
  );
};
export default SaveToLocalstorage;
