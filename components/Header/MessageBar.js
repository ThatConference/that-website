import styled from 'styled-components';
import React from 'react';
import Link from 'next/link';
import { below } from '../../utilities';
import * as gtag from '../../lib/gtag';

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

const StyledLink = styled.a`
  margin-left: 2rem;
  color: ${({ theme }) => theme.colors.white};
  // text-decoration: underline;
  border-bottom: solid 1px ${({ theme }) => theme.colors.white};

  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
    border-bottom: solid 1px ${({ theme }) => theme.colors.highlight};
    cursor: pointer;
  }
`;

const MessageBar = ({ className }) => {
  const clickTracking = () => {
    gtag.event({
      clientWindow: window,
      action: 'click',
      category: 'link button',
      label: 'message bar link',
    });
  };

  return (
    <div className={className}>
      <Message>
        Call for Counselors (Speakers) starts January 6th!
        <Link href="/wi/call-for-counselors">
          <StyledLink onClick={clickTracking}>Learn More!</StyledLink>
        </Link>
      </Message>
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
