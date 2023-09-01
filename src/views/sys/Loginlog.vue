<template>
  <div class="page-container">
    <!--工具栏-->
    <div class="toolbar" style="float: left; padding-top:10px; padding-left: 15px;display:flex;flex-direction:row">
    <header-column :columns="columns" highSearch    @on-search='handleSearch' ></header-column>
    <div style="display:flex;align-items:center;margin-left:10px;">
       <kt-button  icon="fa fa-plus" :label="$t('action.add')" perms="sys:dict:add" type="primary" @click="handleAdd" />
       <kt-button  icon="fa fa-plus" label="下载" perms="sys:dict:add" type="primary" @click="handleDownload" />
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
      :sonColumns="sonColumns"
      :showOperation="showOperation"
      :loading="insideLoading"
      :showBatchDelete="showBatchDelete"
      :showExpand="showExpand" 
      @handleDelete="handleDelete"
      @findPage="findPage"
      @handleEdit="handleEdit"
      @handleExpandChild="handleExpandChild"
      @rightClick="rightClick"
    > 
    </kt-table>
<loginlog-manage-vue ref="manager" @on-close="$refs.pages.refresh()" :EntityData="currentRow"/>
      <!-- 右键菜单 -->
      <right-menu
      :class-index="0"
      :rightclickInfo="rightclickInfo" 
      @look="look" 
      @copy="copy" 
      ></right-menu>
  </div>
</template>

<script>
import KtTable from "@/views/core/KtTable"
import KtButton from "@/views/core/KtButton"
import HeaderColumn from '../core/HeaderColumn.vue'
import { getDisplayName } from '@/libs/common'
import LoginlogManageVue from './LoginlogManage.vue'
import { CreateWarehouseDto }   from '@/libs/createDto' 
import RightMenu from "@/views/core/RightMenu"
export default {
  components: {
    KtTable, 
    HeaderColumn,
    KtButton,
    LoginlogManageVue,
    RightMenu
  },
  data() {
    return {
      rightclickInfo: {},
      size: 'small',
      lastCondition: undefined,
      currentRow: undefined,
      insideLoading: false,
      queryType: 0,
      insideColumns: [], 
      sonColumns: [
        {
          title: this.getDisplayName('xCode'),
          key: 'xCode',
          minWidth: 150
        },
        {
          title: this.getDisplayName('xName'),
          key: 'xName',
          minWidth: 150
        }
      ], 
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
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
          title: this.getDisplayName('xType'),
          key: 'xType',
          minWidth: 150,
          items: this.$store.state.my.basicStrategyDic, 
        },
        {
          title: this.getDisplayName('outIsAuto'),
          key: 'outIsAuto',
          minWidth: 200
        },
        {
          title: this.getDisplayName('inIsAuto'),
          key: 'inIsAuto',
          minWidth: 100
        },
        {
          title: this.getDisplayName('xStatus'),
          key: 'xStatus',
          minWidth: 130
        },
        {
          title: this.getDisplayName('allocatRelationId'),
          key: 'allocatRelationId',
          minWidth: 150,
          items: this.$store.state.my.basicStrategyDic,
          render: (h, params) => {
             //console.log("h,params--->",h,params)
            return h('span', this.$store.state.my.basicStrategyDic[params.row.allocatRelationId] || '')
          }
        },
        {
          title: this.getDisplayName('shipmentRuleId'),
          key: 'shipmentRuleId',
          minWidth: 150,
          items: this.$store.state.my.basicStrategyDic,
          render: (h, params) => {
            return h('span', this.$store.state.my.basicStrategyDic[params.row.shipmentRuleId] || '')
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
          render: (h, params) => {
            return h('span', this.$moment(params.row.creationTime).format('YYYY/MM/DD HH:mm:ss'))
          }
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
          render: (h, params) => {
            return h('span', params.row.lastModificationTime ? this.$moment(params.row.lastModificationTime).format('YYYY/MM/DD HH:mm:ss') : undefined)
          }
        }
      ], 
      tableData: {}, 
      pageRequest: { pageNum: 1, pageSize: 10 },
      showOperation: true, //表格中数据操作
      showBatchDelete: false, //多选
      showExpand:true, //点击主表，下拉展示子表
    };
  },
  methods: {
    rightClick(data) { 
        let  row = data.rightclickInfo.row
        let column= data.rightclickInfo.column
        let event= data.rightclickInfo.event

      this.rightclickInfo = {
        position: {
          x: data.rightclickInfo.x,
          y: data.rightclickInfo.y,
        },
        menulists: [
          {
            fnName: "copy",
            params: { row, column, event },
            icoName: "el-icon-document-copy",
            btnName: "作废", 
          },
          {
            fnName: "look",
            params: { row, column,event },
            icoName: "el-icon-download",
            btnName: "修改供应商",
          },
          // {
          //   fnName: "edit",
          //   params: { row, column, event },
          //   icoName: "el-icon-edit",
          //   btnName: "编辑行数据",
          // },
          // {
          //   fnName: "delete",
          //   params: { row, column, event },
          //   icoName: "el-icon-delete",
          //   btnName: "删除行数据",
          // },
          // {
          //   fnName: "refresh",
          //   params: { row, column, event },
          //   icoName: "el-icon-refresh",
          //   btnName: "刷新页面",
          // },
        ],
      };
      event.preventDefault(); 
    },
    look(params) { 
       //console.log("look" );
    
    },
    copy(params) { 
       //console.log("copy" );
    
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
      let ret = await this.$http.postAsync("/app/Warehouse/GetList", param)  
       //console.log("【搜索结果】出来的数据---》",ret )
      this.insideLoading = false 
      this.tableData =ret.data.data
    },
    // 文字
    getDisplayName (key) {
      return getDisplayName('warehouse', key)[0]
    },
    // 获取分页数据
    findPage: function (data) {
      if (data !== null) {
        this.pageRequest = data.pageRequest;
      }
      let condition = {
        skipCount: this.pageRequest.pageNum,
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
    handleExpandChild(data){
      // 用于点击单行表格数据时，通过查询带出子表格的数据
      let condition = {
        skipCount: this.pageRequest.pageNum,
        maxResultCount: this.pageRequest.pageSize,
        sorting: "id desc",
        conditionItems: []
      }
      // 根据实际主表条件查询
      this.$http.postAsync("/app/Warehouse/GetList", condition).then((res) => {
        if (res.data.result) {
          let sontableData = res.data.data
          // 查询到子表数据后挂在主表上
          this.$set(data.expandData,"tableExpandData", sontableData.items) 
        }
      });
    },
    onSelectChange (row, index) {
       //console.log('2e');
      //console.log(row, index)
    },
    handleDownload(){
      
      this.$http.Export("/app/ReceiptOrder/GetCreateManyExcel")
 
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