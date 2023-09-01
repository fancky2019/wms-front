<template>
<el-dialog :title="$t('action.associatedMaterial')" width="50%"  :visible.sync="dialogVisible" :close-on-click-modal="false" >
  <div class="page-container">
	<!--工具栏-->
	<div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;display:flex;flex-direction:row">
		 <header-column :columns="columns"      @on-search='handleSearch'   ></header-column>
                  <div style="display:flex;align-items:center;margin-left:10px">
       <kt-button  :label="$t('save')" type="primary" @click="handleSave" />
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
    @selectionChange="selectionChange"
    >
	</kt-table>
  </div>
  	</el-dialog>
</template>

<script>
import KtTable from "@/views/core/KtTable"
import KtButton from "@/views/core/KtButton"
import { getDisplayName } from '@/libs/common'
import HeaderColumn from '../../core/HeaderColumn.vue'
export default {
	components: {
		KtTable,
        KtButton,
        HeaderColumn
	},
	data() {
	return {
	   size: 'small',
	   currentRow: undefined,
       dialogVisible: false, // 新增编辑界面是否显示
       insideLoading: false,
       rackIds: [],
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
      return getDisplayName('rack', key)[0]
    },
    // 搜索
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
      let ret = await this.$http.postAsync("/app/Rack/GetList", param)  
            if(ret.data.data.totalCount!=0) {
            this.$message({message: this.$t('querySuccess'), type: 'success'})
            
          } else {
            this.$message({message: this.$t('noDataIsQueried'), type: 'error'})
          }
      this.insideLoading = false 
      this.tableData =ret.data.data
    },
    getfindPage() {
      this.$emit('findPage', {pageRequest:this.pageRequest})
    },
	// 获取分页数据
	findPage: function () {
      let pageNumber = this.pageRequest.pageNum
      if(pageNumber>1) {
        pageNumber = (this.pageRequest.pageNum-1)*this.pageRequest.pageSize+1
      }
      let params = {
        skipCount:pageNumber,
        maxResultCount: 10000,
        sorting: "id desc",
        conditionItems: [],
      }
	 this.$http.postAsync("/app/Rack/GetList",params).then((res) => {
		  this.tableData = res.data.data
      }).catch(error=>{})
		},
    selectionChange(selections){
     selections.selections.forEach(x =>{
         this.rackIds.push(x.id)
     })
      //console.log(this.rackIds)
    },
    handleSave() {
      let params = this.rackIds
      this.$http.postAsync("/app/Location/CreateLocation",params).then((res) => {
      if(res.status===200) {
      this.$message({message: this.$t('CreateLocationSuccess'), type: 'success'})
      this.getfindPage()
      this.dialogVisible = false
      } else {
      this.$message({message: this.$t('CreateLocationFailure'), type: 'error'})
      this.dialogVisible = false
      }
      }).catch(error=>{})
    },
	},
}
</script>

<style scoped>

</style>