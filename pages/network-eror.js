import React from 'react';
import Head from 'next/head';

import ContentSection from '../components/shared/ContentSection';

const NetworkError = ({ className }) => {
  return (
    <>
      <Head>
        <title key="title">Work in Progress - THAT Conference</title>
      </Head>
      <ContentSection className={className}>
        <h1>and busted....</h1>
      </ContentSection>
    </>
  );
};

export default NetworkError;
