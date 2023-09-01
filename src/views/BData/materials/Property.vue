<template>
  <div class="page-container">
    <!--工具栏-->
    <div class="toolbar" style="float: left; padding-top:10px; padding-left: 15px;display:flex;flex-direction:row">
    <header-column :columns="columns" highSearch     @on-search='handleSearch'   ></header-column>
 
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

	</div>
    <!--表格内容栏-->
    <kt-table
      :data="tableData"
      :columns="columns" 
      :showOperation="showOperation"
      :loading="insideLoading"
      :showBatchDelete="showBatchDelete"
      @findPage="findPage" 
    >
    </kt-table> 
  </div>
</template>

<script>
import KtTable from "@/views/core/KtTable" 
 import HeaderColumn from '../../core/HeaderColumn.vue'
import { getDisplayName } from '@/libs/common'   
export default {
  components: {
    KtTable, 
    HeaderColumn, 
  },
  data() {
    return {  
      size: 'small',
      lastCondition: undefined,
      currentRow: undefined,
      insideLoading: false,
      showOperation: false,
      showBatchDelete: false,
      queryType: 0,
      insideColumns: [], 
      tableData: {},
      pageRequest: { pageNum: 1, pageSize: 10 },
     columns: [
                {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: this.getDisplayName('materialId'),
          key: 'materialId',
          minWidth: 100,
          items: this.$Enum.TypeOfBill.map3,
     
        },


        {
          title: this.getDisplayName('inboundTime'),
          key: 'inboundTime',
          type: 'daterange',
          minWidth: 150,
          render: (h, params) => {
            return h('span', params.row.inboundTime ? this.$moment(params.row.inboundTime).format('YYYY/MM/DD') : '')
          }
        },
        {
          title: this.getDisplayName('receivedTime'),
          key: 'receivedTime',
          type: 'daterange',
          minWidth: 150,
          render: (h, params) => {
            return h('span', params.row.receivedTime ? this.$moment(params.row.receivedTime).format('YYYY/MM/DD') : '')
          }
        },
        {
          title: this.getDisplayName('productionTime'),
          key: 'productionTime',
          type: 'daterange',
          minWidth: 150,
          render: (h, params) => {
            return h('span', params.row.productionTime ? this.$moment(params.row.productionTime).format('YYYY/MM/DD') : '')
          }
        },
        {
          title: this.getDisplayName('expiredTime'),
          key: 'expiredTime',
          type: 'daterange',
          minWidth: 150,
          render: (h, params) => {
            return h('span', params.row.expiredTime ? this.$moment(params.row.expiredTime).format('YYYY/MM/DD') : '')
          }
        },

        {
          title: this.getDisplayName('qcStartTime'),
          key: 'qcStartTime',
          type: 'daterange',
          minWidth: 150,
          render: (h, params) => {
            return h('span', params.row.qcStartTime ? this.$moment(params.row.qcStartTime).format('YYYY/MM/DD') : '')
          }
        },
        {
          title: this.getDisplayName('preservationDays'),
          key: 'preservationDays',
          noSearch: true,
          minWidth: 160
        },
        {
          title: this.getDisplayName('batchNo'),
          key: 'batchNo',
          minWidth: 150
        },
        {
          title: this.getDisplayName('m_Str1'),
          key: 'm_Str1',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str2'),
          key: 'm_Str2',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str3'),
          key: 'm_Str3',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str4'),
          key: 'm_Str4',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str5'),
          key: 'm_Str5',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str6'),
          key: 'm_Str6',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str7'),
          key: 'm_Str7',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str8'),
          key: 'm_Str8',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str9'),
          key: 'm_Str9',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str10'),
          key: 'm_Str10',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str11'),
          key: 'm_Str11',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str12'),
          key: 'm_Str12',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str13'),
          key: 'm_Str13',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str14'),
          key: 'm_Str14',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str15'),
          key: 'm_Str15',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str16'),
          key: 'm_Str16',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str17'),
          key: 'm_Str17',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str18'),
          key: 'm_Str18',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str19'),
          key: 'm_Str19',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str20'),
          key: 'm_Str20',
          minWidth: 120
        },
                {
          title: this.getDisplayName('m_Str21'),
          key: 'm_Str21',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str22'),
          key: 'm_Str22',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str23'),
          key: 'm_Str23',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str24'),
          key: 'm_Str24',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str25'),
          key: 'm_Str25',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str26'),
          key: 'm_Str26',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str27'),
          key: 'm_Str27',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str28'),
          key: 'm_Str28',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str29'),
          key: 'm_Str29',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str30'),
          key: 'm_Str30',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str31'),
          key: 'm_Str31',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str32'),
          key: 'm_Str32',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str33'),
          key: 'm_Str33',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str34'),
          key: 'm_Str34',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str35'),
          key: 'm_Str35',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str36'),
          key: 'm_Str36',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str37'),
          key: 'm_Str37',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str38'),
          key: 'm_Str38',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str39'),
          key: 'm_Str39',
          minWidth: 120
        },
        {
          title: this.getDisplayName('m_Str40'),
          key: 'm_Str40',
          minWidth: 120
        },
      
      ]

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
      let ret = await this.$http.postAsync("/app/MaterialProperty/GetList", param)  
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
      return getDisplayName('property', key)[0]
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
      this.$http.postAsync("/app/MaterialProperty/GetList", condition).then((res) => {
        if (res.data.result) {
          this.tableData = res.data.data
        }
      });
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
      this.$http.postAsync('/app/MaterialProperty/GetListExcel', params).then((res) => {
        this.$alert(res.data, '导出成功', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
      })
    }
  }
};
</script>
  