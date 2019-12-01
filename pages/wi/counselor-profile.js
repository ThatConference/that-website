import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';

import { below } from '../../utilities';
import ContentSection from '../../components/shared/ContentSection';
import SubmissionsStepper from '../../components/shared/Counselor/SubmissionStepper';

import Header from '../../components/CounselorProfile/Header';
import Profile from '../../components/CounselorProfile/Form';

const MainGrid = styled(Grid)`
  grid-gap: 2.5rem;

  ${below.med`
    display: block;
    grid-gap: 0;
    margin-top: -5rem;
  `};

  h3 {
    font-weight: 100;
    margin-bottom: 1rem;
  }
`;

const MainContent = styled(ContentSection)`
  padding-top: 0;
`;

const CallForSpeakers = props => {
  return (
    <div>
      <Head>
        <title key="title">Counselor Profile - THAT Conference</title>
      </Head>
      <MainContent>
        <MainGrid columns={6}>
          <Cell width={1} />
          <Cell width={4}>
            <SubmissionsStepper currentStep="1" />
            <Header />
            <Profile />
          </Cell>
          <Cell width={1} />
        </MainGrid>
      </MainContent>
    </div>
  );
};

export default CallForSpeakers;
