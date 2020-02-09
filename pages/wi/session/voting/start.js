import React from 'react';
import { NextSeo } from 'next-seo';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';

import { below } from '../../../../utilities';
import ContentSection from '../../../../components/shared/ContentSection';

import Header from '../../../../components/Session/Voting/Start/Header';

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

  ${below.med`
    padding-top: 3rem;
  `};
`;

const VotingStart = ({ user, loading }) => {
  return (
    <div>
      <NextSeo
        title="Session Voting Process - THAT Conference"
        description="Make THAT Conference your conference by letting us know what session you want to see. This page is the introduction to voting."
      />

      <MainContent>
        <MainGrid columns={6}>
          <Cell width={1} />
          <Cell width={4}>
            <Header user={user} loading={loading} />
          </Cell>
          <Cell width={1} />
        </MainGrid>
      </MainContent>
    </div>
  );
};

export default VotingStart;
