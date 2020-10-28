import styled from 'styled-components';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import ThatLink from '../shared/ThatLink';
import { below } from '../../utilities';
import LoadingIndicator from '../shared/LoadingIndicator';
import SecondaryMemberNav from './SecondaryMemberNav';

const StyledSecondaryNav = styled(SecondaryMemberNav)`
  display: ${({ userMenuOpen }) => (userMenuOpen ? 'block' : 'none')};
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
      {!isEmpty(user) && (
        <>
          <ThatLink
            title={greeting()}
            href=""
            icon="arrow"
            iconClass={userMenuOpen ? 'up' : 'down'}
            onClick={menuClick}
            color={color}
          />

          <StyledSecondaryNav
            user={user}
            onLinkClick={() => setUserMenuOpen(false)}
            userMenuOpen={userMenuOpen}
          />
        </>
      )}

      {isEmpty(user) && (
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
