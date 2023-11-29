module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://mgmvip.cn/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
  }
}