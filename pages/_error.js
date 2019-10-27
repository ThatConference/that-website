import React from 'react';

import ContentSection from '../components/shared/ContentSection';
import LinkButton from '../components/shared/LinkButton';

const genericError = (
  <>
    <h2>Whoops</h2>
    <p>Well that's not good.</p>
  </>
);

const pageNotFound = requestedUrl => {
  const scrubbedUrl = `https://old.thatconference.com/${requestedUrl}`;

  return (
    <>
      <h2>Page not found</h2>
      <p>
        Truth be told, were building a new website. In fact this is it but we
        don't have all the pieces completed yet.
      </p>

      <p>Don't worry, we still have our old Website around.</p>

      <LinkButton href={scrubbedUrl} label="Yes, take me now!" />
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
