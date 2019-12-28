import React from 'react';
import Head from 'next/head';
import Router from 'next/router';

import ContentSection from '../../../../components/shared/ContentSection';
import togglePage from '../../../../utilities/togglePage';

import Header from '../../../../components/Session/Submit/Header';
import Intro from '../../../../components/Session/Submit/Intro';

import { useFetchUser } from '../../../../lib/user';

const SessionIntro = ({ featureKeyword }) => {
  const { user, loading } = useFetchUser();
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

export default togglePage(SessionIntro);
