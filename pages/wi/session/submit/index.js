import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import ContentSection from '../../../../components/shared/ContentSection';

import Header from '../../../../components/Session/Submit/Header';
import ContactInfo from '../../../../components/Session/Submit/Intro';

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
        <title key="title">Session Submission: Intro - THAT Conference</title>
      </Head>
      <MainContent>
        <MainDiv>
          <Header title="Session Introduction" currentStep="0" />
          <ContactInfo />
        </MainDiv>
      </MainContent>
    </div>
  );
};

export default CallForSpeakers;
