import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

import NavItem from '../shared/NavItem';
import { below } from '../../utilities';

const NavList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  align-items: center;

  ${below.med`
    display: ${({ mobileMenuOpen }) => (mobileMenuOpen ? 'flex' : 'none')};
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

const Nav = ({ className, mobileMenuOpen, onClick }) => {
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
              onClick={() => onClick(false)}
            />
          </NavListItem>
          <NavListItem>
            <NavItem
              title="Plan Your Trip"
              href="/wi/plan-your-trip"
              onClick={() => onClick(false)}
            />
          </NavListItem>
          <NavListItem>
            <NavItem
              title="Shop"
              href="https://store.unspecified.io/"
              target="blank"
              onClick={() => onClick(false)}
              isLocal={false}
            />
          </NavListItem>
          <NavListItem>
            <NavItem title="Blog" href="/blog" onClick={() => onClick(false)} />
          </NavListItem>
          <NavListItem>
            <NavItem
              title="Contact"
              href="/wi/contact"
              onClick={() => onClick(false)}
            />
          </NavListItem>
        </NavList>
      </nav>
    </>
  );
};

Nav.propTypes = {
  className: PropTypes.string,
  mobileMenuOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

Nav.defaultProps = {
  className: '',
  onClick: () => {},
};

export default styled(Nav)`
  display: flex;
  flex-wrap: no-wrap;
  align-items: center;
  justify-content: space-between;
`;
