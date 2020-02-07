import styled from 'styled-components';
import React from 'react';
import Link from 'next/link';
import { below } from '../../utilities';
import ThatLink from '../shared/ThatLink';
import * as gtag from '../../lib/gtag';

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

const LinkContainer = styled.div`
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

const MessageBar = ({ className, user, loading, notifications }) => {
  const featured = _.find(notifications, n => {
    return n.shouldFeature === true;
  });

  const clickTracking = () => {
    gtag.event({
      clientWindow: window,
      action: 'click',
      category: 'link button',
      label: 'message bar link',
    });
  };

  const featuredMessage = () => {
    return (
      <LinkContainer>
        {featured.message}
        <ThatLink
          className="message-bar-link"
          title={featured.linkText}
          href={featured.link}
        />
      </LinkContainer>
    );
  };

  const createProfileMessage = () => {
    return (
      <>
        Tell Us More About Yourself!
        <Link href="/member/create">
          <StyledLink onClick={clickTracking}>
            Complete Your Profile Today!
          </StyledLink>
        </Link>
      </>
    );
  };

  const getMessage = () => {
    if (loading) {
      return '';
    }

    if (_.isEmpty(user)) {
      return featuredMessage();
    }
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
