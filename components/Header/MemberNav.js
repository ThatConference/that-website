import styled from 'styled-components';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ThatLink from '../shared/ThatLink';
import { below } from '../../utilities';
import LoadingIndicator from '../shared/LoadingIndicator';

const _ = require('lodash');

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

const LoadingDiv = styled.div`
  flex-grow: 2;
  padding-right: 3rem;
  text-align: right;
`;

const MemberNav = ({ className, color, onClick, user, loading }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const menuClick = e => {
    e.preventDefault();
    setUserMenuOpen(!userMenuOpen);
  };

  const greeting = () => {
    if (user.firstName) {
      return `Hi ${user.firstName}!`;
    }
    return 'Heyo Camper!';
  };

  if (loading) {
    return (
      <LoadingDiv>
        <LoadingIndicator size="1rem" />
      </LoadingDiv>
    );
  }

  return (
    <div className={className}>
      {!_.isEmpty(user) && (
        <>
          <ThatLink
            title={greeting()}
            href=""
            icon="arrow"
            iconClass={userMenuOpen ? 'up' : 'down'}
            onClick={menuClick}
            color={color}
          />

          <SecondaryNav userMenuOpen={userMenuOpen}>
            <li>
              {!user.profileComplete && (
                <ThatLink
                  title="Create Profile"
                  href="/member/create"
                  onClick={() => setUserMenuOpen(false)}
                />
              )}
              {user.profileComplete && (
                <ThatLink
                  title="My Profile"
                  href={`/member/${user.profileSlug}`}
                  onClick={() => setUserMenuOpen(false)}
                />
              )}
            </li>
            {user.profileComplete && (
              <li>
                <ThatLink
                  title="My Sessions"
                  href="/member/my-sessions"
                  onClick={() => setUserMenuOpen(false)}
                />
              </li>
            )}
            <li>
              <ThatLink
                title="Log Out"
                href="/api/logout"
                onClick={() => setUserMenuOpen(false)}
              />
            </li>
          </SecondaryNav>
        </>
      )}

      {_.isEmpty(user) && (
        <ThatLink
          title="Sign In"
          href="/api/login"
          onClick={() => onClick(false)}
          color={color}
        />
      )}
    </div>
  );
};

MemberNav.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

MemberNav.defaultProps = {
  className: '',
  onClick: () => {},
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
