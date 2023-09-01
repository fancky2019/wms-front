
import http from '@/libs/api.axios' 
export const getMaterial = async (value) => { 
  let lastConditions =  [{
    "key":"xCode",
    "value":String(value),
    "operator":0
  } ]
  let param = {
    skipCount: 1,
    maxResultCount:10000, 
    conditionItems:lastConditions,
    sorting: "id desc",
  } 
  // 还需要最外层的基础物料的id 
  let ret =  await http.postAsync("/app/Material/GetList", param)  

  return   ret.data.data.items.filter(x => x.isForbidden === false)
}

// 获取出请单号的数据
export const getApplyShipOrderData = async (value) => {
  let conditon = {
    "skipCount": 1,
    "maxResultCount": 10000,
    "sorting": "id desc",
    "conditionItems": [{
      "key":"xCode",
      "value":String(value),
      "operator":0 
    }]
  }
  let ret = await http.postAsync('/app/ApplyShipOrder/GetList', conditon)
  console.log(ret)
  if(ret!=undefined) {
    return ret.data.data.items
  } 
}

    // 获取申请单号的数据
export const getApplyReceiptData = async(value)=>{
  let conditon = {
    "skipCount": 1,
    "maxResultCount": 10000,
    "sorting": "id desc",
    "conditionItems": [{
      "key":"xCode",
      "value":String(value),
      "operator":0 
    }]
  }
  let ret = await http.postAsync('app/ApplyReceiptOrder/GetList', conditon)
  return  ret.data.data.items 
}

// export const getOneMaterial = async (value) => {
//   let cfg = getConfiguration()
//   let conditon = {
//     'pageNumber': 1,
//     'pageSize': 1,
//     'queryType': 2,
//     'condition': {
//       'xCode': { '=': `${value}` },
//       'barcode': { '=': `${value}` },
//       'mnemonicCode': { '=': `${value}` },
//       'or': {}
//     },
//     'sort': { id: false }
//   }
//   let ret = await http.postAsync('queryManager/material', conditon)
 
 
//     return ret.data.filter(x => x.isForbidden === 'N')[0]
 
// }
// export const getMaterialInventory = async (value) => {
//   let conditon = {
//     'pageNumber': 1,
//     'pageSize': 100,
//     'queryType': 2,
//     'condition': {
//       'packageQuantity': { '>': 0 },
//       'material.xCode': { 'like': `%${value}%` },
//       'material.xName': { 'like': `%${value}%` },
//       'material.barcode': { 'like': `${value}%` },
//       'or': {}
//     },
//     'sort': { id: false }
//   }
//   let ret = await http.postAsync('queryManager/materialInventory', conditon)
//   return ret.data.filter(x => x.isForbidden === 'N')
// }
// export const getLocationByPallet = async (value) => {
//   let conditon = {
//     'pageNumber': 1,
//     'pageSize': 20,
//     'queryType': 2,
//     'condition': {
//       'pallet': { 'like': `%${value}%` },
//       'isSealed': { '=': 'N' },
//       'packageQuantity': { '>': 0 }
//     }
//   }
//   let ret = await http.postAsync('queryManager/inventorydetail', conditon)
//   let data = []
//   let pallets = []
//   ret.data.forEach(x => {
//     if (!pallets.includes(x.pallet)) {
//       pallets.push(x.pallet)
//       data.push(x)
//     }
//   })
//   return data
// }
// export const getColumn = async (table, column, keyword) => {
//   let conditon = {
//     table: table,
//     column: column,
//     keyword: keyword
//   }
//   let data = await http.postAsync('sqlManager/columns', conditon)
//   return data
// }
// export const getAllColumn = async (table, column) => {
//   let conditon = {
//     table: table,
//     column: column
//   }
//   let data = await http.postAsync('sqlManager/allColumns', conditon)
//   return data
// }
// export const getItems = async (type) => {
//   let items = {}
//   let conditon = {
//     pageNumber: 1,
//     pageSize: 2000,
//     condition: {
//       xType: { '=': type },
//       xStatus: { '=': 'ENABLED' }
//     },
//     sort: { id: false },
//     queryType: 2
//   }
//   let ret = await http.postAsync('queryManager/wmsEnumerable', conditon)
//   if (ret) {
//     ret.data.forEach(x => {
//       items[x.xCode] = x.xName
//     })
//   }
//   return items
// }
// export const getBatchNo = async (value) => {
//   let conditon = {
//     'pageNumber': 1,
//     'pageSize': 10000,
//     'queryType': 2,
//     'condition': {
//       'xType': { '=': `RECEIVE` },
//       'materialId': { '=': `${value}` }
//     }
//   }
//   let ret = await http.postAsync('queryManager/batchNo', conditon)
//   return ret.data
// }
// export const getAllBatchNo = async (value) => {
//   let conditon = {
//     'pageNumber': 1,
//     'pageSize': 100,
//     'queryType': 2,
//     'condition': {
//       'xType': { '=': `RECEIVE` },
//       'batchNo': { 'like': `%${value}%` }
//     }
//   }
//   let ret = await http.postAsync('queryManager/batchNo', conditon)
//   return ret.data
// }
// export const getCustomer = async (value) => {
//   let cfg = getConfiguration()
//   let conditon = {
//     'pageNumber': 1,
//     'pageSize': 100,
//     'queryType': 2,
//     'condition': {
//       'xCode': { 'like': `%${value}%` },
//       'xName': { 'like': `%${value}%` },
//       'or': {}
//     },
//     'sort': { id: false }
//   }
//   let ret = await http.postAsync('queryManager/Orgnization', conditon) 
//   return ret.data.filter(x => x.isCustomer === 'Y' && x.xStatus === 'ENABLED') 
// }
