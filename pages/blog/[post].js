/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React from 'react';
import Head from 'next/head';
import Markdown from 'markdown-to-jsx';
import fm from 'front-matter';
import Error from '../_error';

import ContentSection from '../../components/shared/ContentSection';

const RenderedMarkdown = ({ markdownContent, statusCode }) => {
  if (statusCode) {
    return <Error statusCode={statusCode} />;
  }

  const parsedMarkdown = fm(markdownContent);

  return (
    <div>
      <Head>
        <title key="title">{parsedMarkdown.attributes.title}</title>
      </Head>

      <ContentSection>
        {parsedMarkdown.attributes.title && (
          <h2>{parsedMarkdown.attributes.title}</h2>
        )}
        <Markdown>{parsedMarkdown.body}</Markdown>
      </ContentSection>
    </div>
  );
};

RenderedMarkdown.getInitialProps = async context => {
  const slug = context.query.post;

  try {
    const markdownContent = require(`../../markdown/blog/${slug}.md`).default;
    return { markdownContent };
  } catch (err) {
    return { statusCode: 404 };
  }
};

export default RenderedMarkdown;
