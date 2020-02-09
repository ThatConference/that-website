import React, { useState } from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import ButterToast, { Cinnamon, POS_TOP, POS_RIGHT } from 'butter-toast';

import Stats from '../Shared/Stats';
import Thumbs from '../Shared/Thumbs';

const MarkdownIt = require('markdown-it');

const MainContent = styled.div`
  margin-top: 10rem;
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
  const {
    loading: sessionsLoading,
    error: sessionsError,
    data: sessionsData,
  } = useQuery(GET_SESSIONS, {
    variables: { eventId: process.env.CURRENT_EVENT_ID },
  });

  if (sessionsLoading) return null;
  if (sessionsError) return null;

  const [notes, setNotes] = useState('');
  const [value, setValue] = useState(0);

  const root = sessionsData.sessions.me.voting;

  let toastId = null;

  const { totalSubmitted } = root;
  const totalRemaining = root.unVoted.length - (value + 1);
  const totalVotedOn = totalSubmitted - totalRemaining;

  const session = root.unVoted ? root.unVoted[value] : null;

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
    setValue(value + 1);
  };

  const [castVote] = useMutation(CAST_VOTE, {
    onCompleted: forceUpdate,
    onError: createError => {
      throw new Error(createError);
    },
  });

  if (session) {
    const submitVote = yesVote => {
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
          sessionId: session.id,
          vote: yesVote,
          notes,
        },
      };
      castVote({
        variables: vars,
      });
    };

    const converter = new MarkdownIt();
    return (
      <MainContent>
        <h3>{session.title}</h3>
        <Section>{parse(converter.render(session.longDescription))}</Section>
        {session.takeaways && (
          <Section>
            <DetailsHeader>Key Takeaways</DetailsHeader>
            <ul>
              {session.takeaways.map(s => {
                return (
                  <React.Fragment key={s}>
                    <li>{s}</li>
                  </React.Fragment>
                );
              })}
            </ul>
          </Section>
        )}
        <Section>
          <DetailsHeader>Organizer Feedback</DetailsHeader>
          <form className="input-form">
            <textarea
              rows="5"
              onChange={event => setNotes(event.target.value)}
            />
          </form>
        </Section>
        <Thumbs iconHeight="15rem" submit={submitVote} />
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
  }

  return <p>You have voted for all the sessions....GOOD JOB!</p>;
};

export default Content;
