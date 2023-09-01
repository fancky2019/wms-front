import axios from "axios"; 
import Cookies from 'js-cookie'
import router from "@/router";
import Vue from 'vue'




// axios 封装
class HttpRequest{
  constructor(baseUrl=baseURL){
    this.baseUrl = baseUrl
    this.queue = {}
  }

  getInsideConfig(){
    const config = {
      baseURL:this.baseUrl, // 基础路径
      headers:{'Accept-Language':'zh-Hans'}
    }
    return config
  }

  destroy(url){
    delete this.queue[url]
  }
//request 请求拦截器
  interceptors(instance,url){
    // 请求拦截
    instance.interceptors.request.use(config=>{
      let token = Cookies.get('token')
      // 发送请求时携带token
      if(token&&!config.url.includes('/login')){
        config.headers.Authorization = `Bearer ${token}`
      }
      this.queue[url] = true
      return config
    },error=>{
      return Promise.reject(error) //调用的时候catch可获得数据
    })

    //response响应拦截器
    instance.interceptors.response.use(res=>{
      this.destroy(url)
      const {data,status} = res 
      return {data,status}
    },error=>{
      this.destroy(url)
      let errorInfo = error.response
      // 如果error.response不存在
      if(!errorInfo){
        const {request:{statusText,status},config} = JSON.parse(JSON.stringify(error))
        errorInfo = {statusText,status,request:{responseURL:config.url}}
      }

      // error.response存在
      if(error&&error.response){
        let msg = "服务器内部错误" 
         //console.log("如果有错误--》",errorInfo.data)

        if (errorInfo.data.error_description) {
          msg = errorInfo.data.error_description
        } else if (errorInfo.data.error) {
          msg = errorInfo.data.error
        } else if (errorInfo.data.Message) {
          msg = errorInfo.data.Message
        }   else if (errorInfo.data) {
          msg = errorInfo.data.explain
        }
        if(errorInfo.status ===401){
          Cookies.remove('token')
          Vue.prototype.$message({
            message:'未登录,或登录失败,请登录',
            showClose:true,
            type:'warning'
          })
          router.push('./login')
        }else{
          Vue.prototype.$message({
            message:msg.details||msg.message||msg,
            type:'warning',
            showClose:true
          })
        }
      }
      return Promise.reject(error)
    })
  }
  request(options){
    // 创建axios实例
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance,options.url)
    return instance(options)
  }
}
export default HttpRequest