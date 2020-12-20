import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Head from 'next/head';
import React from 'react';
import { Background } from 'react-imgix';
import styled from 'styled-components';

import Hero from '../../../components/EventHomePage/Hero';
import LearnMore from '../../../components/EventHomePage/LearnMore';
// import SpeakerHighlight from '../../components/EventHomePage/SpeakerHighlight';
import EventSeo from '../../../components/shared/EventSeo';
import TimelineSection from '../../../components/shared/Timeline';
import SponsorHighlight from '../../../components/EventHomePage/SponsorHighlight';
import Testimonials from '../../../components/EventHomePage/Testimonials';
import WhatToExpect from '../../../components/shared/WhatToExpect/WhatToExpect';
import NewsletterSignup from '../../../components/EventHomePage/NewsletterSignup';

const GET_EVENT = gql`
  query getEvent($slug: String!) {
    events {
      event(findBy: { slug: $slug }) {
        get {
          id
          name
          slogan
          slug
          description
          startDate
          endDate
          isVotingOpen
          isCallForSpeakersOpen
          theme {
            primary
            secondary
            heroSlug
          }
          venues {
            id
            name
            address
            city
            state
            zip
          }
          milestones {
            title
            description
            dueDate
          }
          notifications {
            id
            shouldFeature
            title
            message
            startDate
            endDate
            link
            linkText
          }
          partners {
            id
            slug
            level
            placement
            companyName
            companyLogo
          }
        }
      }
    }
  }
`;

const BottomImage = styled.div`
  width: 100%;
  height: 45rem;

  .bottom-image {
    width: 100%;
    height: 100%;
  }
`;

const home = () => {
  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { slug: 'wi/2021' },
  });

  if (loading) return null;

  if (error) {
    throw new Error(error);
  }

  const event = data.events.event.get;

  return (
    <>
      <Head>
        <title key="title">THAT Conference - Wisconsin Dells, WI</title>
      </Head>

      <EventSeo event={event} />
      <Hero event={event} />
      <LearnMore />
      <WhatToExpect />
      {/* <SpeakerHighlight /> */}
      <TimelineSection event={event} />
      <SponsorHighlight eventSlug={event.slug} />
      <Testimonials />
      <NewsletterSignup />

      <BottomImage>
        <Background
          src="https://images.that.tech/site/mess-hall.jpg"
          className="bottom-image"
        />
      </BottomImage>

      <script
        src="https://thatconference.activehosted.com/f/embed.php?id=1"
        type="text/javascript"
        charSet="utf-8"
      />
    </>
  );
};

export default home;
