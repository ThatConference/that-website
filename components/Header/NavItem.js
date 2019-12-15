import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { below } from '../../utilities/breakpoint';

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
    font-size: 2rem;
  `};
`;

const NavImage = styled.img`
  width: ${props => (props.imageWidth ? props.imageWidth : '7rem')};
  margin-top: 1rem;
  margin-bottom: 0.3rem;
`;

const NavItem = ({
  href,
  onClick,
  color,
  image,
  imageWidth,
  style,
  target,
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
      <StyledLink onClick={onClick} color={color} target={target}>
        {displayedLink()}
      </StyledLink>
    </Link>
  );
};

export default NavItem;
