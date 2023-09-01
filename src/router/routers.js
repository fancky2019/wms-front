import HomeView from "../views/HomeView.vue"
import Intro from "@/views/Intro/Intro"
const routes = [
  {
    path:'/login',
    name:'login',
    meta:{
      title:'Login-登录',
    },
    component:()=> 
    import('@/views/login/login.vue')
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
    children: [ 
      {
        path: "",
        name: "首页",
        component: Intro,
        meta: {
          icon: "fa fa-home fa-lg",
          index: 0,
        },
      },
        // { 
        //     "path": "8001/swagger-ui.html",
        //     "name": "接口文档",
        //     "meta": {
        //         "icon": "el-icon-document",
        //         "index": 46
        //     }
        // },
        // {
        //     "path": "generator/generator",
        //     "name": "代码生成",
        //     "meta": {
        //         "icon": "el-icon-star-on",
        //         "index": 48
        //     }
        // },
        // {
        //     "path": "sys/online",
        //     "name": "在线用户",
        //     "meta": {
        //         "icon": "el-icon-view",
        //         "index": 50
        //     }
        // },
        {
            "path": "BData/basicSet/BasicStrategy",
            "name": "基础策略",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/BData/basicSet/BasicStrategy.vue')
        },
        {
            "path": "BData/basicSet/BillType",
            "name": "单据类型",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/BData/basicSet/BillType.vue')
        },
        {
            "path": "BData/basicSet/Conveyor",
            "name": "输送线",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/BData/basicSet/Conveyor.vue')
        },
        {
            "path": "BData/basicSet/CodeRule",
            "name": "编码规则",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/BData/basicSet/CodeRule.vue')
        },
        {
            "path": "BData/basicSet/Enumerable",
            "name": "字典数据",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/BData/basicSet/Enumerable.vue')
        },
        {
            "path": "sys/aboutview",
            "name": "用户管理",
            "meta": {
                "icon": "el-icon-service",
                "index": 2
            },
            component:()=> 
            import('@/views/sys/AboutView.vue')
        },
        {
            "path": "BData/warehouses/Warehouse",
            "name": "仓库管理",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/BData/warehouses/Warehouse.vue')
        },
        {
            "path": "BData/warehouses/Zone",
            "name": "库区管理",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/BData/warehouses/Zone.vue')
        }, 
        {
            "path": "BData/warehouses/Location",
            "name": "货位管理",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/BData/warehouses/Location.vue')
        },
        {
            "path": "BData/warehouses/Rack",
            "name": "货架管理",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/BData/warehouses/Rack.vue')
        },
        {
            "path": "BData/warehouses/Area",
            "name": "分区管理",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/BData/warehouses/Area.vue')
        },
        {
            "path": "BData/warehouses/Dock",
            "name": "月台管理",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/BData/warehouses/Dock.vue')
        },
        {
            "path": "BData/warehouses/Laneway",
            "name": "巷道管理",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/BData/warehouses/Laneway.vue')
        },
        {
            "path": "BData/materials/MaterialCategory",
            "name": "物料类目",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/BData/materials/MaterialCategory.vue')
        },
        {
            "path": "BData/materials/MaterialPropertyRule",
            "name": "属性规则",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/BData/materials/MaterialPropertyRule.vue')
        },
        {
            "path": "BData/materials/BasicMaterial",
            "name": "基础物料",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/BData/materials/BasicMaterial.vue')
        },
        {
            "path": "BData/materials/Property",
            "name": "扩展属性",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/BData/materials/Property.vue')
        },
        {
            "path": "BData/orgnizations/Orgnization",
            "name": "组织管理",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/BData/orgnizations/Orgnization.vue')
        },
        {
            "path": "BData/orgnizations/Department",
            "name": "部门管理",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/BData/orgnizations/Department.vue')
        },
        {
            "path": "BData/containers/ContainerType",
            "name": "载具类型",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/BData/containers/ContainerType.vue')
        },
        {
            "path": "BData/containers/Container",
            "name": "载具管理",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/BData/containers/Container.vue')
        },
        {
            "path": "BData/others/WorkLine",
            "name": "产线管理",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/BData/others/WorkLine.vue')
        },
        {
            "path": "BData/others/WorkLineBackup",
            "name": "产线备份管理",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/BData/others/WorkLineBackup.vue')
        },
        {
            "path": "BData/others/WorkGroup",
            "name": "班组管理",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/BData/others/WorkGroup.vue')
        },
        {
            "path": "BData/others/Vehicle",
            "name": "车辆管理",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/BData/others/Vehicle.vue')
        },
        {
            "path": "inbound/apply/ApplyReceiptOrder",
            "name": "入库申请单",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/inbound/apply/ApplyReceiptOrder.vue')
        },
        {
            "path": "inbound/receiptOrder/ReceiptOrder",
            "name": "收获单管理",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/inbound/receiptOrder/ReceiptOrder.vue')
        },
        {
            "path": "inbound/receive/ReceiveRecord",
            "name": "收货记录",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/inbound/receive/ReceiveRecord.vue')
        },
        {
            "path": "inbound/moveDoc/mvputaway",
            "name": "上架管理",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/inbound/moveDoc/mvputaway.vue')
        },
        {
            "path": "outbound/apply/ApplyShipOrder",
            "name": "出库申请单",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/outbound/apply/ApplyShipOrder.vue')
        },
        {
            "path": "outbound/shipOrder/ShipOrder",
            "name": "发货单管理",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/outbound/shipOrder/ShipOrder.vue')
        },
        {
            "path": "outbound/movedoc/ShipPickOrder",
            "name": "拣货单管理",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/outbound/movedoc/ShipPickOrder.vue')
        },
        {
            "path": "count/count/CountOrder",
            "name": "盘点管理",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/count/count/CountOrder.vue')
        },
        {
            "path": "count/countmove/CountMove",
            "name": "盘点计划",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/count/countmove/CountMove.vue')
        },
        {
            "path": "count/countrecord/Countrecord",
            "name": "盘点差异",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/count/countrecord/Countrecord.vue')
        },
        {
            "path": "workdoc/taskOrder/TaskOrder",
            "name": "作业管理",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/workdoc/taskOrder/TaskOrder.vue')
        },
        {
            "path": "workdoc/workOrder/WorkOrder",
            "name": "工单管理",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/workdoc/workOrder/WorkOrder.vue')
        },
        {
            "path": "inventory/inventory/Inventory",
            "name": "库存信息",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/inventory/inventory/Inventory.vue')
        },
        {
            "path": "inventory/achieved/Achieved",
            "name": "库存归档",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/inventory/achieved/Achieved.vue')
        },
        {
            "path": "inventory/mvtransfer/mvtransfer",
            "name": "库存调拨",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/inventory/mvtransfer/mvtransfer.vue')
        },
        {
            "path": "inventory/flow/InventoryFlow",
            "name": "库存流水",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/inventory/flow/InventoryFlow.vue')
        },
        {
            "path": "inventory/visualization/locationVisualization",
            "name": "立库视图",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/inventory/visualization/locationVisualization.vue')
        },
        {
            "path": "inventory/visualization/locViewFlat",
            "name": "平库视图",
            "meta": {
                "icon": "el-icon-service",
                "index": 1
            },
            component:()=> 
            import('@/views/inventory/visualization/locViewFlat.vue')
        },
        {
            "path": "sys/report",
            "name": "机构管理",
            "meta": {
                "icon": "el-icon-news",
                "index": 7
            },
            component:()=> 
            import('@/views/sys/report.vue')
        },
        {
            "path": "sys/Loginlog",
            "name": "角色管理",
            "meta": {
                "icon": "el-icon-view",
                "index": 12
            },
            component:()=> 
            import('@/views/sys/Loginlog.vue')
        },
        {
            "path": "sys/menu",
            "name": "菜单管理",
            "meta": {
                "icon": "el-icon-menu",
                "index": 17
            },
            // component: () => import('@/views/sys/menu.vue')
        },
        {
            "path": "sys/dict",
            "name": "字典管理",
            "meta": {
                "icon": "el-icon-edit-outline",
                "index": 22
            }
        },
        {
            "path": "sys/config",
            "name": "系统配置",
            "meta": {
                "icon": "el-icon-edit-outline",
                "index": 27
            }
        },
        {
            "path": "sys/loginlog",
            "name": "登录日志",
            "meta": {
                "icon": "el-icon-info",
                "index": 32
            }
        },
        {
            "path": "sys/log",
            "name": "操作日志",
            "meta": {
                "icon": "el-icon-info",
                "index": 35
            }
        },
        // {
        //     "path": "8500",
        //     "name": "注册中心",
        //     "meta": {
        //         "icon": " el-icon-view",
        //         "index": 44
        //     }
        // },
        // {
        //     "path": "8001/druid/login.html",
        //     "name": "数据监控",
        //     "meta": {
        //         "icon": "el-icon-warning",
        //         "index": 39
        //     }
        // },
        // {
        //     "path": "8000/",
        //     "name": "服务监控",
        //     "meta": {
        //         "icon": "el-icon-view",
        //         "index": 41
        //     }
        // },
        // {
        //     "path": "demo/i18n",
        //     "name": "国际化",
        //     "meta": {
        //         "icon": "el-icon-edit",
        //         "index": 53
        //     }
        // },
        // {
        //     "path": "demo/theme",
        //     "name": "换皮肤",
        //     "meta": {
        //         "icon": "el-icon-picture",
        //         "index": 55
        //     }
        // }
    
    ]
  },
 
];
export default routes