const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: 'dist', // The directory where the production build files will be generated
  assetsDir: 'static', // Directory where static assets will be placed
  devServer: {
    proxy: {
      '/api': {
        target: 'https://express-mysql-virid.vercel.app', // Proxy API requests to your Express server
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        '__VUE_OPTIONS_API__': JSON.stringify(true),
        '__VUE_PROD_DEVTOOLS__': JSON.stringify(false),
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(false),
      }),
    ],
  },
});
