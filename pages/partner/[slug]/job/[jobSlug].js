import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { NextSeo } from 'next-seo';
import LinkButton from '../../../../components/shared/LinkButton';
import ContentSection from '../../../../components/shared/ContentSection';
import LoadingIndicator from '../../../../components/shared/LoadingIndicator';
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

  ${above[twoColBp]`
    margin-right: 4rem;
  `};

  ${below[twoColBp]`
    align-items: center;
  `};
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: left;

  a {
    margin-left: 0;
    float: left;
  }

  a:not(:last-child) {
    margin-right: 2rem;
  }

  ${below[twoColBp]`
    padding-bottom: 3rem;
  `};

  ${below.small`
    flex-direction: column;
    align-items: stretch;
  `};
`;

const HighlightImage = styled.img`
  max-height: 24rem;
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

const LogoDiv = styled.div`
  min-width: 45rem;
  margin: 3rem;

  ${below.med`
    min-width: unset;
    max-width: 80%;
    margin: auto;
  `};
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
      />

      <ContentSection>
        <Main>
          <SideDetail>
            <HighlightText>THAT Partner: {partner.companyName}</HighlightText>
            <StyledH1>{job.title}</StyledH1>
            <p className="medium-body-copy">{job.description}</p>
            <ActionButtons>
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
            </ActionButtons>
          </SideDetail>
          <LogoDiv>
            <HighlightImage src={partner.companyLogo} />
          </LogoDiv>
        </Main>
      </ContentSection>
    </>
  );
};

export default jobDetail;
