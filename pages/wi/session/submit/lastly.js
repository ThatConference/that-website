import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { connect } from 'react-redux';

import ContentSection from '../../../../components/shared/ContentSection';
import togglePage from '../../../../utilities/togglePage';

import Header from '../../../../components/Session/Submit/Header';
import Lastly from '../../../../components/Session/Submit/Lastly';

import { useFetchUser } from '../../../../lib/user';

const SessionLastly = ({ user: reduxUser, dispatch, featureKeyword }) => {
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
        `/api/login?redirect-url=/wi/session/submit/lastly?feature=${featureKeyword}`,
      );
    }
  });
  if (user) {
    return (
      <div>
        <Head>
          <title key="title">
            Session Submission: Lastly - THAT Conference
          </title>
        </Head>
        <ContentSection forForm>
          <Header title="Lastly" currentStep="3" />
          <Lastly featureKeyword={featureKeyword} />
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

export default connect(mapStateToProps)(SessionLastly);
