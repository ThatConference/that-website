import React from 'react';
import sentry from '../lib/sentry';

function Error({ statusCode }) {
  const { Sentry } = sentry();
  Sentry.captureEvent('error page hit');

  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
