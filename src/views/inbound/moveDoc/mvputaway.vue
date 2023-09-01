<template>
    <div class="page-container">
      <!--工具栏-->
      <div class="toolbar" style="float: left; padding-top:10px; padding-left: 15px;display:flex;flex-direction:row">
      <header-column :columns="columns" highSearch     @on-search='handleSearch'   ></header-column>
   
      </div>
    <div class="toolbar" style="float:right;padding-top:10px;padding-right:15px;">
          <el-form :inline="true" :size="size">
              <el-form-item>
                  <el-button-group>
                  <el-tooltip content="刷新" placement="top">
                      <el-button icon="fa fa-refresh" @click="findPage(null)"></el-button>
                  </el-tooltip>
                  <el-tooltip content="列显示" placement="top">
                      <!-- @click="displayFilterColumnsDialog" -->
                      <el-button icon="fa fa-filter" ></el-button>
                  </el-tooltip>
                  <el-tooltip content="导出" placement="top">
                      <el-button icon="fa fa-file-excel-o" @click="exportExcelUser"></el-button>
                  </el-tooltip>
                  </el-button-group>
              </el-form-item>
          </el-form> 
      </div>
      <!--表格内容栏-->
      <kt-table
        :data="tableData"
        :columns="columns"  
        :showOperation="showOperation"
        :loading="insideLoading" 
        :sonColumns="sonColumns"
        :showBatchDelete="showBatchDelete"
        @handleDelete="handleDelete"
        @findPage="findPage"
        @handleEdit="handleEdit"
        @handleExpandChild="handleExpandChild"
        :showExpand="showExpand" 
      >
      </kt-table>
      <!-- <ApplyReceiptOrderManager  ref="manager"  :CurrentEntity="currentRow" @findReceiprOrder="findPage"/> -->
 </div>
  </template>
  
  <script>
  import KtTable from "@/views/core/KtTable"
//   import KtButton from "@/views/core/KtButton"
   import HeaderColumn from '../../core/HeaderColumn.vue'
  import { getDisplayName } from '@/libs/common' 
