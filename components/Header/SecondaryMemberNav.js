import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ThatLink from '../shared/ThatLink';

const _ = require('lodash');

const SecondaryMemberNav = ({ className, onLinkClick, user }) => {
  return (
    <ul className={className}>
      <li>
        {!_.isEmpty(user) && !user.profileComplete && (
          <ThatLink
            title="Create Profile"
            href="/member/create"
            onClick={() => onLinkClick()}
          />
        )}
        {!_.isEmpty(user) && user.profileComplete && (
          <ThatLink
            title="My Profile"
            href={`/member/${user.profileSlug}`}
            onClick={() => onLinkClick()}
          />
        )}
      </li>
      {!_.isEmpty(user) && user.profileComplete && (
        <li>
          <ThatLink
            title="My Sessions"
            href="/member/my-sessions"
            onClick={() => onLinkClick()}
          />
        </li>
      )}
      {!_.isEmpty(user) && (
        <li>
          <ThatLink
            title="Log Out"
            href="/api/logout"
            onClick={() => onLinkClick()}
          />
        </li>
      )}

      {_.isEmpty(user) && (
        <ThatLink
          title="Sign In"
          href="/api/login"
          onClick={() => onLinkClick()}
        />
      )}
    </ul>
  );
};

SecondaryMemberNav.propTypes = {
  className: PropTypes.string,
  onLinkClick: PropTypes.func,
};

SecondaryMemberNav.defaultProps = {
  className: '',
  onLinkClick: () => {},
};

export default styled(SecondaryMemberNav)``;
