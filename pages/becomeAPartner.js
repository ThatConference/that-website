import React from 'react';
import { Grid, Cell } from 'styled-css-grid';
import ContentSection from '../components/shared/ContentSection';
import PageHeader from '../components/shared/PageHeader';
import StandardBodyCopy from '../components/shared/StandardBodyCopy';

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

    <ContentSection color="primary">
      <Grid columns={12}>
        <Cell width={6}>
          <StandardBodyCopy>
            THAT Conference is the “Summer Camp for Geeks” that combines
            technology, networking, social events and exposure in an
            inspirational, family friendly environment at the The Kalahari
            Resort in Wisconsin Dells. Over four days, 1700 folks of diverse
            technology backgrounds and expertise levels gather to take advantage
            of multiple learning mediums to maximize one’s community and career
            advancements.
          </StandardBodyCopy>
        </Cell>
        <Cell width={6} />
      </Grid>
    </ContentSection>
  </div>
);

export default becomeAPartner;
