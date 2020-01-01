import React from 'react';
import Head from 'next/head';
import togglePage from '../../utilities/togglePage';

import ContentSection from '../../components/shared/ContentSection';

const speakers = () => {
  return (
    <>
      <Head>
        <title key="title">Speakers - THAT Conference</title>
      </Head>

      <ContentSection>
        <h1>Speakers</h1>
      </ContentSection>
    </>
  );
};

export default togglePage(speakers);
