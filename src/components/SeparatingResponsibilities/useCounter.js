// business logic

import { useState } from 'react';
import { increase, decrease } from './implementation';

const useCounter = () => {
  const [state, setState] = useState({
    counter: 0,
    message: '',
  });

  const handleAddToCounter = () => {
    setState(increase(state.counter, 10));
  };

  const handleSubtractFromCounter = () => {
    setState(decrease(state.counter, 0));
  };

  return { state, handleAddToCounter, handleSubtractFromCounter };
};

export default useCounter;
