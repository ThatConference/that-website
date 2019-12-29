import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import Router from 'next/router';

import ContentSection from '../../../../components/shared/ContentSection';
import togglePage from '../../../../utilities/togglePage';

import Header from '../../../../components/Session/Submit/Header';
import Intro from '../../../../components/Session/Submit/Intro';

import { useFetchUser } from '../../../../lib/user';

const SessionIntro = ({ user: reduxUser, dispatch, featureKeyword }) => {
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
        `/api/login?redirect-url=/wi/session/submit?feature=${featureKeyword}`,
      );
    }
  });
  if (user) {
    return (
      <div>
        <Head>
          <title key="title">Session Submission: Intro - THAT Conference</title>
        </Head>
        <ContentSection forForm>
          <Header title="Session Introduction" currentStep="0" />
          <Intro featureKeyword={featureKeyword} />
        </ContentSection>
      </div>
    );
  }
  return null;
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(SessionIntro);
