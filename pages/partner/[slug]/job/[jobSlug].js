import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { NextSeo, JobPostingJsonLd } from 'next-seo';
import LinkButton from '../../../../components/shared/LinkButton/LinkButton';
import ContentSection from '../../../../components/shared/ContentSection';
import LoadingIndicator from '../../../../components/shared/LoadingIndicator';
import { ActionButtonRow } from '../../../../components/shared/StandardStyles';
import PartnerLogoWithInfo from '../../../../components/shared/PartnerLogoWithInfo';
import { below, above } from '../../../../utilities';

const GET_PARTNER_JOB = gql`
  query getJobListingBySlug($partnerSlug: String!, $jobListingSlug: String!) {
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
        jobListing(slug: $jobListingSlug) {
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

const StyledH1 = styled.h1`
  font-size: 7rem;

  ${below[twoColBp]`
    text-align: center;
  `};
`;

const HighlightText = styled.h2`
  color: ${({ theme }) => theme.colors.tertiary};
  font-size: 2.4rem;
  font-family: franklin-gothic-urw, sans-serif;
  font-weight: 400;
  text-transform: none;
  margin: 0;
  padding-bottom: 1rem;
  text-align: left;
  width: 100%;

  ${below[twoColBp]`
    text-align: center;
  `};
`;

const SideDetail = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  order: 1;

  ${above[twoColBp]`
    margin-right: 4rem;
  `};

  ${below[twoColBp]`
    order: 2;
    align-items: center;
  `};
`;

const StyledPartnerLogoWithInfo = styled(PartnerLogoWithInfo)`
  min-width: 50rem;
  order 2;

  img {
    height: 34rem;
    max-width: 34rem;

    ${below.small`
      max-width: 80%;
    `};
  }

  ${below.med`
    min-width: 90%;
  `};

  ${below[twoColBp]`
    order: 1;
    padding-bottom: 7rem;
  `};
`;

const AttributesRow = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const AttributeTag = styled.div`
  margin: 0 0.25rem;
  font-size: 1.3rem;
  background-color: ${({ color, theme }) => theme.colors[color]};
  width: fit-content;
  border: ${({ border, theme }) =>
    border ? `1px solid ${theme.colors.primary}` : 'none'};

  span {
    padding: 0.1rem 1rem;
    color: ${({ fontColor, theme }) =>
      fontColor ? theme.colors[fontColor] : theme.colors.white};
    font-weight: 700;
    vertical-align: middle;
  }
`;

const JobNotFound = ({ slug }) => (
  <ContentSection>
    <StyledH1>Job Not Found</StyledH1>
    <LinkButton
      href={`/partner/${slug}`}
      label="Back to Partner Profile"
      color="thatBlue"
      borderColor="thatBlue"
      className="stretch-sm"
      hoverBorderColor="thatBlue"
      hoverColor="white"
      hoverBackgroundColor="thatBlue"
    />
  </ContentSection>
);

const jobDetail = () => {
  const router = useRouter();

  if (router.query.jobSlug === 'null')
    return <JobNotFound slug={router.query.slug} />;

  const { loading, data } = useQuery(GET_PARTNER_JOB, {
    variables: {
      partnerSlug: router.query.slug,
      jobListingSlug: router.query.jobSlug,
    },
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

  if (loading) {
    return (
      <ContentSection>
        <LoadingIndicator />
      </ContentSection>
    );
  }

  const { partnerBySlug: partner } = data.partners;
  const job = partner.jobListing;

  return (
    <>
      <NextSeo
        title={`${job.title} @ ${partner.companyName} - THAT Conference`}
        description={job.description}
        canonical={`https://www.thatconference.com/partner/${partner.slug}/job/${job.slug}`}
        openGraph={{
          images: [{ url: partner.companyLogo }],
        }}
      />
      <JobPostingJsonLd
        description={job.description}
        hiringOrganization={{
          name: partner.companyName,
          sameAs: partner.website,
        }}
        jobLocation={{}}
        title={job.title}
        employmentType={job.type}
        jobLocationType="TELECOMMUTE"
      />

      <ContentSection>
        <Main>
          <SideDetail>
            <HighlightText>THAT Partner: {partner.companyName}</HighlightText>
            <StyledH1>{job.title}</StyledH1>
            <AttributesRow>
              {job.jobType && (
                <AttributeTag
                  className={job.jobType.toLowerCase().replace('_', ' ')}
                  color="highlight"
                >
                  <span>{job.jobType.replace('_', ' ')}</span>
                </AttributeTag>
              )}
              {job.experienceLevel && (
                <AttributeTag
                  className={job.experienceLevel
                    .toLowerCase()
                    .replace('_', ' ')}
                  color="primary"
                >
                  <span>{job.experienceLevel.replace('_', ' ')}</span>
                </AttributeTag>
              )}
              {job.remote && (
                <AttributeTag
                  className="remote"
                  color="transparent"
                  border
                  fontColor="primary"
                >
                  <span>REMOTE</span>
                </AttributeTag>
              )}
            </AttributesRow>
            <pre className="medium-body-copy">{job.description}</pre>
            <ActionButtonRow>
              <LinkButton
                href={`/partner/${partner.slug}`}
                label={`View ${partner.companyName} Profile`}
                color="thatBlue"
                borderColor="thatBlue"
                className="stretch-sm"
                hoverBorderColor="thatBlue"
                hoverColor="white"
                hoverBackgroundColor="thatBlue"
              />
              <LinkButton
                href={`/partner/${partner.slug}/jobs`}
                label={`View All ${partner.companyName} Jobs`}
                color="thatBlue"
                borderColor="thatBlue"
                className="stretch-sm"
                hoverBorderColor="thatBlue"
                hoverColor="white"
                hoverBackgroundColor="thatBlue"
                isLocal={false}
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
    </>
  );
};

export default jobDetail;
