import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import { NextSeo } from 'next-seo';

import BlogListItem from '../components/BlogList/BlogListItem';
import ContentSection from '../components/shared/ContentSection';
import { gridRepeat } from '../utilities';

const BlogList = styled(ContentSection)`
  padding-top: 0;
`;

const blog = () => (
  <>
    <NextSeo
      title="Blog - THAT Conference"
      description="A collection of articles, tutorials, stories all written by THAT Crew and amazing members of THAT Community."
    />

    <ContentSection>
      <Grid columns={gridRepeat.xsmall}>
        <Cell>
          <h1>THAT Blog</h1>
          <p className="medium-body-copy">
            A collection of articles, tutorials, stories all written by THAT
            Crew and amazing members of THAT Community.
          </p>
        </Cell>
      </Grid>
    </ContentSection>
    <BlogList>
      <BlogListItem slug="turning-your-awesome-into-submissions" />
      <BlogListItem slug="WI-2020-call-for-counselors-open" />
      <BlogListItem slug="2019-happy-holidays" />
      <BlogListItem slug="2019-cs-ed-week" />
      <BlogListItem slug="that-2019-holiday-buying-guide" />
    </BlogList>
  </>
);

export default styled(blog)``;
