import styled from 'styled-components';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import NavItem from '../shared/NavItem';
import { below } from '../../utilities';

const _ = require('lodash');

const GET_MEMBER = gql`
  query getMember {
    members {
      me {
        firstName
        lastName
        profileSlug
      }
    }
  }
`;

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

const MemberNav = ({ className, currentUser, onClick }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  let member = {};
  if (!_.isEmpty(currentUser)) {
    const { loading, error, data: memberData } = useQuery(GET_MEMBER);

    if (loading) return 'Loading...';
    if (error) return {};

    member = memberData ? memberData.members.me : memberData;
  }

  const menuClick = e => {
    e.preventDefault();
    setUserMenuOpen(!userMenuOpen);
  };

  return (
    <div className={className}>
      {!_.isEmpty(currentUser) && (
        <>
          <NavItem
            title={`Hi ${currentUser.given_name}!`}
            href=""
            icon="arrow"
            iconClass={userMenuOpen ? 'up' : 'down'}
            onClick={menuClick}
          />

          <SecondaryNav userMenuOpen={userMenuOpen}>
            <li>
              {_.isEmpty(member) && (
                <NavItem
                  title="Create Profile"
                  href="/member/create"
                  onClick={() => setUserMenuOpen(false)}
                />
              )}
              {!_.isEmpty(member) && (
                <NavItem
                  title="My Profile"
                  href={`/member/${member.profileSlug}`}
                  onClick={() => setUserMenuOpen(false)}
                />
              )}
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

      {_.isEmpty(currentUser) && (
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
  currentUser: PropTypes.shape({}),
};

MemberNav.defaultProps = {
  className: '',
  onClick: () => {},
  currentUser: {},
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
