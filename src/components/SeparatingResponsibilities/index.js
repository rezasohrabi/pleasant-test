import React, { useState } from 'react';

const SeparatingResponsibilities = (props) => {
  const [counter, setCounter] = useState(0);
  const [message, setMessage] = useState('');

  const handleAddToCounter = () => {
    if (counter >= 10) {
      setMessage('Max!');
      return;
    }
    setCounter(counter + 1);
    setMessage('');
  };

  const handleSubtractFromCounter = () => {
    if (counter <= 0) {
      setMessage('Min!');
      return;
    }
    setCounter(counter - 1);
    setMessage('');
  };

  return (
    <div>
      <button onClick={handleAddToCounter}> + </button>
      <button onClick={handleSubtractFromCounter}> - </button>
      <h1>{counter}</h1>
      <p>{message}</p>
    </div>
  );
};

export default SeparatingResponsibilities;
