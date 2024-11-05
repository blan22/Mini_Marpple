const path = require('path');

/**
 * @type {import('@rune-ts/server').RuneConfigType}
 */
module.exports = {
  name: 'mpa_rune_boilerplate',
  port: 3000,
  mode: 'render',
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
};
