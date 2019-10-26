import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';

const CenteredDiv = styled.div`
  text-align: center;
`;

const WhatToExpectImage = styled.img`
  width: 150px;
`;

const WhatToExpectSection = ({ src, title }) => {
  return (
    <div>
      <CenteredDiv style={{ height: '120px' }}>
        <WhatToExpectImage src={src} />
      </CenteredDiv>
      <CenteredDiv>
        <span className="medium-copy-body">{title}</span>
      </CenteredDiv>
    </div>
  );
};

const WhatToExpect = props => {
  return (
    <Grid columns={12} style={{ width: '100%', textAlign: 'center' }}>
      <Cell width={12}>
        <h4>Here's What You Can Expect At That Conference</h4>
      </Cell>
      <Cell width={3}>
        <WhatToExpectSection
          src="/images/what_to_expect_200_speakers.png"
          title="200+ Sessions"
        />
      </Cell>
      <Cell width={3}>
        <WhatToExpectSection
          src="/images/what_to_expect_inspirational_keynotes.png"
          title="Inspirational Keynotes"
        />
      </Cell>
      <Cell width={3}>
        <WhatToExpectSection
          src="/images/what_to_expect_hands_on_learning.png"
          title="Hands-on Learning"
        />
      </Cell>
      <Cell width={3}>
        <WhatToExpectSection
          src="/images/what_to_expect_professional_networking.png"
          title="Professional Networking"
        />
      </Cell>
      <Cell width={3}>
        <WhatToExpectSection
          src="/images/what_to_expect_industry_leaders.png"
          title="Exposure to Industry Leaders"
        />
      </Cell>
      <Cell width={3}>
        <WhatToExpectSection
          src="/images/what_to_expect_4_days.png"
          title="4 Full days"
        />
      </Cell>
      <Cell width={3}>
        <WhatToExpectSection
          src="/images/what_to_expect_families_welcome.png"
          title="All Families Welcome"
        />
      </Cell>
      <Cell width={3}>
        <WhatToExpectSection
          src="/images/what_to_expect_tech_stack.png"
          title="Array of Tech Stacks"
        />
      </Cell>
    </Grid>
  );
};

export default WhatToExpect;
