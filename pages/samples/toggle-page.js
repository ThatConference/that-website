import React from 'react';
import { NextSeo } from 'next-seo';
import togglePage from '../../utilities/togglePage';

import ContentSection from '../../components/shared/ContentSection';

const TogglePage = () => {
  return (
    <>
      <NextSeo
        title="Sample Toggle Page - THAT Conference"
        description="Sample toggle page functionality as part of THAT standard functions."
        noindex
      />

      <ContentSection>
        <h1>Sample Toggle Page</h1>
        <p>
          This page demonstrates how to use the togglePage HOC so that we can
          iterate on new feature/page development without introducing the page
          to the site until we are ready.
        </p>
      </ContentSection>
    </>
  );
};

export default togglePage(TogglePage);
