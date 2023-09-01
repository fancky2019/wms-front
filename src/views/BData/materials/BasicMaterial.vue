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
    <BasicMaterialManager ref="manager" @on-close="$refs.pages.refresh()" :CurrentEntity="currentRow"     @findPage="findPage"/>

  </div>
</template>

<script>
import KtTable from "@/views/core/KtTable"
import KtButton from "@/views/core/KtButton"
 import HeaderColumn from '../../core/HeaderColumn.vue'
import { getDisplayName } from '@/libs/common' 
import BasicMaterialManager from './BasicMaterialManagers.vue'
import { CreateMaterialDto }   from '@/libs/createDto'
export default {
  components: {
    KtTable, 
    HeaderColumn,
    KtButton,
    BasicMaterialManager
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
        {
          title: this.getDisplayName('xCode'),
          key: 'xCode',
          minWidth: 250
        },
        {
          title: this.getDisplayName('xName'),
          key: 'xName',
          minWidth: 300,
          editable: true
        },
        {
          title: this.getDisplayName('materialCategoryId'),
          key: 'materialCategoryId',
          minWidth: 150,
          items: this.$store.state.my.materialCategoryDic, 
          render: (h, params) => {
            return h('span', this.$store.state.my.materialCategoryDic[params.row.materialCategoryId] || '')
          }
        },
        {
          title: this.getDisplayName('shortName'),
          key: 'shortName',
          minWidth: 300
        }, 
        {
          title: this.getDisplayName('barcode'),
          key: 'barcode',
          minWidth: 250
        },
        {
          title: this.getDisplayName('mnemonicCode'),
          key: 'mnemonicCode',
          minWidth: 150
        },
        {
          title: this.getDisplayName('upper'),
          key: 'upper',
          noSearch: true,
          minWidth: 100
        },
        {
          title: this.getDisplayName('lower'),
          key: 'lower',
          noSearch: true,
          minWidth: 100
        },
        {
          title: this.getDisplayName('spec'),
          key: 'spec',
          minWidth: 200
        },
        {
          title: this.getDisplayName('days'),
          key: 'days',
          noSearch: true,
          minWidth: 150
        },
        {
          title: this.getDisplayName('smallestUnit'),
          key: 'smallestUnit',
          minWidth: 100
        },
        {
          title: this.getDisplayName('comments'),
          key: 'comments',
          minWidth: 120
        },
        {
          title: this.getDisplayName('isForbidden'),
          key: 'isForbidden',
          minWidth: 150,
          switch:true, //用于开启选择按钮的，下面是按钮的两种状态
          inactSwitch:'禁用',
          actSwitch:'启用',
          items: this.$Enum.YesOrNo.map3,
          render: (h, params) => {
            return h('div', [
              h('i-switch', {
                props: {
                  size: 'large',
                  value: params.row.isForbidden,
                  'true-value': 'Y',
                  'false-value': 'N'
                },
                on: {
                  'on-change': (value) => {
                    this.update(params.row.id, { isForbidden: value })
                  }
                }
              }, [
                h('span', {
                  slot: 'open',
                  domProps: { innerHTML: this.$t('yes') }
                }),
                h('span', {
                  slot: 'close',
                  domProps: { innerHTML: this.$t('no') }
                })
              ])
            ])
          }
        },
        {
          title: this.getDisplayName('forbiddenComments'),
          key: 'forbiddenComments',
          minWidth: 180
        },
        {
            title: '禁用人',
            key: 'forbiddenUserId',
            minWidth: 100
        },  
        {
          title: this.getDisplayName('str1'),
          key: 'str1',
          minWidth: 150
        },
        {
          title: this.getDisplayName('str2'),
          key: 'str2',
          minWidth: 150
        },
        {
          title: this.getDisplayName('str3'),
          key: 'str3',
          minWidth: 150
        },
        {
          title: this.getDisplayName('str4'),
          key: 'str4',
          minWidth: 150
        },
        {
          title: this.getDisplayName('str5'),
          key: 'str5',
          minWidth: 150
        },
        {
          title: this.getDisplayName('str6'),
          key: 'str6',
          minWidth: 150
        },
        {
          title: this.getDisplayName('str7'),
          key: 'str7',
          minWidth: 150
        },
        {
          title: this.getDisplayName('str8'),
          key: 'str8',
          minWidth: 150
        },
        {
          title: this.getDisplayName('str9'),
          key: 'str9',
          minWidth: 150
        },
        {
          title: this.getDisplayName('str10'),
          key: 'str10',
          minWidth: 150
        },
      
        {
          title: this.getDisplayName('str11'),
          key: 'str11',
          minWidth: 150
        },
        {
          title: this.getDisplayName('str12'),
          key: 'str12',
          minWidth: 150
        },
        {
          title: this.getDisplayName('str13'),
          key: 'str13',
          minWidth: 150
        },
        {
          title: this.getDisplayName('str14'),
          key: 'str14',
          minWidth: 150
        },
        {
          title: this.getDisplayName('str15'),
          key: 'str15',
          minWidth: 150
        },
        {
          title: this.getDisplayName('str16'),
          key: 'str16',
          minWidth: 150
        },
        {
          title: this.getDisplayName('str17'),
          key: 'str17',
          minWidth: 150
        },
        {
          title: this.getDisplayName('str18'),
          key: 'str18',
          minWidth: 150
        },
        {
          title: this.getDisplayName('str19'),
          key: 'str19',
          minWidth: 150
        },
        {
          title: this.getDisplayName('str20'),
          key: 'str20',
          minWidth: 150
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
      let ret = await this.$http.postAsync("/app/Material/GetList", param)  
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
      return getDisplayName('material', key)[0]
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
      this.$http.postAsync("/app/Material/GetList", condition).then((res) => {
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
      this.currentRow = CreateMaterialDto()
      this.$refs.manager.dialogVisible = true
			this.$refs.manager.operation = true
    },
    // 编辑
   async handleEdit(params) { 
      this.$refs.manager.dialogVisible = true
      this.$refs.manager.operation = false
      this.currentRow = Object.assign({}, params.row)
 
    },
    // 删除
	  handleDelete: function (data) { 
			this.$http.deleteAsync('/app/Material/Delete',data.params[0]).then(data!=null?data.callback:'')
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
      this.$http.postAsync('/app/Material/GetListExcel', params).then((res) => {
        this.$alert(res.data, '导出成功', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
      })
    }, 

  },
  mounted () {
    this.$store.dispatch('getPropertyRuleData')
    this.$store.dispatch('getMaterialCategoryData')
  }
};
</script>
  