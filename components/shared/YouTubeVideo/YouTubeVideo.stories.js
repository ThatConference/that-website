import React from 'react';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import YouTubeVideo from './YouTubeVideo';

export default {
  title: 'YouTube Video',
  component: YouTubeVideo,
  decorators: [withKnobs],
};

export const DefaultVideo = () => (
  <YouTubeVideo
    autoplay={number('Auto Play', 0)}
    className={text('Class Name', '')}
    modest={number('Modest', 1)}
    rel={number('Rel', 0)}
    videoId={text('Video Id', 'cAftppcmqRE')}
  />
);
