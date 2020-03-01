import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import parse from 'html-react-parser';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { motion } from 'framer-motion';
import { GlobalHotKeys } from 'react-hotkeys';
import Icon from '../../../shared/Icon';
import { below } from '../../../../utilities';

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

const ThumbRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 2rem;
`;

const SessionDetails = styled.div`
  display: flex;
  flex-direction: row;

  ${below.large`
    flex-direction: column;
  `};
`;

const ThumbsIcon = css`
  cursor: pointer;
  fill: ${({ theme }) => theme.colors.primary};
`;

const ThumbsDownIcon = styled(Icon)`
  ${ThumbsIcon}
  transform: scaleY(-1);
  &:hover,
  &.vote-selected {
    fill: ${({ theme }) => theme.colors.danger};
  }
`;

const ThumbsUpIcon = styled(Icon)`
  ${ThumbsIcon}
  padding-right: 2rem;
  &:hover,
  &.vote-selected {
    fill: ${({ theme }) => theme.colors.success};
  }
`;

const SavingDiv = styled.div`
  background-color: rgba(255, 255, 255, 0.85);
  height: calc(100% + 2rem);
  position: absolute;
  width: calc(100% + 2rem);
  z-index: 999;
  top: -1rem;
  left: -1rem;
  align-items: center;
  justify-content: center;

  .trees {
    width: 15rem;
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

const icon = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: '#F74646',
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: '#F74646',
  },
};

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
        <SavingDiv style={{ display: submitting ? 'flex' : 'none' }}>
          <div style={{ height: '15rem' }}>
            {submitting && (
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 200"
                className="trees"
              >
                <motion.path
                  d="M25.74 9.24 7.15 27.83 0 34.98 7.15 42.13 25.74 60.73 32.89 53.58 14.3 34.98 32.89 16.39 25.74 9.24z"
                  variants={icon}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    default: { duration: 2, ease: 'easeInOut' },
                    fill: { duration: 2, ease: [1, 0, 0.8, 1] },
                  }}
                />
                <motion.path
                  d="M151.62,50.67,136.15,26h5.71L125.46,0l-16.4,26h5.71L100,49.58,85.21,26h5.71L74.52,0,58.12,26h5.72L48.38,50.67h5.71L38,76.47H67.89V87.39H81.18V76.46h37.64V87.38h13.29V76.46H162l-16.11-25.8ZM95,50.67h10l-5,8Z"
                  variants={icon}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    default: { duration: 2, ease: 'easeInOut' },
                    fill: { duration: 2, ease: [1, 0, 0.8, 1] },
                  }}
                />
                <motion.path
                  d="M192.85 27.83 174.26 9.24 167.11 16.39 185.7 34.98 167.11 53.58 174.26 60.73 192.85 42.13 200 34.98 192.85 27.83z"
                  variants={icon}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    default: { duration: 2, ease: 'easeInOut' },
                    fill: { duration: 2, ease: [1, 0, 0.8, 1] },
                  }}
                />
              </motion.svg>
            )}
          </div>
        </SavingDiv>
        <GlobalHotKeyStyled keyMap={keyMap} handlers={handlers} />

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
            <ThumbRow>
              <ThumbsUpIcon
                icon="thumbsUp"
                title="Thumbs Up, I would attend"
                height="50"
                width="50"
                viewBoxHeight="25"
                viewBoxWidth="25"
                onClick={handlers.VOTE_YES}
                className={vote === true ? 'vote-selected' : ''}
              />
              <ThumbsDownIcon
                icon="thumbsUp"
                title="Thumbs Down, I would NOT attend"
                height="50"
                width="50"
                viewBoxHeight="25"
                viewBoxWidth="25"
                onClick={handlers.VOTE_NO}
                className={vote === false ? 'vote-selected' : ''}
              />
            </ThumbRow>
          </SideColumn>
        </SessionDetails>
      </div>
    );
  }

  return <p>You have voted for all the sessions! Thank You - THAT Crew</p>;
};

export default Content;
