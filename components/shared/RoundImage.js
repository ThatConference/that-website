import React from 'react';
import styled from 'styled-components';
import Imgix from 'react-imgix';

const AccentLine = styled.span`
  height: ${({ size }) => size}rem;
  border-right: 2px solid ${({ theme }) => theme.colors.tertiary};
  position: absolute;
  top: ${({ size }) => size * 3.5}rem;
`;

const RoundImage = ({ className, imageUrl, size, showAccentLine, alt }) => {
  const showAccent = showAccentLine === null || showAccentLine !== false;
  const intsize = parseInt(size);
  return (
    <>
      <Imgix
        className={className}
        src={
          imageUrl || 'https://that.imgix.net/members/person-placeholder.jpg'
        }
        width={intsize}
        height={intsize}
        imgixParams={{
          fit: 'facearea',
          facepad: 10,
          mask: 'ellipse',
        }}
        htmlAttributes={{ loading: 'lazy', alt }}
      />

      {showAccent && <AccentLine size={size / 40} />}
    </>
  );
};

export default styled(RoundImage)`
  width: ${({ size }) => size / 10}rem;
  height: ${({ size }) => size / 10}rem;
  border-radius: ${({ size }) => size / 10}rem;
`;
