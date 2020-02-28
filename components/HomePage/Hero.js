import React from 'react';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';
import LinkButton from '../shared/LinkButton';
import SocialLinks from '../shared/SocialLinks';
import { ActionButtonRow } from '../shared/StandardStyles';

import { below, above } from '../../utilities';

const twoColBp = 'larger';

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

  ${above[twoColBp]`
    max-width: 60rem;
  `};

  ${below[twoColBp]`
    text-align: center;
  `};
`;

const Description = styled.p`
  width: 90%;
  margin: auto;
  text-align: center;
  padding: 3rem 0 6rem;
  max-width: 110rem;
`;

const HeroImage = styled.img`
  max-width: 100%;
  object-fit: cover;

  ${above.small`
    max-width: 58rem;
  `};

  ${below[twoColBp]`
    margin-left: auto;
    margin-right: auto;
  `};

  ${above[twoColBp]`
    width: 90%;
  `};
`;

const HeroSocials = styled(SocialLinks)`
  position: absolute;
  right: 1rem;
  top: 3rem;
  flex-direction: column;
  a {
    margin: 0.3rem 0;
  }

  ${below[twoColBp]`
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
  justify-content: center;

  ${below[twoColBp]`
    flex-direction: column;
  `};
`;

const SideDetail = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;

  ${above[twoColBp]`
    margin-right: 4rem;
  `};

  ${below[twoColBp]`
    align-items: center;
  `};
`;

const ThirdButton = ({ event }) => {
  let href = null;
  let label = null;
  if (event.get.isCallForSpeakersOpen) {
    href = 'wi/call-for-counselors';
    label = 'Become A Counselor';
  }
  if (event.get.isVotingOpen) {
    href = 'wi/session/voting/start';
    label = 'Vote for Sessions';
  }
  if (href && label) {
    return (
      <LinkButton
        href={href}
        label={label}
        color="thatBlue"
        borderColor="thatBlue"
        className="stretch-sm"
        hoverBorderColor="thatBlue"
        hoverColor="white"
        hoverBackgroundColor="thatBlue"
      />
    );
  }
  return null;
};

const Hero = ({ event, className }) => {
  return (
    <ContentSection className={className}>
      <Main>
        <SideDetail>
          <DateLocation>
            August 3 - 6, 2020 - Kalahari Resort, Wisconsin Dells, WI
          </DateLocation>
          <Slogan>{event.get.slogan}</Slogan>
          <ActionButtonRow>
            <LinkButton
              href="wi/tickets"
              label="Ticket Options"
              color="thatBlue"
              borderColor="thatBlue"
              className="stretch-sm"
              hoverBorderColor="thatBlue"
              hoverColor="white"
              hoverBackgroundColor="thatBlue"
            />
            <LinkButton
              href="wi/become-a-partner"
              label="Sponsor Us"
              color="thatBlue"
              borderColor="thatBlue"
              className="stretch-sm"
              hoverBorderColor="thatBlue"
              hoverColor="white"
              hoverBackgroundColor="thatBlue"
            />
            <ThirdButton event={event} />
          </ActionButtonRow>
        </SideDetail>
        <HeroImage
          src="images/clark_stage.jpg"
          loading="lazy"
          alt="Founder Clark Sell Kicking off THAT Conference"
        />
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
  padding: 0 5rem;
`;
