import React from 'react';
import _ from 'lodash';

import ContentSection from '../components/shared/ContentSection';
import LinkButton from '../components/shared/LinkButton';

const genericError = (
  <>
    <h2>Whoops</h2>
    <h4>but... </h4>
    <LinkButton href="/" label="Go Now" />
  </>
);

const pageNotFound = headers => {
  const scrubbedUrl = _.replace(headers.referer, 'www', 'old');

  return (
    <>
      <h2>Page not found</h2>
      <p>maybe it's on our old site</p>

      <LinkButton href={scrubbedUrl} label="Go Now" />
    </>
  );
};

function Error({ statusCode, headers }) {
  const errorBlock = statusCode === 404 ? pageNotFound(headers) : genericError;
  return <ContentSection>{errorBlock}</ContentSection>;
}

Error.getInitialProps = ({ res, err, req }) => {
  console.log('req headers', req.headers);
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode, headers: req.headers };
};

export default Error;
