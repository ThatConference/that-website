import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { below } from '../../utilities';

const Container = styled.div`
  position: relative;
  text-align: center;
  height: 80vh;

  ${below.xsmall`
    max-width: 100vw;
  `};
`;

const HeroImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  -webkit-filter: brightness(0.4);
  filter: brightness(0.4);
`;

const HereContainer = ({ className, imageSource, imageAlt, children }) => {
  return (
    <Container className={className}>
      <HeroImage src={imageSource} loading="lazy" alt={imageAlt} />
      {children}
    </Container>
  );
};

HereContainer.propTypes = {
  className: PropTypes.string,
  imageSource: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
};

HereContainer.defaultProps = {
  className: '',
};

export default styled(HereContainer)``;
