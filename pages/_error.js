import React from 'react';
import sentry from '../lib/sentry';

function Error({ statusCode }) {
  const { Sentry } = sentry();
  console.log('this is my sentry', Sentry);
  console.log('dsn', process.env.SENTRY_DSN);

  Sentry.captureEvent('this is an event');
  Sentry.captureException({ message: 'broke' });
  Sentry.captureMessage('making a message');

  console.log('done did the thing');

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
