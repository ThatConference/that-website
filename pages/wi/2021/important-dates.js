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
import {
  HeroGraphicDiv,
  HeroGraphicImg,
} from '../../../components/shared/StandardStyles';
import { getSlug } from '../../../utilities/utilityFunctions';

const GET_EVENT = gql`
  query getEvent($slug: String!) {
    events {
      event(findBy: { slug: $slug }) {
        get {
          id
          milestones {
            title
            description
            dueDate
          }
          notifications {
            id
            shouldFeature
            title
            message
            startDate
            endDate
            link
            linkText
          }
        }
      }
    }
  }
`;

const HighlightImage = styled(HeroGraphicImg)`
  max-height: 38rem;
  transform: scaleX(-1);
  margin-top: -4rem;

  ${below.med`
    margin-top: 0;
    max-height: 28rem;
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

const importantDates = () => {
  let event = {};
  let milestones = [];
  let groupedMilestones = [];

  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { slug: getSlug() },
    onCompleted(d) {
      return d;
    },
  });

  if (error) throw new Error(error);

  if (!loading) {
    event = data.events.event.get;
    milestones = event.milestones;
    groupedMilestones = groupBy(milestones, m => moment.utc(m.dueDate));
  }

  return (
    <>
      <NextSeo
        title="Important Dates - THAT Conference"
        description="All the important dates related to THAT!"
      />
      <ContentSection>
        <Grid columns={gridRepeat.small}>
          <Cell width={1}>
            <h1>Important Dates</h1>
            <p className="medium-body-copy">
              All the dates you need to keep track of for all things related to
              THAT Conference.
            </p>
          </Cell>
          <HeroGraphicDiv>
            <HighlightImage
              src="/images/sasquatch_kayaking.png"
              alt="THAT Partners"
            />
          </HeroGraphicDiv>
        </Grid>
      </ContentSection>
      {!loading && (
        <>
          <TimelineSection className="important-dates" event={event} />
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
                      <span key={milestone.title} className={nameClassName}>
                        {milestone.title}
                      </span>
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
