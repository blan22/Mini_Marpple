const path = require('path');
const webpack = require('webpack');

/**
 * @type {import('@rune-ts/server').RuneConfigType}
 */
module.exports = {
  name: 'mpa_rune_boilerplate',
  port: 3000,
  mode: 'render',
  envFiles: ['.env'],
  sourcePaths: ['./src'],
  clientEntry: './src/app/client/index.ts',
  serverEntry: './src/app/server/index.ts',
  dynamicChunk: true,
  serverDynamicChunk: true,
  processReload: true,
  sassOptions: {
    includePaths: [path.join(path.resolve(), './src/shared/styles')],
    additionalData: `@import "global";`,
  },
  showBundleAnalyzer: false,
  clientWebpackFinal(config, is_dev) {
    config.devtool = 'eval';

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.SERVER_ENDPOINT': JSON.stringify(process.env.SERVER_ENDPOINT),
      }),
    );
    return config;
  },
};
