import React from 'react';
import Head from 'next/head';

import ContentSection from '../../../../components/shared/ContentSection';
import togglePage from '../../../../utilities/togglePage';

import Header from '../../../../components/Session/Submit/Header';
import Details from '../../../../components/Session/Submit/Details';

const SessionDetails = ({ featureKeyword }) => {
  return (
    <div>
      <Head>
        <title key="title">Session Submission: Details - THAT Conference</title>
      </Head>
      <ContentSection forForm>
        <Header title="Session Details" currentStep="1" />
        <Details featureKeyword={featureKeyword} />
      </ContentSection>
    </div>
  );
};

export default togglePage(SessionDetails);
