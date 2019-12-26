import debug from 'debug';
import * as Sentry from '@sentry/browser';

import auth0 from '../../lib/auth0';

const dlog = debug('that:api:me');

export default async function me(req, res) {
  try {
    dlog('calling auth0 to get profile');
    await auth0.handleProfile(req, res);
  } catch (error) {
    dlog('me errored: %o', error);
    Sentry.captureException(error);
    res.status(error.status || 500).end(error.message);
  }
}
