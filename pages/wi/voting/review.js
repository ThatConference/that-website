import React, { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import debug from 'debug';
import styled from 'styled-components';
import _ from 'lodash';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { below } from '../../../utilities';
import ContentSection from '../../../components/shared/ContentSection';
import { SmallerH1 } from '../../../components/shared/StandardStyles';
import NavLinks from '../../../components/Session/Voting/Shared/NavLinks';
import Icon from '../../../components/shared/Icon';
import LoadingIndicator from '../../../components/shared/LoadingIndicator';
import SlimSession from '../../../components/Session/Voting/Shared/SlimSession';
import Stats from '../../../components/Session/Voting/Shared/Stats';

const dlog = debug('that:session:create');

const SessionsContainer = styled.div`
  .session-divider:last-of-type {
    display: none;
  }
`;

const TitleRow = styled.div`
  display: flex;
  width: 100%;

  ${below.med`
    flex-direction: column;
  `}
`;

const ScrollToTop = styled.div`
  position: fixed;
  bottom: 4rem;
  right: 0;
  width: 4rem;
  height: 4rem;
  background-color: ${({ theme }) => theme.colors.thatBlue};
  fill: ${({ theme }) => theme.colors.fonts.light};

  svg {
    position: relative;
    left: 0.1rem;

    &:hover {
      fill: ${({ theme }) => theme.colors.highlight};
    }
  }
`;

const GET_SESSIONS = gql`
  query getVotedSessions($eventId: ID!) {
    sessions {
      me {
        voting(eventId: $eventId) {
          isVotingOpen
          totalSubmitted
          voted {
            sessionId
            title
            longDescription
            takeaways
            vote
          }
        }
      }
    }
  }
`;

const SessionVoting = ({ user, loading: loadingUser }) => {
  dlog('session voting');

  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!loadingUser) {
      if (_.isEmpty(user)) {
        router.push('/api/login?redirect-url=/member/create');
      }

      if (!user.profileComplete) {
        router.push('/member/create').then(() => window.scrollTo(0, 0));
      }
    }

    const handleScroll = () => {
      setScrollY(window.pageYOffset);
    };
    document.addEventListener('scroll', handleScroll);

    return () => document.removeEventListener('scroll', handleScroll);
  });

  const {
    loading: sessionsLoading,
    error: sessionsError,
    data: {
      sessions: {
        me: { voting: { totalSubmitted, voted = {} } = {} } = {},
      } = {},
    } = {},
  } = useQuery(GET_SESSIONS, {
    variables: { eventId: process.env.CURRENT_EVENT_ID },
  });

  if (sessionsError) throw new Error(sessionsError);
  const votedOnCount = voted.length;

  return (
    <>
      <NextSeo
        title="Session Voting Review - THAT Conference"
        description="Review the sessions you have already voted on."
        noindex
      />
      <ContentSection>
        <TitleRow>
          <SmallerH1>Session Voting Review</SmallerH1>
          {!sessionsLoading && (
            <NavLinks
              forwardLabel={
                votedOnCount > 0 ? 'Continue Voting' : 'Start Voting'
              }
              forwardLink="/wi/voting/vote"
            />
          )}
        </TitleRow>
        {sessionsLoading && <LoadingIndicator />}
        {!sessionsLoading && (
          <>
            <Stats
              totalSubmitted={totalSubmitted}
              totalVotedOn={votedOnCount}
              totalRemaining={totalSubmitted - votedOnCount}
            />
            <SessionsContainer>
              {_.sortBy(voted, s => s.title.toLowerCase()).map(session => (
                <SlimSession session={session} key={session.sessionId} />
              ))}
            </SessionsContainer>
          </>
        )}
      </ContentSection>
      <ScrollToTop
        onClick={() => window.scrollTo(0, 300)}
        title="Scroll to top"
        style={{ display: scrollY > 300 ? 'block' : 'none' }}
      >
        <Icon icon="arrow" className="up" title="Scroll to top" />
      </ScrollToTop>
    </>
  );
};

export default SessionVoting;
