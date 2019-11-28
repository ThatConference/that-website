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
  width: 87vw;

  ${below.small`
    max-width: 30rem;
  `}

  ${below.xsmall`
    max-width: 30rem;
  `}
`;

const Trees = styled.img`
  position: absolute;
  top: -8rem;
  z-index: 10;
  width: 17rem;
  left: 44vw;
  overflow: visible;

  ${below.med`
    left: 40vw;
  `};

  ${below.small`
    left: 35vw;
  `};

  ${below.xsmall`
    left: 27vw;
  `};
`;

const ContentSection = props => {
  return (
    <Container
      backgroundColor={props.backgroundColor}
      fontColor={props.fontColor}
      className={props.className}
      id={props.id}
      forForm={props.forForm}
    >
      {props.hasTrees && <Trees src="/svgs/THAT-Trees.svg" />}
      <ContainerInner>{props.children}</ContainerInner>
    </Container>
  );
};

export default ContentSection;
