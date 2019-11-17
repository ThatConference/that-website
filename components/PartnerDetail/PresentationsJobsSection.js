import React from 'react';
import styled from 'styled-components';

import { Grid, Cell } from 'styled-css-grid';
import ContentSection from '../shared/ContentSection';

import RoundImage from '../shared/RoundImage';
import PartnerDetailSubHeading from './PartnerDetailSubHeading';
import PartnerDetailParagraph from './PartnerDetailParagraph';

import { below } from '../../utilities';

const MainSection = styled(ContentSection)`
  padding: 0;
  padding-top: 4rem;

  ${below.med`
    padding-top: 2rem;
    margin-left: 0;
    margin-right: 0;
  `};
`;

const StyledGrid = styled(Grid)`
  margin-bottom: 5rem;

  ${below.med`
    grid-template-columns: 10rem 1fr;
  `};
`;

const StyledCell = styled(Cell)`
  padding-right: 3rem;
  padding-left: 3rem;
  padding-top: 0;

  ${below.med`
    padding-right:0;
    padding-left:0;
  `};
`;

const Title = styled.h5`
  margin-bottom: 0;
  margin-top: 0;
`;

const SpeakerCell = styled(Cell)`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

const SpeakerImage = styled(RoundImage)`
  margin-top: 0.5rem;
`;

const SpeakerName = styled.p`
  margin-top: 0;
  font-family: franklin-gothic-urw, sans-serif;
  margin-left: 4rem;
  margin-right: 4rem;
  line-height: 1;
  color: ${({ theme }) => theme.colors.fonts.dark};

  ${below.med`
    margin-left:0;
    margin-right:1px;
  `};
`;

const ViewLink = styled.a`
  font-size: 1.4rem;
  float: left;
  color: ${({ theme }) => theme.colors.thatBlue};
  img {
    vertical-align: middle;
    height: 2rem;
    margin-left: 1rem;
  }
`;

const JobDiv = styled.div`
  margin-bottom: 5rem;
`;

const renderPresentation = presentation => {
  return (
    <StyledGrid columns="15rem 1fr" key={presentation.id}>
      <SpeakerCell center>
        {presentation.speaker.map(speaker => {
          return (
            <div key={speaker.slug}>
              <SpeakerImage
                imageUrl={speaker.headshotUrl}
                size="80"
                showAccentLine={false}
              />
              <SpeakerName>{speaker.name}</SpeakerName>
            </div>
          );
        })}
      </SpeakerCell>
      <Cell>
        <Title>{presentation.title}</Title>
        <PartnerDetailParagraph>
          {presentation.description}
        </PartnerDetailParagraph>
        <ViewLink href="/">
          <span>View Talk</span>
          <img src="/svgs/forward-arrow.svg" alt="View Talk" />
        </ViewLink>
      </Cell>
    </StyledGrid>
  );
};

const renderJob = job => {
  return (
    <JobDiv key={job.id}>
      <Title>{job.title}</Title>
      <PartnerDetailParagraph>{job.description}</PartnerDetailParagraph>
    </JobDiv>
  );
};

const PresentationsPiece = ({ companyName, presentations }) => {
  return (
    <StyledCell>
      <PartnerDetailSubHeading>
        Presentations By {companyName}
      </PartnerDetailSubHeading>
      {presentations.map(presentation => {
        return renderPresentation(presentation);
      })}
    </StyledCell>
  );
};

const JobsPiece = ({ jobs }) => {
  return (
    <StyledCell>
      <PartnerDetailSubHeading>Job Listings</PartnerDetailSubHeading>
      {jobs.map(job => {
        return renderJob(job);
      })}
      <ViewLink href="/">
        <span>View all Job Listings</span>
        <img src="/svgs/forward-arrow.svg" alt="View all Job Listings" />
      </ViewLink>
    </StyledCell>
  );
};

const PresentationsJobsSection = ({ companyName, presentations, jobs }) => {
  return (
    <MainSection>
      <Grid columns="repeat(auto-fit,minmax(32rem,1fr))">
        {presentations && (
          <PresentationsPiece
            companyName={companyName}
            presentations={presentations}
          />
        )}
        {jobs && <JobsPiece jobs={jobs} />}
      </Grid>
    </MainSection>
  );
};

export default PresentationsJobsSection;
