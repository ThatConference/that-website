import React from 'react';
import { shallow } from 'enzyme';
import Header from '.';

describe('Header', () => {
  test('renders', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.exists()).toBe(true);
  });
});
