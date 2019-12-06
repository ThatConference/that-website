import React from 'react';
import styled from 'styled-components';
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

const StyledBlock = styled.div`
  margin: 3rem 2rem;
  width: 20%;
  min-width: 19rem;
`;

const WhatToExpectSection = ({ src, title }) => {
  return (
    <StyledBlock>
      <CenteredDiv style={{ height: '12rem' }}>
        <WhatToExpectImage src={src} />
      </CenteredDiv>
      <CenteredDiv>
        <span className="medium-body-copy" style={{ fontWeight: 'bold' }}>
          {title}
        </span>
      </CenteredDiv>
    </StyledBlock>
  );
};

const WhatToExpect = ({ className }) => {
  return (
    <ContentSection className={className}>
      <h3
        className="font-dark"
        style={{ textAlign: 'center', paddingBottom: '2rem' }}
      >
        Here&apos;s What You Can Expect At That Conference
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
    </ContentSection>
  );
};

export default styled(WhatToExpect)``;
