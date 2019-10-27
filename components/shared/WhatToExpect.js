import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import ContentSection from './ContentSection';

const CenteredDiv = styled.div`
  text-align: center;
`;

const WhatToExpectImage = styled.img`
  width: 15rem;
`;

const HighlightBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const WhatToExpectSection = ({ src, title }) => {
  return (
    <div style={{ marginBottom: '8rem', width: '24%', minWidth: '19rem' }}>
      <CenteredDiv style={{ height: '12rem' }}>
        <WhatToExpectImage src={src} />
      </CenteredDiv>
      <CenteredDiv>
        <span className="medium-body-copy" style={{ fontWeight: 'bold' }}>
          {title}
        </span>
      </CenteredDiv>
    </div>
  );
};

const WhatToExpect = props => {
  return (
    <>
      <h3
        className="font-dark"
        style={{ textAlign: 'center', paddingBottom: '2rem' }}
      >
        Here's What You Can Expect At That Conference
      </h3>
      <HighlightBlock>
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
          title="4 Full days"
        />
        <WhatToExpectSection
          src="/images/what_to_expect_families_welcome.png"
          title="All Families Welcome"
        />
        <WhatToExpectSection
          src="/images/what_to_expect_tech_stack.png"
          title="Array of Tech Stacks"
        />
      </HighlightBlock>
    </>
  );
};

export default WhatToExpect;
