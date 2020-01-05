import React from 'react';
import Head from 'next/head';

import ContentSection from '../../components/shared/ContentSection';

import Header from '../../components/Member/Profile/Header';
import OnlinePresenceForm from '../../components/Member/Profile/OnlinePresence';

const OnlinePresence = ({ featureKeyword }) => {
  return (
    <div>
      <Head>
        <title key="title">
          Member Profile: Online Presence - THAT Conference
        </title>
      </Head>
      <ContentSection forForm>
        <Header title="Online Presence" currentStep="2" />
        <OnlinePresenceForm featureKeyword={featureKeyword} />
      </ContentSection>
    </div>
  );
};

export default OnlinePresence;
