import debug from 'debug';
import * as Sentry from '@sentry/browser';

import auth0 from '../../lib/auth0';

const dlog = debug('that:api:callback');

export default async function callback(req, res) {
  try {
    dlog('auth0 callback executed');
    await auth0.handleCallback(req, res, { redirectTo: '/' });
  } catch (error) {
    dlog('callback errored: %o', error);

    Sentry.captureException(error);
    res.status(error.status || 500).end();
  }
}
