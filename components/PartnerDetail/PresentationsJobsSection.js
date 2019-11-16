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
  padding-top: 40px;

  ${below.med`
    padding-top: 20px;
    margin-left: 0;
  `};
`;

const StyledCell = styled(Cell)`
  padding-right: 30px;
  padding-left: 30px;
  padding-top: 0;
`;

const Title = styled.h5`
  margin-bottom: 0;
`;

const SpeakerCell = styled(Cell)`
  padding-left: 5px;
  padding-right: 5px;

  span {
    display: none;
  }
`;

const SpeakerImage = styled(RoundImage)`
  margin-top: 2.75em;
`;

const SpeakerName = styled.p`
  margin-top: 0;
  font-family: franklin-gothic-urw, sans-serif;
  margin-left: 40px;
  margin-right: 40px;
  line-height: 1;
  color: ${({ theme }) => theme.colors.fonts.dark};
`;

const ViewLink = styled.a`
  font-size: 14px;
  float: left;
  color: ${({ theme }) => theme.colors.thatBlue};
  img {
    vertical-align: middle;
    height: 20px;
    margin-left: 10px;
  }
`;

const renderPresentation = presentation => {
  return (
    <Grid columns="150px 1fr" key={presentation.id}>
      <SpeakerCell center>
        {presentation.speaker.map(speaker => {
          return (
            <div key={speaker.slug}>
              <SpeakerImage imageUrl={speaker.headshotUrl} size="80" />
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
    </Grid>
  );
};

const renderJob = job => {
  return (
    <div key={job.id}>
      <Title>{job.title}</Title>
      <PartnerDetailParagraph>{job.description}</PartnerDetailParagraph>
    </div>
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
      <ViewLink href="/" style={{ marginTop: '20px' }}>
        <span>View all Job Listings</span>
        <img src="/svgs/forward-arrow.svg" alt="View all Job Listings" />
      </ViewLink>
    </StyledCell>
  );
};

const PresentationsJobsSection = ({ companyName, presentations, jobs }) => {
  return (
    <MainSection>
      <Grid columns="repeat(auto-fit,minmax(320px,1fr))">
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
