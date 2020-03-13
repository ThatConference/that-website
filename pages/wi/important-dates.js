import React from 'react';
import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Grid, Cell } from 'styled-css-grid';
import { below, gridRepeat } from '../../utilities';
import ContentSection from '../../components/shared/ContentSection';
import TimelineSection from '../../components/HomePage/Timeline';

const GET_EVENT = gql`
  query getEvent($eventId: ID!) {
    events {
      event(id: $eventId) {
        get {
          id
          milestones {
            title
            description
            dueDate
          }
        }
      }
    }
  }
`;

const ImageCell = styled(Cell)`
  ${below.med`
    text-align: center;
  `};
`;

const HighlightImage = styled.img`
  max-height: 40rem;
  transform: scaleX(-1);
  position: absolute;
  top: 0;
  margin-left: 6rem;

  ${below.small`
    margin-left: 0;
    width: 90%;
  `};

  ${below.med`
    position: relative;
    margin-top: 2rem;
  `};
`;

const StyledTimelineSection = styled(TimelineSection)`
  &.important-dates {
    background-color: transparent;
    margin-top: 0;

    > img {
      display: none;
    }

    h2 {
      display: none;
    }

    img.moose {
      display: none;
    }

    div.past {
      span.date,
      span.name {
        color: ${({ theme }) => theme.colors.mediumGray};
      }
      hr.line,
      span.marker {
        background-color: ${({ theme }) => theme.colors.teal};
      }

      hr.line {
        border-color: ${({ theme }) => theme.colors.teal};
      }
    }
    div.future {
      span.date,
      span.name {
        color: ${({ theme }) => theme.colors.fonts.dark};
      }
      hr.line,
      span.marker {
        background-color: ${({ theme }) => theme.colors.mediumGray};
      }

      hr.line,
      span.marker {
        border: solid 1px ${({ theme }) => theme.colors.mediumGray};
      }
    }
  }
`;

const importantDates = () => {
  let event = {};

  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { eventId: process.env.CURRENT_EVENT_ID },
    onCompleted(d) {
      return d;
    },
  });

  if (error) throw new Error(error);

  if (!loading) {
    event = data.events.event;
  }

  return (
    <>
      <NextSeo
        title="Important Dates - THAT Conference"
        description="All the important dates related to THAT!"
      />
      <ContentSection>
        <Grid columns={gridRepeat.xsmall}>
          <Cell width={1}>
            <h1>Important Dates</h1>
            <p className="medium-body-copy">
              All the dates you need to keep track of for all things related to
              THAT Conference.
            </p>
          </Cell>
          <ImageCell>
            <HighlightImage
              src="/images/sasquatch_kayaking.png"
              alt="Plan Your THAT Trip"
            />
          </ImageCell>
        </Grid>
      </ContentSection>
      {!loading && (
        <StyledTimelineSection className="important-dates" event={event} />
      )}
    </>
  );
};

export default importantDates;
