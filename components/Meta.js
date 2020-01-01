import React from 'react';
import Head from 'next/head';

import { GA_TRACKING_ID } from '../lib/gtag';

const Meta = () => (
  <Head profile="http://www.w3.org/2005/10/profile">
    <title key="title">THAT Conference - Wisconsin Dells, WI</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel="icon" type="image/png" href="favicon.png" />

    <link rel="stylesheet" type="text/css" href="/nprogress.css" />
    <link rel="stylesheet" href="https://use.typekit.net/tyl7iga.css" />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans"
      rel="stylesheet"
    />

    <meta
      name="description"
      content="THAT Conference is the Summer Camp for Geeks that combines technology, networking, social events and exposure in an inspirational, family friendly environment at the The Kalahari Resort in Wisconsin Dells."
    />
    <meta
      name="keywords"
      content="tech conference, tech, technology, conference, midwest tech, midwest, summer camp for geeks"
    />

    <meta property="og:type" content="website" />
    <meta property="og:title" content="THAT Conference - Wisconsin Dells, WI" />
    <meta
      property="og:description"
      content="THAT Conference is the Summer Camp for Geeks that combines technology, networking, social events and exposure in an inspirational, family friendly environment at the The Kalahari Resort in Wisconsin Dells."
    />
    <meta property="og:url" content="https://www.thatconference.com/" />
    <meta
      property="og:site_name"
      content="THAT Conference - Wisconsin Dells, WI"
    />
    <meta
      property="og:image"
      content="https://www.thatconference.com/images/THAT_Conference_WI.png"
    />
    <meta property="og:locale" content="en_US" />
    <meta property="fb:app_id" content="741883086300353" />

    <meta name="twitter:site" content="@thatconference" />
    <meta
      name="twitter:title"
      content="THAT Conference - Wisconsin Dells, WI"
    />
    <meta
      name="twitter:card"
      content="Over four days, folks of diverse technology backgrounds and expertise levels gather to take advantage of multiple learning mediums to maximize one’s community and career advancements."
    />
    <meta
      name="twitter:description"
      content="THAT Conference is the Summer Camp for Geeks that combines technology, networking, social events and exposure in an inspirational, family friendly environment at the The Kalahari Resort in Wisconsin Dells."
    />
    <meta name="twitter:image" content="THAT Conference - WI.png" />

    <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
    />

    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
            window['ga-disable-${GA_TRACKING_ID}'] = ${process.env.NODE_ENV ===
          'production'};
          `,
      }}
    />
  </Head>
);

export default Meta;
