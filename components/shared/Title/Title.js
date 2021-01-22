import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { below } from '../../../utilities';

const twoColBp = 'large';

const StyledH1 = styled.h1`
  margin: 1.8rem 0 0 0;
  letter-spacing: 0.2rem;

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

const Title = ({ children, className }) => {
  return <StyledH1 className={className}>{children}</StyledH1>;
};

Title.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Title.defaultProps = {
  className: '',
};

export default Title;
