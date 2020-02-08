import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Grid, Cell } from 'styled-css-grid';
import { NextSeo } from 'next-seo';
import _ from 'lodash';
import ContentSection from '../components/shared/ContentSection';
import PartnerLogoWithInfo from '../components/shared/PartnerLogoWithInfo';
import LoadingIndicator from '../components/shared/LoadingIndicator';
import { below, gridRepeat } from '../utilities';

const GET_ALL_PARTNER_JOBS = gql`
  query getAllPartners {
    partners {
      all {
        id
        companyName
        companyLogo
        slug
        website
        linkedIn
        github
        youtube
        instagram
        twitter
        facebook
        jobListings {
          id
          title
          description
        }
      }
    }
  }
`;

const ImageCell = styled(Cell)`
  ${below.med`
    text-align: center;
  `};
`;

const HighlightImage = styled.img`
  max-height: 30rem;
  object-fit: contain;

  ${below.large`
    margin-left: 4rem;
  `};

  ${below.med`
    margin-left: 0;
  `};

  ${below.small`
    width: 90%;
  `};
`;

const PaddedImageContainer = styled.div`
  margin-right: 2rem;
  min-width: 28rem;
  text-align: center;

  ${below.small`
    margin: 0.5rem auto;
    margin-bottom: 2rem;
  `};
`;

const PartnerRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  &:not(:last-child) {
    padding-bottom: 3rem;
    border-bottom: 2px solid ${({ theme }) => theme.colors.mediumGray};
  }

  &:not(:first-child) {
    margin-top: 7rem;
  }

  ${below.small`
    flex-direction: column;
  `};
`;

const Jobs = styled.div`
  display: flex;
  flex-direction: column;
`;

const JobTitle = styled.h4`
  margin: 0;
`;
const Description = styled.p`
  margin-top: 0.25rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
`;

const JobRow = styled.div``;

const jobs = () => {
  const { loading, data } = useQuery(GET_ALL_PARTNER_JOBS);

  if (loading) return <LoadingIndicator />;

  const { partners } = data;

  const partnersWithJobs = partners.all.filter(
    partner => !_.isEmpty(partner.jobListings),
  );

  return (
    <>
      <NextSeo
        title="Jobs - THAT Conference"
        description="Job openings across all of our THAT Partners"
      />

      <ContentSection>
        <Grid columns={gridRepeat.small}>
          <Cell width={1}>
            <h1>Jobs</h1>
            <p className="medium-body-copy">
              Many THAT Partners have job openings available across all areas
              covering a wide spectrum of technoloiges and opportunites.
            </p>
          </Cell>
          <ImageCell center>
            <HighlightImage src="/images/bear_with_drone.png" />
          </ImageCell>
        </Grid>
      </ContentSection>

      <ContentSection>
        {_.sortBy(partnersWithJobs, p => p.companyName.toLowerCase()).map(
          partner => {
            return (
              <PartnerRow>
                <PaddedImageContainer key={partner.id}>
                  <PartnerLogoWithInfo partner={partner} />
                </PaddedImageContainer>
                <Jobs>
                  {partner.jobListings.map(job => (
                    <JobRow>
                      <JobTitle>{job.title}</JobTitle>
                      <Description>{job.description}</Description>
                    </JobRow>
                  ))}
                </Jobs>
              </PartnerRow>
            );
          },
        )}
      </ContentSection>
    </>
  );
};

export default jobs;
