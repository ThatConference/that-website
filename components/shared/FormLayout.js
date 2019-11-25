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

export const FormInput = styled.input`
  display: block;
  margin-top: 1rem;
  border: 1px solid #d3d3d3;
  background-color: #fcfcfc;
  width: 100%;
`;

export const FormRule = styled.hr`
  margin-top: 7rem;
  margin-bottom: 3rem;
  border-style: solid;
  border-width: 0.05rem;
  color: #d3d3d3;
`;

export const FormSubmit = styled(SquareButton)`
  float: right;
  margin-bottom: 2rem;
`;

export const FormInputValidationMessage = styled.div`
  color: red;
`;
