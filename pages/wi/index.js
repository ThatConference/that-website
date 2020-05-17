import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import { EventJsonLd } from 'next-seo';

import Hero from '../../components/EventHomePage/Hero';
import LearnMore from '../../components/EventHomePage/LearnMore';
// import SpeakerHighlight from '../../components/EventHomePage/SpeakerHighlight';
import TimelineSection from '../../components/shared/Timeline';
import SponsorHighlight from '../../components/EventHomePage/SponsorHighlight';
import Testimonials from '../../components/EventHomePage/Testimonials';
import WhatToExpect from '../../components/shared/WhatToExpect';
import NewsletterSignup from '../../components/EventHomePage/NewsletterSignup';

const GET_EVENT = gql`
  query getEvent($eventId: ID!) {
    events {
      event(id: $eventId) {
        get {
          id
          name
          slogan
          startDate
          endDate
          isVotingOpen
          isCallForSpeakersOpen
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
        }
      }
    }
  }
`;

const BottomImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 45rem;
`;

const home = () => {
  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { eventId: process.env.CURRENT_EVENT_ID },
  });

  if (loading) return null;

  if (error) {
    throw new Error(error);
  }

  const { event } = data.events;

  return (
    <>
      <Head>
        <title key="title">THAT Conference - Wisconsin Dells, WI</title>
      </Head>

      <EventJsonLd
        name="THAT Conference - Wisconsin Dells"
        startDate="2020-08-03T00:00:00.000Z"
        endDate="2020-08-06T00:00:00.000Z"
        location={{
          name: 'Kalahari, Wisconsin Dells, WI',
          sameAs: 'https://www.kalahariresorts.com/wisconsin',
          address: {
            streetAddress: '1305 Kalahari Drive',
            addressLocality: 'Wisconsin Dells',
            addressRegion: 'WI',
            postalCode: '53965',
            addressCountry: 'US',
          },
        }}
        url="https://www.thatconference.com/wi"
        images={[
          'https://www.thatconference.com/images/clark_stage.jpg',
          'https://www.thatconference.com/images/maker_space.jpg',
          'https://www.thatconference.com/images/keynote.jpg',
          'https://www.thatconference.com/images/partner_hero_default.jpg',
          'https://www.thatconference.com/images/battle-bots.jpg',
          'https://www.thatconference.com/images/mess-hall.jpg',
        ]}
        description="THAT Conference is the Summer Camp for Geeks that combines technology, networking, social events and exposure in an inspirational, family friendly environment at the The Kalahari Resort in Wisconsin Dells."
      />

      <Hero event={event} />
      <LearnMore />
      <WhatToExpect />
      {/* <SpeakerHighlight /> */}
      <TimelineSection event={event} />
      <SponsorHighlight eventSlug="/wi" />
      <Testimonials />
      <NewsletterSignup />
      <BottomImage
        src="./images/mess-hall.jpg"
        loading="lazy"
        alt="THAT Mess Hall"
      />

      <script
        src="https://thatconference.activehosted.com/f/embed.php?id=1"
        type="text/javascript"
        charSet="utf-8"
      />
    </>
  );
};

export default home;
