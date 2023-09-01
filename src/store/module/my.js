import http from '@/libs/api.axios'
export default {
  state: {
    // currentWarehouse: undefined,
    warehouses: [],
    // myWarehouses: [],
    warehouseDic: {},
    Laneways: [],
    LanewayseDic: {},
    Racks: [],
    RackseDic: {},
    RackId: [],
    // zones: [],
    // zoneDic: {},
    propertyRules: [],
    propertyRuleDic: {},
    propertyRuleCodeDic: {},
    propertyRulesDic: {},
    BasisMaterials:[],
    BasisMaterialDic: {},
    Materials:[],
    materialCategories: [],
    // materialCategoryDic: {},
    billTypes: [],
    allBillTypes: [],
    billTypeDic: {},
    ShipOrders:[],
    ShipOrderDic:{},
    PackageUnits:[],
    PackageUnitDic: {},
    applyReceipt:[],
    applyReceiptDic:{},
    // receiveBillTypeDic: {},
    // shipBillTypeDic: {},
    // moveBillTypeDic: {},
    // containerTypes: [],
    // containerTypeDic: {},
    orgnizations: [],
    orgnizationDic: {},
    supplierDic: {},
    customerDic: {},
    ownerDic: {},
    // defaultOwnerId: undefined,
    // receiveLocations: [],
    locations: [],
    locationDic: {},
    locationCountDic:{},
    // docks: [],
    // dockDic: {},
    basicStrategies: [],
    basicStrategyDic: {},
    shipPickOrder:[],
    shipPickOrderDic:{},
    shipOrderItemId:[],
    shipOrderItemIdDic:{},
    // storageOnly: true,
    // showMeOnly: false,
    // saveLastROInput: false,
    // lastRODto: undefined,
    // saveLastSOInput: false,
    // lastSODto: undefined,
    // saveLastMvPickticketInput: false,
    // saveLastMvPicktickethighSearch: false,
    // lastMvPickticketInput: undefined,
    colConfig: {},
    // printer: undefined
  },
  mutations: {
    // setPrinter (state, data) {
    //   state.printer = data
    // },
    // setCurrentWarehouse (state, data) {
    //   // state.currentWarehouse = state.warehouses.filter(x => x.id === data)[0]
    //   // state.billTypes = state.allBillTypes.filter(x => x.warehouseId === state.currentWarehouse.id)
    // },
    // setLastRODto (state, data) {
    //   state.lastRODto = data
    // },
    // setLastSODto (state, data) {
    //   state.lastSODto = data
    // },
    // setSaveLastROInput (state, data) {
    //   state.saveLastROInput = data
    // },
    // setSaveLastSOInput (state, data) {
    //   state.saveLastSOInput = data
    // },
    // setSaveLastMvPickticketInput (state, data) {
    //   state.saveLastMvPickticketInput = data
    // },
    // setSaveLastMvPicktickethighSearch (state, data) {
    //   state.saveLastMvPicktickethighSearch = data
    // },
    // setLastMvPickticketInput (state, data) {
    //   state.lastMvPickticketInput = data
    // },
    // setStorageOnly (state, data) {
    //   state.storageOnly = data
    // },
    // setShowMeOnly (state, data) {
    //   state.showMeOnly = data
    // },
    setBasicStrategies (state, data) {
      state.basicStrategies = data
      data.forEach(x => {
        state.basicStrategyDic[x.id] = x.xName
      })
    },
    setShipOrderData (state, data) {
      state.ShipOrderDic ={}
      data.forEach(x => {
        state.ShipOrderDic[x.id] = x.applyShipOrderCode
      })
      state.ShipOrders = data
    },
    setShipOrderItemData (state, data) {

      state.shipOrderItemIdDic ={}
      data.forEach(x => {
        state.shipOrderItemIdDic[x.id] = x.applyShipOrderCode
      })
      state.shipOrderItemId = data
    },
    setShipOrderPickData (state, data) {
      state.ShipOrderPickDic ={}
      data.forEach(x => {
        state.shipPickOrderDic[x.id] = x.applyShipOrderCode
      })
      state.shipPickOrder = data
    },
    setPackageUnitData (state, data) {
      state.PackageUnitDic ={}
      data.forEach(x => {
        state.PackageUnitDic[x.id] = x.unit
      })
      state.PackageUnits = data
    },
    // setDocks (state, data) {
    //   state.docks = data
    //   data.forEach(x => {
    //     state.dockDic[x.id] = x.xCode
    //   })
    // },
    setLocations (state, data) {
      state.locations = data
      state.locationDic = {}
      // state.receiveLocations = data.filter(x => x.locType === 'RECEIVE' || x.locType === 'CROSS_DOCK')
      data.forEach(x => {
        state.locationDic[x.id] = x.xName
      })
    },
    setWarehouses (state, data) {
      state.warehouseDic = {}
      data.forEach(x => {
        state.warehouseDic[x.id] = x.xName
      })
      state.warehouses = data
    },
    setLanewayData (state, data) {
      state.LanewayseDic = {}
      data.forEach(x => {
        state.LanewayseDic[x.id] = x.xName
      })
      state.Laneways = data
      // if (!state.currentWarehouse) {
      //   state.currentWarehouse = data[0]
      // }
    },
    setRacks (state, data) {
      state.Racks = data
      data.forEach(x => {
        state.RackseDic[x.id] = x.xName
      })
      // if (!state.currentWarehouse) {
      //   state.currentWarehouse = data[0]
      // }
    },
    // setZones (state, data) {
    //   state.zoneDic = {}
    //   data.forEach(x => {
    //     state.zoneDic[x.id] = x.xName
    //   })
    //   state.zones = data
    // },
    setPropertyRules (state, data) {
      state.propertyRuleDic = {}
      state.propertyRuleCodeDic = {}
      data.forEach(x => {
        state.propertyRuleDic[x.id] = x.xName
        state.propertyRuleCodeDic[x.id] = x.xCode
        state.propertyRulesDic[x.id] = x
      })
      state.propertyRules = data
    },
    setBasisMaterial (state, data) {
      console.log(data)
      state.BasisMaterialDic = {}
      data.forEach(x => {
        state.BasisMaterialDic[x.id] = x.xName
        state.Materials[x.id] = x
      })
        state.BasisMaterials = data
    },
    setMaterialCategories (state, data) {
      state.materialCategoryDic = {}
      data.forEach(x => {
        state.materialCategoryDic[x.id] = x.xName
      })
      state.materialCategories = data
    },
    setBillTypes (state, data) {
      state.billTypeDic = {}
      state.receiveBillTypeDic = {}
      state.shipBillTypeDic = {}
      state.moveBillTypeDic = {}
      data.forEach(x => {
        state.billTypeDic[x.id] = x.xName
        state.receiveBillTypeDic[x.id] = x.xName
        state.shipBillTypeDic[x.id] = x.xName
        state.moveBillTypeDic[x.id] = x.xName
      })
      state.billTypes = data
    },
    setApplyReceipt (state, data) {
      state.applyReceiptDic = {} 
      data.forEach(x => {
        state.applyReceiptDic[x.id] = x.xName 
      })
      state.applyReceipt = data
    }, 
    setOrgnizations (state, data) { 
      state.orgnizationDic = {}
      state.supplierDic = {}
      state.customerDic = {}
      state.ownerDic = {}
      data.forEach(x => {
        state.orgnizationDic[x.id] = x.xName

        if (x.type == '2') { 
          state.supplierDic[x.id] = x.xName
        }
        if (x.type == '1') {
          state.customerDic[x.id] = x.xName
        }
        if (x.type == '4') {
          state.ownerDic[x.id] = x.xName
          state.defaultOwnerId = x.id
        }
      })
      state.orgnizations = data
       //console.log("  state.orgnizations-->",  state.orgnizations)
    },
    setColConfig (state, { table, config }) {
      state.colConfig[table] = config
    },
    // setColConfig2 (state, data) {
    //   state.colConfig = data || {}
    // },
    // setContainerTypes (state, data) {
    //   state.containerTypeDic = {}
    //   data.forEach(x => {
    //     state.containerTypeDic[x.id] = x.xName
    //   })
    //   state.containers = data
    // },
    // setMyWarehouses (state, data) {
    //   state.myWarehouses = data
    // }
  },
  getters: {
  },
  actions: {
    // async getMyWarehouses ({ state, commit }, { userId }) {
    //   let data = await http.postAsync(`mutiWarehouseManager/getWarehouseByUserId/${userId}`)
    //   commit('setMyWarehouses', data)
    // },
    // async getColConfig ({ state, commit }) {
    //   let ret = await http.getAsync(`settingManager/customColConfigByTenant`)
    //   commit('setColConfig2', ret)
    // },
    // async submitColConfig ({ state, commit }, { table, config }) {
    //   commit('setColConfig', { table, config })
    //   await http.postAsync(`settingManager/setCustomColConfigByTenant`, { [table]: config || [] })
    // },
    async getBasicStrategyData ({ state, commit }) {
      // let conditon = {
      //   'pageNumber': 1,
      //   'pageSize': 100,
      //   'queryType': 2
      // }
      // let ret = await http.postAsync('queryManager/basicStrategy', conditon)
      let data=[
        {
            "xName": "整单出库策略DD",
            "xType": "SHIPMENT_ALL",
            "storeProcedure": "wms.proc_testzhengdan",
            "orderField": null,
            "description": null,
            "creator": "admin",
            "lastModifier": "wy",
            "id": "1",
            "lastModificationTime": "2022-09-16T11:34:58.853",
            "lastModifierId": "46ad3efa-1ddb-4322-92c2-0c49fbcf755c",
            "creationTime": "2022-03-07T16:39:00.98",
            "creatorId": "56a5fae8-b1ae-46e3-9346-1589908ce339"
        },
        {
            "xName": "盘盈物资入库",
            "xType": "ALLOCATED_LOCATION",
            "storeProcedure": "WMS.Inventoryprofit.storage",
            "orderField": null,
            "description": "将盘盈物资经检验合格后入库",
            "creator": "武汉三机",
            "lastModifier": "武汉三机",
            "id": "2",
            "lastModificationTime": "2023-06-14T19:53:07.907",
            "lastModifierId": "682a70fd-a122-4987-8ac4-7f16ef728922",
            "creationTime": "2023-06-14T19:53:07.907",
            "creatorId": "682a70fd-a122-4987-8ac4-7f16ef728922"
        },
        {
            "xName": "线边仓余料返库",
            "xType": "ALLOCATED_LOCATION",
            "storeProcedure": "WMS.Wire-side-warehouse_oddments_1",
            "orderField": null,
            "description": "线边仓剩下余料经检验合格后返库",
            "creator": "武汉三机",
            "lastModifier": "武汉三机",
            "id": "3",
            "lastModificationTime": "2023-06-14T19:47:37.71",
            "lastModifierId": "682a70fd-a122-4987-8ac4-7f16ef728922",
            "creationTime": "2023-06-14T19:47:37.71",
            "creatorId": "682a70fd-a122-4987-8ac4-7f16ef728922"
        },
        {
            "xName": "盘点策略",
            "xType": "SHIPMENT",
            "storeProcedure": "[WMS].[proc_Count]",
            "orderField": null,
            "description": "这里五个字这里五个字这里五个字这里五个字这里五个字这里五个字这里五个字这里五个字这里五个字这里五个字",
            "creator": "admin",
            "lastModifier": "蔡成",
            "id": "4",
            "lastModificationTime": "2023-01-30T16:30:50.61",
            "lastModifierId": "e7d5b79b-d843-49bb-a9e9-7890a4d4d391",
            "creationTime": "2022-04-21T11:28:14.183",
            "creatorId": "56a5fae8-b1ae-46e3-9346-1589908ce339"
        },
        {
            "xName": "移位策略",
            "xType": "MOVE",
            "storeProcedure": "[WMS].[proc_Move]",
            "orderField": null,
            "description": null,
            "creator": "薛枭婷",
            "lastModifier": "薛枭婷",
            "id": "5",
            "lastModificationTime": "2022-08-12T09:12:50.363",
            "lastModifierId": "c0c03978-26cc-4bfc-80f7-7ba400aea576",
            "creationTime": "2022-07-04T10:41:05.077",
            "creatorId": "9046c275-4ad6-48d2-a104-844c74bc780e"
        },
      
    ]
      commit('setBasicStrategies', data)
    },
    // async getDockData ({ state, commit }) {
    //   let conditon = {
    //     'pageNumber': 1,
    //     'pageSize': 1000,
    //     'queryType': 2,
    //     'condition': {
    //       'xStatus': { '=': 'ENABLED' }
    //     }
    //   }
    //   let ret = await http.postAsync('queryManager/dock', conditon)
    //   commit('setDocks', ret.data)
    // },
    async getLocationData ({ state, commit }) {
      let conditon = {
        "skipCount": 1,
         "maxResultCount": 10000,
         "sorting": "id desc",
         "conditionItems": []
      }
      let ret = await http.postAsync('app/Location/GetList', conditon)
      commit('setLocations', ret.data.data.items)
    },
    async getRackData ({ state, commit }) {
      let conditon = {
        "skipCount": 1,
         "maxResultCount": 10000,
         "sorting": "id desc",
         "conditionItems": []
      }
      let ret = await http.postAsync('app/Rack/GetList', conditon)
      commit('setRacks', ret.data.data.items)
    },
    async getWarehouseData ({ state, commit }) {
      let conditon = {
        "skipCount": 1,
         "maxResultCount": 10000,
         "sorting": "id desc",
         "conditionItems": []
      }
      let ret = await http.postAsync('app/Warehouse/GetList', conditon)
      commit('setWarehouses', ret.data.data.items)
    },
    // async getZoneData ({ state, commit }) {
    //   // let conditon = {
    //   //   'pageNumber': 1,
    //   //   'pageSize': 100,
    //   //   'queryType': 2
    //   // }
    //   // let ret = await http.postAsync('queryManager/zone', conditon)
    //   commit('setZones',data)
    // },
    async getShipOrderData ({ state, commit }) {
      let conditon = {
        "skipCount": 1,
        "maxResultCount": 10000,
        "sorting": "id desc",
        "conditionItems": []
      }
      let ret = await http.postAsync('app/ShipOrder/GetList', conditon)

      commit('setShipOrderData', ret.data.data.items)
    },
    async getPackageUnitData ({ state, commit }) {
      let conditon = {
        "skipCount": 1,
        "maxResultCount": 10000,
        "sorting": "id desc",
        "conditionItems": []
      }
      let ret = await http.postAsync('app/PackageUnit/GetList', conditon)

      commit('setPackageUnitData', ret.data.data.items)
    },
    async getLanewayData ({ state, commit }) {
      let conditon = {
        "skipCount": 1,
        "maxResultCount": 10000,
        "sorting": "id desc",
        "conditionItems": []
      }
      let ret = await http.postAsync('app/Laneway/GetList', conditon)

      commit('setLanewayData', ret.data.data.items)
    },
    async getPropertyRuleData ({ state, commit }) {
      let conditon = {
        "skipCount": 1,
        "maxResultCount": 10000,
        "sorting": "id desc",
        "conditionItems": []
      }
      let ret = await http.postAsync('app/MaterialPropertyRule/GetList', conditon)

      commit('setPropertyRules', ret.data.data.items)
    },
    // 物料信息
    async getBasisMaterialData ({ state, commit }) {
      let conditon = {
        "skipCount": 1,
        "maxResultCount": 10000,
        "sorting": "id desc",
        "conditionItems": []
      }
      let ret = await http.postAsync('app/Material/GetList', conditon)
      commit('setBasisMaterial', ret.data.data.items)
    },
    async getMaterialCategoryData ({ state, commit }) {
      let conditon = {
        "skipCount": 1,
        "maxResultCount": 10000,
        "sorting": "id desc",
        "conditionItems": []
      }
      let ret = await http.postAsync('app/MaterialCategory/GetList', conditon)
      commit('setMaterialCategories', ret.data.data.items)
    },
    async getBillTypeData ({ state, commit }) {
      let conditon = {
        "skipCount": 1,
        "maxResultCount": 10000,
        "sorting": "id desc",
        "conditionItems": []
      }
      let ret = await http.postAsync('app/BillType/GetList', conditon)
      commit('setBillTypes', ret.data.data.items)
    },
    // 获取申请单号的数据
    async getApplyReceiptData ({ state, commit }) {
      let conditon = {
        "skipCount": 1,
        "maxResultCount": 10000,
        "sorting": "id desc",
        "conditionItems": []
      }
      let ret = await http.postAsync('app/ApplyReceiptOrder/GetList', conditon)
      commit('setApplyReceipt', ret.data.data.items)
    },    
    async getOrgnizationData ({ state, commit }) {
 
      let conditon = {
        "skipCount": 1,
        "maxResultCount": 10000,
        "sorting": "id desc",
        "conditionItems": []
      }
      let ret = await http.postAsync('/app/Orgnization/GetList', conditon)
      commit('setOrgnizations', ret.data.data.items)

    },
    async getShipPickOrderData ({ state, commit }) {
      let conditon = {
        "skipCount": 1,
        "maxResultCount": 10000,
        "sorting": "id desc",
        "conditionItems": []
      }
      let ret = await http.postAsync('/app/ShipPickOrder/GetList', conditon)
      commit('setShipOrderPickData', ret.data.data.items)
    },
    async getShipOrderItemData ({ state, commit }) {
      let conditon = {
        "skipCount": 1,
        "maxResultCount": 10000,
        "sorting": "id desc",
        "conditionItems": []
      }
      let ret = await http.postAsync('/app/ShipOrderItem/GetList', conditon)
      commit('setShipOrderItemData', ret.data.data.items)
    }
  }
}
