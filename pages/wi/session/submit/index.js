import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import _ from 'lodash';

import ContentSection from '../../../../components/shared/ContentSection';
import Header from '../../../../components/Session/Submit/Header';
import Intro from '../../../../components/Session/Submit/Intro';

const SessionIntro = ({ user, loading: loadingUser }) => {
  const router = useRouter();

  useEffect(() => {
    if (!loadingUser) {
      if (_.isEmpty(user)) {
        router.push('/api/login?redirect-url=/member/create');
      }

      if (!user.profileComplete) {
        router.push('/member/create');
      }

      if (!user.acceptedCommitments) {
        router.push('/wi/session/submit');
      }
    }
  });

  return (
    <div>
      <Head>
        <title key="title">Session Submission: Intro - THAT Conference</title>
      </Head>
      <ContentSection forForm>
        <Header title="Session Introduction" currentStep="0" />
        <Intro />
      </ContentSection>
    </div>
  );
};

export default SessionIntro;
