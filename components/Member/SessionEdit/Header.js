import React from 'react';
import styled from 'styled-components';

const MainSection = styled.div`
  margin-bottom: 6rem;
`;

const Title = styled.h1`
  font-weight: 100;
  font-size: 8.5rem;
  margin-bottom: 0;
`;

const Header = () => {
  return (
    <MainSection>
      <Title>Edit Your Session</Title>
    </MainSection>
  );
};

export default Header;
