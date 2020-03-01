import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import parse from 'html-react-parser';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import ButterToast, { Cinnamon, POS_TOP, POS_RIGHT } from 'butter-toast';
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

const Content = ({ session }) => {
  const [notes, setNotes] = useState('');
  const [vote, setVote] = useState(null);

  const voteComplete = () => {
    console.log('vote mutation completed');
    // ButterToast.dismiss(toastId);
    // ButterToast.raise({
    //   sticky: false,
    //   content: (
    //     <Cinnamon.Crisp
    //       scheme={Cinnamon.Crisp.SCHEME_BLUE}
    //       content={() => <div>Vote successfully cast!</div>}
    //       title="Vote"
    //     />
    //   ),
    // });
    // setValue(value + 1);
    // setNotes('');
    // window.scrollTo(0, 0);
  };

  const [castVote] = useMutation(CAST_VOTE, {
    onCompleted: voteComplete,
    onError: createError => {
      throw new Error(createError);
    },
  });

  // const { totalSubmitted } = root;
  // const totalRemaining = root.unVoted.length - value;
  // const totalVotedOn = totalSubmitted - totalRemaining;

  // const session = root.unVoted ? root.unVoted[value] : null;

  const submitVote = yesVote => {
    console.log('SUBMIT VOTE');
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
      <>
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

        <ButterToast
          className="that-toast"
          position={{
            vertical: POS_TOP,
            horizontal: POS_RIGHT,
          }}
        />
      </>
    );
  }

  return <p>You have voted for all the sessions! Thank You - THAT Crew</p>;
};

export default Content;
