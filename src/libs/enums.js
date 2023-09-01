export const Enum = () => {
    let enums = {
      'Orgnization': {
        'map1': {
          '1': '客户',
          '2': '供应商',
          '3': '部门',
          '4': '货主',
        },
        'map2': {
          '客户':1,
          '供应商':2,
          '部门':3,
          '货主':4,
        }
      },
      'WmsLocation': {
        'map1': {
          '-1': '不存在',
          '0': '禁用',
          '1': '正常',
          '2': '异常'
        },
        'map2':{
          'true': '是',
          'false': '否'
        },
      },
      'WmsRack': {
        'map1': {
          '-1': '不存在',
          '0': '禁用',
          '1': '正常',
          '2': '异常'
        }
      },
      'WmsArwa': {
        'map1': {
          '-1': '不存在',
          '0': '禁用',
          '1': '正常',
          '2': '异常'
        }
      },
      'WmsConveyor': {
        'map1': {
          '-1': '不存在',
          '0': '禁用',
          '1': '正常',
          '2': '异常'
        }
      },
      'WmsWarehouse': {
          'map1':{
            'true': '是',
            'false': '否'
          },
          'map2': {
            '1':'立库',
            '2':'平库',
            '3':'地推',
            '4':'虚拟'
          },
          'map3': {
            '-1': '不存在',
            '0': '禁用',
            '1': '正常',
            '2': '异常'
          }
      },
      // 出库申请单
      'WmsApplyShipOrder': {
          'map1': {
            '-1':'作废',
            '1': '新建',
            '2': '生效',
            '3':'执行中',
            '4':'已完成'
          },
          'map2': {
            '0': '未审核',
            '1': '通过',
            '-1': '不通过'
          }
      },
      'WmsStrategyType': {
        'map1': {
          '0': '入库策略',
          '1': '出库策略',
          '2': '移位策略',
          '3': '整单出库策略'
        },
        'map2': {
          '入库策略': 0,
          '出库策略': 1,
          '移位策略': 2,
          '整单出库策略': 3
        },
        'map3': {
          'ALLOCATED_LOCATION': '入库策略',
          'SHIPMENT': '出库策略',
          'MOVE': '移位策略',
          'SHIPMENT_ALL': '整单出库策略'
        },
        'map4': {
          '入库策略': 'ALLOCATED_LOCATION',
          '出库策略': 'SHIPMENT',
          '移位策略': 'MOVE',
          '整单出库策略': 'SHIPMENT_ALL'
        }
      },
      'WmsLocationStatus': {
        'map1': {
          '0': '空',
          '1': '存',
          '2': '拣'
        },
        'map2': {
          '空': 0,
          '存': 1,
          '拣': 2
        },
        'map3': {
          'EMPTY': '空',
          'STORE': '存',
          'PICK': '拣'
        },
        'map4': {
          '空': 'EMPTY',
          '存': 'STORE',
          '拣': 'PICK'
        }
      },
      'YesOrNo': {
        'map1': {
          '0': '否',
          '1': '是'
        },
        'map2': {
          '否': 0,
          '是': 1
        },
        'map3': {
          'N': '否',
          'Y': '是'
        },
        'map4': {
          '否': 'N',
          '是': 'Y'
        },
        'map5': {
          'N': '禁用',
          'Y': '启用'
        },
        'map6': {
           0:'否',
           1:'是'},
           'map6': {
            'false': '否',
            'true': '是'
          },
      },
      'WmsStatus': {
        'map1': {
          '0': '禁用',
          '1': '有效'
        },
        'map2': {
          '禁用': 0,
          '有效': 1
        },
        'map3': {
          'DISABLED': '禁用',
          'ENABLED': '有效'
        },
        'map4': {
          '禁用': 'DISABLED',
          '有效': 'ENABLED'
        }
      },
      'WmsInventoryStatus': {
        'map1': {
          '0': '待检',
          '1': '已取样',
          '2': '合格',
          '-1': '不合格'
        },
        'map2': {
          '0': '正常',
          '1': '禁用',
        },
        'map3': {
          'WaitToQualified': '待检',
          'Qualified': '合格',
          'Unqualified': '不合格',
          'Quaranting': '隔离',
          'PreQualified': '预检'
        },
        'map4': {
          '待检': 'WaitToQualified',
          '合格': 'Qualified',
          '不合格': 'Unqualified',
          '隔离': 'Quaranting',
          '预检': 'PreQualified'
        }
      },
      'TypeOfBill': {
        'map1': {
          '0': '收货单',
          '1': '库内移位单',
          '2': '发货单'
        },
        'map2': {
          '收货单': 0,
          '库内移位单': 1,
          '发货单': 2
        },
        'map3': {
          'RECEIVE': '收货单',
          'MOVE': '库内移位单',
          'SHIP': '发货单'
        },
        'map4': {
          '收货单': 'RECEIVE',
          '库内移位单': 'MOVE',
          '发货单': 'SHIP'
        },
        'map5': {
          '-1': '不存在',
          '0': '禁用',
          '1': '正常',
          '2': '异常'
        },
        'map6': {
          '1': '收货',
          '2': '发货',
          '3': '移位',
        }
      },
      'WmsLocationType': {
        'map1': {
          '0': '盘点',
          '1': '加工',
          '2': '收货',
          '3': '备货',
          '4': '分割',
          '5': '存储',
          '6': '越库',
          '8': '质检'
        },
        'map2': {
          '盘点': 0,
          '加工': 1,
          '收货': 2,
          '备货': 3,
          '分割': 4,
          '存储': 5,
          '越库': 6,
          '质检': 8
        },
        'map3': {
          'COUNT': '盘点',
          'PROCESS': '加工',
          'RECEIVE': '收货',
          'SHIP': '备货',
          'SPLIT': '分割',
          'STORAGE': '存储',
          'CROSS_DOCK': '越库',
          'CHECK': '质检'
        },
        'map4': {
          '盘点': 'COUNT',
          '加工': 'PROCESS',
          '收货': 'RECEIVE',
          '备货': 'SHIP',
          '分割': 'SPLIT',
          '存储': 'STORAGE',
          '越库': 'CROSS_DOCK',
          '质检': 'CHECK'
        },
        'map5': {
          '0': '未知',
          '1': '存储',
          '2': '越库',
          '3': '地面'
        }
      },
      'WmsROAStatus': {
        'map1': {
          '0': '打开',
          '1': '生效',
          '2': '失效',
          '3': '完成',
          '4': '关闭'
        },
        'map2': {
          '打开': 0,
          '生效': 1,
          '失效': 2,
          '完成': 3,
          '关闭': 4,
          '删除': 4
        },
        'map3': {
          'OPEN': '打开',
          'ACTIVE': '生效',
          'CANCELED': '失效',
          'COMPLETE': '完成',
          'CLOSE': '关闭'
        },
        'map4': {
          '打开': 'OPEN',
          '生效': 'ACTIVE',
          '失效': 'CANCELED',
          '完成': 'COMPLETE',
          '关闭': 'CLOSE',
          '删除': 'CLOSE'
        }
      },
      'WmsROStatus': {
        'map1': {
          '1': '打开',
          '2': '生效',
          '3': '执行中',
          '4': '已完成',
          '-1': '作废'
        },
        'map2': {
          '打开': 1,
          '生效': 2,
          '执行中': 3,
          '已完成': 4,
          '作废': -1
        },
        'map3': {
          'OPEN': '打开',
          'ACTIVE': '生效',
          'RECEIVING': '部分收货',
          'RECEIVED': '收货完成',
          'CANCELED': '作废'
        },
        'map4': {
          '打开': 'OPEN',
          '生效': 'ACTIVE',
          '部分收货': 'RECEIVING',
          '收货完成': 'RECEIVED',
          '作废': 'CANCELED'
        }
      },
      'WmsROShelvesStauts': {
        'map1': {
          '0': '待上架',
          '1': '上架中',
          '2': '完成'
        },
        'map2': {
          '待上架': 0,
          '上架中': 1,
          '完成': 2
        },
        'map3': {
          'UNPUTAWAY': '待上架',
          'PUTAWAY': '上架中',
          'FINISHED': '完成'
        },
        'map4': {
          '待上架': 'UNPUTAWAY',
          '上架中': 'PUTAWAY',
          '完成': 'FINISHED'
        }
      },
      'WmsROQualityStauts': {
        'map1': {
          '0': '不质检',
          '1': '待质检',
          '2': '质检完成'
        },
        'map2': {
          '不质检': 0,
          '待质检': 1,
          '质检完成': 2
        },
        'map3': {
          'NOQUALITY': '不质检',
          'UNQUALITY': '待质检',
          'QUALITYFINISHED': '质检完成'
        },
        'map4': {
          '不质检': 'NOQUALITY',
          '待质检': 'UNQUALITY',
          '质检完成': 'QUALITYFINISHED'
        }
      },
      'WmsSOStatus': {
        'map1': {
          '0': '打开',
          '1': '作业中',
          '2': '完成',
          '3': '作废'
        },
        'map2': {
          '打开': 0,
          '作业中': 1,
          '完成': 2,
          '作废': 3
        },
        'map3': {
          'OPEN': '打开',
          'WORKING': '作业中',
          'FINISHED': '完成',
          'CANCELED': '作废'
        },
        'map4': {
          '打开': 'OPEN',
          '作业中': 'WORKING',
          '完成': 'FINISHED',
          '作废': 'CANCELED'
        }
      },
      'WmsMoveDocType': {
        'map1': {
          '1': '收货上架单',
          '2': '库内移位单',
          '3': '发货单拣货',
          '4': '波次拣货单',
          '5': '加工拣货单',
          '6': '补货移位单',
          '7': '盘点下架单',
          '8': '盘点回库单',
          '9': '库存调拨单',
          '10': '质检下架单'
        },
        'map2': {
          '收货上架单': 1,
          '库内移位单': 2,
          '发货单拣货': 3,
          '波次拣货单': 4,
          '加工拣货单': 5,
          '补货移位单': 6,
          '盘点下架单': 7,
          '盘点回库单': 8,
          '库存调拨单': 9,
          '质检下架单': 10
        },
        'map3': {
          'MV_PUTAWAY': '收货上架单',
          'MV_MOVE': '库内移位单',
          'MV_PICKTICKET_PICKING': '发货单拣货',
          'MV_WAVE_PICKING': '波次拣货单',
          'MV_PROCESS_PICKING': '加工拣货单',
          'MV_REPLENISHMENT_MOVE': '补货移位单',
          'MV_COUNT_OUT': '盘点下架单',
          'MV_COUNT_BACK': '盘点回库单',
          'MV_INVENTORY_TRANSFER': '库存调拨单',
          'MV_CHECK_OUT': '质检下架单',
          'MV_LANEWAY_MOVE': '跨巷道移库单'
        },
        'map4': {
          '收货上架单': 'MV_PUTAWAY',
          '库内移位单': 'MV_MOVE',
          '发货单拣货': 'MV_PICKTICKET_PICKING',
          '波次拣货单': 'MV_WAVE_PICKING',
          '加工拣货单': 'MV_PROCESS_PICKING',
          '补货移位单': 'MV_REPLENISHMENT_MOVE',
          '盘点下架单': 'MV_COUNT_OUT',
          '盘点回库单': 'MV_COUNT_BACK',
          '库存调拨单': 'MV_INVENTORY_TRANSFER',
          '质检下架单': 'MV_CHECK_OUT'
        }
      },
      'WmsMoveDocStatus': {
        'map1': {
          '0': '打开',
          '1': '执行中',
          '2': '完成',
          '3': '生效',
          '4': '整单分配',
          '5': '部分分配'
        },
        'map2': {
          '打开': 0,
          '执行中': 1,
          '完成': 2,
          '生效': 3,
          '整单分配': 4,
          '部分分配': 5
        },
        'map3': {
          'OPEN': '打开',
          'WORKING': '执行中',
          'FINISHED': '完成',
          'ACTIVE': '生效',
          'ALLOCATED': '整单分配',
          'PARTALLOCATED': '部分分配'
        },
        'map4': {
          '打开': 'OPEN',
          '执行中': 'WORKING',
          '完成': 'FINISHED',
          '生效': 'ACTIVE',
          '整单分配': 'ALLOCATED',
          '部分分配': 'PARTALLOCATED'
        }
      },
      'WmsMovePickStatus': {
        'map1': {
          '0': '打开',
          '2': '完成',
          '3': '生效',
          '4': '整单分配',
          '5': '部分分配'
        },
        'map2': {
          '打开': 0,
          '完成': 2,
          '生效': 3,
          '整单分配': 4,
          '部分分配': 5
        },
        'map3': {
          'OPEN': '打开',
          'FINISHED': '完成',
          'ACTIVE': '生效',
          'ALLOCATED': '整单分配',
          'PARTALLOCATED': '部分分配'
        },
        'map4': {
          '打开': 'OPEN',
          '完成': 'FINISHED',
          '生效': 'ACTIVE',
          '整单分配': 'ALLOCATED',
          '部分分配': 'PARTALLOCATED'
        }
      },
      'WmsMoveDocBolStatus': {
        'map1': {
          '0': '打开',
          '2': '完成',
          '3': '生效',
          '4': '整单分配',
          '5': '部分分配'
        },
        'map2': {
          '打开': 0,
          '完成': 2,
          '生效': 3,
          '整单分配': 4,
          '部分分配': 5
        },
        'map3': {
          'OPEN': '打开',
          'FINISHED': '完成',
          'ACTIVE': '生效',
          'ALLOCATED': '整单分配',
          'PARTALLOCATED': '部分分配'
        },
        'map4': {
          '打开': 'OPEN',
          '完成': 'FINISHED',
          '生效': 'ACTIVE',
          '整单分配': 'ALLOCATED',
          '部分分配': 'PARTALLOCATED'
        }
      },
      'WmsMoveDocCountStatus': {
        'map1': {
          '0': '打开',
          '2': '完成',
          '3': '生效',
          '4': '整单分配',
          '5': '部分分配'
        },
        'map2': {
          '打开': 0,
          '执行中': 1,
          '完成': 2,
          '生效': 3,
          '整单分配': 4,
          '部分分配': 5
        },
        'map3': {
          'OPEN': '打开',
          'FINISHED': '完成',
          'ACTIVE': '生效',
          'ALLOCATED': '整单分配',
          'PARTALLOCATED': '部分分配'
        },
        'map4': {
          '打开': 'OPEN',
          '完成': 'FINISHED',
          '生效': 'ACTIVE',
          '整单分配': 'ALLOCATED',
          '部分分配': 'PARTALLOCATED'
        }
      },
      'WmsMoveDocShipStatus': {
        'map1': {
          '0': '待发运',
          '1': '已发运'
        },
        'map2': {
          '待发运': 0,
          '已发运': 1
        },
        'map3': {
          'UNSHIP': '待发运',
          'SHIPPED': '已发运'
        },
        'map4': {
          '待发运': 'UNSHIP',
          '已发运': 'SHIPPED'
        }
      },
      'WmsWorkDocStatus': {
        'map1': {
          '0': '打开',
          '1': '工作中',
          '2': '已完成'
        },
        'map2': {
          '打开': 0,
          '工作中': 1,
          '已完成': 2
        },
        'map3': {
          // 'OPEN': '打开',
          'WORKING': '工作中',
          'FINISHED': '已完成'
        },
        'map4': {
          '打开': 'OPEN',
          '工作中': 'WORKING',
          '已完成': 'FINISHED'
        }
      },
      'WmsTaskType': {
        'map1': {
          '1': '收货上架',
          '2': '库内移位',
          '3': '发货拣货',
          '4': '波次拣货',
          '5': '加工拣货',
          '6': '补货移位',
          '7': '盘点下架',
          '8': '盘点回库',
          '9': '库存调拨',
          '10': '质检下架'
        },
        'map2': {
          '收货上架': 1,
          '库内移位': 2,
          '发货拣货': 3,
          '波次拣货': 4,
          '加工拣货': 5,
          '补货移位': 6,
          '盘点下架': 7,
          '盘点回库': 8,
          '库存调拨': 9,
          '质检下架': 10
        },
        'map3': {
          'MV_PUTAWAY': '收货上架',
          'MV_MOVE': '库内移位',
          'MV_PICKTICKET_PICKING': '发货拣货',
          'MV_WAVE_PICKING': '波次拣货',
          'MV_PROCESS_PICKING': '加工拣货',
          'MV_REPLENISHMENT_MOVE': '补货移位',
          'MV_COUNT_OUT': '盘点下架',
          'MV_COUNT_BACK': '盘点回库',
          'MV_INVENTORY_TRANSFER': '库存调拨',
          'MV_CHECK_OUT': '质检下架'
        },
        'map4': {
          '收货上架': 'MV_PUTAWAY',
          '库内移位': 'MV_MOVE',
          '发货拣货': 'MV_PICKTICKET_PICKING',
          '波次拣货': 'MV_WAVE_PICKING',
          '加工拣货': 'MV_PROCESS_PICKING',
          '补货移位': 'MV_REPLENISHMENT_MOVE',
          '盘点下架': 'MV_COUNT_OUT',
          '盘点回库': 'MV_COUNT_BACK',
          '库存调拨': 'MV_INVENTORY_TRANSFER',
          '质检下架': 'MV_CHECK_OUT'
        }
      },
      'WmsTaskStatus': {
        'map1': {
          '0': '打开',
          '1': '已分配',
          '2': '工作中',
          '3': '已完成',
          '4': '已取消'
        },
        'map2': {
          '打开': 0,
          '已分配': 1,
          '工作中': 2,
          '已完成': 3,
          '已取消': 4
        },
        'map3': {
          'OPEN': '打开',
          // 'DISPATCHED': '已分配',
          'WORKING': '工作中',
          'FINISHED': '已完成',
          'CANCEL': '已取消'
        },
        'map4': {
          '打开': 'OPEN',
          '已分配': 'DISPATCHED',
          '工作中': 'WORKING',
          '已完成': 'FINISHED',
          '已取消': 'CANCEL'
        },
        'map5': {
          // 'OPEN': '打开',
          // 'DISPATCHED': '已分配',
          // 'WORKING': '工作中',
          'FINISHED': '已完成',
          'CANCEL': '已取消'
        }
      },
      'WmsCountLockType': {
        'map1': {
          '0': '锁库位',
          '1': '不锁库位'
        },
        'map2': {
          '锁库位': 0,
          '不锁库位': 1
        },
        'map3': {
          'LOCK': '锁库位',
          'UNLOCK': '不锁库位'
        },
        'map4': {
          '锁库位': 'LOCK',
          '不锁库位': 'UNLOCK'
        }
      },
      'WmsCountType': {
        'map1': {
          '0': '全盘',
          '1': '货品盘点',
          '2': '库位盘点',
          '3': '库存盘点',
          '4': '巷道盘点',
          '5': '取空异常盘点',
          '6': '满入异常盘点'
        },
        'map2': {
          '全盘': 0,
          '货品盘点': 1,
          '库位盘点': 2,
          '库存盘点': 3,
          '巷道盘点': 4,
          '取空异常盘点': 5,
          '满入异常盘点': 6
        },
        'map3': {
          'ALL': '全盘',
          'ITEM': '货品盘点',
          'LOCATION_ONLY': '库位盘点',
          'INVENTORY': '库存盘点',
          'ITEMNO': '巷道盘点',
          'LOCATION_ABNORMAL_SPACE': '取空异常盘点',
          'FOR_ABNORMAL': '满入异常盘点'
        },
        'map4': {
          '全盘': 'ALL',
          '货品盘点': 'ITEM',
          '库位盘点': 'LOCATION_ONLY',
          '库存盘点': 'INVENTORY',
          '巷道盘点': 'ITEMNO',
          '取空异常盘点': 'LOCATION_ABNORMAL_SPACE',
          '满入异常盘点': 'FOR_ABNORMAL'
        }
      },
      'WmsCountStatus': {
        'map1': {
          '0': '打开',
          '1': '生效',
          '2': '盘点中',
          '3': '完成',
          '4': '取消'
        },
        'map2': {
          '打开': 0,
          '生效': 1,
          '盘点中': 2,
          '完成': 3,
          '取消': 4
        },
        'map3': {
          'OPEN': '打开',
          'ACTIVE': '生效',
          'COUNTING': '盘点中',
          'FINISHED': '完成',
          'CANCELED': '取消'
        },
        'map4': {
          '打开': 'OPEN',
          '生效': 'ACTIVE',
          '盘点中': 'COUNTING',
          '完成': 'FINISHED',
          '取消': 'CANCELED'
        }
      },
      'WmsInventoryLogType': {
        'map1': {
          '0': '取消收货',
          '1': '收货',
          '2': '发运',
          '3': '库内移位',
          '4': '换包装',
          '5': '库存调整',
          '6': '盘点调整',
          '7': '加工减少',
          '8': '加工增加',
          '9': '库存锁定',
          '10': '库存解锁',
          '11': '库存质检',
          '12': '批次变更',
          '13': '库存状态更改'
        },
        'map2': {
          '取消收货': 0,
          '收货': 1,
          '发运': 2,
          '库内移位': 3,
          '换包装': 4,
          '库存调整': 5,
          '盘点调整': 6,
          '加工减少': 7,
          '加工增加': 8,
          '库存锁定': 9,
          '库存解锁': 10,
          '库存质检': 11,
          '批次变更': 12,
          '库存状态更改': 13
        },
        'map3': {
          'CANCEL_RECEIVING': '取消收货',
          'RECEIVING': '收货',
          'SHIPPING': '发运',
          'MOVE': '库内移位',
          'CONVERT_PACKAGEUNIT': '换包装',
          'INVENTORY_ADJUST': '库存调整',
          'COUNT_ADJUST': '盘点调整',
          'PROCESS_DOWN': '加工减少',
          'PROCESS_UP': '加工增加',
          'LOCK': '库存锁定',
          'UNLOCK': '库存解锁',
          'QUALITY': '库存质检',
          'EDITLOT': '批次变更',
          'MODIFYINVENTORYSTATUS': '库存状态更改'
        },
        'map4': {
          '取消收货': 'CANCEL_RECEIVING',
          '收货': 'RECEIVING',
          '发运': 'SHIPPING',
          '库内移位': 'MOVE',
          '换包装': 'CONVERT_PACKAGEUNIT',
          '库存调整': 'INVENTORY_ADJUST',
          '盘点调整': 'COUNT_ADJUST',
          '加工减少': 'PROCESS_DOWN',
          '加工增加': 'PROCESS_UP',
          '库存锁定': 'LOCK',
          '库存解锁': 'UNLOCK',
          '库存质检': 'QUALITY',
          '批次变更': 'EDITLOT',
          '库存状态更改': 'MODIFYINVENTORYSTATUS'
        },
        'map5': {
          'Debug': 'Debug',
          'Info': 'Info',
          'Warning': 'Warning',
          'Error': 'Error',
          'Fatal': 'Fatal'
        }
      },
      'InOrOut': {
        'map1': {
          '0': '入库',
          '1': '出库'
        },
        'map2': {
          '入库': 0,
          '出库': 1
        },
        'map3': {
          'IN': '入库',
          'OUT': '出库'
        },
        'map4': {
          '入库': 'IN',
          '出库': 'OUT'
        }
      },
      'DicValueFormat': {
        'map1': {
          '1': '仅编号',
          '2': '仅名称',
          '3': '先编号后名称',
          '4': '先名称后编号'
        },
        'map2': {
          '仅编号': 1,
          '仅名称': 2,
          '先编号后名称': 3,
          '先名称后编号': 4
        },
        'map3': {
          'Code': '仅编号',
          'Name': '仅名称',
          'CodeName': '先编号后名称',
          'NameCode': '先名称后编号'
        },
        'map4': {
          '仅编号': 'Code',
          '仅名称': 'Name',
          '先编号后名称': 'CodeName',
          '先名称后编号': 'NameCode'
        }
      },
      'MaterialPropertyRuleE': {
        'map1': {
          '0': '禁用',
          '1': '显示',
          '2': '必填',
          '3': '入库必填',
          '4': '出库必填'
        },
        'map2': {
          '禁用': 0,
          '显示': 1,
          '必填': 2,
          '入库必填': 3,
          '出库必填': 4
        },
        'map3': {
          'DISABLED': '禁用',
          'Display': '显示',
          'MustFill': '必填',
          'InboundMustFill': '入库必填',
          'OutboundMustFill': '出库必填'
        },
        'map4': {
          '禁用': 'DISABLED',
          '显示': 'Display',
          '必填': 'MustFill',
          '入库必填': 'InboundMustFill',
          '出库必填': 'OutboundMustFill'
        }
      },
      'FunctionCodeRuleE': {
        'map1': {
          '0': '启用',
          '1': '禁用',
          '2': '启用且日期精确到分',
          '3': '启用且日期精确到时',
          '4': '启用且日期精确到天',
          '5': '启用且日期精确到月',
        },
        'map2': {
          '启用': 0,
          '禁用': 1,
          '启用且日期精确到分': 2,
          '启用且日期精确到时': 3,
          '启用且日期精确到天': 4,
          '启用且日期精确到月': 5
        }
      },
      'WmsBillType': {
        'map1': {
          '1': '同步出库',
          '2': '成品入库',
          '3': '波次拣货单',
          '4': '加工拣货单',
          '5': '补货移位单',
          '6': '收货上架单',
          '7': '库内移位单',
          '8': '发货单拣货',
          '12': '空托盘入库',
          '13': '空托盘出库',
          '14': '回库单',
          '15': '生产入库',
          '16': '返修入库',
          '17': '退料入库',
          '18': '盘盈入库',
          '19': '其他入库',
          '20': '生产领料',
          '21': '生产补料',
          '22': '销售出库',
          '23': '其他出库',
          '24': '盘点下架单',
          '25': '盘点回库单'
        },
        'map2': {
          '同步出库': 1,
          '成品入库': 2,
          '波次拣货单': 3,
          '加工拣货单': 4,
          '补货移位单': 5,
          '收货上架单': 6,
          '库内移位单': 7,
          '发货单拣货': 8,
          '空托盘入库': 12,
          '空托盘出库': 13,
          '回库单': 14,
          '生产入库': 15,
          '返修入库': 16,
          '退料入库': 17,
          '盘盈入库': 18,
          '其他入库': 19,
          '生产领料': 20,
          '生产补料': 21,
          '销售出库': 22,
          '其他出库': 23,
          '盘点下架单': 24,
          '盘点回库单': 25
        },
        'map3': {
          'TBCK': '同步出库',
          'CPRK': '成品入库',
          'MV_WAVE_PICKING': '波次拣货单',
          'MV_PROCESS_PICKING': '加工拣货单',
          'MV_REPLENISHMENT_MOVE': '补货移位单',
          'MV_PUTAWAY': '收货上架单',
          'MV_MOVE': '库内移位单',
          'MV_PICKTICKET_PICKING': '发货单拣货',
          'EMPTYPALLET_RECEIVE': '空托盘入库',
          'EMPTYPALLET_SHIP': '空托盘出库',
          'PICK_BACK': '回库单',
          'PRODUCT_RECEIVE': '生产入库',
          'REPAIR_RECEIVE': '返修入库',
          'BACK_RECEIVE': '退料入库',
          'OUT_MORE_RECEIVE': '盘盈入库',
          'OTHER_RECEIVE': '其他入库',
          'PRODUCT_SHIP': '生产领料',
          'PRODUCT_REPLENISHMENT_SHIP': '生产补料',
          'SALE_SHIP': '销售出库',
          'OTHER_SHIP': '其他出库',
          'MV_COUNT_OUT': '盘点下架单',
          'MV_COUNT_BACK': '盘点回库单'
        },
        'map4': {
          '同步出库': 'TBCK',
          '成品入库': 'CPRK',
          '波次拣货单': 'MV_WAVE_PICKING',
          '加工拣货单': 'MV_PROCESS_PICKING',
          '补货移位单': 'MV_REPLENISHMENT_MOVE',
          '收货上架单': 'MV_PUTAWAY',
          '库内移位单': 'MV_MOVE',
          '发货单拣货': 'MV_PICKTICKET_PICKING',
          '空托盘入库': 'EMPTYPALLET_RECEIVE',
          '空托盘出库': 'EMPTYPALLET_SHIP',
          '回库单': 'PICK_BACK',
          '生产入库': 'PRODUCT_RECEIVE',
          '返修入库': 'REPAIR_RECEIVE',
          '退料入库': 'BACK_RECEIVE',
          '盘盈入库': 'OUT_MORE_RECEIVE',
          '其他入库': 'OTHER_RECEIVE',
          '生产领料': 'PRODUCT_SHIP',
          '生产补料': 'PRODUCT_REPLENISHMENT_SHIP',
          '销售出库': 'SALE_SHIP',
          '其他出库': 'OTHER_SHIP',
          '盘点下架单': 'MV_COUNT_OUT',
          '盘点回库单': 'MV_COUNT_BACK'
        }
      },
      'WmsContainerType': {
        'map1': {
          '0': '普通托盘',
          '1': '库位托盘'
        },
        'map2': {
          '普通托盘': 0,
          '库位托盘': 1
        },
        'map3': {
          'Common': '普通托盘',
          'PalletAsLocation': '库位托盘'
        },
        'map4': {
          '普通托盘': 'Common',
          '库位托盘': 'PalletAsLocation'
        }
      },
      'WmsContainer': {
        'map1': {
          '0': '初始化',
          '1': '组盘',
          '2': '入库中',
          '3': '在库',
          '4': '库内移动',
          '5': '出库中',
          '6': '待处理',
        },
        'map2': {
          '初始化': '0',
          '组盘': '1',
          '入库中': '2',
          '在库': '3',
          '库内移动': '4',
          '出库中': '5',
          '待处理': '6',
        },
        'map3': {
          'Init': '初始化',
          'Binding': '组盘',
          'InBunding': '入库中',
          'Shelves': '在库',
          'Moveing': '库内移动',
          'OutBunding': '出库中',
          'WaitHandle': '待处理',
        },
        'map4': {
          '初始化': 'Init',
          '组盘': 'Binding',
          '入库中': 'InBunding',
          '在库': 'Shelves',
          '库内移动': 'Moveing',
          '出库中': 'OutBunding',
          '待处理': 'WaitHandle',
        }
      },
      'WmsCodeType': {
        'map1': {
          '1': '入库申请单编码',
          '2': '入库单编码',
          '3': '出库申请单编码',
          '4': '出库单编码',
          '5': '上架单编码',
          '6': '单据合并规格编码',
          '7': '盘点计划单编码',
          '8': '载具类型编码',
          '9': '班组编码',
          '10': '产线编码',
          '11': '物料编码',
          '12': '物料分类编码',
          '13': '物料属性规则编码',
          '14': '库位移位单',
          '15': '客户编码',
          '16': '部门编码',
          '17': '供应商编码',
          '18': '波次分配策略编码',
          '19': '盘点下架移动单编码',
          '20': '盘点回库移动单编码',
          '21': '工单编码',
          '22': '批次号编码',
          '23': '库内移位单',
          '24': '装车单',
          '25': '装车单'
        },
        'map2': {
          '入库申请单编码': 1,
          '入库单编码': 2,
          '出库申请单编码': 3,
          '出库单编码': 4,
          '上架单编码': 5,
          '单据合并规格编码': 6,
          '盘点计划单编码': 7,
          '载具类型编码': 8,
          '班组编码': 9,
          '产线编码': 10,
          '物料编码': 11,
          '物料分类编码': 12,
          '物料属性规则编码': 13,
          '库位移位单': 14,
          '客户编码': 15,
          '部门编码': 16,
          '供应商编码': 17,
          '波次分配策略编码': 18,
          '盘点下架移动单编码': 19,
          '盘点回库移动单编码': 20,
          '工单编码': 21,
          '批次号编码': 22,
          '库内移位单': 23,
          '装车单': 24
        },
        'map3': {
          'APPLYRECEIPT': '入库申请单编码',
          'RECEIPT': '入库单编码',
          'APPLYSHIP': '出库申请单编码',
          'SHIP': '出库单编码',
          'MOVEDOC_PUTAWAY': '上架单编码',
          'MERGERULE': '单据合并规格编码',
          'COUNT_PLAN': '盘点计划单编码',
          'CONTAINERTYPE': '载具类型编码',
          'WORKGROUP': '班组编码',
          'WORKLINE': '产线编码',
          'MATERIAL': '物料编码',
          'MATERIALCATEGORY': '物料分类编码',
          'MATERIALPROPERTYRULE': '物料属性规则编码',
          'MOVEDOC': '库位移位单',
          'CUSTOMER': '客户编码',
          'DEPARTMENT': '部门编码',
          'SUPPLIER': '供应商编码',
          'WAVEDISTRIBUTERULE': '波次分配策略编码',
          'MOVEDOC_COUNT_OUT': '盘点下架移动单编码',
          'MOVEDOC_COUNT_BACK': '盘点回库移动单编码',
          'WORKDOC': '工单编码',
          'BATCHNO': '批次号编码',
          'MV_MOVE': '库内移位单',
          'BOL': '装车单',
          'PALLET': '装车单'
        },
        'map4': {
          '入库申请单编码': 'APPLYRECEIPT',
          '入库单编码': 'RECEIPT',
          '出库申请单编码': 'APPLYSHIP',
          '出库单编码': 'SHIP',
          '上架单编码': 'MOVEDOC_PUTAWAY',
          '单据合并规格编码': 'MERGERULE',
          '盘点计划单编码': 'COUNT_PLAN',
          '载具类型编码': 'CONTAINERTYPE',
          '班组编码': 'WORKGROUP',
          '产线编码': 'WORKLINE',
          '物料编码': 'MATERIAL',
          '物料分类编码': 'MATERIALCATEGORY',
          '物料属性规则编码': 'MATERIALPROPERTYRULE',
          '库位移位单': 'MOVEDOC',
          '客户编码': 'CUSTOMER',
          '部门编码': 'DEPARTMENT',
          '供应商编码': 'SUPPLIER',
          '波次分配策略编码': 'WAVEDISTRIBUTERULE',
          '盘点下架移动单编码': 'MOVEDOC_COUNT_OUT',
          '盘点回库移动单编码': 'MOVEDOC_COUNT_BACK',
          '工单编码': 'WORKDOC',
          '批次号编码': 'BATCHNO',
          '库内移位单': 'MV_MOVE',
          '装车单': 'BOL'
        }
      },
      'WmsAROperateStatus': {
        'map1': {
          '1': '创建',
          '2': '注册',
          '3': '操作',
          '4': '完成'
        },
        'map2': {
          '创建': 1,
          '注册': 2,
          '操作': 3,
          '完成': 4
        },
        'map3': {
          'CREATED': '创建',
          'REGISTERED': '注册',
          'OPERATING': '操作',
          'COMPLETE': '完成'
        },
        'map4': {
          '创建': 'CREATED',
          '注册': 'REGISTERED',
          '操作': 'OPERATING',
          '完成': 'COMPLETE'
        }
      },
      'WmsROperateStatus': {
        'map1': {
          '1': '创建',
          '2': '注册',
          '3': '操作',
          '4': '完成'
        },
        'map2': {
          '创建': 1,
          '注册': 2,
          '操作': 3,
          '完成': 4
        },
        'map3': {
          'CREATED': '创建',
          'REGISTERED': '注册',
          'OPERATING': '操作',
          'COMPLETE': '完成'
        },
        'map4': {
          '创建': 'CREATED',
          '注册': 'REGISTERED',
          '操作': 'OPERATING',
          '完成': 'COMPLETE'
        }
      },
      'WmsSOperateStatus': {
        'map1': {
          '1': '创建',
          '2': '注册',
          '3': '操作',
          '4': '完成'
        },
        'map2': {
          '创建': 1,
          '注册': 2,
          '操作': 3,
          '完成': 4
        },
        'map3': {
          'CREATED': '创建',
          'REGISTERED': '注册',
          'OPERATING': '操作',
          'COMPLETE': '完成'
        },
        'map4': {
          '创建': 'CREATED',
          '注册': 'REGISTERED',
          '操作': 'OPERATING',
          '完成': 'COMPLETE'
        }
      },
      'WmsBillAuditStatus': {
        'map1': {
          '1': '编辑中',
          '2': '提交审核',
          '3': '审核通过',
          '4': '审核不通过'
        },
        'map2': {
          '编辑中': 1,
          '提交审核': 2,
          '审核通过': 3,
          '审核不通过': 4
        },
        'map3': {
          'EDITING': '编辑中',
          'APPLYAUDIT': '提交审核',
          'PASS': '审核通过',
          'NOTPASS': '审核不通过'
        },
        'map4': {
          '编辑中': 'EDITING',
          '提交审核': 'APPLYAUDIT',
          '审核通过': 'PASS',
          '审核不通过': 'NOTPASS'
        }
      },
      'WmsMergeRuleType': {
        'map1': {
          '1': '入库单合并规则',
          '2': '出库单合并规则'
        },
        'map2': {
          '入库单合并规则': 1,
          '出库单合并规则': 2
        },
        'map3': {
          'RECEIPT': '入库单合并规则',
          'SHIP': '出库单合并规则'
        },
        'map4': {
          '入库单合并规则': 'RECEIPT',
          '出库单合并规则': 'SHIP'
        }
      },
      'WmsWaveDistributeRule': {
        'map1': {
          '1': '立库优先',
          '2': '非立库优先',
          '3': '入库时间先入先出',
          '4': '入库时间后入先出',
          '5': '生产时间先入先出',
          '6': '生产时间后入先出',
          '7': '临近有效期先出',
          '8': '远离有效期先出',
          '9': '先零后整',
          '10': '先整后零',
          '11': '先近端后远端',
          '12': '先远端后近端',
          '13': '层由低到高',
          '14': '层由高到低',
          '15': '列由低到高',
          '16': '列由高到低',
          '17': '巷道由低到高',
          '18': '巷道由高到低'
        },
        'map2': {
          '立库优先': 1,
          '非立库优先': 2,
          '入库时间先入先出': 3,
          '入库时间后入先出': 4,
          '生产时间先入先出': 5,
          '生产时间后入先出': 6,
          '临近有效期先出': 7,
          '远离有效期先出': 8,
          '先零后整': 9,
          '先整后零': 10,
          '先近端后远端': 11,
          '先远端后近端': 12,
          '层由低到高': 13,
          '层由高到低': 14,
          '列由低到高': 15,
          '列由高到低': 16,
          '巷道由低到高': 17,
          '巷道由高到低': 18
        },
        'map3': {
          'ASRSFIRST': '立库优先',
          'NOASRSFIRST': '非立库优先',
          'InDateFIFO': '入库时间先入先出',
          'InDateLIFO': '入库时间后入先出',
          'ProductDateFIFO': '生产时间先入先出',
          'ProductDateLIFO': '生产时间后入先出',
          'ValidDateFIFO': '临近有效期先出',
          'ValidDateLIFO': '远离有效期先出',
          'FOLW': '先零后整',
          'FWLO': '先整后零',
          'FNLF': '先近端后远端',
          'FFLN': '先远端后近端',
          'LAYFLLH': '层由低到高',
          'LAYFHLL': '层由高到低',
          'COLFLLH': '列由低到高',
          'COLFHLL': '列由高到低',
          'LANFLLH': '巷道由低到高',
          'LANFHLL': '巷道由高到低'
        },
        'map4': {
          '立库优先': 'ASRSFIRST',
          '非立库优先': 'NOASRSFIRST',
          '入库时间先入先出': 'InDateFIFO',
          '入库时间后入先出': 'InDateLIFO',
          '生产时间先入先出': 'ProductDateFIFO',
          '生产时间后入先出': 'ProductDateLIFO',
          '临近有效期先出': 'ValidDateFIFO',
          '远离有效期先出': 'ValidDateLIFO',
          '先零后整': 'FOLW',
          '先整后零': 'FWLO',
          '先近端后远端': 'FNLF',
          '先远端后近端': 'FFLN',
          '层由低到高': 'LAYFLLH',
          '层由高到低': 'LAYFHLL',
          '列由低到高': 'COLFLLH',
          '列由高到低': 'COLFHLL',
          '巷道由低到高': 'LANFLLH',
          '巷道由高到低': 'LANFHLL'
        }
      }
    }
    return enums
  }
  