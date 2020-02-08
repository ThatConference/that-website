import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import parse from 'html-react-parser';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Grid, Cell } from 'styled-css-grid';
import ButterToast, { Cinnamon, POS_TOP, POS_RIGHT } from 'butter-toast';
import Icon from '../../../shared/Icon';
import { FormRule } from '../../../shared/FormLayout';

const MarkdownIt = require('markdown-it');

const MainContent = styled.div`
  margin-top: 10rem;
`;

const Section = styled.div`
  margin-bottom: 3rem;
`;

const DetailsHeader = styled.div`
  font-size: 2rem;
`;

const ThumbsContainer = styled(Grid)`
  margin-top: 8rem;
`;

const ThumbsIcon = css`
  height: 15rem;
  cursor: pointer;
  &:hover {
    filter: invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg)
      brightness(104%) contrast(97%);
  }
`;

const ThumbsDownIcon = styled(Icon)`
  ${ThumbsIcon}
  fill: ${({ theme }) => theme.colors.danger};
  transform: scaleY(-1);
`;

const ThumbsUpIcon = styled(Icon)`
  ${ThumbsIcon}
  float: right;
  fill: ${({ theme }) => theme.colors.success};
`;

const Rule = styled(FormRule)`
  margin-bottom: 1rem;
`;

const StatsContainer = styled(Grid)`
  margin-top: 0;
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

    const yesClick = () => {
      submitVote(true);
    };

    const noClick = () => {
      submitVote(false);
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
        <ThumbsContainer columns={2}>
          <Cell width={1}>
            <ThumbsDownIcon
              icon="thumbsUp"
              height="30"
              width="30"
              viewBoxHeight="20"
              viewBoxWidth="20"
              onClick={noClick}
            />
          </Cell>
          <Cell width={1}>
            <ThumbsUpIcon
              icon="thumbsUp"
              height="30"
              width="30"
              viewBoxHeight="20"
              viewBoxWidth="20"
              onClick={yesClick}
            />
          </Cell>
        </ThumbsContainer>
        <Rule />
        <StatsContainer columns={3}>
          <Cell width={1}>Total: {totalSubmitted}</Cell>
          <Cell width={1} center>
            Voted: {totalVotedOn}
          </Cell>
          <Cell width={1} className="text-right">
            Left: {totalRemaining}
          </Cell>
        </StatsContainer>
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
