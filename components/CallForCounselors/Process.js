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

  h3 {
    font-size: 3.5rem;
    text-transform: unset;
    color: ${({ theme }) => theme.colors.fonts.dark};
    font-weight: 500;
  }
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

const Process = ({ featureKeyword, milestones }) => {
  return (
    <Main>
      <ProcessAndDatesGrid columns="repeat(auto-fit,minmax(320px,1fr))">
        <Cell>
          <h3>Format and Application Process</h3>
          <p>You can apply for the following audience and format.</p>
          <ProcessBlock>
            <ProcessAndDatesSubHeading>
              Professional & Family
            </ProcessAndDatesSubHeading>
            <p>
              THAT Conference is a professional polyglot technical conference
              that also has a rich experience for child geeklings. Your session
              could be aimed at the professional track or for family geeklings.
            </p>
          </ProcessBlock>
          <ProcessBlock>
            <ProcessAndDatesSubHeading>
              Standard Sessions
            </ProcessAndDatesSubHeading>
            <p>
              60 minutes total. Lorem ipsum dolor sit amet, consetetur
              sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
              et dolore magna aliquyam erat.
            </p>
          </ProcessBlock>
          <ProcessBlock>
            <ProcessAndDatesSubHeading>
              Pre-Conference Workshops
            </ProcessAndDatesSubHeading>
            <p>
              Half day (four hours) or full day (8 hours). Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea
            </p>
          </ProcessBlock>
          <ProcessBlock>
            <ProcessAndDatesSubHeading>Keynote</ProcessAndDatesSubHeading>
            <p>
              Do you have what I takes to give a 90 minute speech on something
              your passionate about? Lorem ipsum dolor sit amet, consetetur
              sadipscing elitr, sed diam nonumy
            </p>
          </ProcessBlock>
        </Cell>
        <Cell className="keyDates">
          <h3>Key Dates You Need to Know</h3>
          {milestones.map((m, index) => {
            const className = index === 0 ? 'first' : '';
            return (
              <KeyDatesGrid columns={12} key={`DatesFooCell_${m.title}`}>
                <KeyDatesCell width={5} className={className}>
                  <ProcessAndDatesSubHeading>
                    {moment(m.dueDate).format('MMMM Do, YYYY')}
                  </ProcessAndDatesSubHeading>
                </KeyDatesCell>
                <KeyDatesCell width={7} className={className}>
                  {m.title}
                </KeyDatesCell>
              </KeyDatesGrid>
            );
          })}
          <MoreAboutProcess
            href={`counselor-selection-process?feature=${featureKeyword}`}
            borderColor="thatBlue"
            color="thatBlue"
            backgroundColor="white"
            label="More About the counselor selection process"
          />
        </Cell>
      </ProcessAndDatesGrid>
    </Main>
  );
};

export default Process;
