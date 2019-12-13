import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import * as Sentry from '@sentry/browser';

process.on('unhandledRejection', err => {
  Sentry.captureException(err);
});

process.on('uncaughtException', err => {
  Sentry.captureException(err);
});

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
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
      <html lang="en-US">
        <Head>{this.props.styleTags}</Head>
        <body>
          <Main />
          <NextScript />
          <script
            src="//code.tidio.co/qcwuuigfzw3cjegsc2fyo0sniyh3c3ue.js"
            async
          />
        </body>
      </html>
    );
  }
}
