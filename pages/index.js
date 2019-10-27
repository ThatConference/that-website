import React from 'react';
import styled from 'styled-components';

import Hero from '../components/HomePage/Hero';
import LearnMore from '../components/HomePage/LearnMore';
import MeetCampers from '../components/HomePage/MeetCampers';
import SpeakerHighlight from '../components/HomePage/SpeakerHighlight';
import Testimonials from '../components/HomePage/Testimonials';
import WhatToExpect from '../components/shared/WhatToExpect';
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

const BottomImage = styled.img`
  object-fit: cover;
  width: 100vw;
  height: 45rem;
`;

const home = props => (
  <>
    <Hero />
    <LearnMore />
    <WhatToExpect />
    <SpeakerHighlight />
    <Testimonials />
    <NewsletterSignup />
    <MeetCampers />
    <BottomImage src="./images/mess_hall.png" />
  </>
);

export default home;
