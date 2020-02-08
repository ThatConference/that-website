import React from 'react';
import styled from 'styled-components';

import Stepper from './Stepper';

const Title = styled.h1`
  font-size: 9rem;
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
