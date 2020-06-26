import { map } from 'lodash';
import baseTheme from '../styles/baseTheme';

export const mappedColorNames = map(baseTheme.colors, (val, key) => {
  return key;
});

export default mappedColorNames;
