import React from 'react';
import Head from 'next/head';

import ContentSection from '../../../../components/shared/ContentSection';
import togglePage from '../../../../utilities/togglePage';

import Header from '../../../../components/Session/Submit/Header';
import Lastly from '../../../../components/Session/Submit/Lastly';

const SessionLastly = ({ featureKeyword }) => {
  return (
    <div>
      <Head>
        <title key="title">Session Submission: Lastly - THAT Conference</title>
      </Head>
      <ContentSection forForm>
        <Header title="Lastly" currentStep="3" />
        <Lastly featureKeyword={featureKeyword} />
      </ContentSection>
    </div>
  );
};

export default togglePage(SessionLastly);
