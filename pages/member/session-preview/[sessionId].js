import React from 'react';
import { NextSeo } from 'next-seo';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Grid, Cell } from 'styled-css-grid';
import { below } from '../../../utilities';
import ContentSection from '../../../components/shared/ContentSection';
import SessionPreview from '../../../components/shared/SessionPreview';

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

const SessionEdit = ({ sessionId }) => {
  const router = useRouter();

  if (!sessionId) {
    router.push('/member/my-sessions').then(() => window.scrollTo(0, 0));
  }

  return (
    <div>
      <NextSeo
        title="Edit Session - THAT Conference"
        description="Edit your THAT Conference session."
        noindex
      />
      <MainContent>
        <MainGrid columns={6}>
          <Cell width={1} />
          <Cell width={4}>
            <SessionPreview sessionId={sessionId} />
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

SessionEdit.secure = true;

export default SessionEdit;
