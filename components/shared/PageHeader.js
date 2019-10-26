import React from 'react';
import styled from 'styled-components';

const PageHeader = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-top: 0;
  margin-bottom: 0;
  font-size: 65pt;
  font-weight: bold;
  line-height: 1.2;
  font-family: 'Open Sans', sans-serif;
  text-transform: uppercase;
  padding-right: 20px;
`;

export default PageHeader;
