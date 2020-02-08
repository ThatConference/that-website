import React from 'react';
import styled from 'styled-components';
import { below } from '../../utilities';

const Container = styled.div`
  padding: 5rem;
  background-color: ${props =>
    props.backgroundColor
      ? props.theme.colors[props.backgroundColor]
      : props.theme.colors.backgroundColor};
  color: ${props =>
    props.fontColor
      ? props.theme.colors.fonts[props.fontColor]
      : props.theme.colors.fonts.dark};
  position: relative;
  display: block;
  width: 100vw;

  ${below.xsmall`
    padding: 5rem 1rem;
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
  children,
  className,
  fontColor,
  forForm,
  hasTrees,
  id,
  style,
}) => {
  return (
    <Container
      backgroundColor={backgroundColor}
      fontColor={fontColor}
      className={className}
      id={id}
      forForm={forForm}
      style={style}
    >
      {hasTrees && <Trees src="/svgs/THAT-Trees.svg" />}
      <ContainerInner forForm={forForm}>{children}</ContainerInner>
    </Container>
  );
};

export default ContentSection;
