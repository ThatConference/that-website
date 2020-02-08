import React from 'react';
import Head from 'next/head';

import { GA_TRACKING_ID } from '../lib/gtag';

const Meta = () => (
  <Head profile="http://www.w3.org/2005/10/profile">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel="icon" type="image/png" href="/favicon.png" />

    <link rel="stylesheet" type="text/css" href="/nprogress.css" />
    <link rel="stylesheet" href="https://use.typekit.net/tyl7iga.css" />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800"
      rel="stylesheet"
    />

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
            window['ga-disable-${GA_TRACKING_ID}'] = ${process.env.NODE_ENV !==
          'production'};
          `,
      }}
    />
  </Head>
);

export default Meta;
