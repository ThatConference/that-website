import React from 'react';
import styled from 'styled-components';

import { Grid, Cell } from 'styled-css-grid';
import ContentSection from '../shared/ContentSection';
import PartnerDetailSubHeading from './PartnerDetailSubHeading';

import { below } from '../../utilities';

const MainSection = styled(ContentSection)`
  padding: 0;
  padding-top: 100px;
  margin-left: 30px;

  ${below.med`
    padding-top: 20px;
    margin-right: 0;
  `};
`;

const StyledP = styled.p`
  padding-right: 10px;

  ${below.med`
    margin-top: 0;
  `};
`;

const AboutPiece = ({ companyName, about }) => {
  return (
    <Cell>
      <PartnerDetailSubHeading>About {companyName}</PartnerDetailSubHeading>
      <StyledP>{about}</StyledP>
    </Cell>
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
      <Grid columns="repeat(auto-fit,minmax(320px,1fr))">
        {about && <AboutPiece companyName={companyName} about={about} />}
        {goals && <GoalsPiece goals={goals} />}
      </Grid>
    </MainSection>
  );
};

export default AboutGoalsSection;
