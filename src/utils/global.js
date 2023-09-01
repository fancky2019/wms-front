/**
 * 全局常量、方法封装模块
 * 通过原型挂载到Vue属性
 * 通过 this.Global 调用
 */

 // 后台管理系统服务器地址
// export const baseUrl = 'http://192.168.16.204:44350'
// export const baseUrl = 'http://localhost:44350'
// export const baseUrl = 'http://192.168.108.254:44350'
export const baseUrl = 'http://gen-song.vip:44350'


 // 系统数据备份还原服务器地址
// export const backupBaseUrl = 'http://139.196.87.48:8002'


export default {
    baseUrl,
    // backupBaseUrl
}
