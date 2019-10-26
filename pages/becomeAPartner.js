import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import ContentSection from '../components/shared/ContentSection';
import PageHeader from '../components/shared/PageHeader';
import StandardBodyCopy from '../components/shared/StandardBodyCopy';
import ActionButton from '../components/shared/LinkButton';
import WhatToExpect from '../components/shared/WhatToExpect';

const SasquatchImage = styled.img`
  width: 500px;
`;

const WhatToExpectImage = styled.img`
  width: 150px;
`;

const becomeAPartner = props => (
  <div>
    <ContentSection>
      <Grid columns={12}>
        <Cell width={6}>
          <PageHeader>Become a Camp Partner</PageHeader>
        </Cell>
        <Cell width={6}>
          <StandardBodyCopy>
            We believe that by partnering with our sponsors not only can we help
            enable your goals but it also creates a more engaging environment
            for our attendees. Engage with true practitioners, thought leaders
            and entrepreneurs while enjoying the perks of summer camp at a giant
            waterpark. Join us and become part of THAT family.
          </StandardBodyCopy>
        </Cell>
      </Grid>
    </ContentSection>

    <ContentSection backgroundColor="primary" fontColor="light">
      <Grid columns={12}>
        <Cell width={6}>
          <StandardBodyCopy>
            <h2>SUMMER CAMP FOR GEEKS</h2>
            THAT Conference is the “Summer Camp for Geeks” that combines
            technology, networking, social events and exposure in an
            inspirational, family friendly environment at the The Kalahari
            Resort in Wisconsin Dells. Over four days, 1700 folks of diverse
            technology backgrounds and expertise levels gather to take advantage
            of multiple learning mediums to maximize one’s community and career
            advancements.
          </StandardBodyCopy>
          <div>
            {/* This will jump to prospectus for below */}
            <ActionButton
              href="/foo"
              borderColor="thatBlue"
              label="Get the Prospectus"
            />
          </div>
        </Cell>
        {/* This seems smelly? */}
        <Cell style={{ textAlign: 'center' }} width={6}>
          <div>
            <SasquatchImage src="/images/sasquatch_kayaking.png" />
          </div>
        </Cell>
      </Grid>
    </ContentSection>

    <ContentSection>
      <Grid columns={12} style={{ width: '100%', textAlign: 'center' }}>
        <Cell width={12}>
          <h4>Here's What You Can Expect At That Conference</h4>
        </Cell>
        <Cell width={3}>
          <WhatToExpect
            src="/images/what_to_expect_200_speakers.png"
            title="200+ Sessions"
          />
        </Cell>
        <Cell width={3}>
          <WhatToExpect
            src="/images/what_to_expect_inspirational_keynotes.png"
            title="Inspirational Keynotes"
          />
        </Cell>
        <Cell width={3}>
          <WhatToExpect
            src="/images/what_to_expect_hands_on_learning.png"
            title="Hands-on Learning"
          />
        </Cell>
        <Cell width={3}>
          <WhatToExpect
            src="/images/what_to_expect_professional_networking.png"
            title="Professional Networking"
          />
        </Cell>
        <Cell width={3}>
          <WhatToExpect
            src="/images/what_to_expect_industry_leaders.png"
            title="Exposure to Industry Leaders"
          />
        </Cell>
        <Cell width={3}>
          <WhatToExpect
            src="/images/what_to_expect_4_days.png"
            title="4 Full days"
          />
        </Cell>
        <Cell width={3}>
          <WhatToExpect
            src="/images/what_to_expect_families_welcome.png"
            title="All Families Welcome"
          />
        </Cell>
        <Cell width={3}>
          <WhatToExpect
            src="/images/what_to_expect_tech_stack.png"
            title="Array of Tech Stacks"
          />
        </Cell>
      </Grid>
    </ContentSection>
  </div>
);

export default becomeAPartner;
