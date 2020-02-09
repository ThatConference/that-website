import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { NextSeo } from 'next-seo';
import LinkButton from '../../../components/shared/LinkButton';
import ContentSection from '../../../components/shared/ContentSection';
import LoadingIndicator from '../../../components/shared/LoadingIndicator';
import Icon from '../../../components/shared/Icon';
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

const LogoDiv = styled.div`
  min-width: 45rem;
  margin: 3rem;
`;

const Jobs = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 90rem;
  margin: auto;
`;

const JobTitle = styled.h4`
  margin: 0;
  margin-top: 4rem;
`;
const Description = styled.p`
  margin-top: 0.25rem;
  line-height: 1.6;
  margin-bottom: 0.25rem;
`;

const JobRow = styled.div`
  margin-top: 2.5rem;

  &:first-child {
    margin-top: 0;
  }
`;

const ViewLink = styled.a`
  font-size: 1.4rem;
  width: 100%;
  color: ${({ theme }) => theme.colors.thatBlue};
  fill: ${({ theme }) => theme.colors.thatBlue};

  svg {
    vertical-align: middle;
    height: 2rem;
    margin-left: 1rem;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
    fill: ${({ theme }) => theme.colors.highlight};
  }
`;

const jobs = () => {
  const router = useRouter();
  const { loading, data } = useQuery(GET_ALL_PARTNER_JOBS, {
    variables: { partnerSlug: router.query.slug },
    onCompleted(d) {
      const [partner] = d.partners.partnerBySlug;
      let hostName = new URL(partner.website).hostname;
      if (hostName.toLowerCase().startsWith('www.')) {
        hostName = hostName.replace('www.', '');
      }
      partner.hostName = hostName;
      return partner;
    },
  });

  if (loading) return <LoadingIndicator />;

  const partner = data.partners.partnerBySlug[0];

  return (
    <>
      <NextSeo
        title={`${partner.companyName} Jobs - THAT Conference`}
        description={`Job openings for THAT partner ${partner.companyName}`}
      />

      <ContentSection>
        <Main>
          <SideDetail>
            <h1>{`${partner.companyName} Jobs`}</h1>
            <p className="medium-body-copy">{partner.aboutUs}</p>
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

      <ContentSection>
        <Jobs>
          {partner.jobListings.map(job => (
            <JobRow>
              <JobTitle>{job.title}</JobTitle>
              <Description>{job.description}</Description>
              <ViewLink href={`/partner/${partner.slug}/job/to-do-job-slug`}>
                <span>View Job</span>
                <Icon
                  icon="fullArrow"
                  height="20"
                  width="12"
                  viewBoxHeight="100"
                  viewBoxWidth="100"
                />
              </ViewLink>
            </JobRow>
          ))}
        </Jobs>
      </ContentSection>
    </>
  );
};

export default jobs;
