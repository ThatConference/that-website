import React from 'react';
import Head from 'next/head';
import Router from 'next/router';

import ContentSection from '../../../../components/shared/ContentSection';
import togglePage from '../../../../utilities/togglePage';

import Header from '../../../../components/Session/Submit/Header';
import Details from '../../../../components/Session/Submit/Details';

import { useFetchUser } from '../../../../lib/user';

const SessionDetails = ({ featureKeyword }) => {
  const { user, loading } = useFetchUser();
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

export default togglePage(SessionDetails);
