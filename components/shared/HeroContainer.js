import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Background } from 'react-imgix';

import { below } from '../../utilities';

const Container = styled.div`
  position: relative;
  text-align: center;
  height: 80vh;

  ${below.xsmall`
    max-width: 100vw;
  `};
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4));
`;

const HeroContainer = ({ className, imageSource, children }) => {
  return (
    <Container className={className}>
      <Background src={imageSource} className="hero-background">
        <Overlay>{children}</Overlay>
      </Background>
    </Container>
  );
};

HeroContainer.propTypes = {
  className: PropTypes.string,
  imageSource: PropTypes.string.isRequired,
};

HeroContainer.defaultProps = {
  className: '',
};

export default styled(HeroContainer)`
  .hero-background {
    width: 100%;
    height: 100%;
  }
`;
