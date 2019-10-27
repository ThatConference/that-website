import styled from 'styled-components';
import React, { useState } from 'react';
import { isAbsolute } from 'path';

import IconText from '../shared/IconText';
import NavItem from './NavItem';
import { above, below, siteInfo } from '../../utilities';

const NavList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  align-items: center;

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
      <NavList>
        <NavListItem>
          <NavItem title="Schedule" href="/" />
        </NavListItem>
        <NavListItem>
          <NavItem title="Speakers" href="/" />
        </NavListItem>
        <NavListItem>
          <NavItem title="Sponsors" href="/" />
        </NavListItem>
        <NavListItem>
          <NavItem title="Campers" href="/" />
        </NavListItem>
        <NavListItem>
          <NavItem title="Plan Your Trip" href="/" />
        </NavListItem>
        <NavListItem>
          <NavItem title="Shop" href="/" />
        </NavListItem>
        <NavListItem>
          <NavItem title="Contact" href="/" />
        </NavListItem>
      </NavList>
    </nav>
  );
};

export default styled(Nav)`
  display: flex;
  flex-wrap: no-wrap;
  align-items: center;
  justify-content: space-between;
`;
