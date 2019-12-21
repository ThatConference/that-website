import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';

import { below } from '../../utilities';
import ContentSection from '../../components/shared/ContentSection';
import Icon from '../../components/shared/Icon';
import togglePage from '../../utilities/togglePage';

import Header from '../../components/CounselorSelectionProcess/Header';
import TheProcess from '../../components/CounselorSelectionProcess/TheProcess';
import Bottom from '../../components/CounselorSelectionProcess/Bottom';

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

const BackLink = styled.a`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.thatBlue};
  osition: absolute;
  float: left;
  top: 0;
  margin-top: 5rem;

  svg {
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
  span {
    margin-left: 0.5rem;
  }

  ${below.med`
    margin-top:0;
    margin-left: -25px;
  `};
`;

const BackArrow = styled(Icon)`
  fill: ${({ theme }) => theme.colors.thatBlue};
`;

const CallForSpeakers = ({ featureKeyword }) => {
  return (
    <div>
      <Head>
        <title key="title">Counselor Selection Process - THAT Conference</title>
      </Head>
      <MainContent>
        <MainGrid columns={6}>
          <Cell width={1}>
            <BackLink href="call-for-counselors">
              <BackArrow
                icon="backArrow"
                height="25px"
                width="25px"
                viewBoxHeight="100"
                viewBoxWidth="100"
              />
              <span>Back to Call for Counselors</span>
            </BackLink>
          </Cell>
          <Cell width={4}>
            <Header />
            <TheProcess />
            <Bottom featureKeyword={featureKeyword} />
          </Cell>
          <Cell width={1} />
        </MainGrid>
      </MainContent>
    </div>
  );
};

export default togglePage(CallForSpeakers);
