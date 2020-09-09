const testEnv = 'http://localhost:3000'
const proEnv = 'http://121.196.189.48:3000'
module.exports = {
        configureWebpack:{
          devServer:{
            proxy:{
              '/api':{
                target:testEnv,
                changeOrigin:true,
                secure:false
              },
            },
          }
      }  

}