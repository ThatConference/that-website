/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import Router from 'next/router';
import LogRocket from 'logrocket';
import * as Sentry from '@sentry/node';

import { getSentryConfig } from '../lib/sentry';
import * as gtag from '../lib/gtag';
import withApolloClient from '../lib/withApolloClient';
import Page from '../components/Page';

Router.events.on('routeChangeComplete', url => gtag.pageview(url));

Sentry.init(getSentryConfig());
if (process.env.NODE_ENV !== 'development') {
  // only initialize LogRocket in non-dev environments
  // https://docs.logrocket.com/docs/development#using-logrocket-in-development
  LogRocket.init(process.env.LOG_ROCKET);
}
class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient, err } = this.props;

    // Workaround for https://github.com/zeit/next.js/issues/8592
    const modifiedPageProps = { ...pageProps, err };

    return (
      <ApolloProvider client={apolloClient}>
        <Page headerType={Component.headerType}>
          <Component {...modifiedPageProps} />
        </Page>
      </ApolloProvider>
    );
  }
}

export default withApolloClient(MyApp);
