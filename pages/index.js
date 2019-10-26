import React from 'react';
import styled from 'styled-components';

import Hero from '../components/HomePage/Hero';
import ContentSection from '../components/shared/ContentSection';
import HighlightImage from '../components/shared/HighlightImage';
import IconText from '../components/shared/IconText';
import NewsletterSignup from '../components/HomePage/NewsletterSignup';
import { below, siteInfo } from '../utilities';

const Title = styled.h2`
  font-size: 2.8rem;
  text-align: center;
  margin-top: 0;
  line-height: 1.2;
  font-weight: 400;
  font-family: 'Open Sans', sans-serif;
  margin-bottom: 0.5rem;
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

const home = props => (
  <>
    <Hero />

    <ContentSection
      title={[
        <span className="normal">A </span>,
        <span className="highlight">Tropical Oasis</span>,
        <span className="normal"> In The Least Likely Of Places</span>,
      ]}
    >
      <ContentDetail>
        <p>
          The Sand Bar & Island Grill is a waterfront, "open-air" establishment
          located in the Lake Elizabeth marina literally a few feet away from
          the shore. It was founded in 2009 by Carlo DiCarlo, a Twin Lakes
          resident who has spent a great deal of his time on Florida's Suncoast
          in the Tampa Bay/Clearwater area.
        </p>
        <HighlightImage src="" />
      </ContentDetail>
    </ContentSection>

    <NewsletterSignup />
  </>
);

export default home;
