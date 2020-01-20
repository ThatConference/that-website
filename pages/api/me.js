/* eslint-disable consistent-return */
import debug from 'debug';
import * as Sentry from '@sentry/browser';
import fetch from 'isomorphic-unfetch';

import auth0 from '../../lib/auth0';

const dlog = debug('that:api:me');

const ME_QUERY = `{"query": "query getMe { members { me { id acceptedCommitments firstName email profileSlug }}}"}`;
const apiUrl = process.env.API_GATEWAY || 'https://api.that.tech';

export default async function me(req, res) {
  dlog('api/me called');

  try {
    const userSession = await auth0.getSession(req);
    if (!userSession) {
      dlog('user has no session');
      return res.json({});
    }
    // Using tokenCache handles token expiration checks and refresh
    const tokenCache = await auth0.tokenCache(req, res);
    const { accessToken } = await tokenCache.getAccessToken();
    dlog(
      userSession.accessToken === accessToken
        ? 'tokens same'
        : 'tokens different',
    );

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${accessToken}`,
      },

      body: ME_QUERY,
    };

    let profileComplete = false;

    const thatMe = await fetch(apiUrl, options)
      .then(async r => {
        if (r.ok) {
          const tme = await r.json();
          if (tme.data.members.me) {
            profileComplete = true;
            return tme.data.members.me;
          }
          return {};
        }

        // todo.. what if it's not a 200?
        return undefined;
      })
      .catch(err => {
        dlog('fetch me error %o', err);
        return undefined;
      });

    dlog('thatMe %o', thatMe);

    const thisIsME = {
      profileComplete,
      ...thatMe,
      session: {
        ...userSession.user,
        accessToken,
      },
    };

    dlog('me -> thisIsMe', thisIsME);

    return res.json(thisIsME);
  } catch (error) {
    dlog('api/me errored: %o', error);
    Sentry.captureException(error);
    res.status(error.status || 500).end(error.message);
  }
}

export async function meSimple(req, res) {
  dlog('api/meSimple called');
  try {
    await auth0.handleProfile(req, res);
  } catch (error) {
    dlog('me errored: %o', error);
    Sentry.captureException(error);
    res.status(error.status || 500).end(error.message);
  }
}
