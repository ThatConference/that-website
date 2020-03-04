import React from 'react';
import { NextSeo } from 'next-seo';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import { below } from '../../utilities';
import ContentSection from '../../components/shared/ContentSection';
import CurrentSessions from '../../components/Member/MySessions/Current';
import LoadingIndicator from '../../components/shared/LoadingIndicator';
import Title from '../../components/shared/Title';
import LinkButton from '../../components/shared/LinkButton';

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
                  Submit a topic to become a counselor or edit existing
                  sessions. Let the creative juices flow here. We all like to
                  read a good abstract and this might be the first thing a
                  camper knows about you. Not sure which topic to present?
                  Submit more than one! We’ll pick the coolest ones on April
                  13th.
                </p>
                <LinkButton
                  label="Create a New Session"
                  href="/wi/session/create"
                  color="thatBlue"
                  borderColor="thatBlue"
                  hoverBorderColor="thatBlue"
                  hoverColor="white"
                  hoverBackgroundColor="thatBlue"
                />
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

MySessions.secure = true;

export default MySessions;
