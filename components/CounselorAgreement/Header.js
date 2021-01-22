import React from 'react';
import styled from 'styled-components';
import Title from '../shared/Title/Title';

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
