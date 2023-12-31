const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}

const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/api'
  : '/api'

module.exports = {
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
  },
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
    // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    host:'localhost',
    port:8080,
    proxy: {
      '/api':{
        target:'http://60.174.197.249:13998',
        changeOrigin:true,
      }
    }
  },
  //webpack配置
  configureWebpack:{
    //关闭webpack的性能提示
    performance:{
      hints:false
    }
  }
}
