import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import ContentSection from '../../../../../components/shared/ContentSection';

import Header from '../../../../../components/User/Profile/Create/Header';
import ContactInfo from '../../../../../components/User/Profile/Create/ContactInfo';

const MainContent = styled(ContentSection)`
  padding-top: 0;
`;

const MainDiv = styled.div`
  max-width: 650px;
  margin: auto;
`;

const CallForSpeakers = () => {
  return (
    <div>
      <Head>
        <title key="title">
          Create User Profile: Contact Info - THAT Conference
        </title>
      </Head>
      <MainContent>
        <MainDiv>
          <Header title="Contact Info" currentStep="0" />
          <ContactInfo />
        </MainDiv>
      </MainContent>
    </div>
  );
};

export default CallForSpeakers;
