import React from 'react';
import styled from 'styled-components';
import { ParallaxProvider } from 'react-scroll-parallax';

import ContentSection from '../components/shared/ContentSection';
import Gallery from '../components/HomePage/Gallery';
import Hero from '../components/shared/Hero';
import HighlightImage from '../components/shared/HighlightImage';
import IconText from '../components/shared/IconText';
import Map from '../components/shared/Map';
import NewsletterSignup from '../components/HomePage/NewsletterSignup';
import SocialLinks from '../components/shared/SocialLinks';
import Testimonials from '../components/HomePage/Testimonials';
import { below, siteInfo } from '../utilities';

const Title = styled.h2`
  font-size: 2.8rem;
  text-align: center;
  margin-top: 0;
  line-height: 1.2;
  font-weight: 400;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 0.5rem;
`;

const Fancy = styled.span`
  font-size: 4.2rem;
  font-family: 'Great Vibes', cursive;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.primary};
`;

const PhoneNumber = styled.div`
  text-align: center;
  order: 2;

  a {
    color: ${({ theme }) => theme.colors.light};
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  ${below.med`
    display: none;
  `};

  ${below.large`
    order: 1;
    padding-bottom: 0.7rem;
  `};
`;

const StackedSocialLinks = styled(SocialLinks)`
  order: 1;

  ${below.med`
    max-height: 3rem;
  `};

  ${below.large`
    order: 2;
    max-height: 4rem;
  `};
`;

const StackedLocation = styled(IconText)`
  order: 3;
  a {
    color: ${({ theme }) => theme.colors.light};
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const ContentBlock = styled.div`
  margin: auto;
  max-width: 1000px;
`;

const ContentDetail = styled.div`
  display: flex;

  ${below.med`
    text-align: center;
    flex-direction: column;
    width: 100%;
  `};
`;

const AccentImage = styled.img`
  position: absolute;
  left: -10rem;
  top: 18%;
`;

const HeroImages = [
  '/static/images/sandbar-inside.jpg',
  '/static/images/inside-bar.jpg',
  '/static/images/inside-night.jpg',
];

const home = props => (
  <ParallaxProvider>
    <>
      <Hero
        imagePath={HeroImages[Math.floor(Math.random() * HeroImages.length)]}
        fullHeight="true"
        heading={siteInfo.name}
        href="/menu"
        label="Menu"
      >
        <StackedSocialLinks />
        <PhoneNumber>
          <a href={`tel:${siteInfo.linkPhone}`}>{siteInfo.formattedPhone}</a>
        </PhoneNumber>
        <StackedLocation icon="location" align="center">
          <a
            href="https://goo.gl/maps/9fvZcNvVcsiJ82Hj6"
            target="_blank"
            rel="noreferrer noopener"
          >
            {siteInfo.address}
          </a>
        </StackedLocation>
      </Hero>

      <ContentSection
        title={[
          <span className="normal">A </span>,
          <span className="highlight">Tropical Oasis</span>,
          <span className="normal"> In The Least Likely Of Places</span>,
        ]}
      >
        <AccentImage src="../static/images/tiki-bar.png" />
        <ContentDetail>
          <p>
            The Sand Bar & Island Grill is a waterfront, "open-air"
            establishment located in the Lake Elizabeth marina literally a few
            feet away from the shore. It was founded in 2009 by Carlo DiCarlo, a
            Twin Lakes resident who has spent a great deal of his time on
            Florida's Suncoast in the Tampa Bay/Clearwater area.
          </p>
          <HighlightImage src="../static/images/conversation.jpg" />
        </ContentDetail>
      </ContentSection>

      <NewsletterSignup />
      <Testimonials />
      <Gallery />
      <Map />
    </>
  </ParallaxProvider>
);

export default home;
