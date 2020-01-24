import React, { useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Grid, Cell } from 'styled-css-grid';
import { below } from '../../../utilities';
import ContentSection from '../../../components/shared/ContentSection';
import Details from '../../../components/Member/SessionEdit/Details';
import LoadingIndicator from '../../../components/shared/LoadingIndicator';

const _ = require('lodash');

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

const MainSection = styled.div`
  margin-bottom: 6rem;
`;

const Title = styled.h1`
  font-weight: 100;
  font-size: 8.5rem;
  margin-bottom: 0;
`;

const MainContent = styled(ContentSection)`
  padding-top: 0;
`;

const SessionEdit = ({ user, loading: loadingUser, sessionId }) => {
  const router = useRouter();

  useEffect(() => {
    if (!loadingUser && _.isEmpty(user)) {
      router.push('/api/login?redirect-url=/wi/session/create');
    }

    if (!loadingUser && !user.profileComplete) {
      router.push('/member/create').then(() => window.scrollTo(0, 0));
    }

    if (!sessionId) {
      router.push('/member/my-sessions').then(() => window.scrollTo(0, 0));
    }
  });

  return (
    <div>
      <Head>
        <title key="title">Edit Session - THAT Conference</title>
      </Head>
      <MainContent>
        <MainGrid columns={6}>
          <Cell width={1} />
          <Cell width={4}>
            <MainSection>
              <Title>Edit Your Session</Title>
            </MainSection>
            {loadingUser && (
              <div style={{ textAlign: 'center', margin: '10rem 0 7rem 0' }}>
                <LoadingIndicator />
              </div>
            )}
            {!loadingUser && (
              <Details
                user={user}
                loading={loadingUser}
                sessionId={sessionId}
              />
            )}
          </Cell>
          <Cell width={1} />
        </MainGrid>
      </MainContent>
    </div>
  );
};

SessionEdit.getInitialProps = ({ query }) => {
  const { sessionId } = query;
  return { sessionId };
};

export default SessionEdit;
