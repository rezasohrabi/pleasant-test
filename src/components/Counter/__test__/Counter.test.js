import React from 'react';
import Counter from '../index';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('Header renders width correct text', () => {
  const { getByTestId } = render(<Counter />);
  const headerEl = getByTestId('header');

  expect(headerEl.textContent).toBe('My Counter');
});

test('Counter initially starts with text of 0', () => {
  const { getByTestId } = render(<Counter />);
  const counterEl = getByTestId('counter');

  expect(counterEl.textContent).toBe('0');
});

test('Input contains intial value of 1', () => {
  const { getByTestId } = render(<Counter />);
  const inputEl = getByTestId('input');

  expect(inputEl.value).toBe('1');
});

test('Add button renders with +', () => {
  const { getByTestId } = render(<Counter />);
  const addButton = getByTestId('addButton');

  expect(addButton.textContent).toBe('+');
});

test('Subtract button renders with -', () => {
  const { getByTestId } = render(<Counter />);
  const subtractButton = getByTestId('subtractButton');

  expect(subtractButton.textContent).toBe('-');
});

test('Change value of input works correctly', () => {
  const { getByTestId } = render(<Counter />);
  const inputEl = getByTestId('input');
  fireEvent.change(inputEl, {
    target: {
      value: '5',
    },
  });

  expect(inputEl.value).toBe('5');
});

test('Click on plus button adds 1 to counter', () => {
  const { getByTestId } = render(<Counter />);
  const addButton = getByTestId('addButton');
  const counterEl = getByTestId('counter');

  expect(counterEl.textContent).toBe('0');
  fireEvent.click(addButton);
  expect(counterEl.textContent).toBe('1');
});

test('Click on minus button subtracts 1 from counter', () => {
  const { getByTestId } = render(<Counter />);
  const subtractButton = getByTestId('subtractButton');
  const counterEl = getByTestId('counter');

  expect(counterEl.textContent).toBe('0');
  fireEvent.click(subtractButton);
  expect(counterEl.textContent).toBe('-1');
});

test('Changing input value then clicking on add button works correctly', () => {
  const { getByTestId } = render(<Counter />);
  const addButton = getByTestId('addButton');
  const inputEl = getByTestId('input');
  const counter = getByTestId('counter');

  fireEvent.change(inputEl, {
    target: {
      value: '5',
    },
  });

  fireEvent.click(addButton);

  expect(counter.textContent).toBe('5');
});

test('Changing input value then clicking on subtract button works correctly', () => {
  const { getByTestId } = render(<Counter />);
  const subtractButton = getByTestId('subtractButton');
  const inputEl = getByTestId('input');
  const counter = getByTestId('counter');

  fireEvent.change(inputEl, {
    target: {
      value: '5',
    },
  });
  fireEvent.click(subtractButton);
  expect(counter.textContent).toBe('-5');
});

test('Adding and then subtracting leads to the correct counter number', () => {
  const { getByTestId } = render(<Counter />);
  const subtractButton = getByTestId('subtractButton');
  const addButton = getByTestId('addButton');
  const inputEl = getByTestId('input');
  const counter = getByTestId('counter');

  fireEvent.change(inputEl, {
    target: {
      value: '10',
    },
  });
  fireEvent.click(addButton);
  fireEvent.click(addButton);
  fireEvent.click(subtractButton);
  fireEvent.click(addButton);
  expect(counter.textContent).toBe('20');

  fireEvent.change(inputEl, {
    target: {
      value: '5',
    },
  });

  fireEvent.click(addButton);
  fireEvent.click(addButton);
  expect(counter.textContent).toBe('30');
});

test('Counter contains correct className', () => {
  const { getByTestId } = render(<Counter />);
  const addButton = getByTestId('addButton');
  const subtractButton = getByTestId('subtractButton');
  const inputEl = getByTestId('input');
  const counter = getByTestId('counter');

  fireEvent.change(inputEl, {
    target: {
      value: '50',
    },
  });
  expect(counter.className).toBe('');
  fireEvent.click(addButton);
  fireEvent.click(addButton);
  fireEvent.click(addButton);

  expect(counter.className).toBe('green');

  fireEvent.click(subtractButton);
  fireEvent.click(subtractButton);
  fireEvent.click(subtractButton);
  fireEvent.click(subtractButton);
  fireEvent.click(subtractButton);

  expect(counter.className).toBe('red');
});
