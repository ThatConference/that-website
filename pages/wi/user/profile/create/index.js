import React from 'react';
import Head from 'next/head';

import ContentSection from '../../../../../components/shared/ContentSection';
import togglePage from '../../../../../utilities/togglePage';

import Header from '../../../../../components/User/Profile/Create/Header';
import ContactInfo from '../../../../../components/User/Profile/Create/ContactInfo';

const CallForSpeakers = () => {
  return (
    <div>
      <Head>
        <title key="title">
          Create User Profile: Contact Info - THAT Conference
        </title>
      </Head>
      <ContentSection forForm>
        <Header title="Contact Info" currentStep="0" />
        <ContactInfo />
      </ContentSection>
    </div>
  );
};

export default togglePage(CallForSpeakers);
