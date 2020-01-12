import React from 'react';
import styled from 'styled-components';
import LinkButton from '../shared/LinkButton';
import Title from '../shared/Title';
import LoadingIndicator from '../shared/LoadingIndicator';

const TopParagraph = styled.p`
  font-size: 2rem;
  margin-bottom: 4rem;
`;

const Header = ({ user, loading }) => {
  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Title>Let's Get Started</Title>
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
        href={
          user.acceptedCommitments ? 'session/create' : 'counselor-agreement'
        }
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
