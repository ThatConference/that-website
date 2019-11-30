import React from 'react';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton';
import SocialLinks from '../shared/SocialLinks';

import { below, DEFAULT_WIP_PAGE } from '../../utilities';

const DateLocation = styled.h2`
  color: ${({ theme }) => theme.colors.tertiary};
  font-size: 2.4rem;
  font-family: franklin-gothic-urw, sans-serif;
  font-weight: 400;
  text-transform: none;
  margin: 0;
`;

const Slogan = styled.h1`
  margin: 1.8rem 0 3rem 0;
  max-width: 60rem;
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

  ${below.large`
    padding-bottom: 3rem;
  `};

  ${below.small`
    flex-direction: column;
  `};
`;

const Button = styled(LinkButton)`
  margin: 0 2rem 0 0;

  ${below.med`
    margin-top: 2rem;
  `};
`;

const HeroImage = styled.img`
  width: 90%;
  max-width: 58rem;
  object-fit: cover;
`;

const HeroSocials = styled(SocialLinks)`
  position: absolute;
  right: 1rem;
  top: 9rem;
  flex-direction: column;
  a {
    margin: 0.3rem 0;
  }

  ${below.large`
    position: static;
    flex-direction: row;
    padding-top: 3rem;
    a { margin: 0 0.3rem; }
  `};
`;

const Main = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;

  ${below.large`
    flex-direction: column;
  `};
`;

const SideDetail = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 4rem;
`;

const Hero = ({ event, className }) => {
  return (
    <ContentSection className={className}>
      <Main>
        <SideDetail>
          <DateLocation>
            August 3 - 6, 2020 - Kalahari Resort, Wisconsin Dells, WI
          </DateLocation>
          <Slogan>{event.slogan}</Slogan>
          <ActionButtons>
            <Button
              href={DEFAULT_WIP_PAGE}
              label="Ticket Options"
              color="thatBlue"
              borderColor="thatBlue"
              className="stretch-sm"
            />
            <Button
              href="wi/become-a-partner"
              label="Sponsor Us"
              color="thatBlue"
              borderColor="thatBlue"
              className="stretch-sm"
            />
          </ActionButtons>
        </SideDetail>
        <HeroImage src="images/clark_stage.jpg" />
        <HeroSocials />
      </Main>
      <Description className="large-body-copy">
        Over four days, folks of diverse technology backgrounds and expertise
        levels gather to take advantage of multiple learning mediums to maximize
        one’s community and career advancements.
      </Description>
    </ContentSection>
  );
};

export default styled(Hero)`
  margin: auto;
  padding: 0 2rem;
`;
