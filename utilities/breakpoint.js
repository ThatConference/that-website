import { css } from 'styled-components';

const size = {
  xsmall: 400,
  small: 720,
  med: 960,
  large: 1140,
  larger: 1360,
  xlarge: 1500,
};

export const gridRepeat = {
  xxsmall: 'repeat(auto-fit,minmax(17.5rem,1fr))',
  xsmall: 'repeat(auto-fit,minmax(30rem,1fr))',
  small: 'repeat(auto-fit,minmax(40rem,1fr))',
};

export const above = Object.keys(size).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${size[label] / 16}em) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

export const below = Object.keys(size).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${size[label] / 16}em) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});
