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
        :showBatchDelete="showBatchDelete"
        @handleDelete="handleDelete"
        @findPage="findPage"
        @handleEdit="handleEdit"
        @handleExpandChild="handleExpandChild"
      
      >
      </kt-table>
      <!-- <ReceivedRecordManager  ref="manager"  :CurrentEntity="currentRow" @findReceiprOrder="findPage"/> -->
 </div>
  </template>
  
  <script>
  import KtTable from "@/views/core/KtTable"
//   import KtButton from "@/views/core/KtButton"
   import HeaderColumn from '../../core/HeaderColumn.vue'
  import {  getDisplayName , getPropertyDisplayName } from '@/libs/common' 
//   import ReceivedRecordManager from './ReceivedRecordManager.vue' 
  export default {
    components: {
      KtTable, 
      HeaderColumn,
    //   KtButton,
    //   ReceivedRecordManager
    },
    data() {
      return {  
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
        columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
          {
          title:  this.getDisplayName('receiptOrderId'),
            key: 'receiptOrderId',
            minWidth: 150, 
          },
          {
          title:  this.getDisplayName('receiptOrderItemId'),
            key: 'receiptOrderItemId',
            minWidth: 150,
            operator:'1'
          },
          {
          title:  this.getDisplayName('pallet'),
            key: 'pallet',
            minWidth: 150, 
          },
          {
          title:  this.getDisplayName('materialId'),
            key: 'materialId',
            minWidth: 150,
            operator:'1'
          },  

          { 
            title:  this.getDisplayName('carton'),
            key: 'carton',
            minWidth: 150
          },
          {
            title:  this.getDisplayName('serialNo'),
            key: 'serialNo',
            minWidth: 150
          },
          {
            title:  this.getDisplayName('locationId'),
            key: 'locationId',
            minWidth: 150,
            operator:'1'
          },
          {
            title:  this.getDisplayName('locationCode'),
            key: 'locationCode',
            minWidth: 150
          },
          {
            title:  getPropertyDisplayName('batchNo'),
            key: 'batchNo',
            minWidth: 150
          },
          {
            title: getPropertyDisplayName('batchNo2'),
            key: 'batchNo2',
            minWidth: 150
          },
          {
            title:getPropertyDisplayName('batchNo3'),
            key: 'batchNo3',
            minWidth: 150
          },
          {
            title:  this.getDisplayName('packageUnitId'),
            key: 'packageUnitId',
            minWidth: 150
          },
          {
            title:  this.getDisplayName('xStatus'),
            key: 'xStatus',
            minWidth: 150
          },
          {
            title:  this.getDisplayName('receivedSmallUnitQuantity'),
            key: 'receivedSmallUnitQuantity',
            minWidth: 150
          },
          {
            title:  this.getDisplayName('receivedPkgQuantity'),
            key: 'receivedPkgQuantity',
            minWidth: 150
          },
          {
            title:  this.getDisplayName('movedPkgQuantity'),
            key: 'movedPkgQuantity',
            minWidth: 150
          },
          {
            title:  this.getDisplayName('isWeipan'),
            key: 'isWeipan',
            minWidth: 150
          },
          {
            title:  this.getDisplayName('inventoryId'),
            key: 'inventoryId',
            minWidth: 150
          },
          {
            title:  this.getDisplayName('inventoryDetailId'),
            key: 'inventoryDetailId',
            minWidth: 150
          },
          {
            title:  this.getDisplayName('qcStatus'),
            key: 'qcStatus',
            minWidth: 150
          },
          {
            title:  this.getDisplayName('comments'),
            key: 'comments',
            minWidth: 150
          },
          {
          title:  this.getDisplayName('str1'),
          key: 'str1',
          minWidth: 140,
          
     
        },
        {
          title:   this.getDisplayName('str2'),
          key: 'str2',
          minWidth: 140,
          
      
        },
        {
          title:  this.getDisplayName('str3'),
          key: 'str3',
          minWidth: 140,
          
     
        },
        {
          title: this.getDisplayName('str4'),
          key: 'str4',
          minWidth: 140,
          
   
        },
        {
          title:  this.getDisplayName('str5'),
          key: 'str5',
          minWidth: 140,
          

        },
        {
          title:  this.getDisplayName('str6'),
          key: 'str6',
          minWidth: 140,
          
  
        },
        {
          title:  this.getDisplayName('str7'),
          key: 'str7',
          minWidth: 140,
          

        },
        {
          title:  this.getDisplayName('str8'),
          key: 'str8',
          minWidth: 140,
          
 
        },
        {
          title: this.getDisplayName('str9'),
          key: 'str9',
          minWidth: 140,
          

        },
        {
          title:  this.getDisplayName('str10'),
          key: 'str10',
          minWidth: 140,
          

        },
        {
          title:  this.getDisplayName('str11'),
          key: 'str11',
          minWidth: 140,
          

        },
        {
          title:  this.getDisplayName('str12'),
          key: 'str12',
          minWidth: 140,
          

        },
        {
          title:   this.getDisplayName('str13'),
          key: 'str13',
          minWidth: 140,
          

        },
        {
          title:   this.getDisplayName('str14'),
          key: 'str14',
          minWidth: 140,
          

        },
        {
          title:  this.getDisplayName('str15'),
          key: 'str15',
          minWidth: 140,
          
 
        },
        {
          title:  this.getDisplayName('str16'),
          key: 'str16',
          minWidth: 140,
          

        },
        {
          title:  this.getDisplayName('str17'),
          key: 'str17',
          minWidth: 140,
          

        },
        {
          title:  this.getDisplayName('str18'),
          key: 'str18',
          minWidth: 140,
          

        },
        {
          title:  this.getDisplayName('str19'),
          key: 'str19',
          minWidth: 140,
          

        },
        {
          title:  this.getDisplayName('str20'),
          key: 'str20',
          minWidth: 140,
          
 
        },

        {
          title: getPropertyDisplayName('m_Str1'),
          key: 'm_Str1',
          minWidth: 140,
          
     
        },
        {
          title:   getPropertyDisplayName('m_Str2'),
          key: 'm_Str2',
          minWidth: 140,
          
      
        },
        {
          title:getPropertyDisplayName('m_Str3'),
          key: 'm_Str3',
          minWidth: 140,
          
     
        },
        {
          title: getPropertyDisplayName('m_Str4'),
          key: 'm_Str4',
          minWidth: 140,
          
   
        },
        {
          title: getPropertyDisplayName('m_Str5'),
          key: 'm_Str5',
          minWidth: 140,
          

        },
        {
          title: getPropertyDisplayName('m_Str6'),
          key: 'm_Str6',
          minWidth: 140,
          
  
        },
        {
          title: getPropertyDisplayName('m_Str7'),
          key: 'm_Str7',
          minWidth: 140,
          

        },
        {
          title:getPropertyDisplayName('m_Str8'),
          key: 'm_Str8',
          minWidth: 140,
          
 
        },
        {
          title: getPropertyDisplayName('m_Str9'),
          key: 'm_Str9',
          minWidth: 140,
          

        },
        {
          title: getPropertyDisplayName('m_Str10'),
          key: 'm_Str10',
          minWidth: 140,
          

        },
        {
          title: getPropertyDisplayName('m_Str11'),
          key: 'm_Str11',
          minWidth: 140,
          

        },
        {
          title: getPropertyDisplayName('m_Str12'),
          key: 'm_Str12',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName('m_Str13'),
          key: 'm_Str13',
          minWidth: 140,
          

        },
        {
          title: getPropertyDisplayName('m_Str14'),
          key: 'm_Str14',
          minWidth: 140,
          

        },
        {
          title: getPropertyDisplayName('m_Str15'),
          key: 'm_Str15',
          minWidth: 140,
          
 
        },
        {
          title: getPropertyDisplayName('m_Str16'),
          key: 'm_Str16',
          minWidth: 140,
          

        },
        {
          title: getPropertyDisplayName('m_Str17'),
          key: 'm_Str17',
          minWidth: 140,
          

        },
        {
          title: getPropertyDisplayName('m_Str18'),
          key: 'm_Str18',
          minWidth: 140,
          

        },
        {
          title: getPropertyDisplayName('m_Str19'),
          key: 'm_Str19',
          minWidth: 140,
          

        },
        {
          title: getPropertyDisplayName('m_Str20'),
          key: 'm_Str20',
          minWidth: 140,
          
 
        },
        {
          title:getPropertyDisplayName('m_Str21'),
          key: 'm_Str21',
          minWidth: 140,
          
  
        },
        {
          title: getPropertyDisplayName('m_Str22'),
          key: 'm_Str22',
          minWidth: 140,
          
 
        },
        {
          title: getPropertyDisplayName('m_Str23'),
          key: 'm_Str23',
          minWidth: 140,
          
   
        },
        {
          title: getPropertyDisplayName('m_Str24'),
          key: 'm_Str24',
          minWidth: 140,
          
    
        },
        {
          title: getPropertyDisplayName('m_Str25'),
          key: 'm_Str25',
          minWidth: 140,
          
 
        },
        {
          title: getPropertyDisplayName('m_Str26'),
          key: 'm_Str26',
          minWidth: 140,
          
  
        },
        {
          title: getPropertyDisplayName('m_Str27'),
          key: 'm_Str27',
          minWidth: 140,
          
      
        },
        {
          title: getPropertyDisplayName('m_Str28'),
          key: 'm_Str28',
          minWidth: 140,
          
     
        },
        {
          title: getPropertyDisplayName('m_Str29'),
          key: 'm_Str29',
          minWidth: 140,
          
       
        },
        {
          title: getPropertyDisplayName('m_Str30'),
          key: 'm_Str30',
          minWidth: 140,
          
    
        },
        {
          title: getPropertyDisplayName('m_Str31'),
          key: 'm_Str31',
          minWidth: 140,
          
     
        },
        {
          title: getPropertyDisplayName('m_Str32'),
          key: 'm_Str32',
          minWidth: 140,
          
    
        },
        {
          title: getPropertyDisplayName('m_Str33'),
          key: 'm_Str33',
          minWidth: 140,
          
  
        },
        {
          title: getPropertyDisplayName('m_Str34'),
          key: 'm_Str34',
          minWidth: 140,
          
  
        },
        {
          title:getPropertyDisplayName('m_Str35'),
          key: 'm_Str35',
          minWidth: 140,
          
     
        },
        {
          title:  getPropertyDisplayName('m_Str36'),
          key: 'm_Str36',
          minWidth: 140,
          
    
        },
        {
          title: getPropertyDisplayName('m_Str37'),
          key: 'm_Str37',
          minWidth: 140,
          
     
        },
        {
          title:  getPropertyDisplayName('m_Str38'),
          key: 'm_Str38',
          minWidth: 140,
          
     
        },
        {
          title: getPropertyDisplayName('m_Str39'),
          key: 'm_Str39',
          minWidth: 140,
          
      
        },
        {
          title:  getPropertyDisplayName('m_Str40'),
          key: 'm_Str40',
          minWidth: 140,
          
       
        }
        ],  
      };
    },
    methods: {
      getPropertyDisplayName (property) {
      return getPropertyDisplayName(property )
    },

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
        let ret = await this.$http.postAsync("/app/ReceivedRecord/GetList", param)  
              if(ret.data.data.totalCount!=0) {
              this.$message({message: '查询成功', type: 'success'})
              
            } else {
              this.$message({message: '未查询到数据', type: 'error'})
            }
  
        this.insideLoading = false 
        this.tableData =ret.data.data
        
      },
      // 文字
      getDisplayName (key) {
        return getDisplayName('receiveRecord', key)[0]
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
        this.$http.postAsync("/app/ReceivedRecord/GetList", condition).then((res) => {
         
          if (res.data.result) {
            this.tableData = res.data.data 
          }
        }).catch(error=>{})
      },
      handleExpandChild(data){
        // 查询到子表数据后挂在主表上 
        this.$set(data.expandData,"tableExpandData", data.expandData.ReceivedRecordItems) 
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
   
      },
      // 删除
        handleDelete: function (data) { 
              this.$http.deleteAsync('/app/ReceivedRecord/Delete',data.params[0]).then(data!=null?data.callback:'')
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
        this.$http.postAsync('/app/ReceivedRecord/GetListExcel', params).then((res) => {
          this.$alert(res.data, '导出成功', {
            confirmButtonText: '确定',
            callback: action => {
            }
          })
        })
      }, 
  
    }, 
  };
  </script>
    