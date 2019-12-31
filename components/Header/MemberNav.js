import styled from 'styled-components';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import NavItem from './NavItem';
import { below } from '../../utilities';

const SecondaryNav = styled.ul`
  display: ${({ userMenuOpen }) => (userMenuOpen ? '' : 'none')};
  background-color: ${({ theme }) => theme.colors.white};
  position: absolute;
  list-style: none;
  right: -1rem;
  padding: 2rem;
  border: 1px solid gray;
  top: 2rem;
`;

const MemberNav = ({ className, onClick, user }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const menuClick = event => {
    event.preventDefault();

    setUserMenuOpen(!userMenuOpen);
    onClick(false);
  };

  return (
    <div className={className}>
      {user && (
        <>
          <NavItem
            title={`Hi ${user.given_name}!`}
            href=""
            icon="arrow"
            iconClass={userMenuOpen ? 'up' : 'down'}
            onClick={menuClick}
          />
          <SecondaryNav userMenuOpen={userMenuOpen}>
            {/* TO DO: Commented out while building out this functionality */}
            {/* <li>
              <NavItem
                title="My Profile"
                href="/member/sara" // TO DO: need to make this dynamic for the member
                onClick={() => setUserMenuOpen(false)}
              />
            </li>
            <li>
              <NavItem
                title="My Sessions"
                href="/"
                onClick={() => setUserMenuOpen(false)}
              />
            </li> */}
            <li>
              <NavItem
                title="Log Out"
                href="/api/logout"
                onClick={() => setUserMenuOpen(false)}
              />
            </li>
          </SecondaryNav>
        </>
      )}

      {!user && (
        <NavItem
          title="Sign In"
          href="/api/login"
          onClick={() => onClick(false)}
        />
      )}
    </div>
  );
};

MemberNav.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  user: PropTypes.shape({}),
};

MemberNav.defaultProps = {
  className: '',
  onClick: () => {},
  user: {},
};

export default styled(MemberNav)`
  flex-grow: 2;
  text-align: right;
  margin-right: 3rem;
  position: relative;

  ${below.med`
    margin-right: 7.5rem;
    margin-top: 1.3rem;
  `};
`;
