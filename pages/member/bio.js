import React from 'react';
import Head from 'next/head';

import ContentSection from '../../components/shared/ContentSection';

import Header from '../../components/Member/Profile/Header';
import Bio from '../../components/Member/Profile/Bio';

const bio = () => {
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

export default bio;
