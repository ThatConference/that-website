import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton';
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

const Timeline = styled.section`
  margin-top: 15rem;
  margin-bottom: 15rem;
  text-align: center;
  white-space: nowrap;
  overflow-x: hidden;

  ${below.med`
    display: none;
  `};
`;

const TimelineItem = styled.div`
  display: inline-block;
`;

const Marker = styled.span`
  height: 2.5rem;
  width: 2.5rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  display: inline-block;

  &.past {
    background-color: ${({ theme }) => theme.colors.teal};
  }
`;

const Line = styled.hr`
  border: 1px solid ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.white};
  display: inline-block;
  width: 4rem;
  height: 0.1rem;
  margin-bottom: 1rem;

  &.past {
    border-color: ${({ theme }) => theme.colors.teal};
    background-color: ${({ theme }) => theme.colors.teal};
  }
`;

const Detail = styled.span`
  color: ${({ theme }) => theme.colors.fonts.light};
  text-align: center;
  position: absolute;
  display: inline-block;
  height: auto;
  word-wrap: break-word;
  overflow: hidden;
  white-space: normal;
  line-height: 1.5;
  font-weight: 400;
`;

const Name = styled(Detail)`
  margin-top: 3rem;
  margin-left: -5.5rem;
  width: 8.5rem;
`;

const Date = styled(Detail)`
  margin-top: -2.5rem;
  width: 8rem;
  margin-left: -2.8rem;
  color: ${({ theme }) => theme.colors.fonts.light};

  &.past {
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;

const TimelineSection = ({ event, className }) => {
  const milestones = _(event.get.milestones)
    .map(m => {
      const momentDue = moment.utc(m.dueDate);
      return {
        title: m.title,
        due: momentDue.format('MM/DD/YY'),
        state: momentDue < moment() ? 'past' : 'future',
      };
    })
    .sortBy(m => {
      return moment(m.due);
    })
    .value();

  const featured = _.find(event.get.notifications, n => {
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
          {milestones.map((m, index, all) => (
            <TimelineItem key={m.title}>
              {index !== 0 && <Line className={m.state} />}
              <Date className={m.state}>{m.due}</Date>
              <Marker className={m.state} />
              <Name>{m.title}</Name>
              {index !== all.length - 1 && <Line className={m.state} />}
            </TimelineItem>
          ))}
        </Timeline>
        <Moose
          src="/images/moose_with_lantern.png"
          haveLink={haveLink}
          loading="lazy"
        />
      </Content>
    </Main>
  );
};

export default styled(TimelineSection)``;
