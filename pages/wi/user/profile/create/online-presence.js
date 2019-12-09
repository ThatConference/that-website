import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import ContentSection from '../../../../../components/shared/ContentSection';

import Header from '../../../../../components/User/Profile/Create/Header';
import OnlinePresenceForm from '../../../../../components/User/Profile/Create/OnlinePresence';

const MainContent = styled(ContentSection)`
  padding-top: 0;
`;

const MainDiv = styled.div`
  max-width: 650px;
  margin: auto;
`;

const OnlinePresence = () => {
  return (
    <div>
      <Head>
        <title key="title">
          Create User Profile: Online Presence - THAT Conference
        </title>
      </Head>
      <MainContent>
        <MainDiv>
          <Header title="Online Presence" currentStep="2" />
          <OnlinePresenceForm />
        </MainDiv>
      </MainContent>
    </div>
  );
};

export default OnlinePresence;
