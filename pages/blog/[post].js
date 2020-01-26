/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React from 'react';
import Head from 'next/head';
import Markdown from 'markdown-to-jsx';
import fm from 'front-matter';
import styled from 'styled-components';
import Error from '../_error';
import { below } from '../../utilities/breakpoint';

import ContentSection from '../../components/shared/ContentSection';

const SlimContentSection = styled(ContentSection)`
  width: 70vw;
  margin: auto;
  padding-top: 0;

  h2 {
    margin-top: 0;
    margin-bottom: 2rem;
  }

  h4 {
    margin-bottom: 0rem;
  }

  a.linkButton {
    border: 1px solid ${({ theme }) => theme.colors.thatBlue};
    padding: 2rem;
    color: ${({ theme }) => theme.colors.thatBlue};
    margin: 1rem;
    font-weight: 800;

    &:hover {
      background-color: ${({ theme }) => theme.colors.thatBlue};
      color: ${({ theme }) => theme.colors.white};
    }
  }
  ${below.med`
    width: 90vw;
  `};
`;

const RenderedMarkdown = ({ markdownContent, statusCode }) => {
  if (statusCode) {
    return <Error statusCode={statusCode} />;
  }

  const parsedMarkdown = fm(markdownContent);

  return (
    <div>
      <Head>
        <title key="title">
          {parsedMarkdown.attributes.title} - THAT Conference
        </title>
      </Head>

      <SlimContentSection>
        {parsedMarkdown.attributes.title && (
          <h2>{parsedMarkdown.attributes.title}</h2>
        )}
        <Markdown>{parsedMarkdown.body}</Markdown>
      </SlimContentSection>
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
