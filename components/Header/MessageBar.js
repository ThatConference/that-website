import styled from 'styled-components';
import React from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { below } from '../../utilities';
import * as gtag from '../../lib/gtag';

const _ = require('lodash');

const GET_ME = gql`
  query getMember {
    members {
      me {
        id
        firstName
        lastName
        profileSlug
      }
    }
  }
`;

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

const MessageBar = ({ className, currentUser }) => {
  let member = {};
  if (!_.isEmpty(currentUser)) {
    const { loading, error, data: memberData } = useQuery(GET_ME);

    if (loading) return null;
    if (error) return null;

    member = memberData ? memberData.members.me : memberData;
  }

  const clickTracking = () => {
    gtag.event({
      clientWindow: window,
      action: 'click',
      category: 'link button',
      label: 'message bar link',
    });
  };

  const generalMessage = () => {
    return (
      <>
        Call for Counselors (Speakers) starts January 13th!
        <Link href="/wi/call-for-counselors">
          <StyledLink onClick={clickTracking}>Learn More!</StyledLink>
        </Link>
      </>
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

  return (
    <div className={className}>
      <Message>{member ? generalMessage() : createProfileMessage()}</Message>
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
