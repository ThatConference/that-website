import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import _ from 'lodash';

import ContentSection from '../../../../components/shared/ContentSection';

import Header from '../../../../components/Session/Submit/Header';
import Details from '../../../../components/Session/Submit/Details';

const SessionDetails = ({ user, loading }) => {
  const router = useRouter();
  useEffect(() => {
    if (!loading && _.isEmpty(user)) {
      router.push(`/api/login?redirect-url=/wi/session/submit/details`);
    }
  });
  if (!loading && !_.isEmpty(user)) {
    if (!user.profileComplete) {
      router.push(`/member/create`);
    }
    if (!user.acceptedCommitments) {
      router.push(`/wi/counselor-agreement`);
    }

    return (
      <div>
        <Head>
          <title key="title">
            Session Submission: Details - THAT Conference
          </title>
        </Head>
        <ContentSection forForm>
          <Header title="Session Details" currentStep="1" />
          <Details />
        </ContentSection>
      </div>
    );
  }
  return null;
};

export default SessionDetails;
