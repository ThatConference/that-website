import React from 'react';
import Head from 'next/head';

import ContentSection from '../../../../components/shared/ContentSection';
import togglePage from '../../../../utilities/togglePage';

import Header from '../../../../components/Session/Submit/Header';
import AdditionalInfo from '../../../../components/Session/Submit/AdditionalInfo';

const SessionAdditionalInfo = ({ featureKeyword }) => {
  return (
    <div>
      <Head>
        <title key="title">
          Session Submission: Additional Info - THAT Conference
        </title>
      </Head>
      <ContentSection forForm>
        <Header title="Additional Info" currentStep="2" />
        <AdditionalInfo featureKeyword={featureKeyword} />
      </ContentSection>
    </div>
  );
};

export default togglePage(SessionAdditionalInfo);
