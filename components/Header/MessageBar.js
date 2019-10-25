import styled from 'styled-components';
import React from 'react';
import { Grid, Cell } from 'styled-css-grid';
import { above, below, siteInfo } from '../../utilities';

const MessageBar = ({ className }) => {
  return (
    <Grid columns={12} gap="2px" className={className}>
      <Cell width={2}>Back to THAT</Cell>
      <Cell width={6}>some messages</Cell>
      <Cell width={2}>THAT Conference</Cell>
      <Cell width={2}>Wisconsin Dells</Cell>
    </Grid>
  );
};

export default styled(MessageBar)`
  padding: 1rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.fonts.light};
`;
