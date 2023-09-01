<template>
  <div class="page-container">
	<!--工具栏-->
	<div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;display:flex;flex-direction:row">
		 <header-column :columns="columns" highSearch     @on-search='handleSearch'   ></header-column>
     <div style="display:flex;align-items:center;margin-left:10px">
       <kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:dict:add" type="primary" @click="handleAdd" />
       <kt-button icon="fa fa-plus" :label="$t('action.CreateLocation')" perms="sys:dict:add" type="primary" @click="handleAddLocation" />
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
    @selectionChange="selectionChange"
    >
	</kt-table>
  	<!--新增编辑界面-->
	<rackMangerVue ref="manager" @on-close="$refs.pages.refresh()" :EntityData="currentRow" @findPage="findPage"/>
  </div>
</template>

<script>
import KtTable from "@/views/core/KtTable"
import KtButton from "@/views/core/KtButton"
import { format } from "@/utils/datetime"
import { getDisplayName } from '@/libs/common'
import { CreateRackDto }   from '@/libs/createDto'
import HeaderColumn from '../../core/HeaderColumn.vue'
import rackMangerVue from './RackManger'
export default {
	components: {
		KtTable,
		KtButton,
		rackMangerVue,
    HeaderColumn
	},
	data() {
	return {
	  size: 'small',
	  currentRow: undefined,
    insideLoading: false,
    rackIds: [],
    dataFormRules: {
		xName: [{ required: true, message: '请输入用户名', trigger: 'blur' }]},
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
          title: this.getDisplayName('xStatus'),
          key: 'xStatus',
          minWidth: 150,
          items: this.$Enum.WmsRack.map1,
          render: (h, params) => {
            return h('span', this.$Enum.WmsRack.map1[params.row.xStatus] || '')
          }
        },
        {
          title: this.getDisplayName('deep'),
          key: 'deep',
          minWidth: 100
        },
        {
          title: this.getDisplayName('column'),
          key: 'column',
          minWidth: 150
        },
        {
          title: this.getDisplayName('level'),
          key: 'level',
          minWidth: 150
        }, 
        {
          title: this.getDisplayName('totalLocationCount'),
          key: 'totalLocationCount',
          minWidth: 150
        },
        {
          title: this.getDisplayName('loadLocationCount'),
          key: 'loadLocationCount',
          minWidth: 150
        },
        {
          title: this.getDisplayName('usageRate'),
          key: 'usageRate',
          minWidth: 150,
        },
        {
          title: this.getDisplayName('usageRateUpper'),
          key: 'usageRateUpper',
          minWidth: 150,
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
	 this.$http.postAsync("/app/Rack/GetList",params).then((res) => {
    if(res!=undefined) {
      this.tableData = res.data.data
    }
      }).catch(error=>{})
		},
    // 显示新增界面
		handleAdd: function () {
      this.currentRow = CreateRackDto()
      this.$refs.manager.dialogVisible = true
	    this.$refs.manager.operation = true
		},
    selectionChange(selections){
     selections.selections.forEach(x =>{
         this.rackIds.push(x.id)
     })
      //console.log(this.rackIds)
    },
    getfindPage() {
      this.$emit('findPage', {pageRequest:this.pageRequest})
    },
    handleAddLocation() {
      let params = this.rackIds
      this.$http.postAsync("/app/Location/CreateLocation",params).then((res) => {
      if(res.status===200) {
      this.$message({message: this.$t('CreateLocationSuccess'), type: 'success'})
      this.getfindPage()
      } else {
      this.$message({message: this.$t('CreateLocationFailure') + res.msg, type: 'error'}) 
      }
      }).catch(error=>{})
    },
    // handleAddgoodsallocation(data) {
    //   this.$http.postAsync(`/app/Location/CreateLocation/${data.row.id}`).then(res =>{
    //   if(res.result) {
    //   this.$message({message: this.$t('CreateLocationSuccess'), type: 'success'})
    //   } else {
    //   this.$message({message: this.$t('CreateLocationFailure') + res.msg, type: 'error'}) 
    //   }
    //    })
    // },
    // 编辑
    handleEdit(params) {
      this.$refs.manager.dialogVisible = true
      this.$refs.manager.operation = false
      this.currentRow = Object.assign({}, params.row)
    },
    // 删除
	  handleDelete: function (data) {
			this.$http.deleteAsync('/app/Rack/Delete',data.params[0]).then(data!=null?data.callback:'').catch(error=>{})
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