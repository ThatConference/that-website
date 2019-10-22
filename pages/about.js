import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { ParallaxProvider } from 'react-scroll-parallax';

import { below } from '../utilities';
import ContentSection from '../components/shared/ContentSection';
import Hero from '../components/shared/Hero';
import HighlightImage from '../components/shared/HighlightImage';
import LinkButton from '../components/shared/LinkButton';

const ContentDetail = styled.div`
  display: flex;
  order: ${({ align }) => (align === 'left' ? 0 : 2)};
  align-items: center;

  ${below.med`
    text-align: center;
    flex-direction: column;
    width: 100%;
  `};

  p {
    margin: 0;

    li {
      text-align: left;
    }
  }
`;

const ApplyButton = styled(LinkButton)`
  order: 3;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const about = props => (
  <>
    <Head>
      <title key="title">About Us - Sand Bar and Island Grill</title>
    </Head>
    <ParallaxProvider>
      <>
        <Hero
          imagePath="/static/images/home-entrance.jpg"
          heading="Sand Bar and Island Grill"
          href={`tel:${siteInfo.linkPhone}`}
          label="Call for Reservations"
        />

        <ContentSection title="How We Got Started">
          <ContentDetail>
            <HighlightImage
              src="../static/images/bartender.jpg"
              height="25rem"
            />
            <p>
              The Sand Bar & Island Grill is a waterfront, "open-air"
              establishment located in the Lake Elizabeth marina literally a few
              feet away from the shore.
              <br />
              <br />
              It was founded in 2009 by Carlo DiCarlo, a Twin Lakes resident who
              has spent a great deal of his time on Florida's Suncoast in the
              Tampa Bay/Clearwater area.
              <br />
              <br />
              Carlo grew to greatly enjoy the abundant array of seafood featured
              in so very many restaurants along the gulf of Mexico's Florida
              beaches. The informal, laid-back culture of that area led him to
              furnish and decorate the restaurant and bar in a colorful, rustic
              Key West style.
            </p>
          </ContentDetail>
        </ContentSection>

        <ContentSection title="Inspired Menu" color="light">
          <ContentDetail align="right">
            <HighlightImage
              src="../static/images/fish.jpg"
              align="left"
              height="25rem"
            />
            <p>
              The menu selections are very Florida-inspired as well. They
              include blackened Grouper, grilled Mahi-Mahi, seared Ahi Tuna,
              along with weekly specials such as Marlin, Amberjack and Soft
              Shell Crab. One of our signature appetizers is a
              Clearwater-inspired smoked fish spread made from scratch in the
              Sand Bar's kitchen by our own chef. We feature fresh-shucked
              oysters every Friday, Saturday and Sunday along with steamed
              mussels bathed in garlic butter and white wine. For those who
              prefer "turf" over "surf" we serve three top-quality Filet Mignon
              "Sliders" on toasted buns topped with Dijon Mayonaise and shaved
              Red Onions. Our half-pound Burgers are made with the very finest
              Angus beef available. Our Mango-infused Cole Slaw is a tropical
              delight.
            </p>
          </ContentDetail>
          <ContentDetail>
            <p>
              <br />A visit to our place will surely put you in a Caribbean
              state of mind and treat you to vistas of our beautiful lake and
              the breathtaking sunsets you will enjoy as evening sets in. We are
              open for lunch and dinner seven days a week.
            </p>
          </ContentDetail>
        </ContentSection>

        <ContentSection
          image="../static/images/testimage.jpg"
          title="Would You Like To Join The Team?"
          align="left"
        >
          <ContentDetail>
            <p>
              The Sand Bar and Island Grill is always on the search for the
              right people to join our island crew. We have the following
              employment opportunities available:
              <ul>
                <li>Line Cook</li>
                <li>Prep Cook</li>
                <li>Busser</li>
                <li>Hostess</li>
                <li>Server</li>
                <li>Bartender</li>
                <li>Parking Lot attendant</li>
              </ul>
              Must have own transportation and be able to work nights, weekends
              and holidays.
            </p>
          </ContentDetail>
          <ApplyButton
            href="/apply"
            label="Apply Online"
            color="highlight"
            borderColor="secondary"
          />
        </ContentSection>
      </>
    </ParallaxProvider>
  </>
);

export default about;
