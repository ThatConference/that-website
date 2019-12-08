import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { above, below } from '../../utilities/breakpoint';

const StyledLink = styled.a`
  font-size: 1.4rem;
  text-align: center;
  color: ${props =>
    props.color
      ? props.theme.colors[props.color]
      : props.theme.colors.secondary};

  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
  }

  ${below.med`
    flex-direction: column
    ${({ display }) =>
      display === 'desktop' &&
      `
      display: none;
    `}
    ${({ display }) =>
      display === 'mobile' &&
      `
      display: inline;
    `}
  `} ${above.med`
    flex-direction: column
    ${({ display }) =>
      display === 'desktop' &&
      `
      display: inline;
    `}
    ${({ display }) =>
      display === 'mobile' &&
      `
      display: none;
    `}
  `};
`;

const NavImage = styled.img`
  width: ${props => (props.imageWidth ? props.imageWidth : '7rem')};
  margin-top: 1rem;
  margin-bottom: 0.3rem;
`;

const NavItem = ({
  href,
  display,
  onClick,
  color,
  image,
  imageWidth,
  style,
  title,
}) => {
  const displayedLink = () => {
    if (image) {
      return <NavImage src={image} imageWidth={imageWidth} style={style} />;
    }

    return title;
  };

  return (
    <Link href={href} passHref>
      <StyledLink display={display} onClick={onClick} color={color}>
        {displayedLink()}
      </StyledLink>
    </Link>
  );
};

export default NavItem;
