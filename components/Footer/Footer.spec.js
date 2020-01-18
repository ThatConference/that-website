import React from 'react';
import { shallow } from 'enzyme';
import Footer from '.';

describe('Footer', () => {
  test('renders', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.exists()).toBe(true);
  });
});
