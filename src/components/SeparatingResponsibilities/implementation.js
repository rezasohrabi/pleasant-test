// Implementation

export const increase = (prevValue, max) => {
  return {
    counter: prevValue < max ? prevValue + 1 : prevValue,
    message: prevValue < max ? '' : 'Max!',
  };
};

export const decrease = (prevValue, min) => {
  return {
    counter: prevValue > min ? prevValue - 1 : prevValue,
    menubar: prevValue > min ? '' : 'Min!',
  };
};
