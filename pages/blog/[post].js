/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React from 'react';
import Markdown from 'markdown-to-jsx';
import fm from 'front-matter';
import styled from 'styled-components';
import { NextSeo, BlogJsonLd } from 'next-seo';

import Error from '../_error';
import { below } from '../../utilities';
import ContentSection from '../../components/shared/ContentSection';

const SlimContentSection = styled(ContentSection)`
  width: 70vw;
  margin: auto;
  padding-top: 0;

  ${below.small`
    width 100vw;
    padding: 5rem 1rem;
  `}

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

  p.caption {
    font-style: italic;
    padding: 0.5rem 0;
    text-align: center;
    margin: 0;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.fonts.dark};
  }

  p.quote {
    font-style: italic;
    padding: 0.5rem 0;
    text-align: center;
    margin: 0 3rem;
    color: ${({ theme }) => theme.colors.fonts.dark};

    ${below.small`
      margin: 0 1rem;
    `};
  }
`;

const RenderedMarkdown = ({ markdownContent, slug, statusCode }) => {
  if (statusCode) {
    return <Error statusCode={statusCode} />;
  }

  const parsedMarkdown = fm(markdownContent);
  const pageTitle = `${parsedMarkdown.attributes.title} - THAT Conference`;

  return (
    <div>
      <NextSeo
        title={pageTitle}
        description={parsedMarkdown.attributes.description}
        canonical={`https://www.thatconference.com/blog/${slug}`}
        openGraph={{
          images: [
            { url: `../../images/blog/${parsedMarkdown.attributes.leadImage}` },
          ],
        }}
      />
      <BlogJsonLd
        url={`https://www.thatconference.com/blog/${slug}`}
        title={pageTitle}
        images={[
          `https://www.thatconference.com/images/blog/${parsedMarkdown.attributes.leadImage}`,
        ]}
        datePublished={new Date(parsedMarkdown.attributes.publishedDate)}
        dateModified={new Date(parsedMarkdown.attributes.publishedDate)}
        authorName={parsedMarkdown.attributes.author}
        description={parsedMarkdown.attributes.description}
      />

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
    return { markdownContent, slug };
  } catch (err) {
    return { statusCode: 404 };
  }
};

export default RenderedMarkdown;
