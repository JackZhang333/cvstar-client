//请求转发给本地测试服务或者是生产环境的云服务器
const testEnv = 'http://localhost:3000'
const proEnv = 'http://121.196.189.48:3000'
module.exports = {
  // publicPath: './',
  outputDir: 'dist',
  // assetsDir: 'static',
  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          target: proEnv,
          changeOrigin: true,
          secure: false
        },
      },
    }
  }

}