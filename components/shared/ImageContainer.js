import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.lightGray};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  position: relative;
`;

const ImageContainer = ({ width, height , key, children, className }) => {
  return (
    <Container width={width} height={height} key={key} className={className}>
      {children}
    </Container>
  )
};

export default ImageContainer;