import React, { useState } from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import ButterToast, { Cinnamon, POS_TOP, POS_RIGHT } from 'butter-toast';
import _ from 'lodash';

import LoadingIndicator from '../../../shared/LoadingIndicator';
import NavLinks from '../Shared/NavLinks';
import Thumbs from '../Shared/Thumbs';
import Stats from '../Shared/Stats';

const MarkdownIt = require('markdown-it');

const MainContent = styled.div`
  margin-top: 0rem;
`;

const SessionsContainer = styled.div`
  .session-divider:last-of-type {
    display: none;
  }
`;

const SessionContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.mediumGray};
  padding-bottom: 3rem;

  h4 {
    margin-bottom: 1rem;
  }

  &:last-of-type {
    border-bottom: none;
  }

  .thumbs-container {
    margin-top: 0;
  }
`;

const Section = styled.div`
  margin-bottom: 3rem;
  ul {
    margin-top: 0;
  }
`;

const DetailsHeader = styled.div`
  font-size: 2rem;
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

const Content = () => {
  let toastId = null;
  const [sessions, setStateSessions] = useState();
  let sessionsToUse = sessions;

  const forceUpdate = () => {
    ButterToast.dismiss(toastId);
    ButterToast.raise({
      sticky: false,
      content: (
        <Cinnamon.Crisp
          scheme={Cinnamon.Crisp.SCHEME_BLUE}
          content={() => <div>Vote successfully cast!</div>}
          title="Vote"
        />
      ),
    });
    setStateSessions(sessionsToUse);
  };

  const [castVote] = useMutation(CAST_VOTE, {
    onCompleted: forceUpdate,
    onError: createError => {
      throw new Error(createError);
    },
  });

  const submitVote = (yesVote, id) => {
    const index = sessionsToUse.findIndex(s => s.sessionId === id);
    if (sessionsToUse[index].vote !== yesVote) {
      sessionsToUse[index].vote = yesVote;
      toastId = ButterToast.raise({
        sticky: false,
        content: (
          <Cinnamon.Crisp
            scheme={Cinnamon.Crisp.SCHEME_BLUE}
            content={() => <div>Casting Vote...</div>}
            title="Vote"
          />
        ),
      });
      const vars = {
        eventId: process.env.CURRENT_EVENT_ID,
        vote: {
          sessionId: id,
          vote: yesVote,
        },
      };
      castVote({
        variables: vars,
      });
    }
  };
  const {
    loading: sessionsLoading,
    error: sessionsError,
    data: sessionsData,
  } = useQuery(GET_SESSIONS, {
    variables: { eventId: process.env.CURRENT_EVENT_ID },
  });

  if (sessionsLoading) {
    return (
      <div style={{ textAlign: 'center', margin: '10rem 0 7rem 0' }}>
        <LoadingIndicator />
      </div>
    );
  }
  if (sessionsError) throw new Error(sessionsError);

  const root = sessionsData.sessions.me.voting;

  const { totalSubmitted } = root;
  const rootSessions = root.voted;
  const totalRemaining = totalSubmitted - rootSessions.length;
  const totalVotedOn = rootSessions.length;

  sessionsToUse = rootSessions;

  const converter = new MarkdownIt();
  return (
    <MainContent>
      <NavLinks
        forwardLabel={totalVotedOn > 0 ? 'Continue Voting' : 'Start Voting'}
        forwardLink="/wi/session/voting/vote"
      />
      <SessionsContainer>
        {_.sortBy(sessionsToUse, s => s.title.toLowerCase()).map(s => {
          return (
            <SessionContainer key={s.id}>
              <h4>{s.title}</h4>
              <div>{parse(converter.render(s.longDescription))}</div>
              <Section>
                <DetailsHeader>Key Takeaways</DetailsHeader>
                <ul>
                  {s.takeaways.map(t => {
                    return (
                      <React.Fragment key={t}>
                        <li>{t}</li>
                      </React.Fragment>
                    );
                  })}
                </ul>
              </Section>
              <Thumbs
                iconHeight="5rem"
                submit={submitVote}
                id={s.sessionId}
                vote={s.vote}
              />
            </SessionContainer>
          );
        })}
      </SessionsContainer>
      <Stats
        totalSubmitted={totalSubmitted}
        totalVotedOn={totalVotedOn}
        totalRemaining={totalRemaining}
      />
      <ButterToast
        className="that-toast"
        position={{
          vertical: POS_TOP,
          horizontal: POS_RIGHT,
        }}
      />
    </MainContent>
  );
};

export default Content;
