import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import ContentSection from '../components/shared/ContentSection';
import ActionButton from '../components/shared/LinkButton';
import WhatToExpect from '../components/shared/WhatToExpect';

const SasquatchImage = styled.img`
  width: 100%;
  margin-left: 50px;
`;

const becomeAPartner = props => (
  <div>
    <ContentSection>
      <Grid columns={12}>
        <Cell width={6}>
          <h1 style={{ marginTop: 0, marginRight: '100px' }}>
            Become a Camp Partner
          </h1>
        </Cell>
        <Cell width={6}>
          <p className="medium-body-copy">
            We believe that by partnering with our sponsors not only can we help
            enable your goals but it also creates a more engaging environment
            for our attendees. Engage with true practitioners, thought leaders
            and entrepreneurs while enjoying the perks of summer camp at a giant
            waterpark. Join us and become part of THAT family.
          </p>
        </Cell>
      </Grid>
    </ContentSection>

    <ContentSection backgroundColor="primary" fontColor="light">
      <Grid columns={12}>
        <Cell width={6}>
          <div>
            <h3 style={{ color: 'white', marginBottom: 0 }}>
              SUMMER CAMP FOR GEEKS
            </h3>
            <span className="large-body-copy">
              THAT Conference is the “Summer Camp for Geeks” that combines
              technology, networking, social events and exposure in an
              inspirational, family friendly environment at the The Kalahari
              Resort in Wisconsin Dells. Over four days, 1700 folks of diverse
              technology backgrounds and expertise levels gather to take
              advantage of multiple learning mediums to maximize one’s community
              and career advancements.
            </span>
          </div>
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
      <WhatToExpect />
    </ContentSection>
  </div>
);

export default becomeAPartner;
