import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { below } from '../../utilities';

const HighlightBlock = styled.div`
  order: ${({ align }) => (align === 'left' ? 0 : 2)};
  margin-left: ${({ align }) => (align === 'left' ? 0 : '30px')};
  margin-right: ${({ align }) => (align === 'left' ? '30px' : 0)};
`;

const FeaturedImage = styled.img`
  object-fit: cover;
  width: auto;
  height: ${({ height }) => height || '20rem'};
  position: relative;

  -webkit-box-shadow: 10px 10px 0px -2px ${({ theme }) => theme.colors.primary};
  -moz-box-shadow: 10px 10px 0px -2px ${({ theme }) => theme.colors.primary};
  box-shadow: 10px 10px 0px -2px ${({ theme }) => theme.colors.primary};

  ${below.small`
    max-width: 30rem;
  `};
`;

const HighlightImage = ({ src, className, height, align }) => {
  return (
    <HighlightBlock className={className} align={align}>
      <FeaturedImage src={src} height={height} />
    </HighlightBlock>
  );
};

HighlightImage.apply.prototype = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  align: PropTypes.string.isRequired,
};

export default styled(HighlightImage)`
  position: relative;

  ${below.med`
    margin: 0;
  `};
`;
