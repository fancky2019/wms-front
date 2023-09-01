<template>
    <div class="page-container">
      <!--工具栏-->
      <el-dialog      v-dialogDrag   width="80%"  :visible.sync="dialogVisible" :close-on-click-modal="false" >
        <el-form ref="form" :model="rightReceiptOrder" label-width="95px" >
          <el-row>
            <el-col :span="6">
              <el-form-item :label="getDisplayName('xCode')">
                <el-input v-model="rightReceiptOrder.xCode" disabled/>
              </el-form-item>
            </el-col> 
          </el-row>
        <!--表格内容栏 
        -->
        <el-form-item> 
          <kt-table
            :data="currModel"
            :columns="columns"  
            :showOperation="showOperation"
            :loading="insideLoading" 
            :showBatchDelete="showBatchDelete"
            @findPage="findPage"   
            @handelRowClick="handelRowClick"
            
          >
          </kt-table>
        </el-form-item>
    <!-- <div  style= " display:flex ;justify-content: end;  "> 
    <kt-button :size="size" icon="fa fa-plus" :label="$t('action.receive')" perms="sys:dict:add" type="primary"    />
    </div> -->
  </el-form>
      </el-dialog>
      <!-- 收货单明细增加 -->
      <RightReceiptOrderItemInner ref="ReceiptOrderItemInner" @on-close="$refs.pages.refresh()" :CurrentEntity="selectionChgData"   :currModMaterial="currMaterial"  :currModelIDUnit ='currModelID'    @findPage="findPage"   />
 
  </div>
  </template>
  <script>
  import KtTable from "@/views/core/KtTableData"
  import RightReceiptOrderItemInner from './RightReceiptOrderItemInner.vue' 
  import {  getDisplayName } from '@/libs/common'
   
  export default {
      props: {
      CurrentEntity: Object, 
      columns:Array,
      currModelID:Number
    },
    components: {
      KtTable,  
      RightReceiptOrderItemInner
    },
    computed: {
      currModel () { 
        return this.CurrentEntity? this.CurrentEntity.receiptOrderItems:[]
      },
      rightReceiptOrder(){
        return this.CurrentEntity? this.CurrentEntity:{xCode:''}
      }
     
    },
    data() {
      return { 
        dialogVisibleinner:false,
        dialogVisible:false,  
        currMaterial: {materialPropertyRule:{}}, 
        size: 'small',
        lastCondition: undefined,
        currentRow: undefined,
        insideLoading: false,
        showOperation: false,
        showBatchDelete: false,
        queryType: 0,
        pageRequest: { pageNum: 1, pageSize: 10 },
        selectionChgData:{}
      };
    },
    methods: {
      handelRowClick(row){
        console.log("row--->",row)
          // 用于子页面判断哪些显示哪些不显示
        // await this.getMaterial(row.selections[0].materialId)
        // await this.getAllModPropertyRule(row.selections[0].materialId)
        this.$refs.ReceiptOrderItemInner.dialogVisibleinner = true 
       
        row.receiptOrderItemId = row.id
        this.selectionChgData = row
        console.log("选中的数据--->",  this.selectionChgData ) 
      },
 
        getDisplayName (key) {
            return getDisplayName('applyReceiptOrderManager', key)[0]
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
            this.$refs.ReceiptOrderItemInner.materialData  =   ret.data.data.items
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
    