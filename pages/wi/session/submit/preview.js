import React from 'react';
import Head from 'next/head';

import ContentSection from '../../../../components/shared/ContentSection';
import togglePage from '../../../../utilities/togglePage';

import Header from '../../../../components/Session/Submit/Header';
import Preview from '../../../../components/Session/Submit/Preview';

const SessionPreview = ({ featureKeyword }) => {
  return (
    <div>
      <Head>
        <title key="title">Session Submission: Preview - THAT Conference</title>
      </Head>
      <ContentSection forForm>
        <Header title="Preview" currentStep="4" />
        <Preview featureKeyword={featureKeyword} />
      </ContentSection>
    </div>
  );
};

export default togglePage(SessionPreview);
