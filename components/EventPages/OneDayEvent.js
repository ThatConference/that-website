import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import ContentSection from '../shared/ContentSection';
import EventSeo from '../shared/EventSeo';

import About from '../OneDay/About';
import Countdown from '../OneDay/Countdown';
import Hero from '../OneDay/Hero';
import OpenSpaces from '../OneDay/OpenSpaces';
import Partners from '../OneDay/Partners';
import SessionHighlight from '../OneDay/SessionHighlight';
import Tickets from '../OneDay/Tickets';
import TicketUpgrades from '../OneDay/TicketUpgrades';
import Upcoming from '../OneDay/Upcoming';

import PageFooter from '../RootHomePage/PageFooter';
import StayInTouch from '../RootHomePage/StayInTouch';

const GET_EVENT = gql`
  query getEvent($slug: String!) {
    events {
      eventBySlug(slug: $slug) {
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
`;

const OneDayEvent = ({ eventSlug, tickets }) => {
  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { slug: eventSlug },
  });

  if (loading) return null;

  if (error) {
    throw new Error(error);
  }

  const { eventBySlug: event } = data.events;

  return (
    <div>
      <EventSeo event={event} />
      <Hero event={event} />
      <Countdown event={event} />
      <About />
      <SessionHighlight title="Opening Keynote" />
      <OpenSpaces />
      <SessionHighlight title="Closing Ceremonies" />
      <Tickets tickets={tickets} />
      <TicketUpgrades />
      <ContentSection
        backgroundColor="thatBlue"
        backgroundOpacity={0.82}
        backgroundImage="/images/group.jpg"
      />
      <Partners partners={event.partners} />
      <Upcoming />
      <StayInTouch />
      <PageFooter />
    </div>
  );
};

OneDayEvent.propTypes = {
  eventSlug: PropTypes.string.isRequired,
  tickets: PropTypes.shape([]),
};

OneDayEvent.defaultProps = {
  tickets: [],
};

export default styled(OneDayEvent)``;
