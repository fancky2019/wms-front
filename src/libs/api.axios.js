import axios from "@/libs/api.request"
import config from '@/config'

// 自定义判断元素类型
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

function to (promise) {
  return promise.then(data => {
    return [null, data]
  })
    .catch(err => [err])
}

/*
  接口处理函数
  这个函数每个项目都是不一样的，我现在调整的是适用于
  https://cnodejs.org/api/v1 的接口，如果是其他接口
  需要根据接口的参数进行调整。参考说明文档地址：
  https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
  主要是，不同的接口的成功标识和失败提示是不一致的。
  另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
*/
// 同步axios
function apiAxios (method, url, params, success, failure, baseRoot) {
  let root = baseRoot || config.baseUrl.pro
  if (params) {
    params = filterNull(params)
  }
  axios.request({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: root,
    withCredentials: false
  })
    .then(function (res) {
      success(res.data)
    })
    .catch(function (err) {
      let res = err.response
      if (failure) {
        failure(res)
      }
      /* if (err) {
          window.alert('api error, HTTP CODE: ' + res.status)
        } */
    })
}
// 封装异步axios
function apiAxiosAsync(method,url,params,baseRoot){
  let root = baseRoot||config.baseUrl.pro
  if(params){
    params = filterNull(params)
  }
  return new Promise((resolve,reject)=>{
    axios.request({
      method:method,
      url:url,
      data:method==='POST'||method==='PUT'?params:null,
      params:method==='GET'||method==='DELETE'?params:null,
      baseUrl:'/api',
      // baseURL:root,
      withCredentials:(root&&root.includes('https'))||url.includes('https')
    }).then(
      function(res){
        resolve(res)
      }
    ).catch(
      function (err) {
        reject(err.response)
        }
    )
  })
}

 
// 
export default{
  get: function (url, params, success, failure, baseRoot) {
    return apiAxios('GET', url, params, success, failure, baseRoot)
  },
  post: function (url, params, success, failure, baseRoot) {
    return apiAxios('POST', url, params, success, failure, baseRoot)
  },
  put: function (url, params, success, failure, baseRoot) {
    return apiAxios('PUT', url, params, success, failure, baseRoot)
  },
  delete: function (url, params, success, failure, baseRoot) {
    return apiAxios('DELETE', url, params, success, failure, baseRoot)
  },
  getAsync: async function (url, params, baseRoot) {
    let err, data
    [err, data] = await to(apiAxiosAsync('GET', url, params, baseRoot))
    return data
  },
  postAsync: async function (url, params, baseRoot) {
    let err, data
    [err, data] = await to(apiAxiosAsync('POST', url, params, baseRoot))
    return data
  },
  putAsync: async function (url, params, baseRoot) {
    let err, data
    [err, data] = await to(apiAxiosAsync('PUT', url, params, baseRoot))
    return data
  },
  deleteAsync: async function (url, params, baseRoot) {
    let err, data
    [err, data] = await to(apiAxiosAsync('DELETE', url, params, baseRoot))
    return data
  },
  Export:function (url, params, baseRoot) {
    let root = baseRoot||config.baseUrl.pro
    axios.request({
      method:"get",
      url:url,
      params:params,
      baseUrl:'/api',
      responseType:"blob"
    }).then(response=>{ 
       console.log("获取文件的名称11--》", response.headers )
      let fileName = ''
      let temp = response.headers['Content-Disposition']
      let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      let matches = filenameRegex.exec(temp);
      if (matches != null && matches[1]) {
        fileName = matches[1].replace(/['"]/g, ''); //  解析出文件名 Backup-20230307152152.tgz
      }
      if ('download' in document.createElement('a')) {
        const eleA = document.createElement('a');
        eleA.download = fileName
        eleA.style.display = 'none';
        eleA.href = URL.createObjectURL(blob);
        document.body.appendChild(eleA);
        eleA.click();
        URL.revokeObjectURL(eleA.href); //释放URL对象
        document.body.removeChild(eleA);
  }  
  
    })
     
  },
}