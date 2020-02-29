import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 9rem;
  margin-bottom: 4rem;
`;

const Header = ({ title }) => <Title>{title}</Title>;
export default Header;
