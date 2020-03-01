import React, { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import debug from 'debug';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import ContentSection from '../../../../components/shared/ContentSection';
import LoadingIndicator from '../../../../components/shared/LoadingIndicator';
import Content from '../../../../components/Session/Voting/Vote/Content';
import { SmallerH1 } from '../../../../components/shared/StandardStyles';
import NavLinks from '../../../../components/Session/Voting/Shared/NavLinks';
import Stats from '../../../../components/Session/Voting/Shared/Stats';

const _ = require('lodash');

const dlog = debug('that:session:create');

const RelativeContentSection = styled(ContentSection)`
  position: relative;
`;

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
  const [currenstSessionIndex, setCurrenstSessionIndex] = useState(0);

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

  const showForwardLink = () => totalSubmitted > 0 || currenstSessionIndex > 0;

  const totalRemaining = () => unVoted.length - currenstSessionIndex;

  return (
    <>
      <NextSeo
        title="Session Voting - THAT Conference"
        description="Make THAT Conference your conference by letting us know what session you want to see."
      />
      <RelativeContentSection>
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
              totalVotedOn={currenstSessionIndex}
              totalRemaining={totalRemaining()}
            />
            <Content session={unVoted[currenstSessionIndex]} />
          </>
        )}
      </RelativeContentSection>
    </>
  );
};

export default SessionVoting;