//   import ApplyReceiptOrderManager from './ApplyReceiptOrderManager.vue' 
  export default {
    components: {
      KtTable, 
      HeaderColumn,
    //   KtButton,
    //   ApplyReceiptOrderManager
    },
    data() {
      return { 
        showExpand:true, //点击主表，下拉展示子表
        size: 'small',
        lastCondition: undefined,
        currentRow: undefined,
        insideLoading: false,
        showOperation: false, 
        showBatchDelete:false,
        queryType: 0,
        insideColumns: [],  
        tableData: {}, 
        pageRequest: { pageNum: 1, pageSize: 10 },
        sonColumns: [
        {
            title:  this.getDisplayName2('inboundOrderId'),
            key: 'inboundOrderId',
            minWidth: 150
          },
          {
            title:  this.getDisplayName2('receivedRecordID'),
            key: 'receivedRecordID',
            minWidth: 150
          },
          {
            title:  this.getDisplayName2('planPkgQuantity'),
            key: 'planPkgQuantity',
            minWidth: 150
          },
          {
            title:  this.getDisplayName2('allocatedPkgQuantity'),
            key: 'allocatedPkgQuantity',
            minWidth: 150
          },
          {
            title:  this.getDisplayName2('movedPkgQuantity'),
            key: 'movedPkgQuantity',
            minWidth: 150
          },
          {
            title:  this.getDisplayName2('fromLocId'),
            key: 'fromLocId',
            minWidth: 150
          },
          {
            title:  this.getDisplayName2('fromLocCode'),
            key: 'fromLocCode',
            minWidth: 150
          },
          {
            title:  this.getDisplayName2('toLocId'),
            key: 'toLocId',
            minWidth: 150
          },
          {
            title:  this.getDisplayName2('toLocCode'),
            key: 'toLocCode',
            minWidth: 150
          }, 
        ], 
        columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
          {
            title: this.getDisplayName('warehouseId'),
            key: 'warehouseId',
            sortable: true,
            minWidth: 200
          },
          {
            title: this.getDisplayName('billTypeId'),
            key: 'billTypeId',
            minWidth: 150,
            items: this.$store.state.my.billTypeDic,
            render: (h, params) => {
              return h('span', this.$store.state.my.billTypeDic[params.row.billTypeId] || '')
            }
          },
          {
            title: this.getDisplayName('xStatus'),
            key: 'xStatus',
            minWidth: 120,
            items: this.$Enum.WmsMoveDocStatus.map1,
            render: (h, params) => {
              return h('span', { style: { color: wmsROAStatusColorConverter(params.row.xStatus) } }, this.$Enum.WmsROAStatus.map3[params.row.xStatus] || '')
            }
          },
          {
            title: this.getDisplayName('receiptOrderId'),
            key: 'receiptOrderId',
            minWidth: 180
          }, 
        {
          title: this.getDisplayName('planPkgQuantity'),
          key: 'planPkgQuantity',
          minWidth: 100
        },
        {
          title: this.getDisplayName('allocatedPkgQuantity'),
          key: 'allocatedPkgQuantity',
          minWidth: 100
        }, 
        {
          title: this.getDisplayName('movedPkgQuantity'),
          key: 'movedPkgQuantity',
          minWidth: 100
        }]
      };
    },
    methods: {
      handleSearch (condition) {
        this.pageRequest.pageNum = 1
        this.search(condition)
      },
   
      async search (condition) {  
  
        this.insideLoading = true 
        let lastConditions = []
        if(condition !=''){ 
          lastConditions =[{ ...condition}]
        }
  
        let param = {
          skipCount: this.pageRequest.pageNum ,
          maxResultCount: this.pageRequest.pageSize, 
          conditionItems:lastConditions,
          sorting: "id desc",
        } 
        let ret = await this.$http.postAsync("/app/InboundOrder/GetList", param).catch(error=>{})  
              if(ret.data.data.totalCount!=0) {
              this.$message({message: '查询成功', type: 'success'})
              this.tableData =ret.data.data
            } else {
              this.$message({message: '未查询到数据', type: 'error'})
            }
  
        this.insideLoading = false 
        
      },
      // 文字
      getDisplayName (key) {
        return getDisplayName('mvputaway', key)[0]
      },
      getDisplayName2 (key) {
        return getDisplayName('moveDocDetail', key)[0]
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
          conditionItems: []
        }
        this.$http.postAsync("/app/InboundOrder/GetList", condition).then((res) => {
          if (res.data.result) {
            this.tableData = res.data.data 
          }
        }).catch(error=>{});
      },
      handleExpandChild(data){
    // 查询到子表数据后挂在主表上 
    this.$set(data.expandData,"tableExpandData", data.expandData.applyReceiptOrderItems) 

      // 用于点击单行表格数据时，通过查询带出子表格的数据
    //   let condition = {
    //     skipCount: this.pageRequest.pageNum,
    //     maxResultCount: this.pageRequest.pageSize,
    //     sorting: "id desc",
    //     conditionItems: [
    //     {
    //   "key": "applyReceiptOrderId",
    //   "value": "448089664995397",
    //   "operator": 1
    // }
    //     ]
    //   }
    //   // 根据实际主表条件查询
    //   this.$http.postAsync("/app/ApplyReceiptOrderItem/GetList", condition).then((res) => {
    //     if (res.data.result) {
    //       let sontableData = res.data.data

    //       // 查询到子表数据后挂在主表上
    //       this.$set(data.expandData,"tableExpandData", sontableData.items) 
    //     }
    //   });
    },
      onSelectChange (row, index) {
         //console.log('2e');
        //console.log(row, index)
      },
   
      // 编辑
     async handleEdit(params) { 
        this.$refs.manager.dialogVisible = true
        this.$refs.manager.operation = false
        this.currentRow = Object.assign({}, params.row)
         //console.log("出来的数据6666666--》",this.currentRow)
   
      },
      // 删除
        handleDelete: function (data) { 
              this.$http.deleteAsync('/app/InboundOrder/Delete',data.params[0]).then(data!=null?data.callback:'').catch(error=>{})
          },
      // 导出
      exportExcelUser: function () {
        this.pageRequest.pageSize = 100000 
        let params = {
          skipCount: this.pageRequest.pageNum,
          maxResultCount: this.pageRequest.pageSize,
          sorting: "id desc",
          conditionItems: []
        }
        this.$http.postAsync('/app/InboundOrder/GetListExcel', params).then((res) => {
          this.$alert(res.data, '导出成功', {
            confirmButtonText: '确定',
            callback: action => {
            }
          })
        }).catch(error=>{})
      }, 
  
    }, 
  };
  </script>
    