import debug from 'debug';
import * as Sentry from '@sentry/browser';

import auth0 from '../../lib/auth0';

const dlog = debug('that:api:login');

export default async function login(req, res) {
  try {
    dlog('user logging in');
    await auth0.handleLogin(req, res);
  } catch (error) {
    dlog('login errored: %o', error);
    Sentry.captureException(error);
    res.status(error.status || 500).end(error.message);
  }
}
