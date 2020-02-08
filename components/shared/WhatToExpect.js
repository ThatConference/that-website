import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import ContentSection from './ContentSection';
import ImageContainer from './ImageContainer';

import { gridRepeat } from '../../utilities';

const WhatToExpectImage = styled.img`
  max-width: 16rem;
  position: relative;
  top: -1.5rem;
`;

const StyledCell = styled(Cell)`
  margin-bottom: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTitle = styled.span`
  font-weight: 800;
  position: absolute;
  bottom: 2rem;
`;

const WhatToExpectSection = ({ src, title }) => {
  return (
    <StyledCell>
      <ImageContainer width="30rem" height="16rem" key="">
        <WhatToExpectImage src={src} />
        <StyledTitle className="medium-body-copy">{title}</StyledTitle>
      </ImageContainer>
    </StyledCell>
  );
};

const WhatToExpect = ({ className }) => {
  return (
    <ContentSection className={className}>
      <h3 className="font-dark centered-text" style={{ paddingBottom: '2rem' }}>
        Here's What You Can Expect At That Conference
      </h3>
      <Grid columns={gridRepeat.xsmall} alignContent="center">
        <WhatToExpectSection
          src="/images/what_to_expect_200_speakers.png"
          title="200+ Sessions"
        />
        <WhatToExpectSection
          src="/images/what_to_expect_inspirational_keynotes.png"
          title="Inspirational Keynotes"
        />
        <WhatToExpectSection
          src="/images/what_to_expect_hands_on_learning.png"
          title="Hands-on Learning"
        />
        <WhatToExpectSection
          src="/images/what_to_expect_professional_networking.png"
          title="Professional Networking"
        />
        <WhatToExpectSection
          src="/images/what_to_expect_industry_leaders.png"
          title="Exposure to Industry Leaders"
        />
        <WhatToExpectSection
          src="/images/what_to_expect_4_days.png"
          title="4 Full Days"
        />
        <WhatToExpectSection
          src="/images/what_to_expect_families_welcome.png"
          title="All Families Welcome"
        />
        <WhatToExpectSection
          src="/images/what_to_expect_tech_stack.png"
          title="Array of Tech Stacks"
        />
      </Grid>
    </ContentSection>
  );
};

export default styled(WhatToExpect)``;
