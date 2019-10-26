import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Grid, Cell } from 'styled-css-grid';
import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton';
import SocialLinks from '../shared/SocialLinks';

import { below } from '../../utilities';

const DateLocation = styled.h2``;
const Slogan = styled.h1``;
const Description = styled.p`
  width: 50%;
  margin: auto;
  text-align: center;
`;

const ActionButtons = styled.div`
  display: flex;
`;

const HeroImage = styled.img`
  width: 100%;
`;

const HeroSocials = styled(SocialLinks)`
  position: absolute;
  right: 1rem;
  top: 25rem;
`;

const GET_EVENTS = gql`
  query getEvents {
    events {
      id
      name
      venue {
        city
        state
      }
    }
  }
`;

const Hero = ({ className }) => {
  const { loading, error, data } = useQuery(GET_EVENTS);

  if (loading) return null;
  if (error) return null;

  console.log(data);

  return (
    <div className={className}>
      <Grid columns={12}>
        <Cell width={6}>
          <DateLocation>
            August 5 - 8, 2020 - Kalahari Resort, Wisconsin Dells, WI
          </DateLocation>
          <Slogan>Summer Camp For Geeks</Slogan>
          <ActionButtons>
            <LinkButton href="/" label="Ticket Options" color="primary" />
            <LinkButton href="/" label="Sponsor Us" color="primary" />
          </ActionButtons>
        </Cell>
        <Cell width={6}>
          <HeroImage src="images/clark-stage.jpg" />
        </Cell>
      </Grid>
      <HeroSocials flexDirection="column" />
      <Description>
        Over four days, folks of diverse technology backgrounds and expertise
        levels gather to take advantage of multiple learning mediums to maximize
        one’s community and career advancements.
      </Description>
    </div>
  );
};

export default styled(Hero)`
  width: 80vw;
  max-width: 100rem;
  margin: auto;
`;
