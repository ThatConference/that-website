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
    margin-left: 0;
  `};
`;

const StyledP = styled.p`
  padding-right: 1rem;
  margin-top: 0;

  ${below.med`
    margin-top: 0;
  `};
`;

const AboutCell = styled(Cell)`
  margin-right: 7.5rem;

  ${below.med`
    margin-right: 0;
  `};
`;

const Goals = styled(Cell)``;

const GoalsList = styled.ul`
  padding-inline-start: 2rem;
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
    <Goals>
      <PartnerDetailSubHeading>Our Goals</PartnerDetailSubHeading>
      <GoalsList>
        {goals.map(goal => (
          <li key={goal}>{goal}</li>
        ))}
      </GoalsList>
    </Goals>
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
