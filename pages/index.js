import React from 'react';
import { NextSeo } from 'next-seo';
import RootLayout from '../components/layouts/Root';

import ContentSection from '../components/shared/ContentSection';

import Blog from '../components/RootHomePage/Blog';
import Community from '../components/RootHomePage/Community';
import Events from '../components/RootHomePage/Events';
import Hero from '../components/RootHomePage/Hero';
import Keynotes from '../components/RootHomePage/Keynotes';
import LiveStream from '../components/RootHomePage/LiveStream';
import PageFooter from '../components/RootHomePage/PageFooter';
import SectionHeader from '../components/RootHomePage/SectionHeader';
import Shop from '../components/RootHomePage/Shop';
import SignUp from '../components/RootHomePage/SignUp';
import StayInTouch from '../components/RootHomePage/StayInTouch';

const index = () => {
  return (
    <div>
      <NextSeo
        title="THAT - Tech Events and Community"
        description="Our goal with THAT is to bridge the gap between professionals and businesses, beginner and experienced technologists, all while shining a light on the importance of family and caring for your whole self."
        images={[
          'https://www.thatconference.com/images/clark_stage.jpg',
          'https://www.thatconference.com/images/maker_space.jpg',
          'https://www.thatconference.com/images/keynote.jpg',
          'https://www.thatconference.com/images/partner_hero_default.jpg',
          'https://www.thatconference.com/images/battle-bots.jpg',
          'https://www.thatconference.com/images/mess-hall.jpg',
        ]}
      />

      <Hero />
      <SectionHeader />
      <Events />
      <Blog />
      <StayInTouch />
      <SignUp />
      <Community />
      <LiveStream />
      <Shop />
      <ContentSection
        backgroundColor="thatBlue"
        backgroundOpacity={0.82}
        backgroundImage="/images/group.jpg"
      />
      <Keynotes />
      <PageFooter />
    </div>
  );
};

index.Layout = RootLayout;

export default index;
