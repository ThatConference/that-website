import React from 'react';
import { EventJsonLd } from 'next-seo';

const EventSeo = ({ event }) => {
  const { startDate, endDate, slug } = event;

  return (
    <EventJsonLd
      name="THAT Conference - Wisconsin Dells"
      startDate={startDate}
      endDate={endDate}
      location={{
        name: 'Kalahari, Wisconsin Dells, WI',
        sameAs: 'https://www.kalahariresorts.com/wisconsin',
        address: {
          streetAddress: '1305 Kalahari Drive',
          addressLocality: 'Wisconsin Dells',
          addressRegion: 'WI',
          postalCode: '53965',
          addressCountry: 'US',
        },
      }}
      url={`https://www.thatconference.com/${slug}`}
      images={[
        'https://www.thatconference.com/images/clark_stage.jpg',
        'https://www.thatconference.com/images/maker_space.jpg',
        'https://www.thatconference.com/images/keynote.jpg',
        'https://www.thatconference.com/images/partner_hero_default.jpg',
        'https://www.thatconference.com/images/battle-bots.jpg',
        'https://www.thatconference.com/images/mess-hall.jpg',
      ]}
      description="THAT Conference is the Summer Camp for Geeks that combines technology, networking, social events and exposure in an inspirational, family friendly environment at the The Kalahari Resort in Wisconsin Dells."
    />
  );
};

export default EventSeo;
