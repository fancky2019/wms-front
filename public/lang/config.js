/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
/* eslint-disable no-tabs */
// 自定义配置参数
function getConfiguration () {
  return {
    baseUrl: {
      pro: 'http://60.174.197.249:13998',
      // pro: 'http://47.100.230.50:44349/api/app/',
      auth: 'http://60.174.197.249:13998',
      middleware: 'http://localhost:9877/',
      applyReceiptOrder: '', // 入库管理/入库申请：刷新按钮将调用该webapi
      applyShipOrder: '' // 出库管理/出库申请：刷新按钮将调用该webapi
    },
    // 异常提示时间
    // warningDuration: 120,
    // 任务预警，10分钟黄，15分钟红
    isWarningTask: false,
    // 是否打印预览
    // isPreview: false,
    // 是否显示帮助
    isShowHelp: false,
    // 是否显示序号
    isShowIndex: false,
    // 是否打开多仓模式
    isMutiWarehouse: false,
    // 出入库单是否显示汇总
    isShowSummary: false,
    // 每页数选项
    pageSizeOpts: [10, 20, 30, 40, 100],
    // 打印机列表
    // printer: [ { name: '1楼打印机', value: 'Printer1' }, { name: '2楼打印机', value: 'Printer2' } ],
    // 首页设置
    // homePage: 'view/inventory/visualization/locationVisualization.vue', // 'demo/demo.html',
    // 是否设置默认值
    isSetDefaultVal: false,
    // 默认月台
    defaultDock: '',
    // 默认属性规则
    defaultMaterialPropertyRule: '',
    // 默认入库规则
    defaultAllocateRule: '',
    // 默认出库规则
    defaultShipmentRule: '',
    // 默认补货规则
    defaultReplenishmentRule: '',
    // 是否启用导入历史库存
    isImportInventory: 'Y',
    // 物料是否启用上传图片
    isUseMaterialImg: 'N'
  }
}
function getCustomConfig () {
  let config = {
    locationVisualization: {
      isShowColorView: false,
      // colors: ['#FFFACD', '#DDA0DD', '#D2691E', '#9ACD32', '#EE82EE', '#FF8C00', '#DEB887', '#FFFFF0', '#FFF8DC', '#FFD700', '#2F4F4F', '#20B2AA', '#7FFF00', '#483D8B', '#7FFFD4,48D1CC', '#00BFFF', '#A9A9A9', '#696969', '#FF0000'],
      // isShowLocCode: true,
      // beginXRack: 0,
      totalXRack: 100,
      totalXLevel: 100
    },
    tally: {
      isShow: false,
      MinColumn: 5,
      MaxColumn: 37,
      IsFromMaxToMin: 'Y'
    }
  }
  return config
}