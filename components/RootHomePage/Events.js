import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Grid, Cell } from 'styled-css-grid';
import _ from 'lodash';
import { gridRepeat } from '../../utilities';

const GET_EVENTS = gql`
  query activeEvents {
    communities(name: "that") {
      active {
        id
        name
        slug
        slogan
        description
        startDate
        endDate
        website
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
`;

const Container = styled.div`
  position: relative;
  padding: 5rem 10rem;
`;

const Event = styled.div`
  height: 750px;
  width: 500px;
  background-color: ${props => props.primaryColor};

  h1 {
    text-align: center;
    font-size: 5rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    color: ${({ theme }) => theme.colors.fonts.light};
  }

  img {
    object-fit: cover;
    height: 33.3rem;
  }

  div.description {
    padding: 1rem;
    text-align: center;

    p {
      color: ${({ theme }) => theme.colors.fonts.light};
    }
  }

  div.message {
    padding: 1rem;
    text-align: center;
    background-color: ${props => props.secondaryColor};
    bottom: 8rem;
    position: absolute;
    width: inherit;

    h5 {
      margin: 0;
      color: ${({ theme }) => theme.colors.fonts.light};
    }
  }
`;

const BuildEvent = e => {
  return (
    <Cell>
      <Event primaryColor={e.primary} secondaryColor={e.secondary}>
        <h1>{e.name}</h1>
        <img src={e.heroSlug} alt={e.name} />
        <div className="description">
          <p>{e.description}</p>
        </div>
        <div className="message">
          <h5>Foo</h5>
          <h5>Bar</h5>
        </div>
      </Event>
    </Cell>
  );
};

const Events = ({ className }) => {
  const { loading, error, data } = useQuery(GET_EVENTS);

  if (loading) return null;

  if (error) {
    throw new Error(error);
  }

  let events = _.sortBy(data.communities.active, e => {
    return e.startDate;
  });

  // This will go away once the theme fields are added to the Graph result
  events = _.map(events, e => {
    e.heroSlug = './images/landing_hero.jpg';
    e.primary = '#1A5276';
    e.secondary = '#5499C7';
    return e;
  });

  return (
    <Container className={className}>
      <Grid columns={gridRepeat.xsmall} alignContent="center">
        {events.map(e => {
          return BuildEvent(e);
        })}
      </Grid>
    </Container>
  );
};

export default styled(Events)``;
