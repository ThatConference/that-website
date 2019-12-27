import React from 'react';
import styled from 'styled-components';

import LinkButton from '../shared/LinkButton';

const Title = styled.h1`
  font-weight: 100;
  font-size: 8.5rem;
  margin-bottom: 0;
`;

const TopParagraph = styled.p`
  font-size: 2rem;
  margin-bottom: 4rem;
`;

const Header = ({ featureKeyword }) => {
  return (
    <>
      <Title>Let&apos;s Get Started</Title>
      <TopParagraph>
        We’re stoked to hear you’re interested in speaking at THAT Conference!
        Being a counselor is more than just showing up, giving a talk, and
        heading back home. We’re looking for people not only to speak, but
        attend, collaborate, and contribute to the event while they are there.
        We’d also love for you to be a part of THAT Community year-round! You
        should be passionate about the topic(s) you’re submitting and excited to
        have conversations about your talk beyond the scheduled timeslot.
      </TopParagraph>
      <LinkButton
        label="Get Started"
        href={`counselor-agreement?feature=${featureKeyword}`}
        color="thatBlue"
        borderColor="thatBlue"
        hoverBorderColor="thatBlue"
        hoverColor="white"
        hoverBackgroundColor="thatBlue"
      />
    </>
  );
};

export default Header;
