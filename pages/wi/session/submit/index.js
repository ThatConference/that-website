import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import Router from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import ContentSection from '../../../../components/shared/ContentSection';

import Header from '../../../../components/Session/Submit/Header';
import Intro from '../../../../components/Session/Submit/Intro';

const _ = require('lodash');

const GET_MEMBER = gql`
  query getMember {
    members {
      me {
        id
      }
    }
  }
`;

const SessionIntro = ({ currentUser }) => {
  if (_.isEmpty(currentUser)) {
    Router.push('/api/login?redirect-url=/member/create');
  }

  const { loading, error, data } = useQuery(GET_MEMBER);

  if (loading) return 'Loading...';
  if (error) return null;

  const member = data.members.me;

  if (!member) {
    Router.push('/member/create');
  } else if (member.acceptedCommitments) {
    Router.push('/wi/session/submit');
  }

  return (
    <div>
      <Head>
        <title key="title">Session Submission: Intro - THAT Conference</title>
      </Head>
      <ContentSection forForm>
        <Header title="Session Introduction" currentStep="0" />
        <Intro />
      </ContentSection>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(SessionIntro);
