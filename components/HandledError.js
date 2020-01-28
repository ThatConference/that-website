/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Head from 'next/head';
import * as Sentry from '@sentry/node';

const HandledError = ({ eventId }) => {
  return (
    <>
      <Head>
        <title key="title">Oh No! - THAT Conference</title>
      </Head>

      <section>
        <h1>There was an error!</h1>
        <p>
          <a href="#" onClick={() => Sentry.showReportDialog({ eventId })}>
            <span role="img" aria-label="Megaphone">
              📣
            </span>{' '}
            Report this error
          </a>
        </p>
        <p>
          <a
            href="#"
            onClick={() => {
              window.location.reload(true);
            }}
          >
            Or, try reloading the page
          </a>
        </p>
      </section>
    </>
  );
};

export default HandledError;
