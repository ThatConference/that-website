import React, { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import debug from 'debug';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import _ from 'lodash';
import ContentSection from '../../../components/shared/ContentSection';
import LoadingIndicator from '../../../components/shared/LoadingIndicator';
import SessionContent from '../../../components/Session/Voting/Shared/SessionContent';
import { SmallerH1 } from '../../../components/shared/StandardStyles';
import NavLinks from '../../../components/Session/Voting/Shared/NavLinks';
import VotingFooter from '../../../components/Session/Voting/Shared/VotingFooter';
import Stats from '../../../components/Session/Voting/Shared/Stats';
import { below } from '../../../utilities/breakpoint';

const dlog = debug('that:session:create');

const TitleRow = styled.div`
  display: flex;
  width: 100%;

  ${below.med`
    flex-direction: column;
  `}
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
            type
            category
          }
        }
      }
    }
  }
`;

const CAST_VOTE = gql`
  mutation castVote($eventId: ID!, $vote: VoteInput!) {
    sessions {
      voting(eventId: $eventId) {
        cast(vote: $vote) {
          id
          notes
          memberId
        }
      }
    }
  }
`;

const SessionVoting = ({ user, loading: loadingUser }) => {
  dlog('session voting');

  const router = useRouter();
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const [notes, setNotes] = useState('');
  const [currentVote, setCurrentVote] = useState('');
  const [submitting, setSubmitting] = useState(false);

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

  const {
    loading: sessionsLoading,
    error: sessionsError,
    data: {
      sessions: {
        me: { voting: { totalSubmitted, unVoted = [] } = {} } = {},
      } = {},
    } = {},
  } = useQuery(GET_SESSIONS, {
    variables: { eventId: process.env.CURRENT_EVENT_ID },
  });

  if (sessionsError) throw new Error(sessionsError);

  const showForwardLink = () => totalSubmitted > 0 || currentSessionIndex > 0;
  const totalRemaining = () => unVoted.length - currentSessionIndex;
  const votedOnCount = () => totalSubmitted - totalRemaining();
  const currentSession = unVoted[currentSessionIndex];

  const voteComplete = () => {
    setTimeout(() => {
      setSubmitting(false);
    }, 1800);
    window.scrollTo(0, 300);
    setCurrentSessionIndex(currentSessionIndex + 1);
    setNotes('');
    setCurrentVote('');
  };

  const [castVote] = useMutation(CAST_VOTE, {
    onCompleted: voteComplete,
    onError: createError => {
      throw new Error(createError);
    },
  });

  const submitVote = yesVote => {
    setSubmitting(true);
    setCurrentVote(yesVote);
    const queryVariables = {
      eventId: process.env.CURRENT_EVENT_ID,
      vote: {
        sessionId: currentSession.id,
        vote: yesVote,
        notes,
      },
    };
    castVote({
      variables: queryVariables,
    });
  };

  const handlers = {
    VOTE_YES: () => submitVote(true),
    VOTE_NO: () => submitVote(false),
  };

  return (
    <>
      <NextSeo
        title="Session Voting - THAT Conference"
        description="Make THAT Conference your conference by letting us know what session you want to see."
        noindex
      />
      <ContentSection>
        <TitleRow>
          <SmallerH1 style={{ flexGrow: 2 }}>Session Voting</SmallerH1>
          {!sessionsLoading && (
            <NavLinks
              showForwardLink={showForwardLink}
              forwardLabel="Review Your Votes"
              forwardLink="/wi/voting/review"
            />
          )}
        </TitleRow>
        {sessionsLoading && <LoadingIndicator />}
        {!sessionsLoading && (
          <>
            <Stats
              totalSubmitted={totalSubmitted}
              totalVotedOn={votedOnCount()}
              totalRemaining={totalRemaining()}
            />
            <SessionContent
              session={currentSession}
              submitting={submitting}
              handlers={handlers}
              notes={notes}
              setNotes={setNotes}
              currentVote={currentVote}
            />
            <VotingFooter
              notes={notes}
              setNotes={setNotes}
              handlers={handlers}
              currentVote={currentVote}
              submitting={submitting}
            />
          </>
        )}
      </ContentSection>
    </>
  );
};

export default SessionVoting;
