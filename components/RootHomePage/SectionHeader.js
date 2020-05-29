import React from 'react';
import styled from 'styled-components';

import ContentSection from '../shared/ContentSection';
import ContainerWithBGImageAndLG from './ContainerWithBGImageAndLG';

const Container = styled(ContentSection)`
  margin-top: 0;
  background-color: transparent;
`;

const Text = styled.div`
  float: left;
  width: 50%;
  line-break: auto;
  h1 {
    font-size: 13rem;
    color: ${({ theme }) => theme.colors.fonts.light};
  }
`;

const LogoContainer = styled.div`
  float: right;
  width: 400px;
  height: 400px;
`;

const Logo = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('./images/that_trees_white.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const SectionHeader = ({ className }) => {
  return (
    <ContainerWithBGImageAndLG
      height={47.2}
      className={className}
      image="./images/events_meetups_gatherings.jpg"
    >
      <Container>
        <Text>
          <h1>Events,</h1>
          <h1>Meet-Ups, &</h1>
          <h1>Gatherings</h1>
        </Text>
        <LogoContainer>
          <Logo>{/* <img src="/images/that_trees_white.png" /> */}</Logo>
        </LogoContainer>
      </Container>
    </ContainerWithBGImageAndLG>
  );
};

export default styled(SectionHeader)``;
