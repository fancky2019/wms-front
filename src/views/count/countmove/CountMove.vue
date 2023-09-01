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
				</el-button-group>
			</el-form-item>
		</el-form>
	</div>
	<!--表格内容栏 :sonColumns="sonColumns"-->
	<kt-table
    :data="tableData" 
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
	<!-- <ShipOrderManger ref="manager" :columns="sonColumns"  @on-close="$refs.pages.refresh()"   :CurrentEntity="currentRow"  @findPage="findPage" /> -->
  </div>
</template>

<script>
import KtTable from "@/views/core/KtTable"
import KtButton from "@/views/core/KtButton"
import { format } from "@/utils/datetime"
import { getDisplayName, getPropertyDisplayName1 } from '@/libs/common'
import { CreateShipOrderDto }   from '@/libs/createDto'
// import ShipOrderManger from './ShipOrderManger'
import HeaderColumn from '../../core/HeaderColumn.vue'
export default {
	components: {
		KtTable,
		KtButton,
		// ShipOrderManger,
        HeaderColumn
	},
  // 祖父事件
  // provide () {
  //   return {
  //     findPage: this.findPage
  //   }
  // },
	data() {
	return {
	    size: 'small',
      dialogVisible: false, // 新增编辑界面是否显示
	    currentRow: undefined,
      insideLoading: false,
      showOperation:true,
      tableData: {}, 
      dataFormRules: {xName: [{ required: true, message: '请输入用户名', trigger: 'blur' }]},
    //   sonColumns: [
    //     {
    //       title: getPropertyDisplayName1('countMoveOrderId'),
    //       key: 'countMoveOrderId',
    //       minWidth: 80
    //     },
    //     {
    //       title: getPropertyDisplayName1('countOrderItemId'),
    //       key: 'countOrderItemId',
    //       minWidth: 110
    //     },
    //     {
    //       title: getPropertyDisplayName1('planPkgQuantity'),
    //       key: 'planPkgQuantity',
    //       minWidth: 150
    //     },
    //     {
    //       title: getPropertyDisplayName1('allocatedPkgQuantity'),
    //       key: 'allocatedPkgQuantity',
    //       minWidth: 150
    //     },
    //     {
    //       title: getPropertyDisplayName1('movedPkgQuantity'),
    //       key: 'movedPkgQuantity',
    //       minWidth: 130
    //     },
    //     {
    //       title: getPropertyDisplayName1('fromLocId'),
    //       key: 'fromLocId',
    //       minWidth: 110
    //     },
    //     {
    //       title: getPropertyDisplayName1('fromLocCode'),
    //       key: 'fromLocCode',
    //       minWidth: 110
    //     },
    //     {
    //       title: getPropertyDisplayName1('toLocId'),
    //       key: 'toLocId',
    //       minWidth: 110
    //     },
    //     {
    //       title: getPropertyDisplayName1('toLocCode'),
    //       key: 'toLocCode',
    //       minWidth: 110
    //     }
    //   ],
	  columns: [
		{
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: this.getDisplayName('xCode'),
          key: 'xCode',
          minWidth: 150
        },
        {
          title: this.getDisplayName('xStatus'),
          key: 'xStatus',
          minWidth: 130,
          items: this.$Enum.WmsApplyShipOrder.map1,
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
          title: this.getDisplayName('comments'),
          key: 'comments',
          minWidth: 150
        },
        {
          title: this.getDisplayName('str1'),
          key: 'str1',
          minWidth: 150
        },
        {
          title: this.getDisplayName('str2'),
          key: 'str2',
          minWidth: 150
        },
        {
          title: this.getDisplayName('str3'),
          key: 'str3',
          minWidth: 150
        },
        {
          title: this.getDisplayName('str4'),
          key: 'str4',
          minWidth: 150
        },
        {
          title: this.getDisplayName('str5'),
          key: 'str5',
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
      showExpand:false, //点击主表，下拉展示子表
		}
	},
	methods: {
    // 获取语言
	getDisplayName (key) {
      return getDisplayName('moveDocMvCount', key)[0]
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
        sorting: "id desc"
      } 
      let ret = await this.$http.postAsync("/app/CountMoveOrder/GetList", param)  
          if(ret.data.data.totalCount!=0) {
            this.$message({message: this.$t('查询成功'), type: 'success'})
          } else {
            this.$message({message: this.$t('查询失败'), type: 'error'})
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
	    this.$http.postAsync("/app/CountMoveOrder/GetList",params).then((res) => {
		  if(res!=undefined) {
      this.tableData = res.data.data
      }
      }).catch(error=>{})
		},
    handleExpandChild(data){
      let len = data.expandData.shipOrderItems.length
      if(len>0) {
         this.$set(data.expandData,"tableExpandData", data.expandData.shipOrderItems) 
      }
    },
    // 显示新增界面
	  handleAdd: function () {
       this.currentRow = CreateShipOrderDto()
       this.$refs.manager.dialogVisible = true
	     this.$refs.manager.operation = true
       this.$refs.manager.disabled =false
		},
    // 编辑
    handleEdit(params) {
      this.$refs.manager.operation = false
      this.$refs.manager.disabled =false
      this.currentRow = Object.assign({}, params.row)
      this.findPage(null)
      if (this.currentRow.xStatus===1) {
          this.$refs.manager.dialogVisible = true
      } else{
        this.$message({message: '该状态无法编辑' , type: 'error'})
      } 
    },
    // 导出
    exportExcelUser() {
    let params = {
        skipCount: 1,
        maxResultCount: 10000,
        sorting: "id desc",
        conditionItems: [],
      }
	    this.$http.postAsync("/app/CountMoveOrder/GetListExcel",params).catch(error=>{})
    },
    // 删除
	 handleDelete: function (data) {
		  this.$http.deleteAsync('/app/CountMoveOrder/Delete',data.params[0]).then(data!=null?data.callback:'').catch(error=>{})
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