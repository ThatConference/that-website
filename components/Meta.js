import React from 'react';
import Head from 'next/head';

import { GA_TRACKING_ID } from '../lib/gtag';

const Meta = () => (
  <Head profile="http://www.w3.org/2005/10/profile">
    <title key="title">Sand Bar and Island Grill!</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel="icon" type="image/png" href="/static/favicon.png" />

    <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
    <link
      href="https://fonts.googleapis.com/css?family=Great+Vibes&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Roboto"
      rel="stylesheet"
    />

    <meta
      name="description"
      content="A Tropical Oasis in the least likely of places!"
    />
    <meta
      name="keywords"
      content="TIKI Bar, Resturant, Twin Lakes, Lake Elizabeth"
    />

    <meta property="og:type" content="website" />
    <meta property="og:title" content="Sand Bar And Island Grill" />
    <meta
      property="og:description"
      content="A Tropical Oasis in the least likely of places!"
    />
    <meta property="og:url" content="https://sandbarandislandgrill.com/" />
    <meta property="og:site_name" content="Sand Bar And Island Grill" />
    {/* <meta property="og:image" content="" /> */}
    <meta property="og:locale" content="en_US" />

    {/* <meta name="twitter:site" content="@SandBar" />
    <meta name="twitter:title" content="FILL ME OUT" />
    <meta name="twitter:card" content="summary" />
    <meta
      name="twitter:description"
      content="A Tropical Oasis in the least likely of places!"
    />
    <meta
      name="twitter:image"
      content="https://www.sandbarandislandgrill.com/images/icons/opengraph.jpg"
    /> */}

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
          `,
      }}
    />
  </Head>
);

export default Meta;
