/**
 * WI 2020 Landing page
 */

import React from 'react';
import RootLayout from '../../../components/layouts/Root';
import OneDayEvent from '../../../components/EventPages/OneDayEvent';

const Index = ({ eventSlug }) => {
  return <OneDayEvent eventSlug={eventSlug.substring(1)} />;
};

Index.Layout = RootLayout;

Index.getInitialProps = async context => {
  return { eventSlug: context.pathname };
};

export default Index;
