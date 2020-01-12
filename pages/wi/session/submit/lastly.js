import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import _ from 'lodash';

import ContentSection from '../../../../components/shared/ContentSection';

import Header from '../../../../components/Session/Submit/Header';
import Lastly from '../../../../components/Session/Submit/Lastly';

const SessionLastly = ({ user, loading }) => {
  const router = useRouter();
  useEffect(() => {
    if (!loading && _.isEmpty(user)) {
      router.push(`/api/login?redirect-url=/wi/session/submit`);
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
            Session Submission: Lastly - THAT Conference
          </title>
        </Head>
        <ContentSection forForm>
          <Header title="Lastly" currentStep="3" />
          <Lastly />
        </ContentSection>
      </div>
    );
  }
  return null;
};

export default SessionLastly;
