<template>
  <div class="page-container">
    <!--工具栏-->
    <div   v-if="currModelID!= undefined"  class="toolbar" style="float: left; padding-top:10px; padding-left: 15px;display:flex;flex-direction:row">
    <header-column :columns="columns" highSearch     @on-search='handleSearch'   ></header-column>
    <div  style="display:flex;align-items:center;margin-left:10px">
       <kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:dict:add" type="primary" @click="handleAdd" />
       <kt-button icon="fa fa-download" :label="$t('action.download')" perms="sys:dict:download"   @click="handleDownLoad" />
       <kt-button icon="fa fa-plus" :label="$t('action.addReceipt')" perms="sys:dict:add" type="primary" @click="handleAddReceipt" />
    </div>
    </div>
    <!--表格内容栏 
     -->
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
    <!-- 收货单明细增加 -->
    <ReceiptOrderItemManager ref="ReceiptOrderItemMg" @on-close="$refs.ReceiptOrderItemMg.refresh()" :CurrentEntity="currentRow"   :currModMaterial="currMaterial"  :currModelIDUnit ='currModelID'    @findPage="findPage"   />
   <!-- 申请入库单   @on-close="search()" -->
    <ApplyReceiptOrderConverter ref="applyReceiptOrderConverter" :CurrentEntity="CurrentEntity" @on-close="search()"/>
    
</div>
</template>
<script>
import KtTable from "@/views/core/KtTableData"
import KtButton from "@/views/core/KtButton"
import HeaderColumn from '../../core/HeaderColumn.vue'
import ReceiptOrderItemManager from './ReceiptOrderItemManager.vue'
import {  CreateReceiptOrderItemDto  }   from '@/libs/createDto' 
import ApplyReceiptOrderConverter from './applyReceiptOrderConverter'

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
    ApplyReceiptOrderConverter,
    ReceiptOrderItemManager
  },
  computed: {
    currModel () { 
      return this.CurrentEntity.receiptOrderItems ||[]
    },
   
  },
  data() {
    return {  
      currMaterial: {materialPropertyRule:{}}, 
      size: 'small',
      lastCondition: undefined,
      currentRow: undefined,
      insideLoading: false,
      showOperation: true,
      showBatchDelete: false,
      queryType: 0,
      pageRequest: { pageNum: 1, pageSize: 10 },
    };
  },
  methods: {
    onSuccessSubmit(){
      console.log("关闭申请单的日志")
    },
    handleSearch (condition) {
      this.pageRequest.pageNum = 1
      this.search(condition)
    },
 
    async search (condition=[]) {  
      
      this.insideLoading = true 
      let lastConditions =  {
            "key":"receiptOrderId",
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
      let ret = await this.$http.postAsync("/app/ReceiptOrderItem/GetList", param)  
            if(ret.data.data.totalCount!=0) {
            // this.$message({message: '查询成功', type: 'success'})
            this.currModel.splice(0,this.currModel.length) 
            ret.data.data.items.map((item)=>{
              this.currModel.push(item)
            }) 
          } else {
            // this.$message({message: '未查询到数据', type: 'error'})
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
      if(this.currModelID){

      let condition = {
        skipCount: pageNumber,
        maxResultCount: this.pageRequest.pageSize,
        sorting: "id desc",
        conditionItems: [
        {
            "key":"receiptOrderId",
            "value":String(this.currModelID),
            "operator":"1"
          }
        ] 
      }
      this.$http.postAsync("/app/ReceiptOrderItem/GetList", condition).then((res) => {
        if (res.data.result) {  
          // 用于界面更新
            this.currModel.splice(0,this.currModel.length)
            res.data.data.items.map((item)=>{
              this.currModel.push(item)
            }) 
        }
      }).catch(error=>{}); 
    }

    },
 

    //  下载
    handleDownLoad(){
       
      this.$http.getAsync('/app/ReceiptOrderItem/GetCreateManyExcel',{responseType:'blob'}).then((res)=>{
         //console.log("下载的数据---》",res )

      }).catch(error=>{})
    },
    // 新增
    handleAdd() {
      this.currMaterial.materialPropertyRule = {}
      this.currentRow = CreateReceiptOrderItemDto()
      this.$refs.ReceiptOrderItemMg.dialogVisible = true
			this.$refs.ReceiptOrderItemMg.operation = true
      this.$refs.ReceiptOrderItemMg.dialogMaterial = false
      
    },
    // 申请单导入获得明细数据
    handleAddReceipt(){
      this.$refs.applyReceiptOrderConverter.dialogVisible = true
      this.$refs.applyReceiptOrderConverter.applyReceiptOrderItems=[]
      this.$refs.applyReceiptOrderConverter.applyReceiptData=[] 
      
      // this.$refs.applyReceiptOrderConverter.getData()
    },
    // 编辑
   async handleEdit(params) {
    if(params.applyReceiptOrderCode){
      this.$message({message: '入库申请单不为空，不允许修改 ' , type: 'error'})
      return 
    }
       // 用于子页面判断哪些显示哪些不显示
     await this.getMaterial(params.row.materialId)
     await this.getAllModPropertyRule(params.row.materialId)
      this.currentRow = Object.assign({}, params.row)
      this.$refs.ReceiptOrderItemMg.dialogVisible = true
      this.$refs.ReceiptOrderItemMg.operation = false
      this.$refs.ReceiptOrderItemMg.dialogMaterial = true
    },

    // 删除
	  handleDelete: function (data) { 
      console.log("删除的data-->",data)
      if(data.params[0].row.xStatus == 0){
        this.$message({message: '状态为打开，不允许删除 ' , type: 'error'})
      return 
      }
			this.$http.deleteAsync('/app/ReceiptOrderItem/Delete',data.params[0]).then(data!=null?data.callback:'').catch(error=>{})
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
        this.$refs.ReceiptOrderItemMg.materialData  =   ret.data.data.items
        this.$refs.ReceiptOrderItemMg.packageUnits =   ret.data.data.items[0].packageUnits 
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
    } ,
 
  }, 
};
</script>
  