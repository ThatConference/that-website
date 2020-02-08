import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import moment from 'moment';

import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton';

import { below } from '../../utilities';

const Main = styled(ContentSection)`
  margin-bottom: 5rem;

  ${below.med`
    margin-bottom: 0;
  `};
`;

const ProcessAndDatesGrid = styled(Grid)`
  grid-gap: 25rem;

  ${below.med`
    grid-gap: 3rem;
  `};

  .keyDates {
    h5 {
      display: inline;
    }
  }
`;

const ProcessAndDatesSubHeading = styled.h5`
  font-weight: 500;
  margin-block-end: 0;
`;

const ProcessBlock = styled.div`
  margin-top: 3rem;

  p {
    margin-top: 0.75rem;
  }
`;

const KeyDatesGrid = styled(Grid)`
  grid-gap: 0;
`;

const KeyDatesCell = styled(Cell)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  padding: 1rem 0;

  &.first {
    border-top: 1px solid ${({ theme }) => theme.colors.gray};
  }
`;

const MoreAboutProcess = styled(LinkButton)`
  margin-top: 5rem;
  margin-left: 0;
`;

const Process = ({ milestones }) => {
  return (
    <Main>
      <ProcessAndDatesGrid columns="repeat(auto-fit,minmax(320px,1fr))">
        <Cell>
          <h3 className="font-dark">Talk Audiences and Formats</h3>
          <p>You can apply to speak for the following audiences and formats:</p>
          <ProcessBlock>
            <ProcessAndDatesSubHeading>
              Professional & Family Formats
            </ProcessAndDatesSubHeading>
            <p>
              THAT Conference is a professional polyglot technical conference
              that also has a rich experience for children and other family
              members. Your session could be aimed at the professional track or
              for family "geeklings".
            </p>
          </ProcessBlock>
          <ProcessBlock>
            <ProcessAndDatesSubHeading>
              Standard Sessions
            </ProcessAndDatesSubHeading>
            <p>
              Standard sessions are 60 minutes each, including time for
              answering questions. There is a 30 minute break in-between each
              session to nurture those all important hallway conversations.
            </p>
          </ProcessBlock>
          <ProcessBlock>
            <ProcessAndDatesSubHeading>
              Pre-Conference Workshops
            </ProcessAndDatesSubHeading>
            <p>
              Half day (four hours) or full day (8 hours). The day before the
              main conference is set aside for a full day of workshops. Be
              prepared to provide attendees a decent agenda for what you'll
              cover.
            </p>
          </ProcessBlock>
          <ProcessBlock>
            <ProcessAndDatesSubHeading>Keynotes</ProcessAndDatesSubHeading>
            <p>
              Do you have what it takes to give a 90 minute speech on something
              you're passionate about? You'll have an audience of over 1,000
              people in front of the stage listening to your story. We want
              topics that'll motivate, energize, and help attendees see the
              world differently as the diverse place it is.
            </p>
          </ProcessBlock>
        </Cell>
        <Cell className="keyDates">
          <h3 className="font-dark">Key Dates You Need to Know</h3>
          {milestones.map((m, index) => {
            const className = index === 0 ? 'first' : '';
            return (
              <KeyDatesGrid columns={12} key={`DatesFooCell_${m.title}`}>
                <KeyDatesCell width={5} className={className}>
                  <ProcessAndDatesSubHeading>
                    {moment.utc(m.dueDate).format('MMMM Do, YYYY')}
                  </ProcessAndDatesSubHeading>
                </KeyDatesCell>
                <KeyDatesCell width={7} className={className}>
                  {m.title}
                </KeyDatesCell>
              </KeyDatesGrid>
            );
          })}
          <MoreAboutProcess
            href="counselor-selection-process"
            borderColor="thatBlue"
            color="thatBlue"
            backgroundColor="white"
            hoverBorderColor="thatBlue"
            hoverColor="white"
            hoverBackgroundColor="thatBlue"
            label="More About The Counselor Selection Process"
          />
        </Cell>
      </ProcessAndDatesGrid>
    </Main>
  );
};

export default Process;
