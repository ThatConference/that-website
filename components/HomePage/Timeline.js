import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton';
import { below, DEFAULT_WIP_PAGE } from '../../utilities';

const _ = require('lodash');

const CalloutColor = '#05d69e';

const Main = styled(ContentSection)`
  margin-top: 10rem;
  padding-top: 1rem;
  min-height: 80rem;

  ${below.med`
    min-height: 60rem;
  `};
`;

const SectionHeading = styled.h2`
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 100;
  font-size: 15rem;
  color: ${({ theme }) => theme.colors.fonts.light};

  ${below.med`
    font-size: 10rem;
  `};
`;

const Moose = styled.img`
  max-height: 57rem;
  max-width: 46.2rem;
  float: right;
  margin-top: ${({ ticketSalesOpen }) =>
    ticketSalesOpen ? '-62.5rem' : '-45.5rem'};
  margin-right: -13rem;

  @media (max-width: 1900px) {
    max-height: 52rem;
    margin-top: -37.5rem;
    margin-right: -8rem;
  }

  @media (max-width: 1500px) {
    max-height: 48rem;
    margin-top: -37.5rem;
    margin-right: -8rem;
  }

  @media (max-width: 1400px) {
    display: block;
    margin: auto;
    float: unset;
    margin-top: 6rem;
  }

  ${below.med`
    max-width: 26rem;
    max-height: 32rem;
  `};
`;

const TicketCountdown = styled.div`
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 5.5rem;
  font-size: 2.4rem;
  color: ${({ theme }) => theme.colors.fonts.light};

  span {
    color: ${CalloutColor};
  }

  ${below.med`
    margin-bottom: 2rem;
  `};
`;

const Button = styled(LinkButton)``;

const ImportantDates = styled(Button)`
  display: none;

  ${below.med`
    display: block;
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
    background-color: ${CalloutColor};
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
    border-color: ${CalloutColor};
    background-color: ${CalloutColor};
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
  font-weight: bold;
`;

const Name = styled(Detail)`
  margin-top: 3rem;
  margin-left: -5rem;
  width: 7.5rem;
`;

const Date = styled(Detail)`
  margin-top: -2rem;
  width: 6rem;
  margin-left: -1.5rem;
  color: ${({ theme }) => theme.colors.fonts.light};

  &.past {
    color: #707070;
  }
`;

const TimelineSection = ({ event, className }) => {
  const milestones = _(event.milestones)
    .map(m => {
      const momentDue = moment(m.dueDate);
      return {
        title: m.title,
        due: momentDue.format('MM/DD/YY'),
        state: momentDue < moment() ? 'past' : 'future',
      };
    })
    .orderBy('due')
    .value();

  // ToDo: need a key/id on the milestone to be able to get the tickets milestone and calc days left
  const ticketSalesOpen = false;
  const header = ticketSalesOpen ? 'Grab Your Tickets' : 'Important Dates';
  const DaysLeft = ticketSalesOpen ? 99 : 23;

  return (
    <Main backgroundColor="primary" className={className} hasTrees="true">
      <SectionHeading>{header}</SectionHeading>
      {ticketSalesOpen && (
        <TicketCountdown>
          Only <span>{DaysLeft} Days</span> left to grab your tickets to THAT
          Conference
        </TicketCountdown>
      )}
      {ticketSalesOpen && (
        <Button
          href={DEFAULT_WIP_PAGE}
          label="Grab your Tickets!"
          backgroundColor="primary"
          borderColor="white"
          color="white"
        />
      )}
      <ImportantDates
        href={DEFAULT_WIP_PAGE}
        label="Important Dates"
        backgroundColor="primary"
        borderColor="white"
        color="white"
      />
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
        ticketSalesOpen={ticketSalesOpen}
      />
    </Main>
  );
};

export default styled(TimelineSection)``;
