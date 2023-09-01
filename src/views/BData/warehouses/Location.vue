<template>
  <div class="page-container">
	<!--工具栏-->
	<div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;display:flex;flex-direction:row">
     <header-column :columns="columns" highSearch     @on-search='handleSearch'   ></header-column>
     <div style="display:flex;align-items:center;margin-left:10px">
       <kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:dict:add" type="primary" @click="handleAdd" />
       <ImportButton
        style="font-size:12px"
        @on-success="importExcel"
       ></ImportButton>
       <!--template="/template/location.xlsx" -->
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
	<!--表格内容栏-->
	<kt-table
    :data="tableData" 
    permsEdit = "sys:dict:edit"
    :columns="columns" 
    :showOperation="showOperation" 
    @findPage="findPage"
    @handleEdit="handleEdit"
    @handleDelete="handleDelete"
    >
	</kt-table>
  	<!--新增编辑界面-->
	<locationMangerVue ref="manager" @on-close="$refs.pages.refresh()" :EntityData="currentRow" @findPage="findPage"/>
  </div>
</template>

<script>
import KtTable from "@/views/core/KtTable"
import KtButton from "@/views/core/KtButton"
import { format } from "@/utils/datetime"
import { getDisplayName } from '@/libs/common'
import { CreateLocationDto }   from '@/libs/createDto'
import locationMangerVue from './LocationManger'
import HeaderColumn from '../../core/HeaderColumn.vue'
import ImportButton from '../../core/importButton/ImportButton'
export default {
	components: {
		KtTable,
		KtButton,
		locationMangerVue,
    HeaderColumn,
    ImportButton
	},
	data() {
	return {
	  size: 'small',
	  currentRow: undefined,
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
          minWidth: 150
        },
        {
          title: this.getDisplayName('xType'),
          key: 'xType',
          minWidth: 100,
          items: this.$Enum.WmsLocationType.map5,
          render: (h, params) => {
            return h('span', this.$Enum.WmsLocationType.map5[params.row.xType] || '')
          } 
        },
         {
          title: this.getDisplayName('xStatus'),
          key: 'xStatus',
          minWidth: 100,
          items: this.$Enum.WmsLocation.map1,
          render: (h, params) => {
            return h('span', this.$Enum.WmsLocation.map1[params.row.xStatus] || '')
          }
        },
        {
          title: this.getDisplayName('xRack'),
          key: 'xRack',
          minWidth: 100
        },
        {
          title: this.getDisplayName('xColumn'),
          key: 'xColumn',
          minWidth: 100
        },
        {
          title: this.getDisplayName('xLevel'),
          key: 'xLevel',
          minWidth: 100
        },
        {
          title: this.getDisplayName('xDepth'),
          key: 'xDepth',
          minWidth: 100
        },
        // {
        //   title: this.getDisplayName('lanwayId'),
        //   key: 'lanwayId',
        //   minWidth: 100
        // },
        //  {
        //   title: this.getDisplayName('rackId'),
        //   key: 'rackId',
        //   minWidth: 100
        // },
        {
          title: this.getDisplayName('isLocked'),
          key: 'isLocked',
          minWidth: 100,
          items: this.$Enum.WmsLocation.map2,
          render: (h, params) => {
            return h('span', this.$Enum.WmsLocation.map2[params.row.isLocked] || '')
          }
        },
        {
          title: this.getDisplayName('isLoaded'),
          key: 'isLoaded',
          minWidth: 100,
          items: this.$Enum.WmsLocation.map2,
          render: (h, params) => {
            return h('span', this.$Enum.WmsLocation.map2[params.row.isLoaded] || '')
          }
        },
        {
          title: this.getDisplayName('forbidInbound'),
          key: 'forbidInbound',
          minWidth: 150,
          items: this.$Enum.WmsLocation.map2,
          render: (h, params) => {
            return h('span', this.$Enum.WmsLocation.map2[params.row.forbidInbound] || '')
          }
        },
        {
          title: this.getDisplayName('forbidOutbound'),
          key: 'forbidOutbound',
          minWidth: 150,
          items: this.$Enum.WmsLocation.map2,
          render: (h, params) => {
            return h('span', this.$Enum.WmsLocation.map2[params.row.forbidOutbound] || '')
          }
        },
        {
          title: this.getDisplayName('isCountLocked'),
          key: 'isCountLocked',
          minWidth: 150,
          items: this.$Enum.WmsLocation.map2,
          render: (h, params) => {
            return h('span', this.$Enum.WmsLocation.map2[params.row.isCountLocked] || '')
          }
        },
        {
          title: this.getDisplayName('forbidInboundComments'),
          key: 'forbidInboundComments',
          minWidth: 150,
          items: this.$Enum.WmsLocation.map2,
          render: (h, params) => {
            return h('span', this.$Enum.WmsLocation.map2[params.row.forbidInboundComments] || '')
          }
        },
        {
          title: this.getDisplayName('exceptionComments'),
          key: 'exceptionComments',
          minWidth: 200
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
      return getDisplayName('location', key)[0]
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
      let ret = await this.$http.postAsync("/app/Location/GetList", param)  
            if(ret.data.data.totalCount!=0) {
            this.$message({message: this.$t('querySuccess'), type: 'success'})
            
          } else {
            this.$message({message: this.$t('noDataIsQueried'), type: 'error'})
          }
      this.insideLoading = false 
      this.tableData =ret.data.data
    },
	 // 获取分页数据
	 findPage(data) {
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
	 this.$http.postAsync("/app/Location/GetList",params).then((res) => {
		if(res!=undefined) {
      this.tableData = res.data.data
    }
      })
		},
    // 显示新增界面
		handleAdd: function () {
      this.currentRow = CreateLocationDto()
      this.$refs.manager.dialogVisible = true
	    this.$refs.manager.operation = true
		},
    // 编辑
    handleEdit(params) {
       //console.log(params)
      this.$refs.manager.dialogVisible = true
      this.$refs.manager.operation = false
      this.currentRow = Object.assign({}, params.row)
    },
    // 删除
	  handleDelete: function (data) {
			this.$http.deleteAsync('/app/Location/Delete',data.params[0]).then(data!=null?data.callback:'')
		},
    // 导出
    exportExcelUser () {

    },
    // 导入
    importExcel (array, e) {
       console.log('导入',array, e)
      // this.$http.getAsync('/app/Location/GetCreateManyExcel')
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

<style>

</style>