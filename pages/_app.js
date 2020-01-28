/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import Router from 'next/router';

import sentry from '../lib/sentry';
import * as gtag from '../lib/gtag';
import withApolloClient from '../lib/withApolloClient';
import Page from '../components/Page';

Router.events.on('routeChangeComplete', url => gtag.pageview(url));

const { Sentry, captureException } = sentry();

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { feature } = ctx.query;

    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return {
      pageProps,
      displayFeature: feature === process.env.FEATURE_KEYWORD,
    };
  }

  constructor() {
    // eslint-disable-next-line prefer-rest-params
    super(...arguments);
    this.state = {
      hasError: false,
      errorEventId: undefined,
    };
  }

  static getDerivedStateFromProps(props, state) {
    // If there was an error generated within getInitialProps, and we haven't
    // yet seen an error, we add it to this.state here
    return {
      hasError: props.hasError || state.hasError || false,
      errorEventId: props.errorEventId || state.errorEventId || undefined,
    };
  }

  static getDerivedStateFromError() {
    // React Error Boundary here allows us to set state flagging the error (and
    // later render a fallback UI).
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    const errorEventId = captureException(error, { errorInfo });

    // Store the event id at this point as we don't have access to it within
    // `getDerivedStateFromError`.
    this.setState({ errorEventId });
  }

  render() {
    const { Component, pageProps, apolloClient, displayFeature } = this.props;

    return this.state.hasError ? (
      <section>
        <h1>There was an error!</h1>
        <p>
          <a
            href="#"
            onClick={() =>
              Sentry.showReportDialog({ eventId: this.state.errorEventId })
            }
          >
            <span role="img" aria-label="Megaphone">
              📣
            </span>{' '}
            Report this error
          </a>
        </p>
        <p>
          <a
            href="#"
            onClick={() => {
              window.location.reload(true);
            }}
          >
            Or, try reloading the page
          </a>
        </p>
      </section>
    ) : (
      <ApolloProvider client={apolloClient}>
        <Page displayFeature={displayFeature}>
          <Component {...pageProps} />
        </Page>
      </ApolloProvider>
    );
  }
}

export default withApolloClient(MyApp);
