import React from 'react';
import styled from 'styled-components';
import { Grid } from 'styled-css-grid';

import SquareButton from './SquareButton';

export const FormGrid = styled(Grid)`
  grid-gap: 4rem;
`;

export const FormLabel = styled.label`
  margin-bottom: 2rem;
`;

const FormInput = styled.input`
  margin-top: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.mediumGray};
  background-color: ${({ theme }) => theme.colors.mediumLightGray};
`;

export const FormTextInput = styled(FormInput)`
  display: block;
  width: 100%;
`;

export const FormCheckbox = styled(FormInput)`
  margin-right: 1rem;
`;

export const FormRule = styled.hr`
  margin-top: 7rem;
  margin-bottom: 3rem;
  border-style: solid;
  border-width: 0.05rem;
  color: ${({ theme }) => theme.colors.mediumGray};
`;

export const FormSubmit = styled(SquareButton)`
  float: right;
  margin-bottom: 2rem;
  color: ${({ color }) => color || 'dark'};
`;

export const FormInputValidationMessage = styled.div`
  color: ${({ theme }) => theme.colors.danger};
`;
