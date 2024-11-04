/**
 * @type {import('@rune-ts/server').RuneConfigType}
 */
module.exports = {
  name: 'mpa_rune_boilerplate',
  port: 3002,
  mode: 'render',
  clientEntry: './src/app/client/app.ts',
  serverEntry: './src/app/server/index.ts',
  dynamicChunk: true,
  serverDynamicChunk: true,
  // sassOptions: {
  //     includePaths: [path.join(path.resolve(), '../common/style')],
  //     additionalData: `@import "base";`,
  // },
  showBundleAnalyzer: false,
  // internalModules: [/@packages\/*\w+/, /@marpple\/rune-ui/],
  publicPath: '',
};
