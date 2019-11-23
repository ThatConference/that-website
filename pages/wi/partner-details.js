import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import HeroSection from '../../components/PartnerDetail/HeroSection';
import MainLogoSection from '../../components/PartnerDetail/MainLogoSection';
import AboutGoalsSection from '../../components/PartnerDetail/AboutGoalsSection';
import PresentationsJobsSection from '../../components/PartnerDetail/PresentationsJobsSection';

const GET_PARTNER = gql`
  query getPartnerBySlug($slug: String!) {
    partnerBySlug(slug: $slug) {
      id
      slug
      year
      companyName
      companyLogo
      heroImage
      website
      goals
      aboutUs
      contactNumber
      linkedIn
      github
      youtube
      instagram
      twitter
      facebook
      twitch
      chat
      blog
      vlog
      jobListings {
        id
        title
        description
      }
    }
  }
`;

const MainDiv = styled.div`
  padding-bottom: 4rem;
`;

const partnerDetail = ({ query }) => {
  const { loading, error, data } = useQuery(GET_PARTNER, {
    variables: { slug: query.partner },
    onCompleted(d) {
      const [partner] = d.partnerBySlug;
      let hostName = new URL(partner.website).hostname;
      if (hostName.toLowerCase().startsWith('www.')) {
        hostName = hostName.replace('www.', '');
      }
      partner.hostName = hostName;
      return partner;
    },
  });

  if (loading) return null;
  if (error) return null;

  const partner = data.partnerBySlug[0];

  return (
    <MainDiv>
      <HeroSection
        companyName={partner.companyName}
        heroImageUrl={partner.heroImage}
        connectWithUsUrl={partner.website}
        location="wi"
      />

      <MainLogoSection partner={data.partnerBySlug[0]} />
      <AboutGoalsSection
        companyName={partner.companyName}
        about={partner.aboutUs}
        goals={partner.goals}
      />
      <PresentationsJobsSection
        companyName={partner.companyName}
        presentations={partner.presentations}
        jobs={partner.jobs}
      />
    </MainDiv>
  );
};

partnerDetail.getInitialProps = ({ query }) => {
  return { query };
};

export default partnerDetail;
