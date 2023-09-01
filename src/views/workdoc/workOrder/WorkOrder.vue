<template>
  <div class="page-container">
	<!--工具栏-->
	<div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;display:flex;flex-direction:row">
    <header-column :columns="columns" highSearch     @on-search='handleSearch'   ></header-column>
	</div>
		<div class="toolbar" style="float:right;padding-top:10px;padding-right:15px;">
		<el-form :inline="true" :size="size">
			<el-form-item>
				<el-button-group>
				<el-tooltip :content="$t('refresh')" placement="top">
					<el-button icon="fa fa-refresh"  @click="findPage(null)">   {{$t('action.refresh')}}</el-button>
				</el-tooltip>
				</el-button-group>
			</el-form-item>
		</el-form>
	</div>
	<!--表格内容栏-->
	<kt-table
    :data="tableData" 
    permsEdit = "sys:dict:edit"
    :sonColumns="sonColumns"
    :columns="columns" 
    :showExpand="showExpand" 
    :showOperation="showOperation"
    :loading="insideLoading"
    @findPage="findPage"
    @handleExpandChild="handleExpandChild"
    >
	</kt-table>
  </div>
</template>

<script>
import KtTable from "@/views/core/KtTable"
import { format } from "@/utils/datetime"
import { getDisplayName } from '@/libs/common'
import HeaderColumn from '../../core/HeaderColumn.vue'
export default {
	components: {
		KtTable,
        HeaderColumn
	},
	data() {
	return {
	  size: 'small',
	  currentRow: undefined,
    insideLoading: false,
    dataFormRules: {xName: [{ required: true, message: '请输入用户名', trigger: 'blur' }]},
    sonColumns: [
        {
          title:  this.getDisplayName('taskNo'),
          key: 'taskNo',
          minWidth: 80
        },
        {
          title:  this.getDisplayName('taskType'),
          key: 'taskType',
          minWidth: 110
        },
        {
          title:  this.getDisplayName('taskDirection'),
          key: 'taskDirection',
          minWidth: 150
        },
        {
          title:  this.getDisplayName('xStatus'),
          key: 'xStatus',
          minWidth: 130,
          items: this.$Enum.WmsApplyShipOrder.map1,
          render: (h, params) => {
            return h('span', this.$Enum.WmsApplyShipOrder.map1[params.row.xStatus] || '')
          }
        },
        {
          title: this.getDisplayName('whid'),
          key: 'whid',
          minWidth: 150,
          items: this.$store.state.my.warehouseDic,
          render: (h, params) => {
            return h('span', this.$store.state.my.warehouseDic[params.row.whid] || '')
          }
        },
        {
          title:  this.getDisplayName('materialId'),
          key: 'materialId',
          minWidth: 150
        },
        {
          title:  this.getDisplayName('materialPropertyId'),
          key: 'materialPropertyId',
          minWidth: 150
        },
        {
          title:  this.getDisplayName('relationOrderItemId'),
          key: 'relationOrderItemId',
          minWidth: 150
        },
        {
          title:  this.getDisplayName('workOrderId'),
          key: 'workOrderId',
          minWidth: 150
        },
        {
          title:  this.getDisplayName('originalBillCode'),
          key: 'originalBillCode',
          minWidth: 150
        },
        {
          title:  this.getDisplayName('shipBatchNo'),
          key: 'shipBatchNo',
          minWidth: 130
        },
        {
          title:  this.getDisplayName('palletType'),
          key: 'palletType',
          minWidth: 110
        },
        {
          title:  this.getDisplayName('currentLocCode'),
          key: 'currentLocCode',
          minWidth: 110
        },
        {
          title:  this.getDisplayName('description'),
          key: 'description',
          minWidth: 110
        },
        {
          title:  this.getDisplayName('showlnfor'),
          key: 'showlnfor',
          minWidth: 110
        },
         {
          title:  this.getDisplayName('fromLanwayNo'),
          key: 'fromLanwayNo',
          minWidth: 140  
        },
        {
          title:   this.getDisplayName('toLanwayNo'),
          key: 'toLanwayNo',
          minWidth: 140             
        },
        {
          title:  this.getDisplayName('toAvailableLocCodes'),
          key: 'toAvailableLocCodes',
          minWidth: 140            
        },
        {
          title: this.getDisplayName('toRealLocCode'),
          key: 'toRealLocCode',
          minWidth: 140       
        },
        {
          title:  this.getDisplayName('weight'),
          key: 'weight',
          minWidth: 140         
        },
        {
          title:  this.getDisplayName('height'),
          key: 'height',
          minWidth: 140      
        },
        {
          title:  this.getDisplayName('length'),
          key: 'length',
          minWidth: 140         
        },
        {
          title:  this.getDisplayName('width'),
          key: 'width',
          minWidth: 140 
        },
        {
          title: this.getDisplayName('fromLocId'),
          key: 'str9',
          minWidth: 140 
        },
        {
          title:  this.getDisplayName('fromLocCode'),
          key: 'fromLocCode',
          minWidth: 140
        },
        {
          title:  this.getDisplayName('fromRack'),
          key: 'fromRack',
          minWidth: 140
        },
        {
          title:   this.getDisplayName('fromColumn'),
          key: 'fromColumn',
          minWidth: 140
        },
        {
          title:   this.getDisplayName('fromLevel'),
          key: 'fromLevel',
          minWidth: 140
        },
        {
          title:  this.getDisplayName('fromDepth'),
          key: 'fromDepth',
          minWidth: 140
        },
        {
          title:  this.getDisplayName('toLocId'),
          key: 'toLocId',
          minWidth: 140         
        },
        {
          title:  this.getDisplayName('toLocCode'),
          key: 'toLocCode',
          minWidth: 140  
        },
        {
          title:  this.getDisplayName('toRack'),
          key: 'toRack',
          minWidth: 140
        },
        {
          title:  this.getDisplayName('toColumn'),
          key: 'toColumn',
          minWidth: 140
        },
        {
          title:  this.getDisplayName('toLevel'),
          key: 'toLevel',
          minWidth: 140
        },
        {
          title:  this.getDisplayName('toDepth'),
          key: 'toDepth',
          minWidth: 140
        },
        {
          title:   this.getDisplayName('pickMode'),
          key: 'pickMode',
          minWidth: 140
        },
        {
          title:  this.getDisplayName('inventoryItemId'),
          key: 'inventoryItemId',
          minWidth: 140
        },
        {
          title: this.getDisplayName('inventoryItemDetailId'),
          key: 'inventoryItemDetailId',
          minWidth: 140
        },
        {
          title:  this.getDisplayName('planQuantity'),
          key: 'planQuantity',
          minWidth: 140
        },
        {
          title:  this.getDisplayName('planPkgQuantity'),
          key: 'planPkgQuantity',
          minWidth: 140
        },
        {
          title:  this.getDisplayName('movedPkgQuantity'),
          key: 'movedPkgQuantity',
          minWidth: 140
        },
        {
          title:  this.getDisplayName('packageUnitId'),
          key: 'packageUnitId',
          minWidth: 140
        },
        {
          title: this.getDisplayName('priority'),
          key: 'priority',
          minWidth: 140
        }
    ],
		columns: [
		    {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: this.getDisplayName('taskType'),
          key: 'taskType',
          minWidth: 150,
          // items: this.$store.state.my.billTypeDic,
          // render: (h, params) => {
          //     return h('span', this.$store.state.my.billTypeDic[params.row.billTypeId] || '')
          //   }
        },
        {
          title: this.getDisplayName('taskDirection'),
          key: 'taskDirection',
          minWidth: 150
        },
        {
          title: this.getDisplayName('xStatus'),
          key: 'xStatus',
          minWidth: 130,
          items: this.$Enum.WmsApplyShipOrder.map1,
          render: (h, params) => {
            return h('span', this.$Enum.WmsApplyShipOrder.map1[params.row.xStatus] || '')
          }
        },
        {
          title: this.getDisplayName('whid'),
          key: 'whid',
          minWidth: 150,
          items: this.$store.state.my.warehouseDic,
          render: (h, params) => {
            return h('span', this.$store.state.my.warehouseDic[params.row.whid] || '')
          }
        },
        {
          title: this.getDisplayName('palletCode'),
          key: 'palletCode',
          minWidth: 150
        },
        {
          title: this.getDisplayName('originalBillCode'),
          key: 'originalBillCode',
          minWidth: 150
        },
        {
          title: this.getDisplayName('fromLocId'),
          key: 'fromLocId',
          minWidth: 150
        },
        {
          title: this.getDisplayName('fromLocCode'),
          key: 'fromLocCode',
          minWidth: 150
        },
        {
          title: this.getDisplayName('fromRack'),
          key: 'fromRack',
          minWidth: 150
        },
         {
          title: this.getDisplayName('fromColumn'),
          key: 'fromColumn',
          minWidth: 150
        },
        {
          title: this.getDisplayName('fromLevel'),
          key: 'fromLevel',
          minWidth: 150
        },
         {
          title: this.getDisplayName('fromDepth'),
          key: 'fromDepth',
          minWidth: 150
        },
        {
          title: this.getDisplayName('toLocId'),
          key: 'toLocId',
          minWidth: 150
        },
                {
          title: this.getDisplayName('toLocCode'),
          key: 'toLocCode',
          minWidth: 150
        },
        {
          title: this.getDisplayName('toRack'),
          key: 'toRack',
          minWidth: 150
        },
         {
          title: this.getDisplayName('toColumn'),
          key: 'toColumn',
          minWidth: 150
        },
        {
          title: this.getDisplayName('toLevel'),
          key: 'toLevel',
          minWidth: 150
        },
         {
          title: this.getDisplayName('toDepth'),
          key: 'toDepth',
          minWidth: 150
        },
        {
          title: this.getDisplayName('planQuantity'),
          key: 'planQuantity',
          minWidth: 150
        },
        {
          title: this.getDisplayName('planPkgQuantity'),
          key: 'planPkgQuantity',
          minWidth: 150
        },
        {
          title: this.getDisplayName('movedPkgQuantity'),
          key: 'movedPkgQuantity',
          minWidth: 150
        },
         {
          title: this.getDisplayName('packageUnitId'),
          key: 'packageUnitId',
          minWidth: 150
        },
        {
          title: this.getDisplayName('priority'),
          key: 'priority',
          minWidth: 150
        },
        {
          title: this.$t('creator'),
          key: 'creator',
          minWidth: 100
        },
        {
          title: this.$t('creationTime'),
          sortable: true,
          type: 'daterange',
          minWidth: 200,
          key: 'creationTime',
          formatter:this.dateFormat
        },
        {
          title: this.$t('lastModifier'),
          key: 'lastModifier',
          minWidth: 150
         },
         {
          title: this.$t('lastModificationTime'),
          key: 'lastModificationTime',
          minWidth: 200,
          sortable: true,
          type: 'daterange',
          formatter:this.dateFormat
        }
			],
	  pageRequest: { pageNum: 1, pageSize: 10 },
    tableData: {},
    showOperation:true,
    showExpand:true, //点击主表，下拉展示子表
		}
	},
	methods: {
   // 获取语言
	 getDisplayName (key) {
      return getDisplayName('workdoc', key)[0]
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
      let ret = await this.$http.postAsync("/app/WorkOrder/GetList", param).catch(error=>{})  
          if(ret.data.data.totalCount!=0) {
            this.$message({message: this.$t('querySuccess'), type: 'success'})
          } else {
            this.$message({message: this.$t('noDataIsQueried'), type: 'error'})
          }
      this.insideLoading = false 
      this.tableData =ret.data.data
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
      let params = {
        skipCount: pageNumber,
        maxResultCount: this.pageRequest.pageSize,
        sorting: "id desc",
        conditionItems: []
      }
	    this.$http.postAsync("/app/WorkOrder/GetList",params).then((res) => {
		  this.tableData = res.data.data
      })
		},
     handleExpandChild(data){
      // 用于点击单行表格数据时，通过查询带出子表格的数据
      let len = data.expandData.wmsTasks.length
      if(len>0) {
         this.$set(data.expandData,"tableExpandData", data.expandData.wmsTasks) 
      }
    },
	// 时间格式化
   	dateFormat: function (row, column, cellValue, index){
        	return format(row[column.property])
     	}
	},

}
</script>

<style scoped>

</style>