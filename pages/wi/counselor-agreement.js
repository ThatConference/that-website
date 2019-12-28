import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import Router from 'next/router';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';

import { below } from '../../utilities';
import ContentSection from '../../components/shared/ContentSection';
import togglePage from '../../utilities/togglePage';

import Header from '../../components/CounselorAgreement/Header';
import Commitments from '../../components/CounselorAgreement/Commitments';
import WhatsProvided from '../../components/CounselorAgreement/WhatsProvided';
import Acknowledgment from '../../components/CounselorAgreement/Acknowledgment';

import { useFetchUser } from '../../lib/user';

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

const CounselorAgreement = ({ user: reduxUser, dispatch, featureKeyword }) => {
  let user = reduxUser;
  let loading = true;

  if (!user) {
    const { cookieUser, loading: userLoading } = useFetchUser();
    loading = userLoading;
    if (!userLoading) {
      dispatch({ type: 'USER', payload: cookieUser });
      user = cookieUser;
    }
  }

  React.useEffect(() => {
    if (!loading && !user) {
      Router.push(
        `/api/login?redirect-url=/wi/counselor-agreement?feature=${featureKeyword}`,
      );
    }
  });
  if (user) {
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
              <Acknowledgment featureKeyword={featureKeyword} />
            </Cell>
            <Cell width={1} />
          </MainGrid>
        </MainContent>
      </div>
    );
  }
  return null;
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(togglePage(CounselorAgreement));
