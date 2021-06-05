// Presentation
import React from 'react';
import useCounter from './useCounter';

const Presentaion = () => {
  const { state, handleAddToCounter, handleSubtractFromCounter } = useCounter();

  return (
    <div>
      <button onClick={handleAddToCounter}> + </button>
      <button onClick={handleSubtractFromCounter}> - </button>
      <h1>{state.counter}</h1>
      <p>{state.message}</p>
    </div>
  );
};

export default Presentaion;
