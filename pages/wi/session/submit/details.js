import React from 'react';
import Head from 'next/head';

import ContentSection from '../../../../components/shared/ContentSection';

import Header from '../../../../components/Session/Submit/Header';
import Intro from '../../../../components/Session/Submit/Details';

const SessionDetails = () => {
  return (
    <div>
      <Head>
        <title key="title">Session Submission: Details - THAT Conference</title>
      </Head>
      <ContentSection forForm>
        <Header title="Session Details" currentStep="1" />
        <Intro />
      </ContentSection>
    </div>
  );
};

export default SessionDetails;
