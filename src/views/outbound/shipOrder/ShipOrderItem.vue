<template>
  <div class="page-container">
    <!--工具栏 -->
    <div v-if="currModelID!= undefined"  class="toolbar" style="float: left; padding-top:10px; padding-left: 15px;display:flex;flex-direction:row">
    <header-column :columns="columns" highSearch     @on-search='handleSearch'   ></header-column>
    <div  style="display:flex;align-items:center;margin-left:10px">
       <kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:dict:add" type="primary" @click="handleAdd" />
       <kt-button icon="fa fa-download" :label="$t('action.download')" perms="sys:dict:download"   @click="handleDownLoad" />
       <kt-button icon="fa fa-plus" :label="$t('action.addShipOrder')" perms="sys:dict:add" type="primary" @click="handleShipOrder" />
    </div>
    </div>
    <!--表格内容栏-->
    <kt-table
      :data="currModel"
      :columns="columns" 
      :showOperation="showOperation"
      :loading="insideLoading"
      :showBatchDelete="showBatchDelete"
      @handleDelete="handleDelete"
      @handleEdit="handleEdit" 
      @findPage="findPage"
    >
    </kt-table>
    <!-- 发货单明细 -->
    <ShipOrderItemManger ref="ShipOrderItemMg" @on-close="$refs.pages.refresh()" :CurrentEntity="currentRow" :currModMaterial="currMaterial"  :currModelIDUnit ='currModelID'   @findPageItem="findPage"   />
    <!-- 申请出库单 -->
    <ApplyShipOrderConverter ref="applyShipOrderConverter" :CurrentEntity="CurrentEntity" @on-close="search()"/>
  </div>
