module.exports = {
        configureWebpack:{
          devServer:{
            proxy:{
              '/api':{
                target:'http://121.196.189.48:3000',
                changeOrigin:true,
                secure:false
              },
            },
          }
      }  

}