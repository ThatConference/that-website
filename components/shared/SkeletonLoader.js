import React from 'react';
import { Grid } from 'styled-css-grid';
import { Placeholder } from './StandardStyles';
import { gridRepeat } from '../../utilities';

const SkeletonLoader = () => {
  const items = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 28; i++) {
    items.push(<Placeholder width="17rem" height="13rem" />);
  }
  return (
    <Grid columns={gridRepeat.xxsmall} alignContent="center">
      {items}
    </Grid>
  );
};

export default SkeletonLoader;
