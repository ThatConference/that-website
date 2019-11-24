import React from 'react';
import Head from 'next/head';
import Markdown from 'markdown-to-jsx';

import ContentSection from '../../components/shared/ContentSection';

import md from '../../markdown/fakeMarkdown';

const someVariables = {
  conferenceDate: 'August 3 - 6, 2020',
  ticketUrl: 'http://www.thatconference.com',
};

// const md = `
// - [Tickets](${someVariables.ticketUrl})
// - list
// <ContentSection>
// The conference is ${someVariables.conferenceDate}
// </ContentSection>
// `;

const pocMarkdown = props => {
  console.log(`xxxxxxxxx ${md}`, props);
  return (
    <div>
      <Head>
        <title key="title">POC: Markdown - THAT Conference</title>
      </Head>

      <ContentSection>
        <h1>POC: Markdown</h1>
        {/* <Markdown>{md}</Markdown> */}
        <Markdown>{props.markdownContent}</Markdown>
      </ContentSection>
    </div>
  );
};

pocMarkdown.getInitialProps = async function(context) {
  const slug = context.query.markdown;

  const markdownContent = require(`../../markdown/${slug}.md`).default;
  console.log('markdownContent:', markdownContent);

  return {
    slug,
    markdownContent,
  };
};

export default pocMarkdown;
