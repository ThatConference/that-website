import React from 'react';
import styled, { css } from 'styled-components';
import parse from 'html-react-parser';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Grid, Cell } from 'styled-css-grid';
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

  const root = sessionsData.sessions.me.voting;

  const { totalSubmitted } = root;
  const totalRemaining = root.unVoted.length;
  const totalVotedOn = totalSubmitted - totalRemaining;

  const session = root.unVoted ? root.unVoted[0] : null;

  if (session) {
    const yesClick = () => {
      console.log('YES!');
    };
    const noClick = () => {
      console.log('NO!');
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
          <DetailsHeader>Notes</DetailsHeader>
          <form className="input-form">
            <textarea rows="5" />
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
          <Cell width={1}>Total Sessions: {totalSubmitted}</Cell>
          <Cell width={1} center>
            Total Voted On: {totalVotedOn}
          </Cell>
          <Cell width={1} className="text-right">
            Total Remaining: {totalRemaining}
          </Cell>
        </StatsContainer>
      </MainContent>
    );
  }

  return <p>You have voted for all the sessions....GOOD JOB!</p>;
};

export default Content;
