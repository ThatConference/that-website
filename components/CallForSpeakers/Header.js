import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';

import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton';

import { DEFAULT_WIP_PAGE } from '../../utilities';

const Main = styled(ContentSection)`
  margin-bottom: 10rem;
`;

const Callout = styled.span`
  color: ${({ theme }) => theme.colors.tertiary};
  font-family: franklin-gothic-urw-comp, sans-serif;
  font-size: 2.8rem;
  text-transform: uppercase;
  line-height: 1;
`;

const BecomeACounselor = styled(LinkButton)`
  margin-left: 0;
`;

const Header = props => {
  return (
    <Main>
      <Grid columns="repeat(auto-fit,minmax(320px,1fr))">
        <Cell>
          <Callout>Submissions Starting January 1, 2020</Callout>
          <h1 style={{ marginTop: 0, marginRight: '100px' }}>
            Call for Speakers
          </h1>
        </Cell>
        <Cell>
          <p className="large-body-copy">
            Are you ready to speak at the biggest tech stage in the midwest? We
            are searching for hour-long talks, half and full-day workshops, and
            keynotes that bring value to our audience. We want talks and
            workshops to appeal to developers, designers, bloggers, business
            owners, site builders, translators, community organizers, and
            everything in between.
          </p>
          <BecomeACounselor
            href={`/${DEFAULT_WIP_PAGE}`}
            borderColor="thatBlue"
            color="thatBlue"
            backgroundColor="white"
            label="Become a Counselor"
          />
        </Cell>
      </Grid>
    </Main>
  );
};

export default Header;
