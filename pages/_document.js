import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import * as Sentry from '@sentry/browser';
import { resetId } from 'react-id-generator';

process.on('unhandledRejection', err => {
  Sentry.captureException(err);
});

process.on('uncaughtException', err => {
  Sentry.captureException(err);
});

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    // _document is only rendered on the server side and not on the client side
    // this will reset id keeping markup consistent across server and browser
    resetId();

    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      // eslint-disable-next-line react/jsx-props-no-spreading
      sheet.collectStyles(<App {...props} />),
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <Html lang="en-US">
        <Head>{this.props.styleTags}</Head>
        <body>
          <Main />
          <NextScript />

          <script
            type="text/javascript"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
                (function(e,t,o,n,p,r,i){e.visitorGlobalObjectAlias=n;e[e.visitorGlobalObjectAlias]=e[e.visitorGlobalObjectAlias]||function(){(e[e.visitorGlobalObjectAlias].q=e[e.visitorGlobalObjectAlias].q||[]).push(arguments)};e[e.visitorGlobalObjectAlias].l=(new Date).getTime();r=t.createElement("script");r.src=o;r.async=true;i=t.getElementsByTagName("script")[0];i.parentNode.insertBefore(r,i)})(window,document,"https://diffuser-cdn.app-us1.com/diffuser/diffuser.js","vgo");
                vgo('setAccount', '610031336');
                vgo('setTrackByDefault', true);

                vgo('process');
              `,
            }}
          />
          <script
            src="//code.tidio.co/qcwuuigfzw3cjegsc2fyo0sniyh3c3ue.js"
            async
          />
        </body>
      </Html>
    );
  }
}
