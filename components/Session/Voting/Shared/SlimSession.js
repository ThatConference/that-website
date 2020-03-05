import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { StyledPre } from '../../../shared/StandardStyles';
import SavingOverlay from '../../../shared/SavingOverlay';
import { ThumbsUpIcon, ThumbsDownIcon } from './Icons';
import { below } from '../../../../utilities';

const Description = styled(StyledPre)`
  margin-bottom: 0;
  height: unset;

  &.truncate {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const SessionContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.mediumGray};
  padding-bottom: 3rem;
  position: relative;

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

const MainBlock = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  ${below.med`
    flex-direction: column;
  `}
`;

const TakeawayList = styled.ul`
  margin-top: 0;
  font-weight: 200;
  line-height: 1.6;
  font-size: 1.5rem;
`;

const Details = styled.div`
  flex-grow: 2;
  min-width: 100rem;

  ${below.larger`
    min-width: 70rem;
  `}

  ${below.large`
    min-width: 50rem;
  `}

  ${below.med`
    min-width: 100%;
  `}
`;

const ShowMore = styled.p`
  font-size: 1.4rem;
  width: 100%;
  color: ${({ theme }) => theme.colors.thatBlue};
  margin-top: 0;
  text-align: right;
  cursor: pointer;
  padding-right: 4rem;

  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
  }
`;

const ThumbRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CAST_VOTE = gql`
  mutation castVote($eventId: ID!, $vote: VoteInput!) {
    sessions {
      voting(eventId: $eventId) {
        cast(vote: $vote) {
          id
          notes
          memberId
          vote
        }
      }
    }
  }
`;

const SlimSession = ({ session }) => {
  const { longDescription, sessionId, takeaways, title, vote } = session;
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [currentVote, setCurrentVote] = useState(vote);

  const voteComplete = () => {
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
    setCurrentVote(yesVote);
    const queryVariables = {
      eventId: process.env.CURRENT_EVENT_ID,
      vote: {
        sessionId,
        vote: yesVote,
      },
    };
    castVote({
      variables: queryVariables,
    });
  };

  return (
    <SessionContainer>
      <SavingOverlay submitting={submitting} />
      <h4 style={{ marginBottom: 0 }}>{title}</h4>
      <MainBlock>
        <Details>
          <Description className={expandedDescription ? '' : 'truncate'}>
            {longDescription}
          </Description>
          {expandedDescription && takeaways && (
            <>
              <h5 style={{ marginBottom: 0 }}>Key Takeaways</h5>
              <TakeawayList>
                {takeaways.map(s => (
                  <li>{s}</li>
                ))}
              </TakeawayList>
            </>
          )}
        </Details>
        <ShowMore
          onClick={() => setExpandedDescription(!expandedDescription)}
          className="show-more"
        >
          {`Show ${expandedDescription ? 'Less' : 'More'}`}
        </ShowMore>
        <div>
          <ThumbRow>
            <ThumbsUpIcon
              clickHandler={() => submitVote(true)}
              currentVote={currentVote}
              color="primary"
            />
            <ThumbsDownIcon
              clickHandler={() => submitVote(false)}
              currentVote={currentVote}
              color="primary"
            />
          </ThumbRow>
        </div>
      </MainBlock>
    </SessionContainer>
  );
};

export default SlimSession;
