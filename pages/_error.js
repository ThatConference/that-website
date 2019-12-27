import React from 'react';
import Head from 'next/head';

import ContentSection from '../components/shared/ContentSection';
import LinkButton from '../components/shared/LinkButton';

const genericError = (
  <>
    <h2>Whoops</h2>
    <p>Well that&apos;s not good.</p>
  </>
);

const pageNotFound = requestedUrl => {
  const scrubbedUrl = `https://old.thatconference.com${requestedUrl}`;

  return (
    <>
      <h2>Page not found</h2>
      <p>
        Truth be told, were building a new website. In fact this is it but we
        don&apos;t have all the pieces completed yet.
      </p>

      <p>Don&apos;t worry, we still have our old Website around.</p>

      <LinkButton
        href={scrubbedUrl}
        label="Yes, take me now!"
        color="thatBlue"
        borderColor="thatBlue"
        hoverBorderColor="thatBlue"
        hoverColor="white"
        hoverBackgroundColor="thatBlue"
      />
    </>
  );
};

function Error({ statusCode, requestedUrl }) {
  const errorBlock =
    statusCode === 404 ? pageNotFound(requestedUrl) : genericError;
  return (
    <>
      <Head>
        <title key="title">Oh No! - THAT Conference</title>
      </Head>
      <ContentSection>{errorBlock}</ContentSection>;
    </>
  );
}

Error.getInitialProps = ({ res, err, req }) => {
  const requestedUrl = req.url;
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode, requestedUrl };
};

export default Error;
