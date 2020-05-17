import React from 'react';
import RootLayout from '../components/layouts/Root';

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
    <div className="docs">
      <Hero />
      <SectionHeader />
      <Events />
      <Blog />
      <StayInTouch />
      <SignUp />
      <Community />
      <LiveStream />
      <Shop />
      <Keynotes />
      <PageFooter />
    </div>
  );
};

index.Layout = RootLayout;

export default index;
