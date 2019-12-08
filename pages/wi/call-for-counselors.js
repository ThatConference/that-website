import React from 'react';
import Head from 'next/head';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Header from '../../components/CallForCounselors/Header';
import SummerCamp from '../../components/CallForCounselors/SummerCamp';
import TalkIdeas from '../../components/CallForCounselors/TalkIdeas';
import Process from '../../components/CallForCounselors/Process';
import Perks from '../../components/CallForCounselors/Perks';

const GET_EVENT = gql`
  query getEvent($eventId: ID!) {
    event(id: $eventId) {
      milestones {
        title
        description
        dueDate
      }
    }
  }
`;

const CallForSpeakers = () => {
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
