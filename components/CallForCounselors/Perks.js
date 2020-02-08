import React from 'react';
import styled from 'styled-components';

import { Grid } from 'styled-css-grid';
import ContentSection from '../shared/ContentSection';
// import LinkButton from '../shared/LinkButton';
import ImageContainer from '../shared/ImageContainer';

import { gridRepeat } from '../../utilities';

const PerkTitle = styled.h4`
  margin-top: 0;
  margin-bottom: 0.4rem;
`;

const Perk = styled(ImageContainer)`
  padding: 2.5rem;
  margin: 2rem;
`;

// const GetStartedNow = styled(LinkButton)`
//   float: right;
// `;

const Perks = () => {
  return (
    <ContentSection>
      <h3 className="font-dark centered-text">
        Perks If You're Selected To Speak At THAT Conference
      </h3>
      <Grid columns={gridRepeat.xsmall} alignContent="center">
        <Perk>
          <PerkTitle>Conference Ticket</PerkTitle>
          <p style={{ flexGrow: '2' }}>
            A ticket to attend all four days of THAT Conference! Including all
            conference meals, THAT Pig Roast and all social/networking
            activities!
          </p>
        </Perk>
        <Perk>
          <PerkTitle>Hotel Accomodations</PerkTitle>
          <p style={{ flexGrow: '2' }}>
            For each talk accepted we cover 2 nights at the Kalahari, up to a 3
            night max per family!
          </p>
        </Perk>
        <Perk>
          <PerkTitle>Professionally Recorded</PerkTitle>
          <p style={{ flexGrow: '2' }}>
            If you are accepted and choose to be included, we are set to offer
            professional video recording for a majority of our sessions!
          </p>
        </Perk>
      </Grid>
      {/* <GetStartedNow
        href={`counselor-agreement?feature=${featureKeyword}`}
        borderColor="thatBlue"
        color="thatBlue"
        backgroundColor="white"
        hoverBorderColor="thatBlue"
        hoverColor="white"
        hoverBackgroundColor="thatBlue"
        label="Get started now!"
      /> */}
    </ContentSection>
  );
};

export default Perks;
