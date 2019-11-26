import React from 'react';
import styled from 'styled-components';

import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton';

import { DEFAULT_WIP_PAGE } from '../../utilities';

const Main = styled(ContentSection)`
  margin-bottom: 15rem;
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
`;

const Perk = styled.div`
  width: 33.1rem;
  height: 19.1rem;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.lightGray};
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
`;

const Perks = props => {
  return (
    <Main>
      <Title>Perks If You&apos;re Select To Speak At THAT Conference</Title>
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
