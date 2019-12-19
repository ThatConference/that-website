import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import withApolloClient from '../../../lib/withApolloClient';
import HeroSection from '../../../components/PartnerDetail/HeroSection';
import MainLogoSection from '../../../components/PartnerDetail/MainLogoSection';
import AboutGoalsSection from '../../../components/PartnerDetail/AboutGoalsSection';
import PresentationsJobsSection from '../../../components/PartnerDetail/PresentationsJobsSection';

const GET_PARTNER = gql`
  query getPartnerBySlug($slug: String!) {
    partners {
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
  }
`;

const MainDiv = styled.div`
  padding-bottom: 4rem;
`;

function PartnerDetail({ apolloClient }) {
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_PARTNER, {
    client: apolloClient,
    variables: { slug: router.query.slug },
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

  if (loading) return null;
  if (error) return null;

  const partner = data.partners.partnerBySlug[0];

  return (
    <MainDiv>
      <HeroSection
        companyName={partner.companyName}
        heroImageUrl={partner.heroImage}
        connectWithUsUrl={partner.website}
        location="wi"
      />

      <MainLogoSection partner={data.partners.partnerBySlug[0]} />
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
}

export default withApolloClient(PartnerDetail);
