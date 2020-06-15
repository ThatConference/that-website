import React from 'react';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';
import { above, below } from '../../utilities';

import HeroContainer from '../shared/HeroContainer';

const Content = styled(ContentSection)`
  background: none;
  position: absolute;
  top: 30%;
  height: 100%;
  ${below.small`
      top: 0;
  `};

  @media (max-height: 60rem) {
    top: 0;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  justify-content: center;
  align-items: center;
`;

const TitleBlock = styled.div`
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
  color: ${({ theme }) => theme.colors.fonts.light};
  height: auto;
  padding-bottom: 2rem;

  ${below.small`
    padding-left: 2rem;
    padding-right: 2rem;
    font-size: 1.6rem !important;
  `};
`;

const Hero = ({ className }) => {
  return (
    <HeroContainer
      className={className}
      imageSource="/images/landing_hero.jpg"
      imageAlt="THAT"
    >
      <Content>
        <Main>
          <TitleBlock>
            <HeadingBlock>
              <StyledH1 className="font-light">
                We. Love.
                <br />
                Geeks.
              </StyledH1>
            </HeadingBlock>
            <WelcomeText className="large-body-copy">
              THAT is a polyglot community for all things technology where
              members help, teach and support each other year round. What
              started as an annual technology conference has grown into
              community of practitioners teaching, sharing and supporting each
              other daily. Through our multiple in-person and virtual events
              each year we continual push to bring positive impact across our
              industry and welcome everyone regardless of experience, tech stack
              or background.
            </WelcomeText>
          </TitleBlock>
        </Main>
      </Content>
    </HeroContainer>
  );
};

export default styled(Hero)``;
