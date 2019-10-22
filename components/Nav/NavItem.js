import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { above, below } from '../../utilities/breakpoint.js';

const StyledLink = styled.a`
  text-transform: uppercase;
  font-size: 1.4rem;
  text-align: center;
  color: ${props =>
    props.color ? props.theme.colors[props.color] : props.theme.colors.light};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
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

const NavItem = props => {
  const displayedLink = () => {
    if (props.image) {
      return (
        <NavImage
          src={props.image}
          imageWidth={props.imageWidth}
          style={props.style}
        />
      );
    }

    return props.title;
  };

  return (
    <Link href={props.href} passHref>
      <StyledLink
        display={props.display}
        onClick={props.onClick}
        color={props.color}
      >
        {displayedLink()}
      </StyledLink>
    </Link>
  );
};

export default NavItem;
