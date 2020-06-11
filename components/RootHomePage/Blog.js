import React from 'react';
import fm from 'front-matter';
import DetailToLearnMore from '../shared/DetailToLearnMore';

const Blog = () => {
  let markdownContent = '';
  const currentBlogSlug = 'april-2020-update';

  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    markdownContent = require(`../../markdown/blog/${currentBlogSlug}.md`)
      .default;
  } catch (err) {
    return null;
  }

  const parsedMarkdown = fm(markdownContent);

  return (
    <DetailToLearnMore
      blockDescription={parsedMarkdown.attributes.excerpt}
      blockLinkText="Continue Reading..."
      blockLinkUrl={`/blog/${currentBlogSlug}`}
      blockTitle={parsedMarkdown.attributes.title}
      largeTitle="THAT BLOG"
      showMiddleImage
      smallTitle="Latest Update From"
      titleLinkText="See All Blog Entries"
      titleLinkUrl="/blog"
    />
  );
};

export default Blog;
