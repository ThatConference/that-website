/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React from 'react';
import Head from 'next/head';
import Markdown from 'markdown-to-jsx';
import fm from 'front-matter';
import flatten from 'flat';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Error from '../_error';

import ContentSection from '../../components/shared/ContentSection';

// Query for event specific data to use in markdown rendering
const GET_EVENT = gql`
  query getEvent($eventId: ID!) {
    event(id: $eventId) {
      id
      name
      slogan
      startDate
      endDate
      venues {
        id
        name
        address
        city
        state
        zip
      }
      milestones {
        title
        description
        dueDate
      }
    }
  }
`;

const replaceVariables = (markdownBody, variables) => {
  // create regEx with all variables as keys that are pipe delimited, for example "event_date|event_name|event_slogan"
  const regularExpression = new RegExp(Object.keys(variables).join('|'), 'gi');

  // do the actual replace searching for regEx matches on keys and replace using the values
  return markdownBody.replace(regularExpression, matched => {
    return variables[matched];
  });
};

const RenderedMarkdown = ({ markdownContent, statusCode }) => {
  if (statusCode) {
    return <Error statusCode={statusCode} />;
  }

  const parsedMarkdown = fm(markdownContent);

  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { eventId: 'ByE7Dc7eCGcRFzLhWhuI' }, // WI eventId
  });
  if (loading) return null;
  if (error) return null;

  const updatedMarkdown = replaceVariables(
    parsedMarkdown.body,
    flatten(data, { delimiter: '_' }),
  );

  return (
    <div>
      <Head>
        <title key="title">{parsedMarkdown.attributes.title}</title>
      </Head>

      <ContentSection>
        {parsedMarkdown.attributes.title && (
          <h2>{parsedMarkdown.attributes.title}</h2>
        )}
        <Markdown>{updatedMarkdown}</Markdown>
      </ContentSection>
    </div>
  );
};

RenderedMarkdown.getInitialProps = async context => {
  const slug = context.query.markdown;

  try {
    const markdownContent = require(`../../markdown/${slug}.md`).default;
    return { markdownContent };
  } catch (err) {
    return { statusCode: 404 };
  }
};

export default RenderedMarkdown;
