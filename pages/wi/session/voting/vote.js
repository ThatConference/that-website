import React, { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import debug from 'debug';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import ContentSection from '../../../../components/shared/ContentSection';
import LoadingIndicator from '../../../../components/shared/LoadingIndicator';
import SessionContent from '../../../../components/Session/Voting/Shared/SessionContent';
import { SmallerH1 } from '../../../../components/shared/StandardStyles';
import NavLinks from '../../../../components/Session/Voting/Shared/NavLinks';
import Stats from '../../../../components/Session/Voting/Shared/Stats';

const _ = require('lodash');

const dlog = debug('that:session:create');

const GET_SESSIONS = gql`
  query getVotingSessions($eventId: ID!) {
    sessions {
      me {
        voting(eventId: $eventId) {
          isVotingOpen
          totalSubmitted
          unVoted {
            id
            title
            longDescription
            takeaways
          }
        }
      }
    }
  }
`;

const SessionVoting = ({ user, loading: loadingUser }) => {
  dlog('session voting');

  const router = useRouter();
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);

  const {
    loading: sessionsLoading,
    error: sessionsError,
    data: {
      sessions: { me: { voting: { totalSubmitted, unVoted } = {} } = {} } = {},
    } = {},
  } = useQuery(GET_SESSIONS, {
    variables: { eventId: process.env.CURRENT_EVENT_ID },
  });

  if (sessionsError) throw new Error(sessionsError);

  useEffect(() => {
    if (!loadingUser) {
      if (_.isEmpty(user)) {
        router.push('/api/login?redirect-url=/member/create');
      }

      if (!user.profileComplete) {
        router.push('/member/create').then(() => window.scrollTo(0, 0));
      }
    }
  });

  const showForwardLink = () => totalSubmitted > 0 || currentSessionIndex > 0;
  const totalRemaining = () => unVoted.length - currentSessionIndex;
  const votedOnCount = () => totalSubmitted - totalRemaining();

  return (
    <>
      <NextSeo
        title="Session Voting - THAT Conference"
        description="Make THAT Conference your conference by letting us know what session you want to see."
      />
      <ContentSection>
        <SmallerH1>Session Voting</SmallerH1>
        {!sessionsLoading && (
          <NavLinks
            showForwardLink={showForwardLink}
            forwardLabel="Review Your Votes"
            forwardLink="/wi/session/voting/review"
          />
        )}
        {sessionsLoading && <LoadingIndicator />}
        {!sessionsLoading && (
          <>
            <Stats
              totalSubmitted={totalSubmitted}
              totalVotedOn={votedOnCount()}
              totalRemaining={totalRemaining()}
            />
            <SessionContent
              session={unVoted[currentSessionIndex]}
              increaseVoteCount={() =>
                setCurrentSessionIndex(currentSessionIndex + 1)
              }
            />
          </>
        )}
      </ContentSection>
    </>
  );
};

export default SessionVoting;
