import React from 'react';
import styled from 'styled-components';
import { above, below } from '../../utilities';

import HeroContainer from '../shared/HeroContainer';

const TitleBlock = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const HeadingBlock = styled.div`
  flex-grow: 2;
  display: flex;
  align-items: flex-end;
  margin: auto;
`;

const StyledH1 = styled.h1`
  font-size: 10rem;

  ${above.large`
    font-size: 15rem;
  `}

  ${below.xsmall`
    font-size: 8rem;
  `};
`;

const WelcomeText = styled.p`
  align-self: flex-end;
  text-align: justify;
  padding-left: 20rem;
  padding-right: 20rem;
  color: ${({ theme }) => theme.colors.fonts.light};
  height: auto;
  padding-bottom: 2rem;

  ${below.med`
    padding-left: 3rem;
    padding-right: 3rem;
  `};

  ${below.small`
    font-size: 1.6rem;
  `};
`;

const Hero = ({ className }) => {
  return (
    <HeroContainer
      className={className}
      imageSource="/images/landing_hero.jpg"
      imageAlt="THAT"
    >
      <TitleBlock>
        <HeadingBlock>
          <StyledH1 className="font-light">
            We. Love.
            <br />
            Geeks.
          </StyledH1>
        </HeadingBlock>
        <WelcomeText className="large-body-copy">
          THAT is a polyglot community for all things technology where members
          help, teach and support each other year round. What started as an
          annual technology conference has grown into community of practitioners
          teaching, sharing and supporting each other daily. Through our
          multiple in-person and virtual events each year we continual push to
          bring positive impact across our industry and welcome everyone
          regardless of experience, tech stack or background.
        </WelcomeText>
      </TitleBlock>
    </HeroContainer>
  );
};

export default styled(Hero)``;
