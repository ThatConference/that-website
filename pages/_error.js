import React from 'react';
import { Sentry } from '../lib/sentry';
import whoKnows from '../lib/sentry';

function Error({ statusCode }) {
  console.log('CLARK >>', Sentry);
  console.log('whoKnows >>', whoKnows);
  Sentry.captureMessage('Error Page Hit');
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
