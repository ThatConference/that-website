import React from 'react';
import styled from 'styled-components';
import fm from 'front-matter';
import Link from 'next/link';
import ContentSection from '../shared/ContentSection';
import ThatLink from '../shared/ThatLink';
import { above, below } from '../../utilities';

const twoColBp = 'larger';

const Main = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  justify-content: center;
  align-items: center;

  ${below[twoColBp]`
    flex-direction: column;
  `};
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  min-width: 37rem;

  ${above[twoColBp]`
    margin-right: 4rem;
  `};

  ${below[twoColBp]`
    align-items: center;
  `};
`;

const StyledH3 = styled.h3`
  color: ${({ theme }) => theme.colors.fonts.light};
  margin: 3rem 0 0 0;
`;

const StyledH2 = styled.h2`
  color: ${({ theme }) => theme.colors.fonts.light};
  margin: 1rem 0 0 0;

  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
    cursor: pointer;
  }
`;

const BlogLink = styled(ThatLink)`
  ${below[twoColBp]`
    display: none;
  `};
`;

const RoundImageBlock = styled.div`
  width: 20rem;
  height: 20rem;
  border-radius: 20rem;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
  overflow: hidden;
  flex-grow: 0;
  flex-shrink: 0;

  ${below[twoColBp]`
    margin-top: 4rem;
  `};
`;
const HighlightImage = styled.img`
  width: 25rem;
  height: 25rem;
  position: relative;
  top: 3.5rem;
  left: -3rem;
`;

const LatestBlogBlock = styled.div`
  padding-left: 4rem;

  &:hover {
    p,
    h4 {
      color: ${({ theme }) => theme.colors.highlight};
    }
    cursor: pointer;
  }
`;

const BlogTitle = styled.h4`
  color: ${({ theme }) => theme.colors.fonts.light};
  text-transform: uppercase;
`;

const Blog = ({ className }) => {
  let markdownContent = '';
  const currentBlogSlug = 'refactoring-THAT-conference-2020';

  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    markdownContent = require(`../../markdown/blog/${currentBlogSlug}.md`)
      .default;
  } catch (err) {
    return null;
  }

  const parsedMarkdown = fm(markdownContent);

  return (
    <ContentSection
      className={className}
      backgroundColor="thatBlue"
      backgroundOpacity={0.82}
      backgroundImage="/images/group.jpg"
    >
      <Main>
        <TitleBlock>
          <StyledH3>Latest Update From</StyledH3>
          <Link href="/blog" prefetch={false} passHref>
            <StyledH2>THAT Blog</StyledH2>
          </Link>
          <BlogLink
            title="See All Blog Entries"
            href="/blog"
            isLocal
            color="white"
            style={{ textAlign: 'left', paddingTop: '5rem' }}
          />
        </TitleBlock>
        <RoundImageBlock>
          <HighlightImage
            src="/images/bear-pig.png"
            loading="lazy"
            alt="Latest From THAT Blog"
          />
        </RoundImageBlock>
        <a href={`/blog/${currentBlogSlug}`} prefecth={false}>
          <LatestBlogBlock>
            <BlogTitle>{parsedMarkdown.attributes.title}</BlogTitle>
            <p className="font-light">{parsedMarkdown.attributes.excerpt}</p>
            <p className="float-right font-light">Continue Reading...</p>
          </LatestBlogBlock>
        </a>
      </Main>
    </ContentSection>
  );
};

export default styled(Blog)``;
