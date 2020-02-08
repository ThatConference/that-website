import styled from 'styled-components';
import React from 'react';
import { below } from '../../utilities';
import ThatLink from '../shared/ThatLink';

const _ = require('lodash');

const Message = styled.p`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.fonts.light};

  ${below.med`
    display: none;
  `};
`;
const Location = styled.p`
  flex-grow: 2;
  color: ${({ theme }) => theme.colors.fonts.light};
  text-align: right;

  ${below.med`
    text-align: center;
  `};
`;

const LinkContainer = styled.span`
  a {
    margin-left: 2rem;
    color: ${({ theme }) => theme.colors.white};
    border-bottom: solid 1px ${({ theme }) => theme.colors.white};

    &:hover {
      color: ${({ theme }) => theme.colors.highlight};
      border-bottom: solid 1px ${({ theme }) => theme.colors.highlight};
      cursor: pointer;
    }
  }
`;

const getLinkForEnvironment = url => {
  if (process.env.NODE_ENV === 'development')
    return url.replace('www.thatconference.com', 'localhost:3000');
  return url;
};

const MessageBar = ({ className, user, loading, notifications }) => {
  const featured = _.find(notifications, n => {
    return n.shouldFeature === true;
  });

  const featuredMessage = () => {
    return (
      <LinkContainer>
        {featured.message}
        <ThatLink
          title={featured.linkText}
          href={getLinkForEnvironment(featured.link)}
          isLocal={false}
        />
      </LinkContainer>
    );
  };

  const createProfileMessage = () => {
    return (
      <LinkContainer>
        Tell Us More About Yourself!
        <ThatLink title="Complete Your Profile Today!" href="/member/create" />
      </LinkContainer>
    );
  };

  const getMessage = () => {
    if (loading) return '';
    if (_.isEmpty(user)) return featuredMessage();

    return user.profileComplete ? featuredMessage() : createProfileMessage();
  };

  return (
    <div className={className}>
      <Message>{getMessage()}</Message>
      <Location>THAT Conference - Wisconsin Dells, WI</Location>
    </div>
  );
};

export default styled(MessageBar)`
  width: 100vw;
  background-color: ${({ theme }) => theme.colors.primary};
  position: fixed;
  z-index: 20;
  padding: 0;
  display: flex;

  p {
    margin: 0;
    padding: 1rem 2rem;
  }
`;
