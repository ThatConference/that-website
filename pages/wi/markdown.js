import React, { Component } from 'react';
import { render } from 'react-dom';
import Head from 'next/head';
import Markdown from 'markdown-to-jsx';

import ContentSection from '../../components/shared/ContentSection';

const someVariables = {
  conferenceDate: 'August 3 - 6, 2020',
  ticketUrl: 'http://www.thatconference.com',
};

const md = `
- [Tickets](${someVariables.ticketUrl})
- list
<ContentSection>
The conference is ${someVariables.conferenceDate}
</ContentSection>
`;

const pocMarkdown = props => (
  <div>
    <Head>
      <title key="title">POC: Markdown - THAT Conference</title>
    </Head>

    <ContentSection>
      <h1>POC: Markdown</h1>
      <Markdown>{md}</Markdown>
    </ContentSection>
  </div>
);

export default pocMarkdown;
