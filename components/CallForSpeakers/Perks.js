import React from 'react';
import styled from 'styled-components';

import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton';

import { below, DEFAULT_WIP_PAGE } from '../../utilities';

const Main = styled(ContentSection)`
  margin-bottom: 15rem;

  ${below.med`
    margin-bottom: 5rem;
  `};
`;

const Title = styled.h3`
  text-align: center;
  font-weight: 100;
  color: ${({ theme }) => theme.colors.fonts.dark};
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 10rem;
  margin-bottom: 5rem;

  ${below.med`
    margin-top: 8rem;
    margin-bottom: 0;
  `};
`;

const Perk = styled.div`
  width: 33.1rem;
  height: 19.1rem;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.lightGray};

  ${below.med`
    margin-bottom: 6rem;
  `};
`;

const PerkImage = styled.img`
  max-width: 21rem;
  margin-top: -2rem;
`;

const PerkText = styled.div`
  font-weight: bold;
  font-size: 1.8rem;
  text-align: center;
  padding-left: 7rem;
  padding-right: 7rem;
  line-height: 2rem;

  ${below.med`
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  `};
`;

const Perks = props => {
  return (
    <Main>
      <Title>Perks If You&apos;re Selected To Speak At THAT Conference</Title>
      <Container>
        <Perk>
          <PerkImage src="/images/what_to_expect_hands_on_learning.png" />
          <PerkText>A free ticket to attend THAT conference</PerkText>
        </Perk>
        <Perk>
          <PerkImage src="/images/what_to_expect_hands_on_learning.png" />
          <PerkText>Hotel accomodations provided</PerkText>
        </Perk>
        <Perk>
          <PerkImage src="/images/what_to_expect_hands_on_learning.png" />
          <PerkText>Some meals, including a pig roast ticket provided</PerkText>
        </Perk>
        <Perk>
          <PerkImage src="/images/what_to_expect_hands_on_learning.png" />
          <PerkText>Your session will be professionally recorded</PerkText>
        </Perk>
      </Container>
      <LinkButton
        href={`/${DEFAULT_WIP_PAGE}`}
        borderColor="thatBlue"
        color="thatBlue"
        backgroundColor="white"
        label="Get started now!"
      />
    </Main>
  );
};

export default Perks;
