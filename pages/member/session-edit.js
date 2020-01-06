import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Router from 'next/router';
import { connect } from 'react-redux';
import { Grid, Cell } from 'styled-css-grid';

import { below } from '../../utilities';
import ContentSection from '../../components/shared/ContentSection';

import Header from '../../components/Member/SessionEdit/Header';
import Details from '../../components/Member/SessionEdit/Details';

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

const SessionEdit = ({ user: reduxUser, dispatch }) => {
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
      Router.push('/api/login?redirect-url=/wi/session/submit');
    }
  });
  if (user) {
    return (
      <div>
        <Head>
          <title key="title">Edit Session - THAT Conference</title>
        </Head>
        <MainContent>
          <MainGrid columns={6}>
            <Cell width={1} />
            <Cell width={4}>
              <Header />
              <Details />
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

export default connect(mapStateToProps)(SessionEdit);
