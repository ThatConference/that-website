import React from 'react';
import styled from 'styled-components';

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
    <>
      <Title>Counselor Agreement</Title>
      <TopParagraph>
        The agreement to speak as a counselor includes several things we’re
        asking of you, and things we’ll provide you.
      </TopParagraph>
    </>
  );
};

export default Header;
