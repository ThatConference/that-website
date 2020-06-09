/**
 * TX 2021 Landing page
 */

import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import RootLayout from '../../../components/layouts/Root';
import ContentSection from '../../../components/shared/ContentSection';
import EventSeo from '../../../components/shared/EventSeo';

import About from '../../../components/OneDay/About';
import Countdown from '../../../components/OneDay/Countdown';
import Hero from '../../../components/OneDay/Hero';
import OpenSpaces from '../../../components/OneDay/OpenSpaces';
import Partners from '../../../components/OneDay/Partners';
import SessionHighlight from '../../../components/OneDay/SessionHighlight';
import Tickets from '../../../components/OneDay/Tickets';
import TicketUpgrades from '../../../components/OneDay/TicketUpgrades';
import Upcoming from '../../../components/OneDay/Upcoming';

import PageFooter from '../../../components/RootHomePage/PageFooter';
import StayInTouch from '../../../components/RootHomePage/StayInTouch';

const GET_EVENT = gql`
  query getEvent($slug: String!) {
    events {
      eventBySlug(slug: $slug) {
        id
        name
        slogan
        slug
        description
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
        partners {
          id
          slug
          level
          placement
          companyName
          companyLogo
        }
        theme {
          primary
          secondary
          heroSlug
        }
      }
    }
  }
`;

const Index = ({ incomingSlug }) => {
  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { slug: incomingSlug.substring(1) },
  });

  if (loading) return null;

  if (error) {
    throw new Error(error);
  }

  const { eventBySlug: event } = data.events;

  console.log(event);

  return (
    <div>
      <EventSeo event={event} />
      <Hero event={event} />
      <Countdown event={event} />
      <About />
      <SessionHighlight title="Opening Keynote" />
      <OpenSpaces />
      <SessionHighlight title="Closing Ceremonies" />
      <Tickets />
      <TicketUpgrades />
      <ContentSection
        backgroundColor="thatBlue"
        backgroundOpacity={0.82}
        backgroundImage="/images/group.jpg"
      />
      <Partners event={event} />
      <Upcoming />
      <StayInTouch />
      <PageFooter />
    </div>
  );
};

Index.Layout = RootLayout;

Index.getInitialProps = async context => {
  return { incomingSlug: context.pathname };
};

export default Index;
