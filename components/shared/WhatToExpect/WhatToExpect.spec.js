import React from 'react';
import { shallow } from 'enzyme';
import WhatToExpect from './WhatToExpect';

const defaultProps = {
  className: '',
};

describe('WhatToExpect', () => {
  test('renders', () => {
    const wrapper = shallow(<WhatToExpect {...defaultProps} />);
    expect(wrapper.exists()).toBe(true);
  });

  test('sets class name passed in', () => {
    const props = {
      className: 'ThatClassName',
    };
    const wrapper = shallow(<WhatToExpect {...props} />);
    expect(wrapper.find('.ThatClassName')).toHaveLength(1);
  });
});
