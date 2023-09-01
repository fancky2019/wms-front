<template>
  <div class="page-container">
	<!--工具栏-->
	<div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;display:flex;flex-direction:row">
    <header-column :columns="columns" highSearch     @on-search='handleSearch'   ></header-column>
     <div style="display:flex;align-items:center;margin-left:10px">
       <kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:dict:add" type="primary" @click="handleAdd" />
    </div>
	</div>
		<div class="toolbar" style="float:right;padding-top:10px;padding-right:15px;">
		<el-form :inline="true" :size="size">
			<el-form-item>
				<el-button-group>
				<el-tooltip :content="$t('refresh')" placement="top">
					<el-button icon="fa fa-refresh"  @click="findPage(null)">   {{$t('action.refresh')}}</el-button>
				</el-tooltip>
        <el-tooltip :content="$t('export')" placement="top"> 
					<el-button icon="fa fa-cloud-upload" @click="exportExcelUser" >  {{$t('export')}}</el-button>
				</el-tooltip>
				</el-button-group>
			</el-form-item>
		</el-form>
	</div>
	<!--表格内容栏 permsEdit = "sys:dict:edit"-->
	<kt-table
    :data="tableData" 
    :sonColumns="sonColumns"
    :columns="columns" 
    :showExpand="showExpand" 
    :showOperation="showOperation"
    :loading="insideLoading"
    @findPage="findPage"
    @handleEdit="handleEdit"
    @handleDelete="handleDelete"
    @handleExpandChild="handleExpandChild"
    >
	</kt-table>
  	<!--新增编辑界面-->
	<ShipPickOrderManger ref="manager"  @findPage="findPage" :columns="sonColumns" :EntityItemData="currentRow"  @on-close="$refs.pages.refresh()"   />
  </div>
</template>

<script>
import KtTable from "@/views/core/KtTable"
import KtButton from "@/views/core/KtButton"
import { format } from "@/utils/datetime"
import { getDisplayName } from '@/libs/common'
import { CreateShipPickOrderDto }   from '@/libs/createDto'
import ShipPickOrderManger from './ShipPickOrderManger'
import HeaderColumn from '../../core/HeaderColumn.vue'
export default {
	components: {
		KtTable,
		KtButton,
		ShipPickOrderManger,
    HeaderColumn
	},
	data() {
	return {
	      size: 'small',
	      currentRow: undefined,
        insideLoading: false,
        showOperation:true,
        tableData: {}, 
        dataFormRules: {
		    xName: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
			  },
        sonColumns: [
        // {
        //   title: this.getDisplayName1('shipPickOrderId'),
        //   key: 'shipPickOrderId',
        //   minWidth: 150
        // },
        // {
        //   title: this.getDisplayName1('shipOrderItemId'),
        //   key: 'shipOrderItemId',
        //   minWidth: 150
        // },
        {
          title: this.getDisplayName1('planPkgQuantity'),
          key: 'planPkgQuantity',
          minWidth: 150
        },
        {
          title: this.getDisplayName1('allocatedPkgQuantity'),
          key: 'allocatedPkgQuantity',
          minWidth: 150
        },
        {
          title: this.getDisplayName1('movedPkgQuantity'),
          key: 'movedPkgQuantity',
          minWidth: 150
        },
        {
          title: this.getDisplayName1('fromLocId'),
          key: 'fromLocId',
          minWidth: 130
        },
        {
          title: this.getDisplayName1('fromLocCode'),
          key: 'fromLocCode',
          minWidth: 110
        },
        {
          title: this.getDisplayName1('toLocId'),
          key: 'toLocId',
          minWidth: 110
        },
        {
          title: this.getDisplayName1('toLocCode'),
          key: 'toLocCode',
          minWidth: 110
        }
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
          minWidth: 150,
          items: this.$store.state.my.warehouseDic,
          render: (h, params) => {
            return h('span', this.$store.state.my.warehouseDic[params.row.warehouseId] || '')
          }
        },
        {
          title: this.getDisplayName('shipOrderId'),
          key: 'shipOrderId',
          minWidth: 150,
          items: this.$store.state.my.ShipOrderDic,
          render: (h, params) => {
            return h('span', this.$store.state.my.ShipOrderDic[params.row.shipOrderId] || '')
          }
        },
        {
          title: this.getDisplayName('billTypeId'),
          key: 'billTypeId',
          minWidth: 150,
          items: this.$store.state.my.shipBillTypeDic,
          render: (h, params) => {
            return h('span', this.$store.state.my.billTypeDic[params.row.billTypeId] || '')
          }
        },
        {
          title: this.getDisplayName('status'),
          key: 'status',
          minWidth: 130,
          items: this.$Enum.WmsApplyShipOrder.map1,
          render: (h, params) => {
            return h('span', this.$Enum.WmsApplyShipOrder.map1[params.row.status] || '')
          }
        },
        {
          title: this.getDisplayName('planPkgQuantity'),
          key: 'planPkgQuantity',
          minWidth: 150
        },
        {
          title: this.getDisplayName('allocatedPkgQuantity'),
          key: 'allocatedPkgQuantity',
          minWidth: 150
        },
        {
          title: this.getDisplayName('movedPkgQuantity'),
          key: 'movedPkgQuantity',
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
        showExpand:true, //点击主表，下拉展示子表
		}
	},
	methods: {
    // 获取语言
	  getDisplayName (key) {
      return getDisplayName('ShipPickOrder', key)[0]
    },
  	getDisplayName1 (key) {
      return getDisplayName('ShipPickOrderItem', key)[0]
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
      let ret = await this.$http.postAsync("/app/ShipPickOrder/GetList", param).catch(error=>{})  
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
        conditionItems: [],
      }
	    this.$http.postAsync("/app/ShipPickOrder/GetList",params).then((res) => {
		  this.tableData = res.data.data
      }).catch(error=>{})
		},
    handleExpandChild(data){
      // 用于点击单行表格数据时，通过查询带出子表格的数据
      let len = data.expandData.shipPickOrderItems.length
      if(len>0) {
         this.$set(data.expandData,"tableExpandData", data.expandData.shipPickOrderItems) 
      }
    },
    // 显示新增界面
	  handleAdd: function () {
       this.$refs.manager.dialogVisible = true
	     this.$refs.manager.operation = true
       this.currentRow = CreateShipPickOrderDto()
		},
    // 编辑
    handleEdit(params) {
      this.$refs.manager.dialogVisible = true
      this.$refs.manager.operation = false
      this.currentRow = Object.assign({}, params.row)
    },
    // 导出
    exportExcelUser() {
    let params = {
        skipCount: 1,
        maxResultCount: 10000,
        sorting: "id desc",
        conditionItems: [],
      }
	    this.$http.postAsync("/app/ShipPickOrder/GetListExcel",params).catch(error=>{})
    },
    // 删除
	 handleDelete: function (data) {
		  this.$http.deleteAsync('/app/ShipPickOrder/Delete',data.params[0]).then(data!=null?data.callback:'').catch(error=>{})
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