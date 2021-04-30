module.exports = {
  pluginOptions: {
    webpack: {
      dir: [
        './webpack'
      ]
    }
  },

  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
  runtimeCompiler: true
}
