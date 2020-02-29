import React from 'react';
import styled from 'styled-components';

import { Grid, Cell } from 'styled-css-grid';
import ContentSection from '../shared/ContentSection';
import ImageContainer from '../shared/ImageContainer';

import { gridRepeat } from '../../utilities';

const WhatToExpectImage = styled.img`
  max-width: ${({ maxWidth }) => maxWidth || '16rem'};
  position: relative;
  top: -1.5rem;
`;

const StyledCell = styled(Cell)`
  margin-bottom: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const StyledTitle = styled.span`
  font-weight: 700;
  position: absolute;
  top: 14rem;
`;

const StyledDescription = styled.p`
  margin: 1rem 3rem 3rem;
  position: absolute;
  top: 17rem;
  left: 0;
`;

const CounselorPerk = ({ src, title, description, maxWidth }) => {
  return (
    <StyledCell>
      <ImageContainer width="40rem" height="30rem" key="">
        <WhatToExpectImage
          src={src}
          maxWidth={maxWidth}
          alt="What To Expect At THAT Conference"
        />
        <StyledTitle className="medium-body-copy">{title}</StyledTitle>
        <StyledDescription>{description}</StyledDescription>
      </ImageContainer>
    </StyledCell>
  );
};

const Perks = () => {
  return (
    <ContentSection>
      <h3 className="font-dark centered-text">
        Perks If You're Selected To Speak At THAT Conference
      </h3>
      <Grid columns={gridRepeat.small} alignContent="center">
        <CounselorPerk
          title="Conference Ticket"
          src="/images/conference_ticket.svg"
          maxWidth="13rem"
          description="To attend all 4 days of THAT Conference! Including all
            conference meals, THAT Pig Roast and all social/networking
            activities!"
        />
        <CounselorPerk
          title="Hotel Accomodations"
          src="/images/hotel_accomodations.svg"
          description="For each talk accepted we cover 2 nights at the Kalahari, up to a 3
            night max per family!"
        />
        <CounselorPerk
          title="Professionally Recorded"
          src="/images/professionally_recorded.svg"
          description="If you are accepted and choose to be included, we are set to offer
            professional video recording for a majority of sessions!"
        />
      </Grid>
    </ContentSection>
  );
};

export default Perks;
