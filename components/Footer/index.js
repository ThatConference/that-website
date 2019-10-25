import styled from 'styled-components';
import React from 'react';
import { Grid, Cell } from 'styled-css-grid';
import { above, below, siteInfo } from '../../utilities';
import PageFooter from './PageFooter';

const Footer = ({ className }) => {
  return (
    <>
      <Grid columns={12} gap="2px" className={className}>
        <Cell width={6}>
          new logo
          <img src="/svgs/THATConference-WI-2020.svg" />
        </Cell>
        <Cell width={3}>site nav</Cell>
        <Cell width={3}>newsletter sign up</Cell>
      </Grid>
      <PageFooter />
    </>
  );
};

export default styled(Footer)``;
