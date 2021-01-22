import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';

import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton/LinkButton';
import Title from '../shared/Title/Title';

import { below, gridRepeat } from '../../utilities';

const Main = styled(ContentSection)`
  margin-bottom: 5rem;
`;

const MainGrid = styled(Grid)`
  grid-gap: 5rem;

  ${below.large`
    grid-gap: 0;
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

const BecomeACounselor = styled(LinkButton)`
  margin-right: 2rem;
`;

const ActionButtons = styled.div`
  display: flex;

  ${below.small`
    flex-direction: column;
  `};
`;

const Header = () => {
  return (
    <Main>
      <MainGrid columns={gridRepeat.small}>
        <Cell>
          <Callout>Submissions Now Open Through March 1st!</Callout>
          <Title>Call for Counselors</Title>
        </Cell>
        <TextCell>
          <p className="large-body-copy">
            Are you ready to speak at the biggest tech conference in the US
            Midwest? We are searching for hour-long sessions, half and full-day
            workshops, and keynotes that bring value to our audience. The
            sessions and workshops can appeal to developers, designers,
            bloggers, business owners, site builders, translators, community
            organizers, and everything in-between.
          </p>
          <ActionButtons>
            <BecomeACounselor
              href="counselor-start"
              borderColor="thatBlue"
              color="thatBlue"
              backgroundColor="white"
              hoverBorderColor="thatBlue"
              hoverBackgroundColor="thatBlue"
              hoverColor="white"
              label="Become a Counselor"
            />
            <LinkButton
              href="#process"
              borderColor="thatBlue"
              color="thatBlue"
              backgroundColor="white"
              hoverBorderColor="thatBlue"
              hoverBackgroundColor="thatBlue"
              hoverColor="white"
              label="View Formats and Dates"
            />
          </ActionButtons>
        </TextCell>
      </MainGrid>
    </Main>
  );
};

export default Header;
