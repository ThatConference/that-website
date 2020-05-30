import React from 'react';
import styled from 'styled-components';

import ContentSection from '../shared/ContentSection';
import { below } from '../../utilities';

const twoColBp = 'larger';

const Main = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;

  align-items: center;

  ${below[twoColBp]`
    flex-direction: column;
  `};
`;

const Text = styled.div`
  width: 100%;
  line-break: auto;

  h1 {
    font-size: 13rem;
    color: ${({ theme }) => theme.colors.fonts.light};

    ${below.small`
      font-size: 6rem;
      text-align: center;
    `};
  }
`;

const LogoContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Logo = styled.div`
  float: right;
  width: 40rem;
  height: 40rem;
  background-image: url('./images/that_trees_white.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  ${below.small`
    float: none;
    margin: auto;
    width: 15rem;
    height: 15rem;
  `};
`;

const SectionHeader = ({ className }) => {
  return (
    <ContentSection
      className={className}
      backgroundColor="thatBlue"
      backgroundOpacity={0.82}
      backgroundImage="/images/events_meetups_gatherings.jpg"
    >
      <Main>
        <Text>
          <h1>Events,</h1>
          <h1>Meet-Ups, &</h1>
          <h1>Gatherings</h1>
        </Text>
        <LogoContainer>
          <Logo />
        </LogoContainer>
      </Main>
    </ContentSection>
  );
};

export default styled(SectionHeader)``;
