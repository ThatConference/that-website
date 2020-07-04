import React from 'react';
import { shallow } from 'enzyme';
import YouTubeVideo from './YouTubeVideo';

const defaultProps = {
  videoId: 'cAftppcmqRE',
};

describe('YouTubeVideo', () => {
  test('renders', () => {
    const wrapper = shallow(<YouTubeVideo {...defaultProps} />);
    expect(wrapper.exists()).toBe(true);
  });
});
