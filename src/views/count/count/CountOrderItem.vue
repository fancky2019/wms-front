<template>
  <div class="page-container">
    <!--工具栏  v-if="currModelID!= undefined" -->
    <div   class="toolbar" style="float: left; padding-top:10px; padding-left: 15px;display:flex;flex-direction:row">
    <header-column :columns="columns" highSearch     @on-search='handleSearch'   ></header-column>
    <div  style="display:flex;align-items:center;margin-left:10px">
       <kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:dict:add" type="primary" @click="handleAdd" />
       <kt-button icon="fa fa-download" :label="$t('action.download')" perms="sys:dict:download"   @click="handleDownLoad" />

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
    <!--  -->
    <CountOrderItemManger ref="ShipPickOrderItem" @on-close="$refs.pages.refresh()" :CurrentEntity="currentRow"   @findPage="findPage"   />
  </div>
</template>
<script>
import KtTable from "@/views/core/KtTableData"
import KtButton from "@/views/core/KtButton"
import HeaderColumn from '../../core/HeaderColumn.vue'
import CountOrderItemManger from './CountOrderItemManger'
import {  CreateShipPickOrderItemDto }   from '@/libs/createDto'
export default {
    props: {
    EntityItemData: Object,
    columns:Array,
    currModelID:Number
  },
  components: {
    KtTable, 
    HeaderColumn,
    KtButton,
    CountOrderItemManger
  },
  computed: {
    currModel () { 
      return this.EntityItemData
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
    };
  },
  created(){
    console.log(this.EntityItemData);
  },
  methods: {
    handleSearch (condition) {
      this.pageRequest.pageNum = 1
      this.search(condition)
    },
    async search (condition) {  
      this.insideLoading = true 
      let lastConditions =  {
            "key":"countOrderId",
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
      let ret = await this.$http.postAsync("/app/CountOrderItem/GetList", param).catch(error=>{})  
            if(ret.data.data.totalCount!=0) {
            this.$message({message: '查询成功', type: 'success'})
            this.currModel.splice(0,this.currModel.length) 
            ret.data.data.items.map((item)=>{
              this.currModel.push(item)
            }) 
          } else {
            this.$message({message: '未查询到数据', type: 'error'})
          } 
      this.insideLoading = false   
    },
    // 获取分页数据
    findPage: function (data) {
      if (data !== null) {
        this.pageRequest = data.pageRequest;
      }
      let condition = {
        skipCount: this.pageRequest.pageNum,
        maxResultCount: this.pageRequest.pageSize,
        sorting: "id desc",
        conditionItems: [
        {
            "key":"countOrderId",
            "value":String(this.currModelID),
            "operator":"1"
          }
        ] 
      }
      if (this.currModelID) {
        this.$http.postAsync("/app/CountOrderItem/GetList", condition).then((res) => {
        if (res.data.result) {
          // 用于界面更新
            this.currModel.splice(0,this.currModel.length)
            res.data.data.items.map((item)=>{
              this.currModel.push(item)
            }) 
        }
      }).catch(error=>{})
      }
    },
    //  下载
    handleDownLoad(){ 
      this.$http.getAsync('/app/CountOrderItem/GetCreateManyExcel',{responseType:'blob'}).then((res)=>{
      }).catch(error=>{})
    },
    // 新增
    handleAdd() {
      this.currentRow = CreateShipPickOrderItemDto()
      this.$refs.ShipPickOrderItem.dialogVisible = true
	    this.$refs.ShipPickOrderItem.operation = true
    },
    // 编辑
    handleEdit(params) {
      this.$refs.ShipPickOrderItem.dialogVisible = true
      this.$refs.ShipPickOrderItem.operation = false
      this.currentRow = Object.assign({}, params.row)
    },
    // 删除
	handleDelete: function (data) { 
	  this.$http.deleteAsync('/app/CountOrderItem/Delete',data.params[0]).then(data!=null?data.callback:'').catch(error=>{})
	},
  }, 
};
</script>
  