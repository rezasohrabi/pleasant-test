import React from 'react';
import { shallow } from 'enzyme';
import Header from './index';
import { findByAttr } from './utils';

const setup = (props = {}) => {
  return shallow(<Header {...props} />);
};

describe('Header Component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  });

  it('Should render without errors', () => {
    const header = findByAttr(component, 'header');
    expect(header.length).toBe(1);
  });

  it('Should render a logo', () => {
    const logo = findByAttr(component, 'logo');
    expect(logo.length).toBe(1);
  });
});
