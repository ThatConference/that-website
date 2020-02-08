import React from 'react';
import { NextSeo } from 'next-seo';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Header from '../../components/CallForCounselors/Header';
import SummerCamp from '../../components/CallForCounselors/SummerCamp';
// import TalkIdeas from '../../components/CallForCounselors/TalkIdeas';
import Process from '../../components/CallForCounselors/Process';
import Perks from '../../components/CallForCounselors/Perks';

const GET_EVENT = gql`
  query getEvent($eventId: ID!) {
    events {
      event(id: $eventId) {
        get {
          id
          milestones {
            title
            description
            dueDate
          }
        }
      }
    }
  }
`;

const CallForCounselors = ({ featureKeyword }) => {
  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { eventId: process.env.CURRENT_EVENT_ID },
    onCompleted(d) {
      return d;
    },
  });

  if (loading) return null;
  if (error) return null;

  const { event } = data.events;
  return (
    <div>
      <NextSeo
        title="Call for Counselors - THAT Conference"
        description="THAT Community spreads way beyond the midwest and we want to make
              it easy for you to book and plan your travel to Summer Camp. Here
              is the one stop show of dates, places and related travel goodness
              to help get you to camp!"
      />
      <Header featureKeyword={featureKeyword} />
      <SummerCamp />
      {/* TO DO: commenting out until we have past sessions in place */}
      {/* <TalkIdeas /> */}
      <Process
        featureKeyword={featureKeyword}
        milestones={event.get.milestones}
      />
      <Perks />
    </div>
  );
};

export default CallForCounselors;
