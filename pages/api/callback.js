import debug from 'debug';
import * as Sentry from '@sentry/browser';
import base64url from 'base64url';
import auth0 from '../../lib/auth0';

const dlog = debug('that:api:callback');

export default async function callback(req, res) {
  const state = base64url.toBuffer(req.query.state || '');
  const sep = state.indexOf('|');
  let redirect2 =
    sep > 0 && state.length - sep - 1 === 32
      ? state.toString('utf8', 0, sep)
      : '/';
  if (redirect2.toLocaleLowerCase().match(/http/g)) {
    redirect2 = '/';
  }
  try {
    dlog('auth0 callback executed');
    await auth0.handleCallback(req, res, { redirectTo: redirect2 });
  } catch (error) {
    dlog('callback errored: %o', error);

    Sentry.captureException(error);
    res.status(error.status || 500).end();
  }
}
