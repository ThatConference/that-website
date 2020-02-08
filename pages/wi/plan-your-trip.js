import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import { NextSeo } from 'next-seo';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import moment from 'moment';
import { below, gridRepeat } from '../../utilities';

import ContentSection from '../../components/shared/ContentSection';
import ImageContainer from '../../components/shared/ImageContainer';
import LinkButton from '../../components/shared/LinkButton';
import TimelineSection from '../../components/HomePage/Timeline';

const GET_EVENT = gql`
  query getEvent($eventId: ID!) {
    events {
      event(id: $eventId) {
        get {
          id
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
    }
  }
`;

const StyledImageContainer = styled(ImageContainer)`
  padding: 2.5rem;
  margin: 2rem;
`;

const Title = styled.h4`
  margin-top: 0;
  margin-bottom: 0.4rem;
`;

const ImageCell = styled(Cell)`
  ${below.med`
    text-align: center;
  `};
`;

const HighlightImage = styled.img`
  max-height: 40rem;
  transform: scaleX(-1);
  position: absolute;
  top: 0;
  margin-left: 6rem;

  ${below.small`
    margin-left: 0;
    width: 90%;
  `};

  ${below.med`
    position: relative;
    margin-top: 2rem;
  `};
`;

const contact = () => {
  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { eventId: process.env.CURRENT_EVENT_ID },
    onCompleted(d) {
      return d;
    },
  });

  if (loading) return null;
  if (error) return null;

  const { event } = data.events;

  const formattedStartDate = moment(event.get.startDate).format(
    'dddd, MMMM D, YYYY',
  );
  const formattedEndDate = moment(event.get.endDate).format(
    'dddd, MMMM D, YYYY',
  );

  return (
    <>
      <NextSeo
        title="Plan Your Trip - THAT Conference"
        description="THAT Community spreads way beyond the midwest and we want to make
              it easy for you to book and plan your travel to Summer Camp. Here
              is the one stop show of dates, places and related travel goodness
              to help get you to camp!"
      />

      <ContentSection>
        <Grid columns={gridRepeat.xsmall}>
          <Cell width={1}>
            <h1>Plan Your Trip</h1>
            <p className="medium-body-copy">
              THAT Community spreads way beyond the midwest and we want to make
              it easy for you to book and plan your travel to Summer Camp. Here
              is the one stop show of dates, places and related travel goodness
              to help get you to camp!
            </p>
          </Cell>
          <ImageCell>
            <HighlightImage src="/images/sasquatch_kayaking.png" />
          </ImageCell>
        </Grid>
      </ContentSection>

      <ContentSection>
        <Grid columns={gridRepeat.xsmall} alignContent="center">
          <StyledImageContainer>
            <Title>When</Title>
            <p style={{ flexGrow: '2' }}>
              {formattedStartDate} -
              <br />
              {formattedEndDate}
            </p>
            <LinkButton
              href="/wi/tickets"
              label="Ticket Options"
              borderColor="thatBlue"
              color="thatBlue"
              hoverBorderColor="thatBlue"
              hoverColor="white"
              hoverBackgroundColor="thatBlue"
            />
          </StyledImageContainer>
          <StyledImageContainer>
            <Title>Where</Title>
            <p style={{ flexGrow: '2' }}>
              <strong>{event.get.venues[0].name}</strong>
              <br />
              {event.get.venues[0].address}
              <br />
              {`${event.get.venues[0].city}, ${event.get.venues[0].state} ${event.get.venues[0].zip}`}
            </p>
            <LinkButton
              href="https://goo.gl/maps/KxxuwX2P93VvwHvc7"
              label="X Marks The Spot"
              target="_blank"
              borderColor="thatBlue"
              color="thatBlue"
              hoverBorderColor="thatBlue"
              hoverColor="white"
              hoverBackgroundColor="thatBlue"
            />
          </StyledImageContainer>
          <StyledImageContainer>
            <Title>Other Accommodations</Title>
            <p>
              Besides the Kalahari we partner with other great locations to
              bring you the best rates to stay while at THAT. Checkout all the
              options.
            </p>
            <LinkButton
              href="#where-to-stay"
              label="Where To Stay"
              borderColor="thatBlue"
              color="thatBlue"
              hoverBorderColor="thatBlue"
              hoverColor="white"
              hoverBackgroundColor="thatBlue"
            />
          </StyledImageContainer>
        </Grid>
      </ContentSection>
      <ContentSection>
        <h3 className="font-dark" style={{ marginTop: '0' }}>
          Getting To Camp
        </h3>
        Planes, Trains and Automobiles. If you’re flying, we always suggest
        first class. There are three different airports you can choose from:
        <ul>
          <li>
            Chicago O&apos;Hare (ORD), ORD is the farthest at 2:45 hrs away from
            the Kalahari but it’s all highway.
          </li>
          <li>Milwaukee Mitchell (MKE), 1:51 away</li>
          <li>
            Madison Dane County Regional (MSN), closest airport at 50 minutes
            away.
          </li>
        </ul>
        Should I fly to MKE and take a puddle-jumper over to MSN? We don&apos;t
        recommend it, as it might take you longer to deal with the layover
        rather than jumping in a car and driving up to the Kalahari. Is there a
        shuttle from the airports? Unfortunately no but I would suggest jumping
        on Slack and see if anyone is interested in ride sharing.
      </ContentSection>
      <TimelineSection event={event} />
      <ContentSection id="where-to-stay">
        <h3 className="font-dark" style={{ marginTop: '0' }}>
          Pitching Tents
        </h3>
        <p>
          Along with the Kalahari we partner with many nearby locations to offer
          everyone rates and accommodations that best suite their travel and
          stay while at THAT. Kalahari room blocks will open in April when
          ticket sales open. Join our newsletter and follow us on socials to get
          all the accommodations information as we announce it.
        </p>
      </ContentSection>
    </>
  );
};

export default contact;
