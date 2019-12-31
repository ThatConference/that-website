import React from 'react';
import Head from 'next/head';

import ContentSection from '../../../components/shared/ContentSection';
import togglePage from '../../../utilities/togglePage';

import Header from '../../../components/Member/Profile/Header';
import Bio from '../../../components/Member/Profile/Bio';

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

export default togglePage(CallForSpeakers);
