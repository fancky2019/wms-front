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
<materialCategoryManger ref="manager" @on-close="$refs.pages.refresh()" :EntityData="currentRow"    @findPage="findPage"/>

  </div>
</template>

<script>
import KtTable from "@/views/core/KtTable"
import KtButton from "@/views/core/KtButton"
 import HeaderColumn from '../../core/HeaderColumn.vue'
import { getDisplayName } from '@/libs/common'
// import LoginlogManageVue from './LoginlogManage.vue'
import materialCategoryManger from './MaterialCategoryManger'
import { CreateMaterialCategoryDto }   from '@/libs/createDto'
export default {
  components: {
    KtTable, 
    HeaderColumn,
    KtButton,
    materialCategoryManger
  },
  data() {
    return { 
      size: 'small',
      lastCondition: undefined,
      currentRow: undefined,
      insideLoading: false,
      showOperation: true,
      showBatchDelete: false,
      queryType: 0,
      insideColumns: [], 
      columns: [
         {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          key: 'selection',
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
          title: this.getDisplayName('materialPropertyRuleId'),
          key: 'materialPropertyRuleId',
          minWidth: 150,
          items: this.$store.state.my.propertyRuleDic,
       
        },
        {
          title: this.getDisplayName('str1'),
          key: 'str1',
          minWidth: 150, 
        },
        {
          title: this.getDisplayName('str2'),
          key: 'str2',
          minWidth: 200
        }, 
        {
          title: this.getDisplayName('str3'),
          key: 'str3',
          minWidth: 200
        },
        {
          title: this.getDisplayName('str4'),
          key: 'str4',
          minWidth: 200
        },
        {
          title: this.getDisplayName('str5'),
          key: 'str5',
          minWidth: 200
        }
    
      ],
      tableData: {},
      pageRequest: { pageNum: 1, pageSize: 10 },
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
      let ret = await this.$http.postAsync("/app/MaterialCategory/GetList", param)  
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
      return getDisplayName('materialCategory', key)[0]
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
      this.$http.postAsync("/app/MaterialCategory/GetList", condition).then((res) => {
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
      this.currentRow = CreateMaterialCategoryDto()
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
			this.$http.deleteAsync('/app/MaterialCategory/Delete',data.params[0]).then(data!=null?data.callback:'')
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
      this.$http.postAsync('/app/MaterialCategory/GetListExcel', params).then((res) => {
        this.$alert(res.data, '导出成功', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
      })
    }
  },
  mounted() {
        this.$store.dispatch('getPropertyRuleData')
  },
};
</script>
  