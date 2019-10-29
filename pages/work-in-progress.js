import React from 'react';
import styled from 'styled-components';
import ContentSection from '../components/shared/ContentSection';
import Head from 'next/head';

const WorkInProgress = ({ className }) => {
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
        >
          https://github.com/ThatConference/that-website
        </a>
        .
      </ContentSection>
    </>
  );
};

export default WorkInProgress;
