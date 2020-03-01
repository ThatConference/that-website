import React, { useState } from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { GlobalHotKeys } from 'react-hotkeys';
import Thumbs from './Thumbs';
import { below } from '../../../../utilities';
import SavingOverlay from '../../../shared/SavingOverlay';

const MarkdownIt = require('markdown-it');

const keyMap = {
  VOTE_YES: 'y',
  VOTE_NO: 'n',
};

const GlobalHotKeyStyled = styled(GlobalHotKeys)`
  &:focus {
    outline: none;
  }
`;

const BodyDiv = styled.div`
  max-width: 80rem;
  p {
    margin-top: 0;
  }
`;

const SideColumn = styled.div`
  min-width: 4rem;
  padding-left: 8rem;
  display: flex;
  flex-direction: column;
  flex-grow: 2;

  ${below.large`
    padding-left: 0;
    padding-top: 4rem;
  `};
`;

const SessionDetails = styled.div`
  display: flex;
  flex-direction: row;

  ${below.large`
    flex-direction: column;
  `};
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

const Content = ({ session, increaseVoteCount }) => {
  const [notes, setNotes] = useState('');
  const [vote, setVote] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const voteComplete = () => {
    increaseVoteCount();
    setVote(null);
    setNotes('');
    window.scrollTo(0, 0);
    setTimeout(() => {
      setSubmitting(false);
    }, 1500);
  };

  const [castVote] = useMutation(CAST_VOTE, {
    onCompleted: voteComplete,
    onError: createError => {
      throw new Error(createError);
    },
  });

  const submitVote = yesVote => {
    setSubmitting(true);
    setVote(yesVote);
    const queryVariables = {
      eventId: process.env.CURRENT_EVENT_ID,
      vote: {
        sessionId: session.id,
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

  if (session) {
    const converter = new MarkdownIt();
    const { longDescription, takeaways, title } = session;

    return (
      <div style={{ position: 'relative' }}>
        <SavingOverlay submitting={submitting} />
        {!submitting && (
          <GlobalHotKeyStyled keyMap={keyMap} handlers={handlers} />
        )}

        <h3>{title}</h3>
        <SessionDetails>
          <BodyDiv>
            {parse(converter.render(longDescription))}
            {session.takeaways && (
              <>
                <h4 style={{ marginBottom: 0 }}>Key Takeaways</h4>
                <ul>
                  {takeaways.map(s => (
                    <li>{s}</li>
                  ))}
                </ul>
              </>
            )}
          </BodyDiv>
          <SideColumn>
            <h4 style={{ margin: 0 }}>Organizer Feedback</h4>
            <form className="input-form">
              <textarea
                rows="5"
                value={notes}
                onChange={event => setNotes(event.target.value)}
              />
            </form>
            <Thumbs
              voteUp={handlers.VOTE_YES}
              voteDown={handlers.VOTE_NO}
              currentVote={vote}
            />
          </SideColumn>
        </SessionDetails>
      </div>
    );
  }

  return <p>You have voted for all the sessions! Thank You - THAT Crew</p>;
};

export default Content;
