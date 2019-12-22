import debug from 'debug';
import * as Sentry from '@sentry/browser';

import auth0 from '../../lib/auth0';

const dlog = debug('api:login');

export default async function login(req, res) {
  try {
    dlog('user logging in');
    await auth0.handleLogin(req, res);
  } catch (error) {
    Sentry.captureException(error);
    res.status(error.status || 500).end(error.message);
  }
}
