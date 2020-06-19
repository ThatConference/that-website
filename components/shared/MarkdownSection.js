import React from 'react';
import Head from 'next/head';
import Markdown from 'markdown-to-jsx';
import styled from 'styled-components';
import ContentSection from './ContentSection';

const StyledContentSection = styled(ContentSection)`
  a.faq-link {
    color: ${({ theme }) => theme.colors.primary};
    padding-top: 6rem;
    margin-top: -6rem;

    &:focus {
      outline: none;
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

const MarkdownSection = ({ parsedMarkdown, variables }) => {
  const updatedMarkdown = replaceVariables(parsedMarkdown.body, variables);

  return (
    <div>
      <Head>
        <title key="title">
          {parsedMarkdown.attributes.title} - THAT Conference
        </title>
      </Head>

      <StyledContentSection>
        {parsedMarkdown.attributes.title && (
          <h2>{parsedMarkdown.attributes.title}</h2>
        )}
        <Markdown>{updatedMarkdown}</Markdown>
      </StyledContentSection>
    </div>
  );
};

export default MarkdownSection;
