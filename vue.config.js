const webpack = require('webpack');
module.exports = {
   publicPath: '/pcMemberCenter/',
   outputDir: 'pcMemberCenter',
  devServer: {
    open: true, //浏览器自动打开页面
    port: 8080,
    proxy: {
      '/shop_web/': {
        target: 'http://www.dev-zuma.com',
        changeOrigin: true,
      },
    }
  },
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $:"jquery",
        jQuery:"jquery",
        "windows.jQuery":"jquery",
      })
    ],
  },
}