/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React from 'react';

import fm from 'front-matter';
import flatten from 'flat';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Error from '../../_error';
import ContentSection from '../../../components/shared/ContentSection';
import LoadingIndicator from '../../../components/shared/LoadingIndicator';
import MarkdownSection from '../../../components/shared/MarkdownSection';

// Query for event specific data to use in markdown rendering
const GET_EVENT = gql`
  query getEvent($eventId: ID!) {
    events {
      event(id: $eventId) {
        get {
          id
          name
          slogan
          startDate
          endDate
        }
      }
    }
  }
`;

const RenderedMarkdown = ({ markdownContent, statusCode }) => {
  if (statusCode) {
    return <Error statusCode={statusCode} />;
  }

  const parsedMarkdown = fm(markdownContent);

  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { eventId: process.env.CURRENT_EVENT_ID }, // WI eventId
  });

  if (loading) {
    return (
      <ContentSection>
        <LoadingIndicator />
      </ContentSection>
    );
  }
  if (error) throw new Error(error);

  return (
    <MarkdownSection
      parsedMarkdown={parsedMarkdown}
      variables={flatten(data.events, { delimiter: '_' })}
    />
  );
};

RenderedMarkdown.getInitialProps = async context => {
  const slug = context.query.markdown;

  try {
    const markdownContent = require(`../../../markdown/wi/2021/${slug}.md`)
      .default;
    return { markdownContent };
  } catch (err) {
    return { statusCode: 404 };
  }
};

export default RenderedMarkdown;
