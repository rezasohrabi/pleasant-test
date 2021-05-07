import React, { useState } from 'react';

const Counter = () => {
  const [counter, setCounter] = useState(0);
  const [input, setInput] = useState(1);

  const handleAddToCounter = () => {
    setCounter(counter + input);
  };

  const handleSubtractFromCounter = () => {
    setCounter(counter - input);
  };
  return (
    <div>
      <h1 data-testid='header'>My Counter</h1>
      <h2
        data-testid='counter'
        className={`${counter >= 100 ? 'green' : ''}${
          counter <= -100 ? 'red' : ''
        }`}
      >
        {counter}
      </h2>
      <input
        data-testid='input'
        type='input'
        onChange={(e) => setInput(parseInt(e.target.value))}
        value={input}
      />
      <button data-testid='subtractButton' onClick={handleSubtractFromCounter}>
        -
      </button>
      <button data-testid='addButton' onClick={handleAddToCounter}>
        +
      </button>
    </div>
  );
};

export default Counter;
