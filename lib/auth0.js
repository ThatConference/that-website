import { initAuth0 } from '@auth0/nextjs-auth0';

const settings = {
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  audience: process.env.AUTH0_AUDIENCE,
  scope: process.env.AUTH0_SCOPE,
  domain: process.env.AUTH0_DOMAIN,
  redirectUri: process.env.REDIRECT_URI,
  postLogoutRedirectUri: process.env.POST_LOGOUT_REDIRECT_URI,
  session: {
    cookieSecret: process.env.SESSION_COOKIE_SECRET,
    cookieLifetime: process.env.SESSION_COOKIE_LIFETIME,
    // cookieDomain: process.env.SESSION_COOKIE_DOMAIN,
    storeIdToken: false,
    storeAccessToken: true,
    storeRefreshToken: true,
  },
};

export default initAuth0(settings);
