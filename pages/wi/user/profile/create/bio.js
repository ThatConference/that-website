import React from 'react';
import Head from 'next/head';

import ContentSection from '../../../../../components/shared/ContentSection';

import Header from '../../../../../components/User/Profile/Create/Header';
import Bio from '../../../../../components/User/Profile/Create/Bio';

const CallForSpeakers = () => {
  return (
    <div>
      <Head>
        <title key="title">Create User Profile: Bio - THAT Conference</title>
      </Head>
      <ContentSection forForm>
        <Header title="Bio" currentStep="3" />
        <Bio />
      </ContentSection>
    </div>
  );
};

export default CallForSpeakers;
