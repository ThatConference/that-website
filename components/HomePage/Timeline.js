import React from 'react';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';

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
  margin-top: -20rem;
  margin-right: -5rem;
`;

const TicketCountdown = styled.div`
  text-align: center;
  margin-top: 15rem;
  font-size: 2.4rem;
  color: ${({ theme }) => theme.colors.fonts.light};

  span {
    color: #05d69e;
  }
`;

const Timeline = ({ event, className }) => {
  return (
    <Main backgroundColor="primary" className={className}>
      <SectionHeading>Grab Your Tickets</SectionHeading>
      <TicketCountdown>
        Only <span>23 Days</span> left to grab your tickets to THAT Conference
      </TicketCountdown>
      <Moose src="/images/moose_with_lantern.png" />
    </Main>
  );
};

export default styled(Timeline)``;
