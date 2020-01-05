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

const { captureException } = sentry();
<<<<<<< HEAD
const dlog = debug('that:app');

const reducer = (state = { user: {}, session: {} }, action) => {
  switch (action.type) {
    case 'USER':
      dlog('action.payload', action.payload);
      return { ...state, user: action.payload };
<<<<<<< HEAD
    case 'SESSION':
      return { ...state, session: action.payload };
=======
    case 'CLEAR_STATE':
      dlog('Logout - clear redux state');
      return { ...state, user: {} };
>>>>>>> be5513a... view and update of a member profile - part 1
    default:
      return state;
  }
};

const makeStore = initialState => {
  return createStore(reducer, initialState);
};
=======
>>>>>>> 921247f... remove redux

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
    const {
      Component,
      pageProps,
      apolloClient,
      displayFeature,
      currentUser,
    } = this.props;

    return (
      <ApolloProvider client={apolloClient}>
        <Page
          displayFeature={displayFeature}
          currentUser={currentUser ? currentUser.user : {}}
        >
          <Component {...pageProps} />
        </Page>
      </ApolloProvider>
    );
  }
}

export default withApolloClient(MyApp);
