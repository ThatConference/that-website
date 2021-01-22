import React from 'react';
import { shallow } from 'enzyme';
import Title from './Title';

describe('Title', () => {
  test('it renders with default props and child content', () => {
    const wrapper = shallow(
      <Title>
        <div>anything</div>
      </Title>,
    );
    expect(wrapper.exists()).toBe(true);
  });

  test('it fails with no child content', () => {
    expect(() => {
      shallow(<Title />);
    }).toThrow(/(Failed prop type)/);
  });

  test('it sets StyledH1 className to value passed in', () => {
    const props = {
      className: 'ThatClassName',
    };
    const wrapper = shallow(<Title {...props}>That Title</Title>);
    expect(wrapper.find('.ThatClassName')).toHaveLength(1);
  });
});
