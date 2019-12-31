import React from 'react';
import styled from 'styled-components';

import Stepper from './Stepper';
import { above, below } from '../../../utilities';

const twoColBp = 'large';

const Title = styled.h1`
  margin: 1.8rem 0 3rem 0;

  ${below[twoColBp]`
    text-align: center;
  `};

  ${below.small`
    font-size: 8rem;
  `};

  ${below.xsmall`
    font-size: 7rem;
  `};
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
