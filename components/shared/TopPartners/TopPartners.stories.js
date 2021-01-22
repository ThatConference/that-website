import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import TopPartners from './TopPartners';

const partnerList = [
  {
    companyLogo:
      'https://storage.googleapis.com/that-bucket/partnerlogos/unspecified.svg',
    companySlug: 'unspecified',
    companyName: 'Unspecified',
  },
  {
    companyLogo:
      'https://storage.googleapis.com/that-bucket/partnerlogos/partner-placeholder.svg',
    companySlug: 'someslug',
    companyName: 'Some Company',
  },
  {
    companyLogo: '/images/logo.that.online.jpg',
    companySlug: 'that-online',
    companyName: 'That Online',
  },
  {
    companyLogo: '/images/logo.that.tx.jpg',
    companySlug: 'that-tx',
    companyName: 'That TX',
  },
  {
    companyLogo: '/images/logo.that.wi.jpg',
    companySlug: 'that-wi',
    companyName: 'That WI',
  },
];

export default {
  title: 'TopPartners',
  component: TopPartners,
  decorators: [withKnobs],
};

export const TopPartnerNone = () => (
  <TopPartners
    clasName={text('Class Name', '')}
    becomePartnerLink={text(
      'Become Partner Link',
      'https://www.thatconference.com/wi/2021/become-a-partner',
    )}
    title={text('Title Text', 'Events brought to you by')}
    partners={[]}
  />
);

export const TopPartnerOne = () => (
  <TopPartners
    clasName={text('Class Name', '')}
    becomePartnerLink={text(
      'Become Partner Link',
      'https://www.thatconference.com/wi/2021/become-a-partner',
    )}
    title={text('Title Text', 'Events brought to you by')}
    partners={[partnerList[0]]}
  />
);

export const TopPartnerMultiple = () => (
  <TopPartners
    clasName={text('Class Name', '')}
    becomePartnerLink={text(
      'Become Partner Link',
      'https://www.thatconference.com/wi/2021/become-a-partner',
    )}
    title={text('Title Text', 'Events brought to you by')}
    partners={partnerList}
  />
);
