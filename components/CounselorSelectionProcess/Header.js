import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-weight: 100;
  font-size: 8.5rem;
  margin-bottom: 0;
`;

const TopParagraph = styled.p`
  font-size: 2rem;
  margin-bottom: 8rem;
`;

const Header = props => {
  return (
    <>
      <Title>Counselor Selection Process</Title>
      <TopParagraph>
        Selecting the best counselors for THAT Conference is a long and
        difficult process, as we receive so many inspiring abstracts from truly
        impassioned people. When reviewing potential counselors and session
        abstracts, we remove all information about the counselor (name, bio,
        email, etc.) while reviewing the proposals, to avoid any subconscious
        bias. We always strive for a good mix of counselors, and we want to
        encourage everyone to submit a proposal.
      </TopParagraph>
    </>
  );
};

export default Header;
