import React from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { below, hexToRgb } from '../../utilities';

const Container = styled.div`
  padding: 5rem;
  background: ${({ background }) => background};
  background-size: cover;
  background-position: center;
  color: ${props =>
    props.fontColor
      ? props.theme.colors.fonts[props.fontColor]
      : props.theme.colors.fonts.dark};
  position: relative;
  display: block;
  width: 100%;

  ${below.small`
    padding: 5rem 1rem;
    width: 100vw;
  `}
`;

const ContainerInner = styled.div`
  margin: auto;
  max-width: ${props => (props.forForm ? '100rem' : '140rem')};
`;

const Trees = styled.img`
  position: absolute;
  top: -8rem;
  z-index: 10;
  width: 17rem;
  left: calc(50vw - 8.5rem);
  overflow: visible;
`;

const ContentSection = ({
  backgroundColor,
  backgroundImage,
  backgroundOpacity,
  children,
  className,
  fontColor,
  forForm,
  hasTrees,
  id,
  style,
  theme,
}) => {
  const getBackgroundSettings = () => {
    const backgroundColorToUse = backgroundColor
      ? theme.colors[backgroundColor]
      : theme.colors.backgroundColor;

    if (backgroundColorToUse === 'transparent') return backgroundColorToUse;

    const backgroundRgb = hexToRgb(backgroundColorToUse, backgroundOpacity);
    return `linear-gradient(${backgroundRgb}, ${backgroundRgb}) ${
      backgroundImage ? `, url(${backgroundImage}) no-repeat` : ''
    }}`;
  };

  return (
    <Container
      background={getBackgroundSettings()}
      fontColor={fontColor}
      className={className}
      id={id}
      forForm={forForm}
      style={style}
    >
      {hasTrees && <Trees src="/svgs/THAT-Trees.svg" alt="THAT Conference" />}
      <ContainerInner forForm={forForm}>{children}</ContainerInner>
    </Container>
  );
};

ContentSection.propTypes = {
  backgroundColor: PropTypes.string,
  backgroundImage: PropTypes.string,
  backgroundOpacity: PropTypes.number,
};
ContentSection.defaultProps = {
  backgroundColor: '',
  backgroundImage: '',
  backgroundOpacity: 1,
};

export default withTheme(ContentSection);
