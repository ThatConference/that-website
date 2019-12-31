const dotenv = require('dotenv');
const nextSourceMaps = require('@zeit/next-source-maps');
const webpack = require('webpack');
const { version } = require('./package.json');

dotenv.config();

const sourceMaps = nextSourceMaps({
  webpack: (config, { isServer, buildId }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.SENTRY_RELEASE': JSON.stringify(buildId),
      }),
    );

    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });

    // config.module.rules.push({
    //   test: /\.js$/,
    //   exclude: /node_modules/,
    //   loader: 'eslint-loader',
    //   options: {
    //     emitError: true,
    //     emitWarning: false,
    //     failOnError: false,
    //     failOnWarning: false,
    //   },
    // });

    if (!isServer) {
      // eslint-disable-next-line no-param-reassign
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }

    console.log(`buildId ${buildId}`);
    return config;
  },
});

const generateBuildId = async () => {
  // return `that-website@${version}-xyz880`;
  const gitsha = process.env.NOW_GITHUB_COMMIT_SHA;
  if (gitsha) {
    return `that-website@${version}-${gitsha.substring(0, 6)}`;
  }
  return null;
};

module.exports = {
  target: 'serverless',
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  env: {
    SENTRY_DSN: process.env.SENTRY_DSN,
    API_GATEWAY: process.env.API_GATEWAY,
    WI_PROSPECTUS_URL:
      'https://storage.googleapis.com/that-bucket/2020_THATConference_Prospectus.pdf',
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
    AUTH0_SCOPE: process.env.AUTH0_SCOPE,
    REDIRECT_URI:
      process.env.REDIRECT_URI || 'http://localhost:3000/api/callback',
    POST_LOGOUT_REDIRECT_URI:
      process.env.POST_LOGOUT_REDIRECT_URI || 'http://localhost:3000',
    SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,
    SESSION_COOKIE_DOMAIN: process.env.SESSION_COOKIE_DOMAIN,
    SESSION_COOKIE_LIFETIME: 7200,
  },
  ...sourceMaps,
  generateBuildId,
};
