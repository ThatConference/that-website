import styled from 'styled-components';
import React from 'react';
import { Grid, Cell } from 'styled-css-grid';
import { above, below, siteInfo } from '../../utilities';

const StyledCell = styled(Cell)`
  padding: 1rem;
  text-align: center;
`;

const DarkCell = styled(Cell)`
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const MessageBar = ({ className }) => {
  return (
    <Grid columns={12} gap="2px" className={className}>
      <DarkCell width={2}>Call for Speakers soon!</DarkCell>
      <StyledCell width={7} style={{ textAlign: 'right' }}>
        THAT Conference
      </StyledCell>
      <StyledCell width={2}>Wisconsin Dells</StyledCell>
      <DarkCell width={1}>arrow</DarkCell>
    </Grid>
  );
};

export default styled(MessageBar)`
  padding: 1rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.fonts.light};
  position: fixed;
  z-index: 20;
  padding: 0;
`;
