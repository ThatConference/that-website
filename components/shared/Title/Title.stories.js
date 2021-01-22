import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import Title from './Title';

export default {
  title: 'Title',
  component: Title,
  decorators: [withKnobs],
};

export const Default = () => (
  <Title className={text('Class Name', '')}>title text</Title>
);
