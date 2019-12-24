import debug from 'debug';
import * as Sentry from '@sentry/browser';

import auth0 from '../../lib/auth0';

const dlog = debug('that:api:logout');

export default async function logout(req, res) {
  try {
    dlog('user logging out');
    await auth0.handleLogout(req, res);
  } catch (error) {
    Sentry.captureException(error);
    res.status(error.status || 500).end(error.message);
  }
}
