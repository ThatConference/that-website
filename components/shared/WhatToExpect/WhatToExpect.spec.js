import React from 'react';
import { shallow } from 'enzyme';
import WhatToExpect from './WhatToExpect';

const defaultProps = {
  className: '',
};

describe('WhatToExpect', () => {
  test('it renders', () => {
    const wrapper = shallow(<WhatToExpect {...defaultProps} />);
    expect(wrapper.exists()).toBe(true);
  });

  test('it sets ContentSection className to value passed in', () => {
    const props = {
      className: 'ThatClassName',
    };
    const wrapper = shallow(<WhatToExpect {...props} />);
    expect(wrapper.find('.ThatClassName')).toHaveLength(1);
  });
});
