import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${props => props.height}rem;
  background-image: linear-gradient(
      rgba(17, 53, 95, 0.85),
      rgba(17, 53, 95, 0.85)
    ),
    url(${props => props.image});
  background-size: cover;
  background-position: center;
`;

const ContainerWithBGImageAndLG = ({ children, height, image, className }) => {
  return (
    <StyledContainer height={height} image={image} className={className}>
      {children}
    </StyledContainer>
  );
};

export default ContainerWithBGImageAndLG;
