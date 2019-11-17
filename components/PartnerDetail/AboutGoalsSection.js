import React from 'react';
import styled from 'styled-components';

import { Grid, Cell } from 'styled-css-grid';
import ContentSection from '../shared/ContentSection';
import PartnerDetailSubHeading from './PartnerDetailSubHeading';

import { below } from '../../utilities';

const MainSection = styled(ContentSection)`
  padding: 0;
  padding-top: 7rem;
  margin-left: 3rem;

  ${below.med`
    padding-top: 2rem;
    margin-right: 0;
  `};
`;

const StyledP = styled.p`
  padding-right: 1rem;
  font-family: 'Open Sans', sans-serif;
  margin-top: 0;

  ${below.med`
    margin-top: 0;
  `};
`;

const AboutCell = styled(Cell)`
  margin-right: 7.5rem;
`;

const AboutPiece = ({ companyName, about }) => {
  return (
    <AboutCell>
      <PartnerDetailSubHeading>About {companyName}</PartnerDetailSubHeading>
      <StyledP>{about}</StyledP>
    </AboutCell>
  );
};

const GoalsPiece = ({ goals }) => {
  return (
    <Cell>
      <PartnerDetailSubHeading>Our Goals</PartnerDetailSubHeading>
      <ul>
        {goals.map(goal => (
          <li key={goal}>{goal}</li>
        ))}
      </ul>
    </Cell>
  );
};

const AboutGoalsSection = ({ companyName, about, goals }) => {
  return (
    <MainSection>
      <Grid columns="repeat(auto-fit,minmax(32rem,1fr))">
        {about && <AboutPiece companyName={companyName} about={about} />}
        {goals && <GoalsPiece goals={goals} />}
      </Grid>
    </MainSection>
  );
};

export default AboutGoalsSection;