</template>
<script>
import KtTable from "@/views/core/KtTableData"
import KtButton from "@/views/core/KtButton"
import HeaderColumn from '../../core/HeaderColumn.vue'
import ShipOrderItemManger from './ShipOrderItemManger'
import ApplyShipOrderConverter from './ApplyShipOrderConverter'
import {  CreateApplyShipOrderItemDto }   from '@/libs/createDto'
export default {
    props: { 
    CurrentEntity: Object,
    columns:Array,
    currModelID:Number
  },
  components: {
    KtTable, 
    HeaderColumn,
    KtButton,
    ShipOrderItemManger,
    ApplyShipOrderConverter
  },
  computed: {
    currModel () { 
      return this.CurrentEntity.shipOrderItems
    },
  },
  data() {
    return {  
      size: 'small',
      lastCondition: undefined,
      currentRow: undefined,
      insideLoading: false,
      showOperation: true,
      showBatchDelete: false,
      queryType: 0,
      pageRequest: { pageNum: 1, pageSize: 10 },
      currMaterial: {materialPropertyRule:{}}
    };
  },
  methods: {
    handleSearch (condition) {
      this.pageRequest.pageNum = 1
      this.search(condition)
    },
    async search (condition=[]) {  
      this.insideLoading = true
      let lastConditions =  {
            "key":"shipOrderId",
            "value":String(this.currModelID),
            "operator":"1"
          } 
      condition.push(lastConditions) 
      let param = {
        skipCount: this.pageRequest.pageNum ,
        maxResultCount: this.pageRequest.pageSize, 
        conditionItems:condition,
        sorting: "id desc",
      } 
      // 还需要最外层的基础物料的id 
      let ret = await this.$http.postAsync("/app/ShipOrderItem/GetList", param)  
            if(ret!=undefined) {
            if(ret.data.data.totalCount!=0) {
            // this.$message({message: '查询成功', type: 'success'})
            this.currModel.splice(0,this.currModel.length) 
            ret.data.data.items.map((item)=>{
              this.currModel.push(item)
            }) 
          } else {
            // this.$message({message: '未查询到数据', type: 'error'})
          } 
            }
      this.insideLoading = false   
    },
    // 获取分页数据
    findPage: function (data) {
      if (data !== null) {
        this.pageRequest = data.pageRequest;
      }
      let pageNumber = this.pageRequest.pageNum
      if(pageNumber>1) {
        pageNumber = (this.pageRequest.pageNum-1)*this.pageRequest.pageSize+1
      }
      let condition = {
        skipCount: pageNumber,
        maxResultCount: this.pageRequest.pageSize,
        sorting: "id desc",
        conditionItems: [
        {
            "key":"shipOrderId",
            "value":String(this.currModelID),
            "operator":"1"
          }
        ] 
      }
      if (this.currModelID) {
        this.$http.postAsync("/app/ShipOrderItem/GetList", condition).then((res) => {
          if(res!=undefined){
            if (res.data.result) {
          // 用于界面更新
            this.currModel.splice(0,this.currModel.length)
            res.data.data.items.map((item)=>{
              this.currModel.push(item)
            }) 
        }
          }
      })
      }
    },
    //  下载
    handleDownLoad(){ 
      this.$http.getAsync('/app/ShipOrderItem/GetCreateManyExcel',{responseType:'blob'}).then((res)=>{
      }).catch(error=>{})
    },
    // 新增
    handleAdd() {
      this.currMaterial.materialPropertyRule = {}
      this.currentRow = CreateApplyShipOrderItemDto()
      this.$refs.ShipOrderItemMg.dialogVisible = true
	    this.$refs.ShipOrderItemMg.operation = true
      this.$refs.ShipOrderItemMg.dialogMaterial = false
    },
    // 申请单导入
    handleShipOrder(){
     this.$refs.applyShipOrderConverter.dialogVisible = true
     this.$refs.applyReceiptOrderConverter.applyShipOrderItems=[]
     this.$refs.applyReceiptOrderConverter.applyShipOrderData=[] 
    },
    // 编辑
    async handleEdit(params) {
      // 用于子页面判断哪些显示哪些不显示
      await this.getMaterial(params.row.materialId)
      await this.getAllModPropertyRule(params.row.materialId)
      this.currentRow = Object.assign({}, params.row)
      this.currentRow.packageUnitId = this.$store.state.my.PackageUnitDic[this.currentRow.packageUnitId]
      this.$refs.ShipOrderItemMg.dialogVisible = true
      this.$refs.ShipOrderItemMg.operation = false
      this.$refs.ShipOrderItemMg.dialogMaterial = false
    },
  // 用于子页面判断哪些显示哪些不显示
    async getMaterial(materialId){
    let lastConditions =  [{
      "key":"id",
      "value":String(materialId),
      "operator":1
    } ]
    let param = {
      skipCount: 1,
      maxResultCount:10000, 
      conditionItems:lastConditions,
      sorting: "id desc",
    } 
    // 还需要最外层的基础物料的id 
    await this.$http.postAsync("/app/Material/GetList", param).then((ret)=>{
      if (ret.data.result) {
        this.$refs.ShipOrderItemMg.materialData  =   ret.data.data.items
      }
    }).catch(error=>{})
  },
  // 用于子页面判断哪些显示哪些不显示
    async getAllModPropertyRule(materialId){
    let lastConditions =  [{
      "key":"id",
      "value":String(materialId),
      "operator":1
    } ]
    let param = {
      skipCount: 1,
      maxResultCount:10000, 
      conditionItems:lastConditions,
      sorting: "id desc",
    } 
    // 还需要最外层的基础物料的id 
    await this.$http.postAsync("/app/Material/GetList", param).then((ret)=>{
      if (ret.data.result) {
        let materialData =   ret.data.data.items[0].materialCategoryId
        // 通过物料类目的ID查找到对应的属性规则的ID，然后获取属性规则中字段的显示还是不显示
        let condition = {
          "skipCount": 1,
          "maxResultCount": 10000,
          "sorting": "id desc",
          "conditionItems": [
            {
              "key": "id",
              "value": String(materialData),
              "operator": 1
            }
          ]
        }
        this.$http.postAsync("/app/MaterialCategory/GetList", condition).then((res) => { 
          if (res.data.result) {
            let innerMaterialPropertyRuleId = res.data.data.items[0].materialPropertyRuleId 
            let innerCondition = {
              "skipCount": 1,
              "maxResultCount": 10000,
              "sorting": "id desc",
              "conditionItems": [
                {
                  "key": "id",
                  "value": String(innerMaterialPropertyRuleId),
                  "operator": 1
                }
              ]
            }
            this.$http.postAsync("/app/MaterialPropertyRule/GetList", innerCondition).then((res)=>{
              if (res.data.result) {  
                this.currMaterial.materialPropertyRule =   res.data.data.items[0] 
            
              }
            }).catch(error=>{})
          }
        }).catch(error=>{}) 
      } 
    }).catch(error=>{})   
    },
    // 删除
	handleDelete: function (data) { 
	  this.$http.deleteAsync('/app/ShipOrderItem/Delete',data.params[0]).then(data!=null?data.callback:'').catch(error=>{})
	},
  }, 
};
</script>
  