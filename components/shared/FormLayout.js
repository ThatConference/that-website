import React from 'react';
import styled, { css } from 'styled-components';
import { Grid } from 'styled-css-grid';

import SquareButton from './SquareButton';

const sharedButtonStyles = css`
  margin-bottom: 2rem;
  width: 15.5rem;
  height: 4.32rem;
`;

export const FormTitle = styled.h1`
  font-weight: 100;
  font-size: 8.5rem;
  margin-bottom: 4rem;
`;

export const FormGrid = styled(Grid)`
  grid-gap: 4rem;
  row-gap: 2rem;
`;

export const FormRow = styled.div`
  margin-bottom: 2rem;
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
  ${sharedButtonStyles}
  float: right;
`;

const StyledFormCancel = styled(SquareButton)`
  ${sharedButtonStyles}
  float: left;
`;

export const FormInputValidationMessage = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.danger};
`;

export const FormSubmit = ({ label, validateForm }) => {
  return (
    <StyledFormSubmit
      color="thatBlue"
      backgroundColor="white"
      borderColor="thatBlue"
      hoverBorderColor="thatBlue"
      hoverBackgroundColor="thatBlue"
      hoverColor="white"
      label={label || 'Submit'}
      isSubmit
      onClick={validateForm}
    />
  );
};

export const FormCancel = ({ label, onClick }) => {
  const handler =
    onClick ||
    (() => {
      window.history.back();
    });
  return (
    <StyledFormCancel
      color="light"
      backgroundColor="thatBlue"
      label={label || 'Cancel'}
      onClick={handler}
    />
  );
};
