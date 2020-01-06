import React from 'react';
import styled from 'styled-components';

import LinkButton from '../../shared/LinkButton';

const MainSection = styled.div`
  margin-bottom: 6rem;
`;

const Title = styled.h1`
  font-weight: 100;
  font-size: 8.5rem;
  margin-bottom: 0;
`;

const TopParagraph = styled.p`
  font-size: 2rem;
  margin-bottom: 4rem;
`;

const Header = () => {
  return (
    <MainSection>
      <Title>Your Sessions</Title>
      <TopParagraph>
        Submit a topic to become a counselor or edit existing sessions. Let the
        creative juices flow here. We all like to read a good abstract and this
        might be the first thing a camper knows about you. Not sure which topic
        to present? Submit more than one! In fact, submit as many as 3. We’ll
        pick the coolest ones on April 17th.
      </TopParagraph>
      <LinkButton
        label="Create a New Session"
        href="/wi/session/submit"
        color="thatBlue"
        borderColor="thatBlue"
        hoverBorderColor="thatBlue"
        hoverColor="white"
        hoverBackgroundColor="thatBlue"
      />
    </MainSection>
  );
};

export default Header;
