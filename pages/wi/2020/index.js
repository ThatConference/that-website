import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';

import Hero from '../../../components/EventHomePage/Hero';
import LearnMore from '../../../components/EventHomePage/LearnMore';
// import SpeakerHighlight from '../../components/EventHomePage/SpeakerHighlight';
import EventSeo from '../../../components/shared/EventSeo';
import TimelineSection from '../../../components/shared/Timeline';
import SponsorHighlight from '../../../components/EventHomePage/SponsorHighlight';
import Testimonials from '../../../components/EventHomePage/Testimonials';
import WhatToExpect from '../../../components/shared/WhatToExpect';
import NewsletterSignup from '../../../components/EventHomePage/NewsletterSignup';

const GET_EVENT = gql`
  query getEvent($eventId: ID!) {
    events {
      event(id: $eventId) {
        get {
          id
          name
          slogan
          slug
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

      <EventSeo event={event} />
      <Hero event={event} />
      <LearnMore />
      <WhatToExpect />
      {/* <SpeakerHighlight /> */}
      <TimelineSection event={event} />
      <SponsorHighlight eventSlug="/wi" />
      <Testimonials />
      <NewsletterSignup />
      <BottomImage
        src="/images/mess-hall.jpg"
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
