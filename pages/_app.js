/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import App from 'next/app';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import Router from 'next/router';
import debug from 'debug';

import { gql } from 'apollo-boost';
import { showReportDialog } from '@sentry/browser';
import sentry from '../lib/sentry';

import * as gtag from '../lib/gtag';
import withApolloClient from '../lib/withApolloClient';
import Page from '../components/Page';

Router.events.on('routeChangeComplete', url => gtag.pageview(url));

const { captureException } = sentry();
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

const GET_ME = gql`
  query getMember {
    members {
      me {
        firstName
        lastName
        email
        profileImage
        profileSlug
        acceptedCodeOfConduct
        acceptedTermsOfService
        isOver13
        isOver18
        canFeature
      }
    }
  }
`;

const CREATE_ME = gql`
  mutation createMember($profile: ProfileCreateInput!) {
    members {
      create(profile: $profile) {
        id
        profileSlug
        firstName
        lastName
        email
        canFeature
        createdAt
        lastUpdatedAt
      }
    }
  }
`;

const UPDATE_ME = gql`
  mutation updateMember($profile: ProfileUpdateInput!) {
    members {
      member {
        update(profile: $profile) {
          id
          profileSlug
          firstName
          lastName
          email
          canFeature
          createdAt
          lastUpdatedAt
        }
      }
    }
  }
`;

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

  // TO DO: Not ideal to have this here as it will constantly run. Really belongs in
  // callback, but can't seem to figure out yet how that has/gets user data since
  // there is no session created at that point.
  saveUser = (savedMember, currentUser, apolloClient) => {
    if (!savedMember && currentUser) {
      dlog('Create Member', currentUser);

      apolloClient
        .mutate({
          mutation: CREATE_ME,
          variables: {
            profile: {
              firstName: currentUser.user.given_name,
              lastName: currentUser.user.family_name,
              email: currentUser.user.email,
              profileImage: currentUser.user.picture,
              profileSlug: currentUser.user.nickname, // TO DO: this may not be unique
              acceptedCodeOfConduct: false, // TO DO: should this default to false or is "null" no answer, false is an answer
              acceptedTermsOfService: false, // TO DO: should this default to false or is "null" no answer, false is an answer
              isOver13: false, // TO DO: should this default to false or is "null" no answer, false is an answer
              isOver18: false, // TO DO: should this default to false or is "null" no answer, false is an answer
              canFeature: false, // TO DO: should this default to false or is "null" no answer, false is an answer
            },
          },
        })
        .catch(error => dlog('Error Creating Member', error.message));
    } else if (currentUser.user) {
      // TO DO: do we want to do this if the meber can update this data on their profile?
      dlog('Update Member - current', currentUser);

      // update only update is something has changed
      if (
        savedMember.firstName !== currentUser.user.given_name ||
        savedMember.lastName !== currentUser.user.family_name ||
        savedMember.email !== currentUser.user.email ||
        savedMember.profileImage !== currentUser.user.picture
      ) {
        apolloClient
          .mutate({
            mutation: UPDATE_ME,
            variables: {
              profile: {
                firstName: currentUser.user.given_name,
                lastName: currentUser.user.family_name,
                email: currentUser.user.email,
                profileImage: currentUser.user.picture,
                isOver18: savedMember.isOver18, // TO DO: would like to update without providing since value is not changing
              },
            },
          })
          .catch(error => dlog('Error Updating Member', error.message));
      }
    }
  };

  render() {
    const {
      Component,
      pageProps,
      apolloClient,
      store,
      displayFeature,
      currentUser,
      user: reduxUser,
    } = this.props;

    if (currentUser) {
      apolloClient
        .query({
          query: GET_ME,
        })
        .then(response => {
          const memberData = response.data.members.me;
          // if (!reduxUser) {
          dlog('displatch store user - before', currentUser);
          dlog('payload', {
            ...currentUser.user,
            profileSlug: memberData.profileSlug,
          });
          store.dispatch({
            type: 'USER',
            payload: {
              user: {
                ...currentUser.user,
                profileSlug: memberData.profileSlug,
              },
            },
          });
          // }

          this.saveUser(memberData, currentUser, apolloClient);
        });
    } else {
      store.dispatch({
        type: 'CLEAR_STATE',
      });
    }

    return (
      <Provider store={store}>
        <Page displayFeature={displayFeature}>
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </Page>
      </Provider>
    );
  }
}

export default withRedux(makeStore)(withApolloClient(MyApp));
