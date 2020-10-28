import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { NextSeo } from 'next-seo';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Grid, Cell } from 'styled-css-grid';
import { groupBy } from 'lodash';
import { above, below, gridRepeat } from '../../../utilities';
import ContentSection from '../../../components/shared/ContentSection';
import TimelineSection from '../../../components/shared/Timeline';

const GET_EVENT = gql`
  query getEvent($eventId: ID!) {
    events {
      event(findBy: { id: $eventId }) {
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

  ${below.med`
    display: none;
  `};
`;

const MobileTimeline = styled.div`
  text-align: center;
  margin-bottom: 10rem;

  ${above.med`
    display: none;
  `};

  div.past {
    span.date,
    span.name {
      display: block;
      color: ${({ theme }) => theme.colors.mediumGray};
    }
  }
  div.future {
    span.date,
    span.name {
      display: block;
      color: ${({ theme }) => theme.colors.fonts.dark};
    }
  }
`;

const Date = styled.span`
  font-weight: bold;
  margin-top: 3rem;
`;

const Name = styled.span``;

const importantDates = () => {
  let event = {};
  let milestones = [];
  let groupedMilestones = [];

  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { eventId: process.env.CURRENT_EVENT_ID },
    onCompleted(d) {
      return d;
    },
  });

  if (error) throw new Error(error);

  if (!loading) {
    event = data.events.event;
    milestones = event.get.milestones;
    groupedMilestones = groupBy(milestones, m => moment.utc(m.dueDate));
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
        <>
          <StyledTimelineSection className="important-dates" event={event} />
          <MobileTimeline>
            {Object.entries(groupedMilestones).map(([key, value]) => {
              const momentDue = moment.utc(key, 'ddd MMM DD YYYY');
              const milestoneState = momentDue < moment() ? 'past' : 'future';
              const itemClassName = `timelineitem ${milestoneState}`;
              const dateClassName = `date ${milestoneState}`;
              const nameClassName = `name ${milestoneState}`;

              return (
                <div key={key} className={itemClassName}>
                  <Date className={dateClassName}>
                    {momentDue.format('M/D/YY')}
                  </Date>
                  {value.map(milestone => {
                    return (
                      <Name key={milestone.title} className={nameClassName}>
                        {milestone.title}
                      </Name>
                    );
                  })}
                </div>
              );
            })}
          </MobileTimeline>
        </>
      )}
    </>
  );
};

export default importantDates;
