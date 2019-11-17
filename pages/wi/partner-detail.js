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
      partner.whoToSayHiTo = [
        {
          name: 'Clark Sell',
          title: 'Does the Things With a Longer Title',
          headshotUrl:
            'https://storage.googleapis.com/that-bucket/headshots/thatstaff/clark-sell.jpg',
        },
        {
          name: 'Carrie Sell',
          title: 'Does the Things',
          headshotUrl:
            'https://storage.googleapis.com/that-bucket/headshots/thatstaff/carrie-sell.jpg',
        },
        {
          name: 'Sara Gibbons',
          title: 'Does the Things',
          headshotUrl:
            'https://storage.googleapis.com/that-bucket/headshots/thatstaff/sara-gibbons.jpg',
        },
        {
          name: 'Brett Slaski',
          title: 'Does the Things',
          headshotUrl:
            'https://storage.googleapis.com/that-bucket/headshots/thatstaff/brett-slaski.jpg',
        },
        {
          name: 'Aaron Douglas',
          title: 'Does the Things',
          headshotUrl:
            'https://storage.googleapis.com/that-bucket/headshots/thatstaff/aaron-douglas.jpg',
        },
        {
          name: 'Mike Cook',
          title: 'Does the Things',
          headshotUrl:
            'https://storage.googleapis.com/that-bucket/headshots/thatstaff/mike-cook.jpg',
        },
      ];
      partner.aboutUs =
        'We help you connect your brand and audience through smarter strategy, better brands, awesome website design, and content focused marketing campaigns that build communities and grow your business.';
      partner.goals = [
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt uyam erat, sed diam voluptua. At vero eos ettempor ividsun leabr.',
        'Hlitr, sed diam nonumy eirmod tempor invidunt uyam erat, sed diam. ',
      ];
      partner.presentations = [
        {
          id: 'some-session-slug',
          speaker: [
            {
              slug: 'bailey-kanisch',
              name: 'Bailey Kanisch',
              headshotUrl:
                'https://storage.googleapis.com/that-bucket/headshots/thatstaff/clark-sell.jpg',
            },
          ],
          title: "Accessibility: A Walk in Someone Else's Shoes",
          description:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet',
        },
        {
          id: 'some-session-slug2',
          speaker: [
            {
              slug: 'martin-hooper',
              name: 'Martin Hooper',
              headshotUrl:
                'https://storage.googleapis.com/that-bucket/headshots/thatstaff/sara-gibbons.jpg',
            },
          ],
          title: "Accessibility: A Walk in Someone Else's Shoes Part Deux",
          description:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet',
        },
      ];
      partner.jobs = [
        {
          id: 'some-job-slug',
          title: 'User Experience Researcher',
          description:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt uyam erat, sed diam voluptua. At vero eos ettempor ividsun leabr.',
        },
        {
          id: 'some-job-slug2',
          title: 'Infrastructure Program Management Lead',
          description:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt uyam erat, sed diam voluptua. At vero eos ettempor ividsun leabr.',
        },
      ];
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
