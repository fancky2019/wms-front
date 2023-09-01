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
<materialPropertyRuleManager ref="manager" @on-close="$refs.pages.refresh()" :EntityData="currentRow"    @findPage="findPage"/>

  </div>
</template>

<script>
import KtTable from "@/views/core/KtTable"
import KtButton from "@/views/core/KtButton"
import HeaderColumn from '@/views/core/HeaderColumn.vue' 
import { setCustomColumns ,getPropertyDisplayName } from '@/libs/common'
import { CreateMaterialCategoryDto }   from '@/libs/createDto'
import materialPropertyRuleManager from './MaterialPropertyRuleManager'

export default {
  components: {
    KtTable, 
    HeaderColumn,
    KtButton,
    materialPropertyRuleManager
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
      tableData: {},
      pageRequest: { pageNum: 1, pageSize: 10 },
            columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        }, 
      ],
      defaultColumns: [
        {
          title: getPropertyDisplayName('xCode'),
          key: 'xCode',
          minWidth: 150
        },
        {
          title: getPropertyDisplayName('xName'),
          key: 'xName',
          minWidth: 150
        },
        {
          title: getPropertyDisplayName('inboundTime'),
          key: 'inboundTime',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
   
        },
        {
          title:getPropertyDisplayName('receivedTime'),
          key: 'receivedTime',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
    
        },
        {
          title: getPropertyDisplayName('productionTime'),
          key: 'productionTime',
          minWidth: 180,
          items: this.$Enum.MaterialPropertyRuleE.map1,
   
        },
        {
          title: getPropertyDisplayName('expiredTime'),
          key: 'expiredTime',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
      
        },
  
        {
          title: getPropertyDisplayName('qcStartTime'),
          key: 'qcStartTime',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
 
        },
        {
          title: getPropertyDisplayName('preservationDays'),
          key: 'preservationDays',
          minWidth: 180,
          items: this.$Enum.MaterialPropertyRuleE.map1,
    
        },
        {
          title: getPropertyDisplayName('batchNo'),
          key: 'batchNo',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
        },
        {
          title: getPropertyDisplayName('batchNo2'),
          key: 'batchNo2',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
        },
        {
          title: getPropertyDisplayName('batchNo3'),
          key: 'batchNo3',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
        },
        {
          title: getPropertyDisplayName('m_Str1'),
          key: 'm_Str1',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
     
        },
        {
          title:  getPropertyDisplayName('m_Str2'),
          key: 'm_Str2',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
      
        },
        {
          title: getPropertyDisplayName('m_Str3'),
          key: 'm_Str3',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
     
        },
        {
          title:getPropertyDisplayName('m_Str4'),
          key: 'm_Str4',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
   
        },
        {
          title: getPropertyDisplayName('m_Str5'),
          key: 'm_Str5',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,

        },
        {
          title: getPropertyDisplayName('m_Str6'),
          key: 'm_Str6',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
  
        },
        {
          title: getPropertyDisplayName('m_Str7'),
          key: 'm_Str7',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,

        },
        {
          title: getPropertyDisplayName('m_Str8'),
          key: 'm_Str8',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
 
        },
        {
          title:getPropertyDisplayName('m_Str9'),
          key: 'm_Str9',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,

        },
        {
          title: getPropertyDisplayName('m_Str10'),
          key: 'm_Str10',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,

        },
        {
          title: getPropertyDisplayName('m_Str11'),
          key: 'm_Str11',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,

        },
        {
          title: getPropertyDisplayName('m_Str12'),
          key: 'm_Str12',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,

        },
        {
          title:  getPropertyDisplayName('m_Str13'),
          key: 'm_Str13',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,

        },
        {
          title:  getPropertyDisplayName('m_Str14'),
          key: 'm_Str14',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,

        },
        {
          title: getPropertyDisplayName('m_Str15'),
          key: 'm_Str15',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
 
        },
        {
          title: getPropertyDisplayName('m_Str16'),
          key: 'm_Str16',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,

        },
        {
          title: getPropertyDisplayName('m_Str17'),
          key: 'm_Str17',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,

        },
        {
          title: getPropertyDisplayName('m_Str18'),
          key: 'm_Str18',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,

        },
        {
          title: getPropertyDisplayName('m_Str19'),
          key: 'm_Str19',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,

        },
        {
          title: getPropertyDisplayName('m_Str20'),
          key: 'm_Str20',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
 
        },
        {
          title: getPropertyDisplayName('m_Str21'),
          key: 'm_Str21',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
  
        },
        {
          title: getPropertyDisplayName('m_Str22'),
          key: 'm_Str22',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
 
        },
        {
          title:getPropertyDisplayName('m_Str23'),
          key: 'm_Str23',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
   
        },
        {
          title:getPropertyDisplayName('m_Str24'),
          key: 'm_Str24',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
    
        },
        {
          title:getPropertyDisplayName('m_Str25'),
          key: 'm_Str25',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
 
        },
        {
          title:getPropertyDisplayName('m_Str26'),
          key: 'm_Str26',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
  
        },
        {
          title:getPropertyDisplayName('m_Str27'),
          key: 'm_Str27',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
      
        },
        {
          title:getPropertyDisplayName('m_Str28'),
          key: 'm_Str28',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
     
        },
        {
          title: getPropertyDisplayName('m_Str29'),
          key: 'm_Str29',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
       
        },
        {
          title: getPropertyDisplayName('m_Str30'),
          key: 'm_Str30',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
    
        },
        {
          title: getPropertyDisplayName('m_Str31'),
          key: 'm_Str31',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
     
        },
        {
          title: getPropertyDisplayName('m_Str32'),
          key: 'm_Str32',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
    
        },
        {
          title: getPropertyDisplayName('m_Str33'),
          key: 'm_Str33',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
  
        },
        {
          title: getPropertyDisplayName('m_Str34'),
          key: 'm_Str34',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
  
        },
        {
          title: getPropertyDisplayName('m_Str35'),
          key: 'm_Str35',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
     
        },
        {
          title: getPropertyDisplayName('m_Str36'),
          key: 'm_Str36',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
    
        },
        {
          title: getPropertyDisplayName('m_Str37'),
          key: 'm_Str37',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
     
        },
        {
          title: getPropertyDisplayName('m_Str38'),
          key: 'm_Str38',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
     
        },
        {
          title: getPropertyDisplayName('m_Str39'),
          key: 'm_Str39',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
      
        },
        {
          title: getPropertyDisplayName('m_Str40'),
          key: 'm_Str40',
          minWidth: 140,
          items: this.$Enum.MaterialPropertyRuleE.map1,
       
        }
      ]
    };
  },
  methods: {
        // 获取语言
    getPropertyDisplayName (property) {
      return getPropertyDisplayName(property, this.currModel.xCode)
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
      let ret = await this.$http.postAsync("/app/MaterialPropertyRule/GetList", param)  
       //console.log("出来的数据---》",ret )
            if(ret.data.data.totalCount!=0) {
            this.$message({message: '查询成功', type: 'success'})
            
          } else {
            this.$message({message: '未查询到数据', type: 'error'})
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
      let condition = {
        skipCount: pageNumber,
        maxResultCount: this.pageRequest.pageSize,
        sorting: "id desc",
        conditionItems: []
      }
      this.$http.postAsync("/app/MaterialPropertyRule/GetList", condition).then((res) => {
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
			this.$http.deleteAsync('/app/MaterialPropertyRule/Delete',data.params[0]).then(data!=null?data.callback:'')
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
      this.$http.postAsync('/app/MaterialPropertyRule/GetListExcel', params).then((res) => {
        this.$alert(res.data, '导出成功', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
      })
    }
  },
  mounted() {
        // this.$store.dispatch('getPropertyRuleData')
  },
  created () {
    let newColumns = setCustomColumns('materialPropertyRule.default', this.defaultColumns)
     //console.log("表格展示的数据---》",newColumns)
    this.columns.splice(1, 0, ...newColumns)
  }
};
</script>
  