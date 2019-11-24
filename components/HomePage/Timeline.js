import React from 'react';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton';

import { below, DEFAULT_WIP_PAGE } from '../../utilities';

const Main = styled(ContentSection)`
  padding-top: 1rem;
  height: 80rem;
`;

const SectionHeading = styled.h2`
  margin-top: 0;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 100;
  font-size: 15rem;
  color: ${({ theme }) => theme.colors.fonts.light};
`;

const Moose = styled.img`
  max-height: 57rem;
  max-width: 46.2rem;
  float: right;
  margin-top: -29.5rem;
  margin-right: -5rem;
`;

const TicketCountdown = styled.div`
  text-align: center;
  margin-top: 12rem;
  font-size: 2.4rem;
  color: ${({ theme }) => theme.colors.fonts.light};

  span {
    color: #05d69e;
  }
`;

const GrabTickets = styled(LinkButton)`
  margin-top: 7.5rem;
`;

const Timeline = styled.section`
  white-space: nowrap;
  overflow-x: hidden;

  ol {
    font-size: 0;
    width: 100vw;
    padding: 250px 0;
    transition: all 1s;

    li {
      position: relative;
      display: inline-block;
      list-style-type: none;
      width: 160px;
      height: 3px;
      background: #fff;

      &:last-child {
        width: 280px;
      }

      &:not(:first-child) {
        margin-left: 14px;
      }

      &:not(:last-child)::after {
        content: '';
        position: absolute;
        top: 50%;
        left: calc(100% + 1px);
        bottom: 0;
        width: 12px;
        height: 12px;
        transform: translateY(-50%);
        border-radius: 50%;
        background: #f45b69;
      }

      &:nth-child(odd) div {
        top: -16px;
        transform: translateY(-100%);
      }

      &:nth-child(odd) div::before {
        top: 100%;
        border-width: 8px 8px 0 0;
        border-color: white transparent transparent transparent;
      }

      &:nth-child(even) div {
        top: calc(100% + 16px);
      }

      &:nth-child(even) div::before {
        top: -8px;
        border-width: 8px 0 0 8px;
        border-color: transparent transparent transparent white;
      }

      div {
        left: calc(100% + 7px);
        width: 280px;
        padding: 15px;
        font-size: 1rem;
        white-space: normal;
        color: ${({ theme }) => theme.colors.fonts.light};
      }
    }
  }
`;

const TimelineSection = ({ event, className }) => {
  return (
    <Main backgroundColor="primary" className={className}>
      <SectionHeading>Grab Your Tickets</SectionHeading>
      <TicketCountdown>
        Only <span>23 Days</span> left to grab your tickets to THAT Conference
      </TicketCountdown>
      <GrabTickets
        href={DEFAULT_WIP_PAGE}
        label="Grab your Tickets!"
        backgroundColor="primary"
        borderColor="white"
        color="white"
      />
      <Moose src="/images/moose_with_lantern.png" />
      <Timeline>
        <ol>
          <li>
            <div>
              <time>02/21</time>
              Early Bird
            </div>
          </li>
          <li>
            <div>
              <time>03/21</time>
              Call for Sponsors
            </div>
          </li>
          <li>
            <div>
              <time>04/21</time>
              Ticket Sales
            </div>
          </li>
          <li>
            <div>
              <time>08/03</time>
              THAT Conference
            </div>
          </li>
        </ol>
      </Timeline>
    </Main>
  );
};

export default styled(TimelineSection)``;
