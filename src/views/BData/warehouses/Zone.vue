<template>
  <div class="page-container">
    <!--工具栏-->
    <div class="toolbar" style="float: left; padding-top:10px; padding-left: 15px;display:flex;flex-direction:row">
    <header-column :columns="columns" highSearch    @on-search='handleSearch' ></header-column>
       <div style="display:flex;align-items:center;margin-left:10px">
      <kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:dict:add" type="primary" @click="handleAdd" />
       </div>
    </div>
  <div class="toolbar" style="float:right;padding-top:10px;padding-right:15px;">
		<el-form :inline="true" :size="size">
			<el-form-item>
				<el-button-group>
				<el-tooltip :content="$('refresh')" placement="top">
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
		<!--表格显示列界面-->
		<!-- <table-column-filter-dialog ref="tableColumnFilterDialog" :columns="columns"
			@handleFilterColumns="handleFilterColumns">
		</table-column-filter-dialog> -->
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
    >
    </kt-table>
<zone ref="manager" @on-close="$refs.pages.refresh()" :EntityData="currentRow"/>

  </div>
</template>

<script>
import KtTable from "@/views/core/KtTable"
import KtButton from "@/views/core/KtButton"
import HeaderColumn from '../../core/HeaderColumn.vue'
import { getDisplayName } from '@/libs/common'
import zone from './ZoneManager'
import { CreateWarehouseDto }   from '@/libs/createDto'
export default {
  components: {
    KtTable, 
    HeaderColumn,
    KtButton,
    zone
  },
  data() {
    return {
      size: 'small',
      lastCondition: undefined,
      currentRow: undefined,
      insideLoading: false,
      queryType: 0,
      insideColumns: [], 
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: this.getDisplayName('warehouseId'),
          key: 'warehouseId',
          minWidth: 120
        },
        {
          title: this.getDisplayName('xCode'),
          key: 'xCode',
          minWidth: 150, 
        },
        {
          title: this.getDisplayName('xName'),
          key: 'xName',
          minWidth: 150,
          editable: true, 
          switch:true, //用于开启选择按钮的，下面是按钮的两种状态
          inactSwitch:'禁用',
          actSwitch:'启用'
        },
        {
          title: this.getDisplayName('xStatus'),
          key: 'xStatus',
          minWidth: 130
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
      tableData: {},
      pageRequest: { pageNum: 1, pageSize: 10 },
      showOperation: true,
      showBatchDelete: false,
    };
  },
  methods: {
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
      let ret = await this.$http.postAsync("/app/Warehouse/GetList", param)  
      this.insideLoading = false 
      this.tableData =ret.data.data
    },
    // 文字
    getDisplayName (key) {
      return getDisplayName('zone', key)[0]
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
      this.$http.postAsync("/app/Warehouse/GetList", condition).then((res) => {
        if (res.data.result) {
          this.tableData = res.data.data
        }
      });
    },
    onSelectChange (row, index) {
      //console.log('2e');
      //console.log(row, index)
    },
    // 新增
    handleAdd() {
      this.currentRow = CreateWarehouseDto()
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
		 //console.log("删除的数据显示---》",data )
			this.$http.deleteAsync('/app/Warehouse/Delete',data.params[0]).then(data!=null?data.callback:'')
		},
    // 时间格式化
     	dateFormat: function (row, column, cellValue, index){
         	return format(row[column.property])
  	},
    // 导出
    exportExcelUser: function () {
      this.pageRequest.pageSize = 100000
      // this.pageRequest.params = [{name:'name',value: this.filters.name}]
      let params = {
        skipCount: this.pageRequest.pageNum,
        maxResultCount: this.pageRequest.pageSize,
        sorting: "id desc",
        conditionItems: []
      }
      this.$http.postAsync('/app/Warehouse/GetListExcel', params).then((res) => {
        this.$alert(res.data, '导出成功', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
      })
    }
  },
  mounted() {},
};
</script>

<style scoped>
</style>