import React from 'react';

import ContentSection from '../components/shared/ContentSection';
import LinkButton from '../components/shared/LinkButton';

const genericError = (
  <>
    <h2>Whoops</h2>
    <h4>but... </h4>
    <LinkButton href="/" label="Go Now" />
  </>
);

const pageNotFound = requestedUrl => {
  const scrubbedUrl = `https://old.thatconference.com/${requestedUrl}`;

  return (
    <>
      <h2>Page not found</h2>
      <p>maybe it's on our old site</p>

      <LinkButton href={scrubbedUrl} label="Go Now" />
    </>
  );
};

function Error({ statusCode, requestedUrl }) {
  const errorBlock =
    statusCode === 404 ? pageNotFound(requestedUrl) : genericError;
  return <ContentSection>{errorBlock}</ContentSection>;
}

Error.getInitialProps = ({ res, err, req }) => {
  console.log('req headers', req.url);

  const requestedUrl = req.url;
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode, requestedUrl };
};

export default Error;
