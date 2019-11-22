import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import HeroSection from '../../components/PartnerDetail/HeroSection';
import MainLogoSection from '../../components/PartnerDetail/MainLogoSection';
import AboutGoalsSection from '../../components/PartnerDetail/AboutGoalsSection';
import PresentationsJobsSection from '../../components/PartnerDetail/PresentationsJobsSection';

const GET_PARTNER = gql`
  query getPartner($partnerId: ID!) {
    partner(id: $partnerId) {
      id
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
  let partner = null;
  const { loading, error, data } = useQuery(GET_PARTNER, {
    variables: { partnerId: query.id },
    onCompleted(d) {
      partner = d.partner;
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

  return (
    <MainDiv>
      <HeroSection
        companyName={data.partner.companyName}
        heroImageUrl={data.partner.heroImage}
        connectWithUsUrl={data.partner.website}
        location="wi"
      />

      <MainLogoSection partner={data.partner} />
      <AboutGoalsSection
        companyName={data.partner.companyName}
        about={data.partner.aboutUs}
        goals={data.partner.goals}
      />
      <PresentationsJobsSection
        companyName={data.partner.companyName}
        presentations={data.partner.presentations}
        jobs={data.partner.jobs}
      />
    </MainDiv>
  );
};

partnerDetail.getInitialProps = ({ query }) => {
  return { query };
};

export default partnerDetail;
