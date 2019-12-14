import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Hero from '../../components/HomePage/Hero';
import LearnMore from '../../components/HomePage/LearnMore';
import MeetCampers from '../../components/HomePage/MeetCampers';
import SpeakerHighlight from '../../components/HomePage/SpeakerHighlight';
import TimelineSection from '../../components/HomePage/Timeline';
import SponsorHighlight from '../../components/HomePage/SponsorHighlight';
import Testimonials from '../../components/HomePage/Testimonials';
import WhatToExpect from '../../components/shared/WhatToExpect';
import NewsletterSignup from '../../components/HomePage/NewsletterSignup';

const GET_EVENT = gql`
  query getEvent($eventId: ID!) {
    event(id: $eventId) {
      id
      name
      slogan
      startDate
      endDate
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
`;

const BottomImage = styled.img`
  object-fit: cover;
  width: 100vw;
  height: 45rem;
`;

const home = () => {
  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { eventId: 'ByE7Dc7eCGcRFzLhWhuI' },
    onCompleted(d) {
      return d;
    },
  });

  if (loading) return null;
  if (error) return null;

  const { event } = data;

  return (
    <>
      <Head>
        <title key="title">THAT Conference - Wisconsin Dells, WI</title>
      </Head>
      <Hero event={event} />
      <LearnMore />
      <WhatToExpect />
      <SpeakerHighlight />
      <TimelineSection event={event} />
      <SponsorHighlight eventSlug="/wi" />
      <Testimonials />
      <NewsletterSignup />
      <MeetCampers />
      <BottomImage src="./images/mess-hall.jpg" />
      <script
        src="https://thatconference.activehosted.com/f/embed.php?id=1"
        type="text/javascript"
        charset="utf-8"
      />
    </>
  );
};

export default home;
