import React from 'react';
import styled from 'styled-components';

import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton';

import { below } from '../../utilities';

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

const GetStartedNow = styled(LinkButton)`
  float: right;
`;

const Perks = ({ featureKeyword }) => {
  return (
    <Main>
      <Title>Perks If You&apos;re Selected To Speak At THAT Conference</Title>
      <Container>
        <Perk>
          <PerkImage src="/images/what_to_expect_hands_on_learning.png" />
          <PerkText>
            A ticket to attend, including Conference meals (the pig roast too!)
          </PerkText>
        </Perk>
        <Perk>
          <PerkImage src="/images/what_to_expect_hands_on_learning.png" />
          <PerkText>
            Hotel accommodations provided (2 nights for 1 talk)
          </PerkText>
        </Perk>
        <Perk>
          <PerkImage src="/images/what_to_expect_hands_on_learning.png" />
          <PerkText>Your session will be professionally recorded</PerkText>
        </Perk>
      </Container>
      <GetStartedNow
        href={`counselor-agreement?feature=${featureKeyword}`}
        borderColor="thatBlue"
        color="thatBlue"
        backgroundColor="white"
        hoverBorderColor="thatBlue"
        hoverColor="white"
        hoverBackgroundColor="thatBlue"
        label="Get started now!"
      />
    </Main>
  );
};

export default Perks;
