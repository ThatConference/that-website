import styled from 'styled-components';
import React from 'react';

import NavItem from './NavItem';
import { below } from '../../utilities';

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
          <NavItem title="Partners" href="/wi/partners" />
        </NavListItem>
        <NavListItem>
          <NavItem title="Campers" href="/" />
        </NavListItem>
        <NavListItem>
          <NavItem title="Plan Your Trip" href="/" />
        </NavListItem>
        <NavListItem>
          <NavItem
            title="Shop"
            href="https://store.unspecified.io/"
            target="blank"
          />
        </NavListItem>
        <NavListItem>
          <NavItem title="Contact" href="/wi/contact" />
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
