import styled from 'styled-components';
import React, { useState } from 'react';

import NavItem from './NavItem';
import { above, below } from '../../utilities';

const NavList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  align-items: center;

  ${below.med`
    display: ${({ mobileMenuOpen }) => (mobileMenuOpen ? 'flex' : 'none')};;
    position: fixed;
    background-color: ${({ theme }) => theme.colors.white};
    flex-direction: column;
    width: 100vw;
    height: calc(100vh - 20rem);
    left: 0;
    top: 20rem;
    padding-top: 2rem;
  `};
`;

const NavListItem = styled.div`
  text-align: right;
  padding-right: 2.5rem;
`;

const MenuIcon = styled.div`
  margin: 1em;
  display: inline-block;
  vertical-align: middle;
  width: 3em;
  position: absolute;
  right: 5rem;
  top: 9rem;

  &:hover {
    cursor: pointer;
  }

  ${above.med`
    display: none;
  `};

  &:after,
  &:before,
  div {
    background-color: ${({ theme }) => theme.colors.thatBlue};
    border-radius: 0.3rem;
    content: '';
    display: block;
    height: 0.6rem;
    margin: 0.7rem 0;
    transition: all 0.3s ease-in-out;
  }

  &.open:before {
    transform: translateY(12px) rotate(135deg);
  }

  &.open:after {
    transform: translateY(-12px) rotate(-135deg);
  }

  &.open div {
    transform: scale(0);
  }
`;

const Nav = ({ className }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className={className}>
        <NavList mobileMenuOpen={mobileMenuOpen}>
          {/* <NavListItem>
          <NavItem title="Schedule" href="/" />
          </NavListItem>
          <NavListItem>
            <NavItem title="Speakers" href="/" />
          </NavListItem> */}
          <NavListItem>
            <NavItem
              title="Partners"
              href="/wi/partners"
              onClick={() => setMobileMenuOpen(false)}
            />
          </NavListItem>
          <NavListItem>
            <NavItem
              title="Plan Your Trip"
              href="/wi/plan-your-trip"
              onClick={() => setMobileMenuOpen(false)}
            />
          </NavListItem>
          <NavListItem>
            <NavItem
              title="Shop"
              href="https://store.unspecified.io/"
              target="blank"
              onClick={() => setMobileMenuOpen(false)}
              isLocal={false}
            />
          </NavListItem>
          <NavListItem>
            <NavItem
              title="Blog"
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
            />
          </NavListItem>
          <NavListItem>
            <NavItem
              title="Contact"
              href="/wi/contact"
              onClick={() => setMobileMenuOpen(false)}
            />
          </NavListItem>
        </NavList>
      </nav>
      <MenuIcon
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className={mobileMenuOpen ? 'open' : ''}
      >
        <div />
      </MenuIcon>
    </>
  );
};

export default styled(Nav)`
  display: flex;
  flex-wrap: no-wrap;
  align-items: center;
  justify-content: space-between;
`;
