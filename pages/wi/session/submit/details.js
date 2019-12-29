import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import Router from 'next/router';

import ContentSection from '../../../../components/shared/ContentSection';
import togglePage from '../../../../utilities/togglePage';

import Header from '../../../../components/Session/Submit/Header';
import Details from '../../../../components/Session/Submit/Details';

import { useFetchUser } from '../../../../lib/user';

const SessionDetails = ({ user: reduxUser, dispatch, featureKeyword }) => {
  let user = reduxUser;
  let loading = true;

  if (!user) {
    const { cookieUser, loading: userLoading } = useFetchUser();
    loading = userLoading;
    if (!userLoading) {
      dispatch({ type: 'USER', payload: cookieUser });
      user = cookieUser;
    }
  }

  React.useEffect(() => {
    if (!loading && !user) {
      Router.push(
        `/api/login?redirect-url=/wi/session/submit/details?feature=${featureKeyword}`,
      );
    }
  });
  if (user) {
    return (
      <div>
        <Head>
          <title key="title">
            Session Submission: Details - THAT Conference
          </title>
        </Head>
        <ContentSection forForm>
          <Header title="Session Details" currentStep="1" />
          <Details featureKeyword={featureKeyword} />
        </ContentSection>
      </div>
    );
  }
  return null;
};

const mapStateToProps = state => {
  return {
    user: state.user,
    sessionId: state.sessionId,
  };
};

export default connect(mapStateToProps)(SessionDetails);
