import debug from 'debug';
import * as Sentry from '@sentry/browser';
import { randomBytes } from 'crypto';
import base64url from 'base64url';
import auth0 from '../../lib/auth0';

const dlog = debug('that:api:login');

export default async function login(req, res) {
  const redirectUrl = req.query['redirect-url'] || '/';
  const state = Buffer.concat([
    Buffer.from(redirectUrl),
    Buffer.from('|'),
    randomBytes(32),
  ]);
  try {
    dlog('user logging in');
    await auth0.handleLogin(req, res, {
      authParams: {
        state: base64url(state),
      },
    });
  } catch (error) {
    dlog('login errored: %o', error);
    Sentry.captureException(error);
    res.status(error.status || 500).end(error.message);
  }
}
