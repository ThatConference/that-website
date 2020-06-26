import React from 'react';
import { addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import baseTheme from '../styles/baseTheme';
import GlobalStyle from '../styles/globalStyle';

addDecorator(storyFn => (
  <ThemeProvider theme={baseTheme}>
    <GlobalStyle />
    {storyFn()}
  </ThemeProvider>
));
