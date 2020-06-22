import React from 'react';
import styled from 'styled-components';
import fm from 'front-matter';
import Error from '../../pages/_error';
import ImageContainer from '../shared/ImageContainer';
import { below } from '../../utilities/breakpoint';

const BlogContainer = styled(ImageContainer)`
  width: 70vw;
  margin: 0 0 3rem 0;
  padding: 3rem;
  align-items: flex-start;

  ${below.large`
    width: 100%;
  `};
`;

const BlogItem = styled.a`
  display: flex;
  text-align: left;
  align-items: center;

  ${below.small`
    flex-direction: column;
  `};
`;

const BlogDetail = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;

  ${below.small`
    margin-top: 2rem;
  `};
`;

const Title = styled.h4`
  margin: 0 0 1rem 0;
`;

const Description = styled.p`
  margin: 0;
`;

const BlogLeadImage = styled.img`
  width: 22rem;
  height: 12rem;
`;

const PublishedInfo = styled.p`
  font-size: 1.2rem;
  margin-bottom: 0;
`;

const BlogListItem = ({ slug }) => {
  let markdownContent = '';

  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    markdownContent = require(`../../markdown/blog/${slug}.md`).default;
  } catch (err) {
    return <Error statusCode="404" />;
  }

  const parsedMarkdown = fm(markdownContent);

  return (
    <BlogContainer>
      <BlogItem href={`/blog/${slug}`}>
        <BlogLeadImage
          src={`../../images/blog/${parsedMarkdown.attributes.leadImage}`}
          alt={parsedMarkdown.attributes.title}
        />
        <BlogDetail>
          <Title>{parsedMarkdown.attributes.title}</Title>
          <Description>{parsedMarkdown.attributes.description}</Description>
          <PublishedInfo>{`${parsedMarkdown.attributes.publishedDate} - ${parsedMarkdown.attributes.author}`}</PublishedInfo>
        </BlogDetail>
      </BlogItem>
    </BlogContainer>
  );
};

export default BlogListItem;
