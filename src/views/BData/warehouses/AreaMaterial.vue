<template>
 <el-dialog :title="$t('action.associatedMaterial')" width="50%"  :visible.sync="dialogVisible" :close-on-click-modal="false" >
  <div class="page-container">
	<!--工具栏-->
	<div class="toolbar" style="float:left;padding-left:15px;display:flex;flex-direction:row">
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
    :columns="columns"
    :showOperation="showOperation"
    :showBatchDelete="showBatchDelete"
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
   props: {
    AreaId: Number
   },
	data() {
	return {
	  size: 'small',
      dialogVisible: false, // 新增编辑界面是否显示
      insideLoading: false,
      materialIds:[],
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
      showOperation:false,
      showBatchDelete: true
		}
	},
	methods: {
    // 获取语言
	getDisplayName (key) {
      return getDisplayName('area', key)[0]
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
      let ret = await this.$http.postAsync("/app/Material/GetList", param)  
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
	    this.$http.postAsync("/app/Material/GetList",params).then((res) => {
		  this.tableData = res.data.data
      })
	},
    selectionChange(selections){
     selections.selections.forEach(x =>{
         this.materialIds.push(x.id)
     })
    },
    handleSave(){
      let param = {
        areaId: this.AreaId,
        materialIds:this.materialIds
      }
      this.$http.postAsync("/app/Area/AddAreaMaterial", param).then(res=>{
      if (res.data.result) {
         this.$message({message: '区域物料关联成功', type: 'success'}) 
      } else {
        this.$message({message: '区域物料关联失败', type: 'error'})
      }
      })
      this.dialogVisible =false
    }
	},
}
</script>

<style scoped>

</style>