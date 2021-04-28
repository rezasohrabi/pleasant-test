import React from 'react';
import { shallow } from 'enzyme';
import { findByAttr } from '../../utils';
import HeadLine from '.';

const setup = (props = {}) => {
  return shallow(<HeadLine {...props} />);
};

describe('HeadLine Component', () => {
  let component;
  beforeEach(() => {
    component = setup({
      header: 'Header test',
    });
  });

  it('Should render without errors', () => {
    const headLine = findByAttr(component, 'headline');
    expect(headLine.length).toBe(1);
  });

  it('Should render a header', () => {
    const header = findByAttr(component, 'header');
    expect(header.length).toBe(1);
  });

  it('Should render a desc', () => {
    const desc = findByAttr(component, 'desc');
    expect(desc.length).toBe(1);
  });
});
