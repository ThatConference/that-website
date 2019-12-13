const webpack = require('webpack');

const nextSourceMaps = require('@zeit/next-source-maps');

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

    config.module.rules.push({
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        emitError: true,
        emitWarning: false,
        failOnError: false,
        failOnWarning: false,
      },
    });

    if (!isServer) {
      // eslint-disable-next-line no-param-reassign
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }

    return config;
  },
});

module.exports = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  env: {
    API_GATEWAY: 'https://us-central1-all-that.cloudfunctions.net/graphGateway',
    WI_PROSPECTUS_URL:
      'https://storage.googleapis.com/that-bucket/2020_THATConference_Prospectus.pdf',
  },
  ...sourceMaps,
};
