import styled from 'styled-components';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import NavItem from './NavItem';

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

const UserNav = ({ className, onClick, user }) => {
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
            <li>
              <NavItem
                title="My Profile"
                href="/wi/user/profile"
                onClick={() => setUserMenuOpen(false)}
              />
            </li>
            <li>
              <NavItem
                title="My Sessions"
                href="/"
                onClick={() => setUserMenuOpen(false)}
              />
            </li>
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

UserNav.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  user: PropTypes.shape({}),
};

UserNav.defaultProps = {
  className: '',
  onClick: () => {},
  user: {},
};

export default styled(UserNav)`
  flex-grow: 2;
  text-align: right;
  margin-right: 3rem;
  position: relative;
`;
