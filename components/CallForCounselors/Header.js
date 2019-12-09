import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';

import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton';

import { below } from '../../utilities';

const Main = styled(ContentSection)`
  margin-bottom: 10rem;
`;

const MainGrid = styled(Grid)`
  grid-gap: 23rem;

  ${below.med`
    grid-gap: 0;
  `};
`;

const Title = styled.h1`
  margin-top: 0;
  margin-right: 10rem;
  font-size: 14rem;
  font-weight: 100;

  ${below.med`
    font-size: 8rem;
  `};

  ${below.small`
    font-size: 7rem;
  `};
`;

const Callout = styled.span`
  color: ${({ theme }) => theme.colors.tertiary};
  font-family: franklin-gothic-urw-comp, sans-serif;
  font-size: 2.8rem;
  text-transform: uppercase;
  line-height: 1;

  ${below.med`
    font-size: 2.3rem;
  `};
`;

const TextCell = styled(Cell)`
  margin-top: 3rem;

  ${below.med`
    margin-top: 0;
  `};
`;

const BecomeACounselor = styled(LinkButton)`
  margin-left: 0;
`;

const Header = () => {
  return (
    <Main>
      <MainGrid columns="repeat(auto-fit,minmax(320px,1fr))">
        <Cell>
          <Callout>Submissions Starting January 1, 2020</Callout>
          <Title>Call for Counselors</Title>
        </Cell>
        <TextCell>
          <p className="large-body-copy">
            Are you ready to speak at the biggest tech stage in the midwest? We
            are searching for hour-long talks, half and full-day workshops, and
            keynotes that bring value to our audience. We want talks and
            workshops to appeal to developers, designers, bloggers, business
            owners, site builders, translators, community organizers, and
            everything in between.
          </p>
          <BecomeACounselor
            href="counselor-agreement"
            borderColor="thatBlue"
            color="thatBlue"
            backgroundColor="white"
            label="Become a Counselor"
          />
        </TextCell>
      </MainGrid>
    </Main>
  );
};

export default Header;
