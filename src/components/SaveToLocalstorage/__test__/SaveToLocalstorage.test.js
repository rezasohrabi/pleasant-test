import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SaveToLocalstorage from '..';

let getByTestId = null;
beforeEach(() => {
  const component = render(<SaveToLocalstorage />);
  getByTestId = component.getByTestId;
});

test('Button renders with correct text', () => {
  const buttonRef = getByTestId('button');
  expect(buttonRef.textContent).toBe('save in storage');
});

test('Input renders without error', () => {
  const inputRef = getByTestId('input');
  expect(inputRef).toBeInTheDocument();
});

test('Change input value works correctly', () => {
  const inputRef = getByTestId('input');
  fireEvent.change(inputRef, {
    target: {
      value: 'reza sohrabi',
    },
  });
  expect(inputRef.value).toEqual('reza sohrabi');
});

test('Entering input then clicking button sets input value to localstorage', () => {
  const inputRef = getByTestId('input');
  const buttonRef = getByTestId('button');
  const value = 'my name is Reza';
  fireEvent.change(inputRef, {
    target: {
      value: value,
    },
  });
  expect(inputRef.value).toBe(value);
  fireEvent.click(buttonRef);
  render(<SaveToLocalstorage />);
  expect(localStorage.getItem('name')).toBe(value);
});
