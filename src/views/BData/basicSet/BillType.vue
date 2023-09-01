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
	<!--表格内容栏-->
	<kt-table
    :data="tableData" 
    permsEdit = "sys:dict:edit"
    :columns="columns" 
    :showOperation="showOperation"
    :loading="insideLoading"
    @findPage="findPage"
    @handleEdit="handleEdit"
    @handleDelete="handleDelete"
    >
	</kt-table>
  	<!--新增编辑界面-->
	<BillTypeMangeVue ref="manager" @on-close="$refs.pages.refresh()" :EntityData="currentRow" @findPage="findPage"/>
  </div>
</template>

<script>
import KtTable from "@/views/core/KtTable"
import KtButton from "@/views/core/KtButton"
import { format } from "@/utils/datetime"
import { getDisplayName } from '@/libs/common'
import { CreateBillTypeDto }   from '@/libs/createDto'
import HeaderColumn from '../../core/HeaderColumn.vue'
import BillTypeMangeVue from './BillTypeMange'
export default {
	components: {
		KtTable,
		KtButton,
		BillTypeMangeVue,
    HeaderColumn
	},
	data() {
	return {
	  size: 'small',
	  currentRow: undefined,
    insideLoading: false,
    dataFormRules: {xName: [{ required: true, message: '请输入用户名', trigger: 'blur' }]},
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
          title: this.getDisplayName('xName'),
          key: 'xName',
          minWidth: 150,
          editable: true
        },
		    {
          title: this.getDisplayName('billTypeType'),
          key: 'billTypeType',
          minWidth: 150,
          items: this.$Enum.TypeOfBill.map6,
          render: (h, params) => {
            return h('span', this.$Enum.TypeOfBill.map6[params.row.billTypeType] || '')
          }
        },
        {
          title: this.$t('xStatus'),
          key: 'xStatus',
          minWidth: 100,
          items: this.$Enum.TypeOfBill.map5,
          render: (h, params) => {
            return h('span', this.$Enum.TypeOfBill.map5[params.row.xStatus] || '')
          }
        },
        {
          title: this.getDisplayName('basicStrategyId'),
          key: 'basicStrategyId',
          minWidth: 150,
          items: this.$store.state.my.basicStrategyDic,
          render: (h, params) => {
            return h('span', this.$store.state.my.basicStrategyDic[params.row.basicStrategyId] || '')
          }
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
    showOperation:true
		}
	},
	methods: {
    // 获取语言
	getDisplayName (key) {
      return getDisplayName('billTypeManage', key)[0]
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
      let ret = await this.$http.postAsync("/app/BillType/GetList", param)  
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
	 this.$http.postAsync("/app/BillType/GetList",params).then((res) => {
       if (res.data.result) {
          this.tableData = res.data.data
        }
      }).catch(error=>{})
		},
    onSelectChange (row, index) {
       //console.log('2e');
      //console.log(row, index)
    },
    // 显示新增界面
		handleAdd: function () {
      this.currentRow = CreateBillTypeDto()
      this.$refs.manager.dialogVisible = true
	    this.$refs.manager.operation = true
		},
    // 编辑
    handleEdit(params) {
      this.$refs.manager.dialogVisible = true
      this.$refs.manager.operation = false
      this.currentRow = Object.assign({}, params.row)
    },
        // 删除
	  handleDelete: function (data) {
			this.$http.deleteAsync('/app/BillType/Delete',data.params[0]).then(data!=null?data.callback:'').catch(error=>{})
		},
		// 时间格式化
   	dateFormat: function (row, column, cellValue, index){
        	return format(row[column.property])
     	}
	},
	mounted() {
	}
}
</script>

<style scoped>

</style>