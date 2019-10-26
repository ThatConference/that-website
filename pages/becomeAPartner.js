import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import ContentSection from '../components/shared/ContentSection';
import PageHeader from '../components/shared/PageHeader';
import StandardBodyCopy from '../components/shared/StandardBodyCopy';
import ActionButton from '../components/shared/LinkButton';

const SasquatchImage = styled.img`
  width: 500px;
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
          <ActionButton
            href="/"
            label="Join Our Mailing List"
            borderColor="thatBlue"
          />
        </Cell>
        <Cell width={6}>
          <SasquatchImage src="/images/sasquatch_kayaking.png" />
        </Cell>
      </Grid>
    </ContentSection>
  </div>
);

export default becomeAPartner;
