import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { NextSeo } from 'next-seo';
import _ from 'lodash';
import LinkButton from '../../../components/shared/LinkButton';
import ContentSection from '../../../components/shared/ContentSection';
import LoadingIndicator from '../../../components/shared/LoadingIndicator';
import { ActionButtonRow } from '../../../components/shared/StandardStyles';
import PartnerLogoWithInfo from '../../../components/shared/PartnerLogoWithInfo';
import JobListing from '../../../components/shared/JobListing';
import { below, above } from '../../../utilities';

const GET_ALL_PARTNER_JOBS = gql`
  query getJobListingBySlug($partnerSlug: String!) {
    partners {
      partnerBySlug(slug: $partnerSlug) {
        id
        companyName
        companyLogo
        slug
        aboutUs
        website
        linkedIn
        github
        youtube
        instagram
        twitter
        facebook
        jobListings {
          slug
          id
          title
          description
          jobType
          internship
          experienceLevel
          relocationOffered
          remote
          role
          featured
        }
      }
    }
  }
`;

const twoColBp = 'larger';

const Main = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  justify-content: center;

  ${below[twoColBp]`
    flex-direction: column;
  `};
`;

const SideDetail = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;

  ${above[twoColBp]`
    margin-right: 4rem;
  `};

  ${below[twoColBp]`
    align-items: center;
  `};
`;

const Jobs = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledPartnerLogoWithInfo = styled(PartnerLogoWithInfo)`
  min-width: 50rem;

  img {
    height: 34rem;
    max-width: 34rem;
  }
`;

const jobs = () => {
  const router = useRouter();
  const { loading, data } = useQuery(GET_ALL_PARTNER_JOBS, {
    variables: { partnerSlug: router.query.slug },
    onCompleted(d) {
      const { partnerBySlug: partner } = d.partners;
      let hostName = new URL(partner.website).hostname;
      if (hostName.toLowerCase().startsWith('www.')) {
        hostName = hostName.replace('www.', '');
      }
      partner.hostName = hostName;
      return partner;
    },
  });

  if (loading) return <LoadingIndicator />;

  const { partnerBySlug: partner } = data.partners;

  return (
    <>
      <NextSeo
        title={`${partner.companyName} Jobs - THAT Conference`}
        description={`Job openings for THAT partner ${partner.companyName}`}
        canonical={`https://www.thatconference.com/partner/${partner.slug}/jobs`}
        openGraph={{
          images: [{ url: partner.companyLogo }],
        }}
      />

      <ContentSection>
        <Main>
          <SideDetail>
            <h1>{`${partner.companyName} Jobs`}</h1>
            <p className="medium-body-copy">{partner.aboutUs}</p>
            <ActionButtonRow>
              <LinkButton
                href={`/partner/${partner.slug}`}
                label={`THAT ${partner.companyName} Profile`}
                color="thatBlue"
                borderColor="thatBlue"
                className="stretch-sm"
                hoverBorderColor="thatBlue"
                hoverColor="white"
                hoverBackgroundColor="thatBlue"
              />
              <LinkButton
                href={partner.website}
                label={`Visit ${partner.companyName}`}
                color="thatBlue"
                borderColor="thatBlue"
                className="stretch-sm"
                hoverBorderColor="thatBlue"
                hoverColor="white"
                hoverBackgroundColor="thatBlue"
                isLocal={false}
                target="blank"
              />
            </ActionButtonRow>
          </SideDetail>
          <StyledPartnerLogoWithInfo partner={partner} alignment="center" />
        </Main>
      </ContentSection>

      <ContentSection style={{ paddingTop: 0 }}>
        <h3>{`Current Opportunites at ${partner.companyName}`}</h3>
        <Jobs>
          {_.sortBy(partner.jobListings, j => j.title.toLowerCase()).map(
            job => (
              <JobListing job={job} partner={partner} key={job.id} />
            ),
          )}
        </Jobs>
      </ContentSection>
    </>
  );
};

export default jobs;
