import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Grid, Cell } from 'styled-css-grid';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { below } from '../../utilities';
import ContentSection from '../../components/shared/ContentSection';

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

const CounselorAgreement = ({ user: reduxUser, dispatch, featureKeyword }) => {
  let user = reduxUser;
  let userLoading = true;

  const auth = () => {};

  if (!user) {
    const { cookieUser, loading } = useFetchUser();
    userLoading = loading;
    if (!userLoading) {
      dispatch({ type: 'USER', payload: cookieUser });
      user = cookieUser;
    }
  }

  React.useEffect(() => {
    if (!userLoading && !user) {
      Router.push(
        `/api/login?redirect-url=/wi/counselor-agreement?feature=${featureKeyword}`,
      );
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
      auth();
    } else if (member.acceptedCommitments) {
      React.useEffect(() => {
        Router.push(`/wi/session/submit?feature=${featureKeyword}`);
      });
      return null;
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
              <Acknowledgment
                featureKeyword={featureKeyword}
                acceptedCommitments={member.acceptedCommitments || false}
                isOver18={member.isOver18 || false}
              />
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

export default connect(mapStateToProps)(CounselorAgreement);
