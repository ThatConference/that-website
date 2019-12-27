import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';

import { below } from '../../utilities';
import ContentSection from '../../components/shared/ContentSection';
import togglePage from '../../utilities/togglePage';

import Header from '../../components/CounselorStart/Header';

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

const CounselorStart = ({ featureKeyword }) => {
  return (
    <div>
      <Head>
        <title key="title">Counselor Selection Process - THAT Conference</title>
      </Head>
      <MainContent>
        <MainGrid columns={6}>
          <Cell width={1} />
          <Cell width={4}>
            <Header featureKeyword={featureKeyword} />
          </Cell>
          <Cell width={1} />
        </MainGrid>
      </MainContent>
    </div>
  );
};

export default togglePage(CounselorStart);
