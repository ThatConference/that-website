import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import Router from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import ContentSection from '../../../../components/shared/ContentSection';

import Header from '../../../../components/Session/Submit/Header';
import Details from '../../../../components/Session/Submit/Details';

import { useFetchUser } from '../../../../lib/user';

const GET_MEMBER = gql`
  query getMember {
    members {
      me {
        id
        acceptedCommitments
        isOver18
      }
    }
  }
`;

const SessionDetails = ({ user: reduxUser, dispatch }) => {
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
      Router.push('/api/login?redirect-url=/wi/session/submit/details');
    }
  });
  if (user) {
    const { loading: memberLoading, error: memberError, data } = useQuery(
      GET_MEMBER,
    );

    if (memberLoading) return null;
    if (memberError) return null;

    const member = data.members.me;

    if (!member) {
      React.useEffect(() => {
        Router.push('ToDo: Need Profile URL');
      });
      return null;
    }

    return (
      <div>
        <Head>
          <title key="title">
            Session Submission: Details - THAT Conference
          </title>
        </Head>
        <ContentSection forForm>
          <Header title="Session Details" currentStep="1" />
          <Details />
        </ContentSection>
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

export default connect(mapStateToProps)(SessionDetails);
