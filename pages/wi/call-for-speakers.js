import React from 'react';
import Head from 'next/head';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Header from '../../components/CallForSpeakers/Header';
import SummerCamp from '../../components/CallForSpeakers/SummerCamp';
import TalkIdeas from '../../components/CallForSpeakers/TalkIdeas';
import Process from '../../components/CallForSpeakers/Process';
import Perks from '../../components/CallForSpeakers/Perks';

const GET_EVENT = gql`
  query getEvent($eventId: ID!) {
    event(id: $eventId) {
      id
      name
      slogan
      startDate
      endDate
      venue {
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
    }
  }
`;

const CallForSpeakers = props => {
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
    <div>
      <Head>
        <title key="title">Call for Speakers - THAT Conference</title>
      </Head>
      <Header />
      <SummerCamp />
      <TalkIdeas />
      <Process milestones={event.milestones} />
      <Perks />
    </div>
  );
};

export default CallForSpeakers;
