import store from '@/store'
import config from '@/config'  
export const setCustomColumns = (key, defaultColumns) => {
  let lang = window.localStorage.getItem('lang')
  let customColumns = config.ui[lang][key]
  if (!customColumns && key.includes('.')) {
    let keys = key.split('.')
    customColumns = config.ui[lang][keys[0]][keys[1]]
  }
  if (!customColumns || customColumns.length === 0 || !defaultColumns || defaultColumns.length === 0) {
    return []
  }
  let newColumns = Object.keys(customColumns).map(x => {
    let c = defaultColumns.find(y => y.key === x)
    if (c) {
      c.title = customColumns[x]
    }
    return c
  }).filter(x => x)
  return newColumns
}
export const getDisplayName = (property, key) => { 
  let configCols = store.state.my.colConfig[property] 
  if (configCols && key) { 
    let col = configCols.filter(x => x.field === key)[0]
    if (col) {
      return [col.displayName]
    }
  }
  let lang = window.localStorage.getItem('lang')
 
  let dic = config.ui[lang][property]  
  if (key) return dic[key]
  return dic
}

export const getManagerItems = (property, key) => {
  let lang = window.localStorage.getItem('lang')
  let dic = config.ui[lang][property][key]
  if (dic && Array.isArray(dic)) {
    let lastV = dic[dic.length - 1]
    if (Array.isArray(lastV)) {
      return lastV.map(x => { return { key: x, value: x } })
    }
    if (dic[dic.length - 1].items) {
      return dic[dic.length - 1].items
    }
  }
  return undefined
}
export const getPropertyItems = (property, code) => {
  let configKey = `materialPropertyRule:${code.toLowerCase()}`
  let configCols = store.state.my.colConfig[configKey]
  if (configCols) {
    let col = configCols.filter(x => x.field === property)[0]
    if (col && col.items) {
      return col.items.map(x => { return { key: x, value: x } })
    }
  }
  let d = getProperty(property, code)
  if (d) {
    let p = d[d.length - 1]
    if (Array.isArray(p)) {
      return p.map(x => { return { key: x, value: x } })
    }
    if (p && p.items) {
      return p.items
    }
  }
  return undefined
}

export const getRuleValidate = (property, vm) => {
  let mustFillRule = {}
  let configCols = store.state.my.colConfig[property]
  if (configCols) {
    configCols.forEach(col => {
      if (col.isRequired) {
        mustFillRule[col.field] = [ { required: true, message: vm.$t('required'), trigger: 'change' } ]
      }
    })
    return mustFillRule
  }
  let lang = window.localStorage.getItem('lang')
  let ui = config.ui[lang][property] || {}
  for (let key in ui) {
    if (Array.isArray(ui[key]) && ui[key].length >= 2 && ui[key][1] === 1) {
      mustFillRule[key] = [ { required: true, message: vm.$t('required'), trigger: 'change' } ]
    }
  }
  return mustFillRule
}

export const getPropertyDisplayName = (property, code = 'default') => {
  let lang = window.localStorage.getItem('lang')
  let key = (code || 'default').toLowerCase()
  let configKey = `materialPropertyRule:${key}`
  let configCols = store.state.my.colConfig[configKey] || store.state.my.colConfig['materialPropertyRule:default']
  if (configCols) {
    let col = configCols.filter(x => x.field === property)[0]
    if (col) {
      return col.displayName
    }
  }
  let dic = config.ui[lang]['materialPropertyRule']
  let ruleDic = dic && dic[key] ? dic[key] : dic['default']
  let ruleDeaultDic = dic['default']
  let displayName
  if (ruleDic && ruleDic[property]) {
    if (Array.isArray(ruleDic[property])) {
      displayName = ruleDic[property][0]
    } else {
      displayName = ruleDic[property]
    }
  }
  if (!displayName) {
    displayName = ruleDeaultDic[property] ? ruleDeaultDic[property] : property
  }
  return displayName
}


export const getPropertyDisplayName1 = (property, code = 'default') => {
  let lang = window.localStorage.getItem('lang')
  let key = (code || 'default').toLowerCase()
 
  let dic = config.ui[lang]['applyReceiptOrderDisplay']
  let dic1 = config.ui[lang]['applyShipOrderDisplay']
  let ruleDic1 = dic1 && dic1[key] ? dic1[key] : dic1['default']
  let ruleDeaultDic1 = dic1['default']
  let ruleDic = dic && dic[key] ? dic[key] : dic['default']
  let ruleDeaultDic = dic['default']
  let displayName
  if (ruleDic && ruleDic[property]) {
    if (Array.isArray(ruleDic[property])) {
      displayName = ruleDic[property][0]
    } else {
      displayName = ruleDic[property]
    }
  }
  if (ruleDic1 && ruleDic1[property]) {
     if (Array.isArray(ruleDic1[property])){
      displayName = ruleDic1[property][0]
     } else {
      displayName = ruleDic1[property]
     }
  }
  if (!displayName) {
    displayName = ruleDeaultDic[property] ? ruleDeaultDic[property] : property || ruleDeaultDic1[property] ? ruleDeaultDic1[property] : property
  }
  return displayName
}

export const getIsHide = (property, key) => {
  let configCols = store.state.my.colConfig[property]
  if (configCols) {
    let col = configCols.filter(x => x.field === key)[0]
    return col && !col.isShow
  }
  let lang = window.localStorage.getItem('lang')
  let dic = config.ui[lang][property]
  let v = dic[key][1]
  if (v === -1) return true
  if (v && v.isHide) return true
  return false
}
 

 
