import React from 'react';
import styled from 'styled-components';

import Stepper from './Stepper';

const Title = styled.h1`
  font-weight: 100;
  font-size: 8.5rem;
  margin-bottom: 4rem;
`;

const Header = ({ title, currentStep }) => {
  return (
    <>
      <Stepper currentStep={currentStep} />
      <Title>{title}</Title>
    </>
  );
};

export default Header;
