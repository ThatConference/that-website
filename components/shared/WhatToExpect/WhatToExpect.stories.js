import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import WhatToExpect from './WhatToExpect';

export default {
  title: 'WhatToExpect',
  component: WhatToExpect,
  decorators: [withKnobs],
};

export const Default = () => (
  <WhatToExpect className={text('Class Name', '')} />
);
