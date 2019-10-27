import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Grid, Cell } from 'styled-css-grid';
import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton';
import SocialLinks from '../shared/SocialLinks';

import { below } from '../../utilities';

const DateLocation = styled.h2`
  color: ${({ theme }) => theme.colors.tertiary};
  font-size: 1.8rem;
  font-family: franklin-gothic-urw, sans-serif;
  font-weight: 400;
  text-transform: none;
  margin: 0;
`;

const Slogan = styled.h1`
  margin: 0 0 2rem 0;
`;

const Description = styled.p`
  width: 90%;
  margin: auto;
  text-align: center;
  padding: 3rem 0;
  max-width: 110rem;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Button = styled(LinkButton)`
  margin: 0 2rem 0 0;
`;

const HeroImage = styled.img`
  width: 90%;
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
      startDate
      endDate
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
            <Button
              href="/"
              label="Ticket Options"
              color="thatBlue"
              borderColor="thatBlue"
            />
            <Button
              href="/"
              label="Sponsor Us"
              color="thatBlue"
              borderColor="thatBlue"
            />
          </ActionButtons>
        </Cell>
        <Cell width={6}>
          <HeroImage src="images/clark_stage.jpg" />
        </Cell>
      </Grid>
      <HeroSocials flexDirection="column" />
      <Description className="large-body-copy">
        Over four days, folks of diverse technology backgrounds and expertise
        levels gather to take advantage of multiple learning mediums to maximize
        one’s community and career advancements.
      </Description>
    </div>
  );
};

export default styled(Hero)`
  max-width: 130rem;
  margin: 3rem auto;
  padding: 0 2rem;
`;
