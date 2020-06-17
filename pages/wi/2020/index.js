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
      'Get access to the event with $0 base contribution to THAT Conference.',
    imagePath: '/images/tickets/2020/camper.png',
    basePrice: '0',
    benefits: ['Access to the event'],
    buttonColor: 'tertiary',
    ticketUrl:
      'https://ti.to/that-conference/that-conference-2020?odor261sw70=1',
  },
  {
    name: 'Patron',
    description:
      'Access to the event with a $25 minimum contribution to THAT Conference.',
    imagePath: '/images/tickets/2020/patron.png',
    basePrice: '25',
    benefits: [
      'Access to the event',
      'Unique digital merit badge on THAT profile',
      '10% discount at THAT Store',
    ],
    buttonColor: 'primary',
    ticketUrl:
      'https://ti.to/that-conference/that-conference-2020?grocntbbmo=1',
  },
  {
    name: 'Partner',
    description:
      'Sponsorship opportunity reserved for individuals, sole proprietors and start-ups with less than 1M in annual revenue.',
    imagePath: '/images/tickets/2020/partner.png',
    basePrice: '250',
    benefits: [
      'Access to the event',
      'Listed on event as a partner',
      'Linked logo and social media',
      '20% discount at THAT Store',
    ],
    buttonColor: 'teal',
    ticketUrl:
      'https://ti.to/that-conference/that-conference-2020?y32kfajepau=1',
  },
  {
    name: 'Corporate Partner',
    description:
      'Sponsorship reserved for companies with over 1m in annual revenue.',
    imagePath: '/images/tickets/2020/corporate-partner.png',
    basePrice: '1000',
    benefits: [
      'Access to the event',
      'Listed on event as a corporate partner',
      'Linked logo and social media',
      'Up to three job posting on THAT Conference job board',
      '20% discount at THAT Store',
    ],
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
