import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import _ from 'lodash';

import { below } from '../../utilities';
import ContentSection from '../../components/shared/ContentSection';
import Header from '../../components/CounselorAgreement/Header';
import Commitments from '../../components/CounselorAgreement/Commitments';
import WhatsProvided from '../../components/CounselorAgreement/WhatsProvided';
import Acknowledgment from '../../components/CounselorAgreement/Acknowledgment';
import LoadingIndicator from '../../components/shared/LoadingIndicator';

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

  ul {
    list-style: none;
    padding-inline-start: 2rem;
  }

  ul li::before {
    content: '\\2022';
    color: red;
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }
`;

const MainContent = styled(ContentSection)`
  padding-top: 0;
`;

const CounselorAgreement = ({ user, loading: loadingUser }) => {
  const router = useRouter();

  useEffect(() => {
    if (!loadingUser) {
      if (_.isEmpty(user)) {
        router.push('/api/login?redirect-url=/member/create');
      }

      if (!user.profileComplete) {
        router.push('/member/create');
      }

      if (user.acceptedCommitments) {
        router.push('/wi/session/create');
      }
    }
  });

  if (loadingUser) {
    return <LoadingIndicator />;
  }

  return (
    <div>
      <Head>
        <title key="title">Counselor Agreement - THAT Conference</title>
      </Head>
      <MainContent>
        <MainGrid columns={6}>
          <Cell width={1} />
          <Cell width={4}>
            <Header />
            <Commitments />
            <WhatsProvided />
            <Acknowledgment acceptedCommitments={user.acceptedCommitments} />
          </Cell>
          <Cell width={1} />
        </MainGrid>
      </MainContent>
    </div>
  );
};

export default CounselorAgreement;
