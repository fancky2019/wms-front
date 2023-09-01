<template>
    <div class="page-container">
      <!--工具栏-->
      <div class="toolbar" style="float: left; padding-top:10px; padding-left: 15px;display:flex;flex-direction:row">
      <header-column :columns="columns" highSearch     @on-search='handleSearch'   ></header-column>
      <div style="display:flex;align-items:center;margin-left:10px">
       <kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:dict:add" type="primary" @click="handleAdd" /> 
    </div>
      </div>
    <div class="toolbar" style="float:right;padding-top:10px;padding-right:15px;">
          <el-form :inline="true" :size="size">
              <el-form-item>
                  <el-button-group>
                  <el-tooltip content="刷新" placement="top">
                      <el-button icon="fa fa-refresh" @click="findPage(null)"></el-button>
                  </el-tooltip>
                  <el-tooltip content="列显示" placement="top"> 
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
        @handleDelete="handleDelete"
        @findPage="findPage"
        @handleEdit="handleEdit"
        @handleExpandChild="handleExpandChild"
        @rightClick="rightClick"
        :showExpand="showExpand" 
      >
      </kt-table>
      <ReceiptOrderManager  ref="manager"   @on-close="$refs.pages.refresh()"    @findPage="findPage"   :columns="sonColumns"   :CurrentEntity="currentRow"/>
      <!-- 右键菜单收货 -->
      <RightReceiptOrderItem  ref="rightManager"    :columns="rightColumns"  :currModelID="currModelID" :CurrentEntity="currentRow"/>
      
      <!-- 右键菜单 -->
      <right-menu
      :class-index="0"
      :rightclickInfo="rightclickInfo" 
      @shelfList="shelfList" 
      @receive="receive" 
      ></right-menu>
    </div>
  </template>
  
  <script>
  import KtTable from "@/views/core/KtTable"
  import KtButton from "@/views/core/KtButton"
   import HeaderColumn from '../../core/HeaderColumn.vue'
  import { getPropertyDisplayName1, getDisplayName ,getPropertyDisplayName} from '@/libs/common' 
 
  import ReceiptOrderManager from './ReceiptOrderManager.vue' 
  import RightReceiptOrderItem from './RightReceiptOrderItem.vue'  
  import { CreateReceiptOrderDto } from '@/libs/createDto'
  import RightMenu from "@/views/core/RightMenu"
  export default {
    components: {
      KtTable, 
      KtButton,
      HeaderColumn,
      ReceiptOrderManager,
      RightReceiptOrderItem,
      RightMenu
    },
    data() {
      return {  
        rightclickInfo: {},
        showExpand:true, //点击主表，下拉展示子表
        size: 'small',
        lastCondition: undefined,
        currentRow: undefined,
        currModelID:0,
        insideLoading: false,
        showOperation: true, 
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
          title:  getPropertyDisplayName1('applyReceiptOrderCode'),
            key: 'applyReceiptOrderCode',
            minWidth: 150, 
          },  
          {
            title:  getPropertyDisplayName1('thirdPartyRowNo'),
            key: 'thirdPartyRowNo',
            minWidth: 150
          }, 
          {
            title:  getPropertyDisplayName1('material'),
            key: 'material',
            minWidth: 150
          },
          {
            title:  getPropertyDisplayName1('packageUnit'),
            key: 'packageUnit',
            minWidth: 150
          },
          {
            title:  getPropertyDisplayName1('xStatus'),
            key: 'xStatus',
            minWidth: 150,
            items: this.$Enum.WmsROStatus.map1,
          },
          {
          title:  getPropertyDisplayName1('expectedPkgQuantity'),
            key: 'expectedPkgQuantity',
            minWidth: 150,
            operator:'1'
          },
          {
          title:  getPropertyDisplayName1('receivedPkgQuantity'),
            key: 'receivedPkgQuantity',
            minWidth: 150,
            operator:'1'
          },
          {
          title:  getPropertyDisplayName1('movedPkgQuantity'),
            key: 'movedPkgQuantity',
            minWidth: 150
          },  
          {
            title:  getPropertyDisplayName1('expectedUnit'),
            key: 'expectedUnit',
            minWidth: 150
          },
          {
            title:  getPropertyDisplayName1('receivedUnit'),
            key: 'receivedUnit',
            minWidth: 150
          },
          {
            title:  getPropertyDisplayName('batchNo'),
            key: 'batchNo',
            minWidth: 150
          },
          {
            title:  getPropertyDisplayName('batchNo2'),
            key: 'batchNo2',
            minWidth: 150
          },
          {
            title:  getPropertyDisplayName('batchNo3'),
            key: 'batchNo3',
            minWidth: 150
          },
          // {
          //   title:  getPropertyDisplayName1('packageUnitId'),
          //   key: 'packageUnitId',
          //   minWidth: 150
          // }, 
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
          title:  getPropertyDisplayName('m_Str1'),
          key: 'm_Str1',
          minWidth: 140,
          
     
        },
        {
          title:   getPropertyDisplayName('m_Str2'),
          key: 'm_Str2',
          minWidth: 140,
          
      
        },
        {
          title:  getPropertyDisplayName('m_Str3'),
          key: 'm_Str3',
          minWidth: 140,
          
     
        },
        {
          title: getPropertyDisplayName('m_Str4'),
          key: 'm_Str4',
          minWidth: 140,
          
   
        },
        {
          title:  getPropertyDisplayName('m_Str5'),
          key: 'm_Str5',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName('m_Str6'),
          key: 'm_Str6',
          minWidth: 140,
          
  
        },
        {
          title:  getPropertyDisplayName('m_Str7'),
          key: 'm_Str7',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName('m_Str8'),
          key: 'm_Str8',
          minWidth: 140,
          
 
        },
        {
          title: getPropertyDisplayName('m_Str9'),
          key: 'm_Str9',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName('m_Str10'),
          key: 'm_Str10',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName('m_Str11'),
          key: 'm_Str11',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName('m_Str12'),
          key: 'm_Str12',
          minWidth: 140,
          

        },
        {
          title:   getPropertyDisplayName('m_Str13'),
          key: 'm_Str13',
          minWidth: 140,
          

        },
        {
          title:   getPropertyDisplayName('m_Str14'),
          key: 'm_Str14',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName('m_Str15'),
          key: 'm_Str15',
          minWidth: 140,
          
 
        },
        {
          title:  getPropertyDisplayName('m_Str16'),
          key: 'm_Str16',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName('m_Str17'),
          key: 'm_Str17',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName('m_Str18'),
          key: 'm_Str18',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName('m_Str19'),
          key: 'm_Str19',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName('m_Str20'),
          key: 'm_Str20',
          minWidth: 140,
          
 
        },
        {
          title:  getPropertyDisplayName('m_Str21'),
          key: 'm_Str21',
          minWidth: 140,
          
  
        },
        {
          title:  getPropertyDisplayName('m_Str22'),
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
          title:  getPropertyDisplayName('m_Str29'),
          key: 'm_Str29',
          minWidth: 140,
          
       
        },
        {
          title:  getPropertyDisplayName('m_Str30'),
          key: 'm_Str30',
          minWidth: 140,
          
    
        },
        {
          title:  getPropertyDisplayName('m_Str31'),
          key: 'm_Str31',
          minWidth: 140,
          
     
        },
        {
          title:  getPropertyDisplayName('m_Str32'),
          key: 'm_Str32',
          minWidth: 140,
          
    
        },
        {
          title:  getPropertyDisplayName('m_Str33'),
          key: 'm_Str33',
          minWidth: 140,
          
  
        },
        {
          title:  getPropertyDisplayName('m_Str34'),
          key: 'm_Str34',
          minWidth: 140,
          
  
        },
        {
          title:  getPropertyDisplayName('m_Str35'),
          key: 'm_Str35',
          minWidth: 140,
          
     
        },
        {
          title:  getPropertyDisplayName('m_Str36'),
          key: 'm_Str36',
          minWidth: 140,
          
    
        },
        {
          title:  getPropertyDisplayName('m_Str37'),
          key: 'm_Str37',
          minWidth: 140,
          
     
        },
        {
          title:  getPropertyDisplayName('m_Str38'),
          key: 'm_Str38',
          minWidth: 140,
          
     
        },
        {
          title:  getPropertyDisplayName('m_Str39'),
          key: 'm_Str39',
          minWidth: 140,
          
      
        },
        {
          title:  getPropertyDisplayName('m_Str40'),
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
            minWidth: 160
          },
          {
            title: this.getDisplayName('applyReceiptOrderCode'),
            key: 'applyReceiptOrderCode',
            minWidth: 150, 
            
          },
          {
          title: this.getDisplayName('xStatus'),
          key: 'xStatus',
          minWidth: 100,
          items: this.$Enum.WmsROStatus.map1,

        },
        {
          title: this.getDisplayName('billTypeId'),
          key: 'billTypeId',
          minWidth: 130,
          items: this.$store.state.my.billTypeDic,
        },
        {
          title: this.getDisplayName('organiztion'),
          key: 'organiztion', 
          minWidth: 100,
          items: this.$store.state.my.supplierDic,
        },
        // {
        //   title: this.getDisplayName('expectedPkgQuantity'),
        //   key: 'expectedPkgQuantity',
        //   type: 'numberrange',
        //   minWidth: 150
        // },
        // {
        //   title: this.getDisplayName('receivedPkgQuantity'),
        //   key: 'receivedPkgQuantity',
        //   type: 'numberrange',
        //   minWidth: 130
        // },
        // {
        //   title: this.getDisplayName('movedPkgQuantity'),
        //   key: 'movedPkgQuantity',
        //   type: 'numberrange',
        //   minWidth: 100
        // },
          {
            title: this.getDisplayName('comments'),
            key: 'comments',
            minWidth: 140
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
          minWidth: 140
        }, 
        {
          title: this.getDisplayName('str11'),
          key: 'str11',
          minWidth: 140
        },
        {
          title: this.getDisplayName('str12'),
          key: 'str12',
          minWidth: 140
        }, 
        {
          title: this.getDisplayName('str13'),
          key: 'str13',
          minWidth: 140
        }, 
        {
          title: this.getDisplayName('str14'),
          key: 'str14',
          minWidth: 140
        }, 
        {
          title:  this.getDisplayName('str15'),
          key: 'str15',
          minWidth: 140
        }, 
        {
          title: this.getDisplayName('str16'),
          key: 'str16',
          minWidth: 140
        }, 
        {
          title: this.getDisplayName('str17'),
          key: 'str17',
          minWidth: 140
        }, 
        {
          title: this.getDisplayName('str18'),
          key: 'str18',
          minWidth: 140
        }, 
        {
          title:  this.getDisplayName('str19'),
          key: 'str19',
          minWidth: 140
        },  
        {
          title:  this.getDisplayName('str20'),
          key: 'str20',
          minWidth: 140
        }          
        ],
        rightColumns: [
          { 
            title:  this.getRightDisplayName('rowNo'),
            key: 'rowNo',
            minWidth: 150
          },
          {
          title:  this.getRightDisplayName('applyReceiptOrderCode'),
            key: 'applyReceiptOrderCode',
            minWidth: 150, 
          },
          {
          title:  this.getRightDisplayName('expectedPkgQuantity'),
            key: 'expectedPkgQuantity',
            minWidth: 150,
            operator:'1'
          },
          {
          title:  this.getRightDisplayName('receivedPkgQuantity'),
            key: 'receivedPkgQuantity',
            minWidth: 150,
            operator:'1'
          },
          // {
          // title:  this.getRightDisplayName('movedPkgQuantity'),
          //   key: 'movedPkgQuantity',
          //   minWidth: 150
          // },  

          {
            title:  this.getRightDisplayName('thirdPartyRowNo'),
            key: 'thirdPartyRowNo',
            minWidth: 150
          },
          {
            title:  this.getRightDisplayName('xStatus'),
            key: 'xStatus',
            minWidth: 150,
            items: this.$Enum.WmsROStatus.map1,
          },
          {
            title:  this.getRightDisplayName('materialId'),
            key: 'materialId',
            minWidth: 150
          },
          {
            title: getPropertyDisplayName('batchNo'),
            key: 'batchNo',
            minWidth: 150
          },
          {
            title: getPropertyDisplayName('batchNo2'),
            key: 'batchNo2',
            minWidth: 150
          },
          {
            title: getPropertyDisplayName('batchNo3'),
            key: 'batchNo3',
            minWidth: 150
          },
          {
            title:  this.getRightDisplayName('packageUnitId'),
            key: 'packageUnitId',
            minWidth: 150
          },

          {
            title:  this.getRightDisplayName('expectedUnit'),
            key: 'expectedUnit',
            minWidth: 150
          },
          {
            title:  this.getRightDisplayName('receivedUnit'),
            key: 'receivedUnit',
            minWidth: 150
          },
          {
            title:  this.getRightDisplayName('comments'),
            key: 'comments',
            minWidth: 150
          },
          {
          title:  this.getRightDisplayName('str1'),
          key: 'str1',
          minWidth: 140,
        },
        {
          title:   this.getRightDisplayName('str2'),
          key: 'str2',
          minWidth: 140,
        },
        {
          title:  this.getRightDisplayName('str3'),
          key: 'str3',
          minWidth: 140,
          
        },
        {
          title: this.getRightDisplayName('str4'),
          key: 'str4',
          minWidth: 140,
          
        },
        {
          title:  this.getRightDisplayName('str5'),
          key: 'str5',
          minWidth: 140,
          
        },
        {
          title:  this.getRightDisplayName('str6'),
          key: 'str6',
          minWidth: 140,
          
  
        },
        {
          title:  this.getRightDisplayName('str7'),
          key: 'str7',
          minWidth: 140,
          

        },
        {
          title:  this.getRightDisplayName('str8'),
          key: 'str8',
          minWidth: 140,
          
 
        },
        {
          title: this.getRightDisplayName('str9'),
          key: 'str9',
          minWidth: 140,
          

        },
        {
          title:  this.getRightDisplayName('str10'),
          key: 'str10',
          minWidth: 140,
          

        },
        {
          title:  this.getRightDisplayName('str11'),
          key: 'str11',
          minWidth: 140,
          

        },
        {
          title:  this.getRightDisplayName('str12'),
          key: 'str12',
          minWidth: 140,
          

        },
        {
          title:   this.getRightDisplayName('str13'),
          key: 'str13',
          minWidth: 140,
          

        },
        {
          title:   this.getRightDisplayName('str14'),
          key: 'str14',
          minWidth: 140,
          

        },
        {
          title:  this.getRightDisplayName('str15'),
          key: 'str15',
          minWidth: 140,
          
 
        },
        {
          title:  this.getRightDisplayName('str16'),
          key: 'str16',
          minWidth: 140,
          

        },
        {
          title:  this.getRightDisplayName('str17'),
          key: 'str17',
          minWidth: 140,
          

        },
        {
          title:  this.getRightDisplayName('str18'),
          key: 'str18',
          minWidth: 140,
          

        },
        {
          title:  this.getRightDisplayName('str19'),
          key: 'str19',
          minWidth: 140,
          

        },
        {
          title:  this.getRightDisplayName('str20'),
          key: 'str20',
          minWidth: 140,
          
 
        },

        {
          title:  getPropertyDisplayName('m_Str1'),
          key: 'm_Str1',
          minWidth: 140,
          
     
        },
        {
          title:  getPropertyDisplayName('m_Str2'),
          key: 'm_Str2',
          minWidth: 140,
          
      
        },
        {
          title: getPropertyDisplayName('m_Str3'),
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
          title: getPropertyDisplayName('m_Str8'),
          key: 'm_Str8',
          minWidth: 140,
          
 
        },
        {
          title:getPropertyDisplayName('m_Str9'),
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
          title: getPropertyDisplayName('m_Str13'),
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
          title:getPropertyDisplayName('m_Str19'),
          key: 'm_Str19',
          minWidth: 140,
          

        },
        {
          title:getPropertyDisplayName('m_Str20'),
          key: 'm_Str20',
          minWidth: 140,
          
 
        },
        {
          title:getPropertyDisplayName('m_Str21'),
          key: 'm_Str21',
          minWidth: 140,
          
  
        },
        {
          title:getPropertyDisplayName('m_Str22'),
          key: 'm_Str22',
          minWidth: 140,
          
 
        },
        {
          title:getPropertyDisplayName('m_Str23'),
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
          title:  getPropertyDisplayName('m_Str32'),
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
          title:  getPropertyDisplayName('m_Str35'),
          key: 'm_Str35',
          minWidth: 140,
          
     
        },
        {
          title:  getPropertyDisplayName('m_Str36'),
          key: 'm_Str36',
          minWidth: 140,
          
    
        },
        {
          title:  getPropertyDisplayName('m_Str37'),
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
          title: getPropertyDisplayName('m_Str40'),
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
      rightClick(data) { 
        let  row = data.rightclickInfo.row
        let column= data.rightclickInfo.column
        let event= data.rightclickInfo.event

      this.rightclickInfo = {
        position: {
          x: data.rightclickInfo.x,
          y: data.rightclickInfo.y,
        },
        menulists: [
          {
            fnName: "receive",
            params: { row, column, event },
            icoName: "el-icon-document-copy",
            btnName: "收货", 
          },
          {
            fnName: "shelfList",
            params: { row, column,event },
            icoName: "el-icon-download",
            btnName: "创建上架单",
          },
          // {
          //   fnName: "edit",
          //   params: { row, column, event },
          //   icoName: "el-icon-edit",
          //   btnName: "编辑行数据",
          // },
          // {
          //   fnName: "delete",
          //   params: { row, column, event },
          //   icoName: "el-icon-delete",
          //   btnName: "删除行数据",
          // },
          // {
          //   fnName: "refresh",
          //   params: { row, column, event },
          //   icoName: "el-icon-refresh",
          //   btnName: "刷新页面",
          // },
        ],
      };
      event.preventDefault(); 
    },
    shelfList(params) { 
      this.currentRow = Object.assign({}, params.row)
      let paramsData = params.row.id
    
       this.currModelID = params.row.id
      let data = res => {
      if(res.status) {
      this.$message({message: '新增成功', type: 'success'})
      this.findPage(null) 
      } else {
      this.$message({message: '新增失败, ' + res.msg, type: 'error'})
      }
      }
      this.$http.postAsync('/app/ReceivedRecord/CreateReceivedRecordByReceiptOrder ',paramsData).then(data!=null?data:'').catch(error=>{})
    },
    receive(params) { 
       console.log("receive---》",params );
       this.currentRow = Object.assign({}, params.row)
       this.currModelID = params.row.id
       this.$refs.rightManager.dialogVisible = true
    },

      handleSearch (condition) {
        this.pageRequest.pageNum = 1
        this.search(condition)
      },
   
      async search (condition) {  
  
        this.insideLoading = true 

  
        let param = {
          skipCount: this.pageRequest.pageNum ,
          maxResultCount: this.pageRequest.pageSize, 
          conditionItems:condition,
          sorting: "id desc",
        } 
        let ret = await this.$http.postAsync("/app/ReceiptOrder/GetList", param)  
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
        return getDisplayName('receiptOrder', key)[0]
      },
      // 右键收获明细
      getRightDisplayName (key) {
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
        this.$http.postAsync("/app/ReceiptOrder/GetList", condition).then((res) => {
             //console.log("出来的数据--》",res.data)
          if (res.data.result) {
            this.tableData = res.data.data
             //console.log("出来的数据11--》",  this.tableData )
          }
        }).catch(error=>{});
      },
      handleExpandChild(data){
    // 查询到子表数据后挂在主表上
     //console.log("出来的数据data--->",data)
    this.$set(data.expandData,"tableExpandData", data.expandData.receiptOrderItems) 

      // 用于点击单行表格数据时，通过查询带出子表格的数据
    //   let condition = {
    //     skipCount: this.pageRequest.pageNum,
    //     maxResultCount: this.pageRequest.pageSize,
    //     sorting: "id desc",
    //     conditionItems: []
    //   }
    //   // 根据实际主表条件查询
    //   this.$http.postAsync("/app/ReceiptOrderItem/GetList", condition).then((res) => {
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
 
    // 新增
    handleAdd() {  
      this.currentRow = CreateReceiptOrderDto()
      this.$refs.manager.disabled =false
      this.$refs.manager.dialogVisible = true
      this.$refs.manager.operation = true 
    },
      // 编辑
     async handleEdit(params) { 
      this.$refs.manager.disabled = false
        this.$refs.manager.dialogVisible = true
        this.$refs.manager.operation = false
        this.currentRow = Object.assign({}, params.row)
        // this.findPage(null)
      },
      // 删除
        handleDelete: function (data) { 
              this.$http.deleteAsync('/app/ReceiptOrder/Delete',data.params[0]).then(data!=null?data.callback:'').catch(error=>{})
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
        this.$http.postAsync('/app/ReceiptOrder/GetListExcel', params).then((res) => {
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
    