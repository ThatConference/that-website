import React from 'react';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import LinkButton from './LinkButton';
import { mappedColorNames } from '../../../utilities';

export default {
  title: 'LinkButton',
  component: LinkButton,
  decorators: [withKnobs],
};

export const LinkButtonText = () => (
  <LinkButton
    href="http://thatconference.com"
    label={text('Label', 'THAT Button')}
    color={select('Color', mappedColorNames, 'white')}
    borderColor={select('Border Color', mappedColorNames, 'primary')}
    backgroundColor={select('Background Color', mappedColorNames, 'primary')}
    hoverColor={select('Hover Color', mappedColorNames, 'primary')}
    hoverBorderColor={select('Hover Border Color', mappedColorNames, 'primary')}
    hoverBackgroundColor={select(
      'Hover Background Color',
      mappedColorNames,
      'white',
    )}
  />
);

LinkButtonText.story = {
  name: 'just text',
};
