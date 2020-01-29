import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import Router from 'next/router';
import debug from 'debug';

import sentry from '../lib/sentry';
import * as gtag from '../lib/gtag';
import withApolloClient from '../lib/withApolloClient';
import Page from '../components/Page';

Router.events.on('routeChangeComplete', url => gtag.pageview(url));

const dlog = debug('that:website:app');

sentry.init();

class MyApp extends App {
  render() {
    dlog('_app render');
    const {
      Component,
      pageProps,
      apolloClient,
      displayFeature,
      err,
    } = this.props;
    const modifiedPageProps = { err, ...pageProps };

    return (
      <ApolloProvider client={apolloClient}>
        <Page displayFeature={displayFeature}>
          <Component {...modifiedPageProps} />
        </Page>
      </ApolloProvider>
    );
  }
}

export default withApolloClient(MyApp);
