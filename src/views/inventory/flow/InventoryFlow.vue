<template>
  <div class="page-container">
	<!--工具栏-->
	<div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;display:flex;flex-direction:row">
    <header-column :columns="columns" highSearch     @on-search='handleSearch'   ></header-column>
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
    :showExpand="showExpand" 
    :showOperation="showOperation"
    :loading="insideLoading"
    @findPage="findPage"
    >
	</kt-table>
  </div>
</template>

<script>
import KtTable from "@/views/core/KtTable"
import { format } from "@/utils/datetime"
import { getDisplayName, getPropertyDisplayName1 } from '@/libs/common'
import HeaderColumn from '../../core/HeaderColumn.vue'
export default {
	components: {
		KtTable,
        HeaderColumn
	},
	data() {
	return {
	  size: 'small',
      showOperation: false,
	  currentRow: undefined,
      insideLoading: false,
      dataFormRules: {xName: [{ required: true, message: '请输入用户名', trigger: 'blur' }]},
	  columns: [
		{
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: this.getDisplayName('billCode'),
          key: 'billCode',
          minWidth: 150
        },
        {
          title: this.getDisplayName('materialCode'),
          key: 'materialCode',
          minWidth: 150
        },
        {
          title: this.getDisplayName('materialName'),
          key: 'materialName',
          minWidth: 150
        },
        {
          title: this.getDisplayName('warehouseId'),
          key: 'warehouseId',
          minWidth: 150,
          items: this.$store.state.my.warehouseDic,
          render: (h, params) => {
            return h('span', this.$store.state.my.warehouseDic[params.row.warehouseId] || '')
          }
        },
        {
          title: this.getDisplayName('pallet'),
          key: 'pallet',
          minWidth: 150
        },
        {
          title: this.getDisplayName('billTypeId'),
          key: 'billTypeId',
          minWidth: 150,
          items: this.$store.state.my.billTypeDic,
          render: (h, params) => {
              return h('span', this.$store.state.my.billTypeDic[params.row.billTypeId] || '')
            }
          },
        {
          title: this.getDisplayName('flowType'),
          key: 'flowType',
          minWidth: 150
        },
        {
          title:  this.getDisplayName('fromLocationId'),
          key: 'fromLocationId',
          minWidth: 130
        },
        {
          title: this.getDisplayName('fromLocationCode'),
          key: 'fromLocationCode',
          minWidth: 150
        },
        {
          title: this.getDisplayName('toLocationId'),
          key: 'toLocationId',
          minWidth: 150
        },
        {
          title: this.getDisplayName('toLocationCode'),
          key: 'toLocationCode',
          minWidth: 150
        },
        {
          title: this.getDisplayName('quantity'),
          key: 'quantity',
          minWidth: 150
        },
        {
          title: this.getDisplayName('pkgQuantity'),
          key: 'pkgQuantity',
          minWidth: 150
        },
        {
          title: this.getDisplayName('packageUnit'),
          key: 'packageUnit',
          minWidth: 150
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
          title:  getPropertyDisplayName1('m_Str1'),
          key: 'm_Str1',
          minWidth: 140
        },
        {
          title:   getPropertyDisplayName1('m_Str2'),
          key: 'm_Str2',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str3'),
          key: 'm_Str3',
          minWidth: 140
        },
        {
          title: getPropertyDisplayName1('m_Str4'),
          key: 'm_Str4',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str5'),
          key: 'm_Str5',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str6'),
          key: 'm_Str6',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str7'),
          key: 'm_Str7',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str8'),
          key: 'm_Str8',
          minWidth: 140
        },
        {
          title: getPropertyDisplayName1('m_Str9'),
          key: 'm_Str9',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str10'),
          key: 'm_Str10',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str11'),
          key: 'm_Str11',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str12'),
          key: 'm_Str12',
          minWidth: 140
        },
        {
          title:   getPropertyDisplayName1('m_Str13'),
          key: 'm_Str13',
          minWidth: 140
        },
        {
          title:   getPropertyDisplayName1('m_Str14'),
          key: 'm_Str14',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str15'),
          key: 'm_Str15',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str16'),
          key: 'm_Str16',
          minWidth: 140         
        },
        {
          title:  getPropertyDisplayName1('m_Str17'),
          key: 'm_Str17',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str18'),
          key: 'm_Str18',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str19'),
          key: 'm_Str19',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str20'),
          key: 'm_Str20',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str21'),
          key: 'm_Str21',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str22'),
          key: 'm_Str22',
          minWidth: 140
        },
        {
          title: getPropertyDisplayName1('m_Str23'),
          key: 'm_Str23',
          minWidth: 140
        },
        {
          title: getPropertyDisplayName1('m_Str24'),
          key: 'm_Str24',
          minWidth: 140
        },
        {
          title: getPropertyDisplayName1('m_Str25'),
          key: 'm_Str25',
          minWidth: 140
        },
        {
          title: getPropertyDisplayName1('m_Str26'),
          key: 'm_Str26',
          minWidth: 140
        },
        {
          title: getPropertyDisplayName1('m_Str27'),
          key: 'm_Str27',
          minWidth: 140
        },
        {
          title: getPropertyDisplayName1('m_Str28'),
          key: 'm_Str28',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str29'),
          key: 'm_Str29',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str30'),
          key: 'm_Str30',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str31'),
          key: 'm_Str31',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str32'),
          key: 'm_Str32',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str33'),
          key: 'm_Str33',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str34'),
          key: 'm_Str34',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str35'),
          key: 'm_Str35',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str36'),
          key: 'm_Str36',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str37'),
          key: 'm_Str37',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str38'),
          key: 'm_Str38',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str39'),
          key: 'm_Str39',
          minWidth: 140,
        },
        {
          title:  getPropertyDisplayName1('m_Str40'),
          key: 'm_Str40',
          minWidth: 140
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
      showExpand:false, //点击主表，下拉展示子表
		}
	},
	methods: {
   // 获取语言
	 getDisplayName (key) {
      return getDisplayName('inventoryFlow', key)[0]
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
      let ret = await this.$http.postAsync("/app/InventoryFlow/GetList", param).catch(error=>{})  
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
	    this.$http.postAsync("/app/InventoryFlow/GetList",params).then((res) => {
          if(res!=undefined){
            this.tableData = res.data.data
          }
      })
	},
	// 时间格式化
   	dateFormat: function (row, column, cellValue, index){
        	return format(row[column.property])
     	}
	},

}
</script>

<style scoped>

</style>