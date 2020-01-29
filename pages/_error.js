/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Head from 'next/head';
import debug from 'debug';

import sentry from '../lib/sentry';
import ContentSection from '../components/shared/ContentSection';

const dlog = debug('that:website:error');

// import LinkButton from '../components/shared/LinkButton';

// const genericError = (
//   <>
//     <h2>Whoops</h2>
//     <p>Well that&apos;s not good.</p>
//   </>
// );

// const pageNotFound = requestedUrl => {
//   const scrubbedUrl = `https://old.thatconference.com${requestedUrl}`;

//   return (
//     <>
//       <h2>Page not found</h2>
//       <p>
//         Truth be told, were building a new website. In fact this is it but we
//         don&apos;t have all the pieces completed yet.
//       </p>

//       <p>Don&apos;t worry, we still have our old Website around.</p>

//       <LinkButton
//         href={scrubbedUrl}
//         label="Yes, take me now!"
//         color="thatBlue"
//         borderColor="thatBlue"
//         hoverBorderColor="thatBlue"
//         hoverColor="white"
//         hoverBackgroundColor="thatBlue"
//       />
//     </>
//   );
// };

function Error({ title, statusCode, hasGetInitialPropsRun, err, eventId }) {
  console.log('>>>> CLARK <<<<');
  dlog('>>>> CLARK ERROR <<<<');
  let renderEventId;

  if (!hasGetInitialPropsRun && err) {
    renderEventId = sentry.captureException(err);
  }

  // return <Error statusCode={statusCode} />;

  return (
    <>
      <Head>
        <title key="title">Oh No! - THAT Conference</title>
      </Head>
      <ContentSection>
        <h1>There was an error!</h1>
        <p>
          <a
            href="#"
            onClick={() =>
              sentry.showReportDialog({ eventId: eventId || renderEventId })
            }
          >
            <span role="img" aria-label="Megaphone">
              📣
            </span>{' '}
            Report this error
          </a>
        </p>
        <Error statusCode={statusCode} />
      </ContentSection>
    </>
  );
}

Error.getInitialProps = async ({ req, res, err, asPath }) => {
  console.log('>>>> get inital props of ERROR <<<<');
  dlog('>>>> get inital prpps ERROR <<<<');

  const errorInitialProps = await Error.getInitialProps({ res, err });

  errorInitialProps.hasGetInitialPropsRun = true;
  errorInitialProps.requestedUrl = req.url;

  let eventId;

  if (res) {
    if (res.statusCode === 404) {
      return { statusCode: 404 };
    }

    if (err) {
      eventId = sentry.captureException(err);
      return errorInitialProps;
    }
  } else if (err) {
    eventId = sentry.captureException(err);
    return errorInitialProps;
  }

  eventId = sentry.captureException(
    new Error(`_error.js getInitialProps missing data at path: ${asPath}`),
  );

  errorInitialProps.eventId = eventId;

  return errorInitialProps;
};

export default Error;
