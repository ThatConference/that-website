import React from 'react';
import styled from 'styled-components';
import { Grid } from 'styled-css-grid';

import SquareButton from './SquareButton';

export const FormGrid = styled(Grid)`
  grid-gap: 4rem;
  row-gap: 2rem;
`;

export const FormLabel = styled.label`
  margin-bottom: 2rem;
`;

export const FormRule = styled.hr`
  margin-top: 7rem;
  margin-bottom: 3rem;
  border-style: solid;
  border-width: 0.05rem;
  color: ${({ theme }) => theme.colors.mediumGray};
`;

const StyledFormSubmit = styled(SquareButton)`
  float: right;
  margin-bottom: 2rem;
  width: 22.5rem;
  height: 6.32rem;
`;

export const FormInputValidationMessage = styled.div`
  font-size: 1.2rem;
  min-height: 2.4rem;
  color: ${({ theme }) => theme.colors.danger};
`;

export const FormSubmit = () => {
  return (
    <StyledFormSubmit
      color="dark"
      backgroundColor="white"
      borderColor="gray"
      label="Submit"
      isSubmit
    />
  );
};
