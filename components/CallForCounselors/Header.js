import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';

import ContentSection from '../shared/ContentSection';
// import LinkButton from '../shared/LinkButton';

import { above, below } from '../../utilities';

const twoColBp = 'large';

const Main = styled(ContentSection)`
  margin-bottom: 5rem;
`;

const MainGrid = styled(Grid)`
  grid-gap: 5rem;

  ${below.med`
    grid-gap: 0;
  `};
`;

const Title = styled.h1`
  margin: 1.8rem 0 3rem 0;

  ${above[twoColBp]`
    max-width: 60rem;
  `};

  ${below[twoColBp]`
    text-align: center;
  `};

  ${below.small`
    font-size: 8rem;
  `};

  ${below.xsmall`
    font-size: 7rem;
  `};
`;

const Callout = styled.h2`
  color: ${({ theme }) => theme.colors.tertiary};
  font-size: 2.4rem;
  font-family: franklin-gothic-urw, sans-serif;
  font-weight: 400;
  text-transform: none;
  margin: 0;

  ${below.med`
    text-align: center
  `};
`;

const TextCell = styled(Cell)``;

// const BecomeACounselor = styled(LinkButton)`
//   margin-left: 0;
// `;

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
          {/* <BecomeACounselor
            href={`counselor-start?feature=${featureKeyword}`}
            borderColor="thatBlue"
            color="thatBlue"
            backgroundColor="white"
            hoverBorderColor="thatBlue"
            hoverBackgroundColor="thatBlue"
            hoverColor="white"
            label="Become a Counselor"
          /> */}
        </TextCell>
      </MainGrid>
    </Main>
  );
};

export default Header;
