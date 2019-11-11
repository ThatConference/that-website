import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import ContentSection from '../components/shared/ContentSection';

const WorkInProgress = ({ className }) => {
  const clickTracking = label => {
    gtag.event({
      clientWindow: window,
      action: 'click',
      category: 'WIP',
      label: 'build site',
    });
  };

  return (
    <>
      <Head>
        <title key="title">Work in Progress - THAT Conference</title>
      </Head>
      <ContentSection className={className}>
        <h1>Help Us Build THAT Site</h1>
        This site is currently a Work In Progress. Things will be changing
        rapidly and you'll likely notice this each time you visit! We've
        open-sourced the code for the site and would love for you to help out.
        <br />
        <br />
        If you'd like to contribute, head on over to{' '}
        <a
          href="https://github.com/ThatConference/that-website"
          target="_blank"
          rel="noreferrer noopener"
          onClick={clickTracking}
        >
          https://github.com/ThatConference/that-website
        </a>
        .
      </ContentSection>
    </>
  );
};

export default WorkInProgress;
