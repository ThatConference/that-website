import React, { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import { below } from '../../utilities';
import ContentSection from '../../components/shared/ContentSection';
import CurrentSessions from '../../components/Member/MySessions/Current';
import LoadingIndicator from '../../components/shared/LoadingIndicator';
import Title from '../../components/shared/Title';

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

const MainSection = styled.div`
  margin-bottom: 6rem;
`;

const MySessions = ({ user, loading }) => {
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/api/login?redirect-url=/wi/session/create');
    }
  });

  return (
    <div>
      <NextSeo
        title="My Sessions - THAT Conference"
        description="Your list of THAT Conference session."
        noindex
      />
      <ContentSection>
        {loading && <LoadingIndicator />}
        {!loading && (
          <MainGrid columns={6}>
            <Cell width={1} />
            <Cell width={4}>
              <MainSection>
                <Title>Your Sessions</Title>
                <p className="medium-body-copy">
                  Community voting is now in progress through March 22nd!
                  Sessions chosen for THAT Conference 2020 will be announced on
                  April 13th.
                </p>
              </MainSection>
              <CurrentSessions user={user} loading={loading} />
            </Cell>
            <Cell width={1} />
          </MainGrid>
        )}
      </ContentSection>
    </div>
  );
};

export default MySessions;
