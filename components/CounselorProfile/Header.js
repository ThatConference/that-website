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
      <Title>Fill Out Your Profile</Title>
      <TopParagraph>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et
      </TopParagraph>
    </>
  );
};

export default Header;
