import styled from 'styled-components';
import React, { useState } from 'react';
import { isAbsolute } from 'path';

import IconText from './IconText';
import NavItem from './NavItem';
import { above, below } from '../utilities/breakpoint';

const NavList = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: no-wrap;
  justify-content: flex-end;
  align-items: center;
  margin: 1.2rem 0;

  ${below.med`
    display: none;
  `};
`;

const NavListItem = styled.div`
  text-align: right;
  padding-right: 2.5rem;
`;

const ButtonLink = styled.a`
  padding: 1rem;
  font-size: 1.7rem;
  color: ${({ theme }) => theme.colors.highlight};

  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
  }

  svg {
    height: 2rem;
    fill: ${({ theme }) => theme.colors.highlight};
    padding-right: 0.6rem;
  }

  ${above.med`
    display: none;
  `}
`;

const Nav = ({ className }) => {
  return (
    <nav className={className}>
      <NavItem
        title="home"
        href="/"
        image="/static/images/sand-bar-logo.png"
        style={{ position: 'absolute', top: 0, width: '10rem' }}
      />

      <ButtonLink href="tel:1-262-877-9500">
        <IconText icon="phone" align="right">
          (262) 877-9500
        </IconText>
      </ButtonLink>

      <NavList>
        <NavListItem>
          <NavItem title="menu" href="/menu" />
        </NavListItem>
        <NavListItem>
          <NavItem title="gallery" href="/gallery" />
        </NavListItem>
        <NavListItem>
          <NavItem title="contact" href="/contact" />
        </NavListItem>
        <NavListItem>
          <NavItem title="about" href="/about" />
        </NavListItem>
      </NavList>
    </nav>
  );
};

export default styled(Nav)`
  display: flex;
  width: 100%;
  flex-wrap: no-wrap;
  align-items: center;
  justify-content: space-between;
`;
