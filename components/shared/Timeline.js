import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import ContentSection from './ContentSection';
import LinkButton from './LinkButton';
import { below } from '../../utilities';

const _ = require('lodash');

const Main = styled(ContentSection)`
  margin-top: 10rem;
  padding-top: 1rem;
  min-height: 80rem;
  text-align: center;

  ${below.med`
    min-height: 60rem;
  `};
`;

const Content = styled.div`
  ${below.med`
    display: flex;
    flex-direction: column;
    align-items: center;
  `};
`;

const SectionHeading = styled.h2`
  text-align: center;
  padding-top: 9rem;
  margin: auto;
  max-width: 100rem;
  font-size: 8rem;
  color: ${({ theme }) => theme.colors.fonts.light};

  ${below.med`
    font-size: 6rem;
  `};
`;

const Moose = styled.img`
  max-height: 45rem;
  position: absolute;
  top: 10rem;
  right: 5%;

  ${below.xlarge`
    max-height: 35rem;
    top: 15rem;
  `};

  ${below.large`
    max-width: 20rem;
    top: 29rem;
    right: 2rem;
  `};

  ${below.med`
    position: initial;
    max-width: 18rem;
    padding-top: 3rem;
  `};
`;

const Message = styled.div`
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 5.5rem;
  font-size: 2.4rem;
  color: ${({ theme }) => theme.colors.fonts.light};

  span {
    color: ${({ theme }) => theme.colors.teal};
  }

  ${below.med`
    margin-bottom: 2rem;
  `};

  ${below.xsmall`
    margin-top: 4rem;
    font-size: 1.8rem;
    line-height: 3rem;
  `};
`;

const Timeline = styled.div`
  margin-top: 18rem;
  margin-bottom: 8rem;
  display: flex;
  width: 100%;
  justify-content: space-between;

  ${below.med`
    display: none;
  `};
`;

const TimelineItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  &:first-child {
    hr {
      width: 50%;
      margin-left: 50%;
    }
  }

  &:last-child {
    hr {
      width: 50%;
      margin-right: 50%;
    }
  }
`;

const Marker = styled.span`
  height: 2.5rem;
  width: 2.5rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  margin: 0.75rem 0;

  &.past {
    background-color: ${({ theme }) => theme.colors.teal};
  }
`;

const Line = styled.hr`
  border: 1px solid ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.white};
  height: 0.1rem;
  width: 100%;
  margin: 0;
  position: relative;
  top: -2rem;

  &.past {
    border-color: ${({ theme }) => theme.colors.teal};
    background-color: ${({ theme }) => theme.colors.teal};
  }
`;

const Detail = styled.span`
  color: ${({ theme }) => theme.colors.fonts.light};
  word-wrap: break-word;
  white-space: normal;
  line-height: 1.5;
  font-weight: 400;
  margin-bottom: 1.25rem;
  padding: 0 0.75rem;
`;

const Name = styled(Detail)``;

const Date = styled(Detail)`
  color: ${({ theme }) => theme.colors.fonts.light};

  &.past {
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;

const TimelineSection = ({ event, className }) => {
  const { milestones, notifications } = event;
  const sortedMilestones = _.sortBy(milestones, m => moment.utc(m.dueDate));
  const groupedMilestones = _.groupBy(sortedMilestones, m =>
    moment.utc(m.dueDate),
  );

  const featured = _.find(notifications, n => {
    return n.shouldFeature === true;
  });

  const header = featured ? featured.title : 'Important Dates';
  const message = featured ? featured.message : null;
  const link = featured ? featured.link : null;
  const linkText = featured ? featured.linkText : null;
  const haveLink = link !== null;

  return (
    <Main backgroundColor="primary" className={className} hasTrees="true">
      <Content>
        <SectionHeading>{header}</SectionHeading>
        {message && <Message>{message}</Message>}
        {link && (
          <LinkButton
            href={link}
            label={linkText}
            backgroundColor="primary"
            borderColor="white"
            color="white"
            hoverBorderColor="white"
            hoverColor="primary"
            hoverBackgroundColor="white"
          />
        )}
        <Timeline>
          {Object.entries(groupedMilestones).map(([key, value]) => {
            const momentDue = moment.utc(key, 'ddd MMM DD YYYY');
            const milestoneState = momentDue < moment() ? 'past' : 'future';
            const itemClassName = `timelineitem ${milestoneState}`;
            const dateClassName = `date ${milestoneState}`;
            const markerClassName = `marker ${milestoneState}`;
            const lineClassName = `line ${milestoneState}`;
            const nameClassName = `name ${milestoneState}`;

            return (
              <TimelineItem key={key} className={itemClassName}>
                <Date className={dateClassName}>
                  {momentDue.format('M/D/YY')}
                </Date>
                <Marker className={markerClassName} />
                <Line className={lineClassName} />
                {value.map(milestone => {
                  return (
                    <Name key={milestone.title} className={nameClassName}>
                      {milestone.title}
                    </Name>
                  );
                })}
              </TimelineItem>
            );
          })}
        </Timeline>
        <Moose
          className="moose"
          src="/images/moose_with_lantern.png"
          haveLink={haveLink}
          loading="lazy"
          alt="THAT Conference Timeline"
        />
      </Content>
    </Main>
  );
};

export default styled(TimelineSection)``;
