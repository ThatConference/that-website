import styled from 'styled-components';
import React from 'react';
import { Grid, Cell } from 'styled-css-grid';
import { above, below, siteInfo } from '../../utilities';
import MobileFooter from './MobileFooter';
import SocialLinks from '../shared/SocialLinks';

const Footer = ({ className }) => {
  return (
    <>
      <Grid columns={12} gap="2px" className={className}>
        <Cell width={8}>
          All Rights Reserved. Copyright 2019 THAT Conference.
        </Cell>
        <Cell width={3}>
          <SocialLinks />
        </Cell>
        <Cell width={1}>arrow</Cell>
      </Grid>
      <MobileFooter />
    </>
  );
};

export default styled(Footer)`
  padding: 1rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.fonts.light};
`;
