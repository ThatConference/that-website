import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { NextSeo } from 'next-seo';
import _ from 'lodash';
import LinkButton from '../../../components/shared/LinkButton';
import ContentSection from '../../../components/shared/ContentSection';
import LoadingIndicator from '../../../components/shared/LoadingIndicator';
import PartnerLogoWithInfo from '../../../components/shared/PartnerLogoWithInfo';
import JobListing from '../../../components/shared/JobListing';
import {
  ActionButtonRow,
  HeroGraphicDiv,
  HeroGraphicImg,
} from '../../../components/shared/StandardStyles';
import { below, above } from '../../../utilities';

const GET_EVENT_PARTNER_JOBS = gql`
  query getPartners($eventId: ID!) {
    events {
      event(id: $eventId) {
        get {
          id
          name
          slug
          year
          partners {
            id
            slug
            level
            placement
            companyName
            companyLogo
            heroImage
            website
            facebook
            instagram
            twitter
            youtube
            linkedIn
            github
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
  margin: auto;
  align-content: flex-start;
  flex-grow: 2;
  margin-left: 3rem;

  ${below.large`
    // max-width: unset;
    margin-left: 0;
    // min-width: 100%;
  `}
`;

const PartnerSection = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 4rem;

  &:not(:first-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.mediumGray};
  }

  ${below.large`
    flex-direction: column;
  `}
`;

const StyledPartnerLogoWithInfo = styled(PartnerLogoWithInfo)`
  max-width: 27rem;
  flex-grow: 1;

  ${below.large`
    max-width: unset;
    padding-bottom: 3rem;
  `}
`;

const jobs = () => {
  const { loading, error, data } = useQuery(GET_EVENT_PARTNER_JOBS, {
    variables: {
      eventId: process.env.CURRENT_EVENT_ID,
    },
  });

  if (loading) return <LoadingIndicator />;
  if (error) throw new Error(error);

  const { partners } = data.events.event.get;
  const filteredPartners = partners.filter(p => p.jobListings.length);

  return (
    <>
      <NextSeo
        title="WI 2020 Jobs - THAT Conference"
        description="Job openings for all WI 2020 THAT partners"
      />

      <ContentSection>
        <Main>
          <SideDetail>
            <h1>THAT WI 2020 - Partner Jobs</h1>
            <p className="medium-body-copy">
              Full list of all the open opportunities at the amazing
              organizations partnering with us to make THAT Wisconsin 2020
              happen.
            </p>
            <ActionButtonRow>
              <LinkButton
                href={`/${data.events.event.get.slug}/become-a-partner`}
                label="Become a Partner"
                color="thatBlue"
                borderColor="thatBlue"
                hoverBorderColor="thatBlue"
                hoverColor="white"
                hoverBackgroundColor="thatBlue"
              />
              <LinkButton
                href={`/${data.events.event.get.slug}/partners`}
                label="View All THAT WI 2020 Partners"
                color="thatBlue"
                borderColor="thatBlue"
                hoverBorderColor="thatBlue"
                hoverColor="white"
                hoverBackgroundColor="thatBlue"
              />
            </ActionButtonRow>
          </SideDetail>
          <HeroGraphicDiv>
            <HeroGraphicImg src="/images/bear_with_drone.png" loading="lazy" />
          </HeroGraphicDiv>
        </Main>
      </ContentSection>

      <ContentSection>
        {filteredPartners.map(partner => (
          <PartnerSection>
            <StyledPartnerLogoWithInfo partner={partner} alignment="center" />
            <Jobs>
              {_.sortBy(partner.jobListings, j => j.title.toLowerCase()).map(
                job => (
                  <JobListing job={job} partner={partner} />
                ),
              )}
            </Jobs>
          </PartnerSection>
        ))}
      </ContentSection>
    </>
  );
};

export default jobs;
