import React from 'react';
import Head from 'next/head';

import ContentSection from '../../../../components/shared/ContentSection';
import togglePage from '../../../../utilities/togglePage';

import Header from '../../../../components/Session/Submit/Header';
import Intro from '../../../../components/Session/Submit/Intro';

const SessionIntro = () => {
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

export default togglePage(SessionIntro);
