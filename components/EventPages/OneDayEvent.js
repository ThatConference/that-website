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
// import SessionHighlight from '../shared/SessionHighlight';
import Tickets from '../OneDay/Tickets';
import TicketUpgrades from '../OneDay/TicketUpgrades';
import Upcoming from '../OneDay/Upcoming';

import PageFooter from '../RootHomePage/PageFooter';
import StayInTouch from '../RootHomePage/StayInTouch';

import { SlimCenteredH2 } from '../shared/StandardStyles';

const GET_EVENT = gql`
  query getEvent($slug: String!) {
    events {
      eventBySlug(slug: $slug) {
        id
        name
        slogan
        description
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
        theme {
          primary
          secondary
          heroSlug
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

const StyledH3 = styled.h3`
  color: ${({ theme }) => theme.colors.fonts.light};
  margin: 3rem 0;
`;

const StyledImage = styled.img`
  max-height: 25rem;
  margin: auto;
  max-width: 70%;
`;

const announcingSoonPlaceholder = ({ title, image }) => {
  return (
    <ContentSection
      backgroundColor="thatBlue"
      backgroundOpacity={0.82}
      backgroundImage="/images/group.jpg"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <SlimCenteredH2 className="font-light" style={{ marginBottom: '1rem' }}>
          {title}
        </SlimCenteredH2>
        <StyledH3>Announcing Soon!</StyledH3>
        <StyledImage src={image} alt="Announcing Soon!" />
      </div>
    </ContentSection>
  );
};

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
      {/* <SessionHighlight title="Opening Keynote" subtitle="Announcing Soon" /> */}
      {announcingSoonPlaceholder({
        title: 'Opening Keynote',
        image: '/images/moose_with_lantern.png',
      })}
      <OpenSpaces />
      {/* <SessionHighlight title="Closing Ceremonies" subtitle="Announcing Soon" /> */}
      {announcingSoonPlaceholder({
        title: 'Closing Ceremonies',
        image: '/images/sasquatch_close_up.png',
      })}
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
      <script
        src="https://thatconference.activehosted.com/f/embed.php?id=1"
        type="text/javascript"
        charSet="utf-8"
      />
    </div>
  );
};

OneDayEvent.propTypes = {
  eventSlug: PropTypes.string.isRequired,
  tickets: PropTypes.oneOfType([PropTypes.array]),
};

OneDayEvent.defaultProps = {
  tickets: [],
};

export default styled(OneDayEvent)``;
