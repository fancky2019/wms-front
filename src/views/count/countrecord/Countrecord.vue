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
    :columns="columns" 
    :showExpand="showExpand" 
    :showOperation="showOperation"
    :loading="insideLoading"
    @findPage="findPage"
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
      insideLoading: false,
      showOperation:true,
      tableData: {}, 
      dataFormRules: {xName: [{ required: true, message: '请输入用户名', trigger: 'blur' }]},
	  columns: [
		{
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: this.getDisplayName('countOrderId'),
          key: 'countOrderId',
          minWidth: 150
        },
        {
          title: this.getDisplayName('inventoryItemDetailId'),
          key: 'inventoryItemDetailId',
          minWidth: 130,
        },
        {
          title: this.getDisplayName('pkgQuantity'),
          key: 'pkgQuantity',
          minWidth: 150
        },
        {
          title: this.getDisplayName('countPkgQuntity'),
          key: 'countPkgQuntity',
          minWidth: 150
        },
        {
          title: this.getDisplayName('deltaPkgQuntity'),
          key: 'deltaPkgQuntity',
          minWidth: 150
        },
        {
          title: this.getDisplayName('isAdjusted'),
          key: 'isAdjusted',
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
      return getDisplayName('countRecord', key)[0]
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
      let ret = await this.$http.postAsync("/app/CountRecord/GetList", param)  
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
	    this.$http.postAsync("/app/CountRecord/GetList",params).then((res) => {
		  if(res!=undefined) {
      this.tableData = res.data.data
      }
      }).catch(error=>{})
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