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
      <ApplyReceiptOrderManager  ref="manager"  :CurrentEntity="currentRow" @findReceiprOrder="findPage"/>
 </div>
  </template>
  
  <script>
  import KtTable from "@/views/core/KtTable"
//   import KtButton from "@/views/core/KtButton"
   import HeaderColumn from '../../core/HeaderColumn.vue'
  import { getPropertyDisplayName1, getDisplayName } from '@/libs/common' 
  import ApplyReceiptOrderManager from './ApplyReceiptOrderManager.vue' 
  export default {
    components: {
      KtTable, 
      HeaderColumn,
    //   KtButton,
      ApplyReceiptOrderManager
    },
    data() {
      return { 
        showExpand:true, //点击主表，下拉展示子表
        size: 'small',
        lastCondition: undefined,
        currentRow: undefined,
        insideLoading: false,
        showOperation: true, 
        showBatchDelete:false,
        queryType: 0,
        insideColumns: [],  
        tableData: {}, 
        pageRequest: { pageNum: 1, pageSize: 10 },
        sonColumns: [
        {
            title:  getPropertyDisplayName1('rowNo'),
            key: 'rowNo',
            minWidth: 150
          },
          {
            title:  getPropertyDisplayName1('thirdPartyRowNo'),
            key: 'thirdPartyRowNo',
            minWidth: 150
          },
          {
            title:  getPropertyDisplayName1('xStatus'),
            key: 'xStatus',
            minWidth: 150
          },
          {
            title:  getPropertyDisplayName1('materialId'),
            key: 'materialId',
            minWidth: 150
          },
          {
            title:  getPropertyDisplayName1('batchNo'),
            key: 'batchNo',
            minWidth: 150
          },
          {
            title:  getPropertyDisplayName1('batchNo2'),
            key: 'batchNo2',
            minWidth: 150
          },
          {
            title:  getPropertyDisplayName1('batchNo3'),
            key: 'batchNo3',
            minWidth: 150
          },
          {
            title:  getPropertyDisplayName1('packageUnitId'),
            key: 'packageUnitId',
            minWidth: 150
          },
          {
            title:  getPropertyDisplayName1('expectedNumber'),
            key: 'expectedNumber',
            minWidth: 150
          },
          {
            title:  getPropertyDisplayName1('expectedUnit'),
            key: 'expectedUnit',
            minWidth: 150
          },
          {
            title:  getPropertyDisplayName1('receivedNumber'),
            key: 'receivedNumber',
            minWidth: 150
          },
          {
            title:  getPropertyDisplayName1('receivedUnit'),
            key: 'receivedUnit',
            minWidth: 150
          },
          {
            title:  getPropertyDisplayName1('comments'),
            key: 'comments',
            minWidth: 150
          },
          {
          title:  getPropertyDisplayName1('str1'),
          key: 'str1',
          minWidth: 140,
          
     
        },
        {
          title:   getPropertyDisplayName1('str2'),
          key: 'str2',
          minWidth: 140,
          
      
        },
        {
          title:  getPropertyDisplayName1('str3'),
          key: 'str3',
          minWidth: 140,
          
     
        },
        {
          title: getPropertyDisplayName1('str4'),
          key: 'str4',
          minWidth: 140,
          
   
        },
        {
          title:  getPropertyDisplayName1('str5'),
          key: 'str5',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('str6'),
          key: 'str6',
          minWidth: 140,
          
  
        },
        {
          title:  getPropertyDisplayName1('str7'),
          key: 'str7',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('str8'),
          key: 'str8',
          minWidth: 140,
          
 
        },
        {
          title: getPropertyDisplayName1('str9'),
          key: 'str9',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('str10'),
          key: 'str10',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('str11'),
          key: 'str11',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('str12'),
          key: 'str12',
          minWidth: 140,
          

        },
        {
          title:   getPropertyDisplayName1('str13'),
          key: 'str13',
          minWidth: 140,
          

        },
        {
          title:   getPropertyDisplayName1('str14'),
          key: 'str14',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('str15'),
          key: 'str15',
          minWidth: 140,
          
 
        },
        {
          title:  getPropertyDisplayName1('str16'),
          key: 'str16',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('str17'),
          key: 'str17',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('str18'),
          key: 'str18',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('str19'),
          key: 'str19',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('str20'),
          key: 'str20',
          minWidth: 140,
          
 
        },

        {
          title:  getPropertyDisplayName1('m_Str1'),
          key: 'm_Str1',
          minWidth: 140,
          
     
        },
        {
          title:   getPropertyDisplayName1('m_Str2'),
          key: 'm_Str2',
          minWidth: 140,
          
      
        },
        {
          title:  getPropertyDisplayName1('m_Str3'),
          key: 'm_Str3',
          minWidth: 140,
          
     
        },
        {
          title: getPropertyDisplayName1('m_Str4'),
          key: 'm_Str4',
          minWidth: 140,
          
   
        },
        {
          title:  getPropertyDisplayName1('m_Str5'),
          key: 'm_Str5',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('m_Str6'),
          key: 'm_Str6',
          minWidth: 140,
          
  
        },
        {
          title:  getPropertyDisplayName1('m_Str7'),
          key: 'm_Str7',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('m_Str8'),
          key: 'm_Str8',
          minWidth: 140,
          
 
        },
        {
          title: getPropertyDisplayName1('m_Str9'),
          key: 'm_Str9',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('m_Str10'),
          key: 'm_Str10',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('m_Str11'),
          key: 'm_Str11',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('m_Str12'),
          key: 'm_Str12',
          minWidth: 140,
          

        },
        {
          title:   getPropertyDisplayName1('m_Str13'),
          key: 'm_Str13',
          minWidth: 140,
          

        },
        {
          title:   getPropertyDisplayName1('m_Str14'),
          key: 'm_Str14',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('m_Str15'),
          key: 'm_Str15',
          minWidth: 140,
          
 
        },
        {
          title:  getPropertyDisplayName1('m_Str16'),
          key: 'm_Str16',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('m_Str17'),
          key: 'm_Str17',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('m_Str18'),
          key: 'm_Str18',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('m_Str19'),
          key: 'm_Str19',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('m_Str20'),
          key: 'm_Str20',
          minWidth: 140,
          
 
        },
        {
          title:  getPropertyDisplayName1('m_Str21'),
          key: 'm_Str21',
          minWidth: 140,
          
  
        },
        {
          title:  getPropertyDisplayName1('m_Str22'),
          key: 'm_Str22',
          minWidth: 140,
          
 
        },
        {
          title: getPropertyDisplayName1('m_Str23'),
          key: 'm_Str23',
          minWidth: 140,
          
   
        },
        {
          title: getPropertyDisplayName1('m_Str24'),
          key: 'm_Str24',
          minWidth: 140,
          
    
        },
        {
          title: getPropertyDisplayName1('m_Str25'),
          key: 'm_Str25',
          minWidth: 140,
          
 
        },
        {
          title: getPropertyDisplayName1('m_Str26'),
          key: 'm_Str26',
          minWidth: 140,
          
  
        },
        {
          title: getPropertyDisplayName1('m_Str27'),
          key: 'm_Str27',
          minWidth: 140,
          
      
        },
        {
          title: getPropertyDisplayName1('m_Str28'),
          key: 'm_Str28',
          minWidth: 140,
          
     
        },
        {
          title:  getPropertyDisplayName1('m_Str29'),
          key: 'm_Str29',
          minWidth: 140,
          
       
        },
        {
          title:  getPropertyDisplayName1('m_Str30'),
          key: 'm_Str30',
          minWidth: 140,
          
    
        },
        {
          title:  getPropertyDisplayName1('m_Str31'),
          key: 'm_Str31',
          minWidth: 140,
          
     
        },
        {
          title:  getPropertyDisplayName1('m_Str32'),
          key: 'm_Str32',
          minWidth: 140,
          
    
        },
        {
          title:  getPropertyDisplayName1('m_Str33'),
          key: 'm_Str33',
          minWidth: 140,
          
  
        },
        {
          title:  getPropertyDisplayName1('m_Str34'),
          key: 'm_Str34',
          minWidth: 140,
          
  
        },
        {
          title:  getPropertyDisplayName1('m_Str35'),
          key: 'm_Str35',
          minWidth: 140,
          
     
        },
        {
          title:  getPropertyDisplayName1('m_Str36'),
          key: 'm_Str36',
          minWidth: 140,
          
    
        },
        {
          title:  getPropertyDisplayName1('m_Str37'),
          key: 'm_Str37',
          minWidth: 140,
          
     
        },
        {
          title:  getPropertyDisplayName1('m_Str38'),
          key: 'm_Str38',
          minWidth: 140,
          
     
        },
        {
          title:  getPropertyDisplayName1('m_Str39'),
          key: 'm_Str39',
          minWidth: 140,
          
      
        },
        {
          title:  getPropertyDisplayName1('m_Str40'),
          key: 'm_Str40',
          minWidth: 140,
          
       
        }
        ], 
        columns: [
          {
            type: 'selection',
          width: 60,
          align: 'center' 
          },
          {
            title: this.getDisplayName('xCode'),
            key: 'xCode',
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
            items: this.$Enum.WmsROAStatus.map3,
            render: (h, params) => {
              return h('span', { style: { color: wmsROAStatusColorConverter(params.row.xStatus) } }, this.$Enum.WmsROAStatus.map3[params.row.xStatus] || '')
            }
          },
          {
            title: this.getDisplayName('organiztion'),
            key: 'organiztion',
            minWidth: 180
          }, 
        {
          title: this.getDisplayName('str1'),
          key: 'str1',
          minWidth: 100
        },
        {
          title: this.getDisplayName('str2'),
          key: 'str2',
          minWidth: 100
        }, 
        {
          title: this.getDisplayName('str3'),
          key: 'str3',
          minWidth: 100
        }, 
        {
          title: this.getDisplayName('str4'),
          key: 'str4',
          minWidth: 100
        }, 
        {
          title:  this.getDisplayName('str5'),
          key: 'str5',
          minWidth: 100
        }, 
        {
          title: this.getDisplayName('str6'),
          key: 'str6',
          minWidth: 100
        },
        {
          title: this.getDisplayName('str7'),
          key: 'str7',
          minWidth: 100
        }, 
        {
          title: this.getDisplayName('str8'),
          key: 'str8',
          minWidth: 100
        }, 
        {
          title: this.getDisplayName('str9'),
          key: 'str9',
          minWidth: 100
        }, 
        {
          title:  this.getDisplayName('str10'),
          key: 'str10',
          minWidth: 100
        }, 
        {
          title: this.getDisplayName('str11'),
          key: 'str11',
          minWidth: 100
        },
        {
          title: this.getDisplayName('str12'),
          key: 'str12',
          minWidth: 100
        }, 
        {
          title: this.getDisplayName('str13'),
          key: 'str13',
          minWidth: 100
        }, 
        {
          title: this.getDisplayName('str14'),
          key: 'str14',
          minWidth: 100
        }, 
        {
          title:  this.getDisplayName('str15'),
          key: 'str15',
          minWidth: 100
        }, 
        {
          title: this.getDisplayName('str16'),
          key: 'str16',
          minWidth: 100
        }, 
        {
          title: this.getDisplayName('str17'),
          key: 'str17',
          minWidth: 100
        }, 
        {
          title: this.getDisplayName('str18'),
          key: 'str18',
          minWidth: 100
        }, 
        {
          title:  this.getDisplayName('str19'),
          key: 'str19',
          minWidth: 100
        },  
        {
          title:  this.getDisplayName('str20'),
          key: 'str20',
          minWidth: 100
        },        
        ]
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
        let ret = await this.$http.postAsync("/app/ApplyReceiptOrder/GetList", param)  
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
        return getDisplayName('applyReceiptOrder', key)[0]
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
        this.$http.postAsync("/app/ApplyReceiptOrder/GetList", condition).then((res) => {
         
          if (res.data.result) {
            this.tableData = res.data.data 
          }
        });
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
              this.$http.deleteAsync('/app/ApplyReceiptOrder/Delete',data.params[0]).then(data!=null?data.callback:'')
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
        this.$http.postAsync('/app/ApplyReceiptOrder/GetListExcel', params).then((res) => {
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
    