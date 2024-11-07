const path = require('path');

/**
 * @type {import('@rune-ts/server').RuneConfigType}
 */
module.exports = {
  name: 'mpa_rune_boilerplate',
  port: 3002,
  mode: 'render',
  clientEntry: './src/app/client/index.ts',
  serverEntry: './src/app/server/index.ts',
  dynamicChunk: true,
  serverDynamicChunk: true,
  sassOptions: {
    includePaths: [path.join(path.resolve(), './src/shared/styles')],
    additionalData: `@import "global";`,
  },
  showBundleAnalyzer: false,
  publicPath: '',
};
