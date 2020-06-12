/**
 * WI 2020 Landing page
 */

import React from 'react';
import RootLayout from '../../../components/layouts/Root';
import OneDayEvent from '../../../components/EventPages/OneDayEvent';

const TICKETS = [
  {
    name: 'Camper',
    description:
      'some description of what a camper is that makes it sound super cool',
    imagePath: '/images/tickets/2020/camper.png',
    basePrice: '0',
    benefits: ['benefit 1', 'benefit 2', 'benefit 3', 'benefit 4'],
    buttonColor: 'tertiary',
    ticketUrl:
      'https://ti.to/that-conference/that-conference-2020?odor261sw70=1',
  },
  {
    name: 'Patron',
    description:
      'some description of what a patron is that makes it sound super cool',
    imagePath: '/images/tickets/2020/patron.png',
    basePrice: '25',
    benefits: ['benefit 1', 'benefit 2', 'benefit 3', 'benefit 4'],
    buttonColor: 'primary',
    ticketUrl:
      'https://ti.to/that-conference/that-conference-2020?grocntbbmo=1',
  },
  {
    name: 'Partner',
    description:
      'some description of what a partner is that makes it sound super cool',
    imagePath: '/images/tickets/2020/partner.png',
    basePrice: '250',
    benefits: ['benefit 1', 'benefit 2', 'benefit 3', 'benefit 4'],
    buttonColor: 'teal',
    ticketUrl:
      'https://ti.to/that-conference/that-conference-2020?y32kfajepau=1',
  },
  {
    name: 'Corporate Partner',
    description:
      'some description of what a corporate partner is that makes it sound super cool',
    imagePath: '/images/tickets/2020/corporate-partner.png',
    basePrice: '1000',
    benefits: ['benefit 1', 'benefit 2', 'benefit 3', 'benefit 4'],
    buttonColor: 'purple',
    ticketUrl:
      'https://ti.to/that-conference/that-conference-2020?dhsgaihiwps=1',
  },
];

const Index = ({ eventSlug }) => {
  return <OneDayEvent eventSlug={eventSlug.substring(1)} tickets={TICKETS} />;
};

Index.Layout = RootLayout;

Index.getInitialProps = async context => {
  return { eventSlug: context.pathname };
};

export default Index;
