import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import { Grid, Cell } from 'styled-css-grid';

import { below } from '../../utilities';
import ContentSection from '../../components/shared/ContentSection';
import Icon from '../../components/shared/Icon';

import Header from '../../components/CounselorSelectionProcess/Header';
import TheProcess from '../../components/CounselorSelectionProcess/TheProcess';
import Bottom from '../../components/CounselorSelectionProcess/Bottom';

const MainGrid = styled(Grid)`
  grid-gap: 2.5rem;

  ${below.med`
    display: block;
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
  position: relative;
  top: 2.2rem;

  &:hover {
    color: ${({ theme }) => theme.colors.tertiary};
    svg {
      fill: ${({ theme }) => theme.colors.tertiary};
    }
  }

  svg {
    vertical-align: text-bottom;
    width: 1.7rem;
    height: 1.7rem;
  }
  span {
    margin-left: 0.5rem;
  }

  ${below.med`
    position: unset;
    top: unset;
  `};
`;

const BackArrow = styled(Icon)`
  fill: ${({ theme }) => theme.colors.thatBlue};
`;

const CounselorSelection = () => {
  return (
    <div>
      <Head>
        <title key="title">Counselor Selection Process - THAT Conference</title>
      </Head>
      <MainContent>
        <MainGrid columns={6}>
          <Cell width={1}>
            <Link href="call-for-counselors">
              <BackLink>
                <BackArrow
                  icon="backArrow"
                  height="2rem"
                  width="2rem"
                  viewBoxHeight="100"
                  viewBoxWidth="100"
                />
                <span>Back to Call for Counselors</span>
              </BackLink>
            </Link>
          </Cell>
          <Cell width={4}>
            <Header />
            <TheProcess />
            <Bottom />
          </Cell>
          <Cell width={1} />
        </MainGrid>
      </MainContent>
    </div>
  );
};

export default CounselorSelection;
