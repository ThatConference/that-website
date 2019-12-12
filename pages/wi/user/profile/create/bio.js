import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import ContentSection from '../../../../../components/shared/ContentSection';

import Header from '../../../../../components/User/Profile/Create/Header';
import Bio from '../../../../../components/User/Profile/Create/Bio';

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
        <title key="title">Create User Profile: Bio - THAT Conference</title>
      </Head>
      <MainContent>
        <MainDiv>
          <Header title="Bio" currentStep="3" />
          <Bio />
        </MainDiv>
      </MainContent>
    </div>
  );
};

export default CallForSpeakers;
