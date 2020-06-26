import React from 'react';
import { shallow } from 'enzyme';
import LinkButton from './LinkButton';

const defaultProps = {
  href: 'http://thatconference.com',
};

describe('LinkButton', () => {
  test('renders', () => {
    const wrapper = shallow(<LinkButton {...defaultProps} />);
    expect(wrapper.exists()).toBe(true);
  });
});
