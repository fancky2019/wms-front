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
     permsEdit = "sys:dict:edit"
    :sonColumns="sonColumns"
    :columns="columns" 
    :showExpand="showExpand" 
    :showOperation="showOperation"
    :loading="insideLoading"
    @findPage="findPage"
    @rowCurrentRow="rowCurrentRow"
    @handleExpandChild="handleExpandChild"
    >
	</kt-table>
    <!--  -->
    <AchievedItem ref="InventoryItem" @on-close="$refs.pages.refresh()" :CurrentEntity="currentRow"/>
  </div>
</template>

<script>
import KtTable from "@/views/core/KtTable"
import { format } from "@/utils/datetime"
import { getDisplayName } from '@/libs/common'
import HeaderColumn from '../../core/HeaderColumn.vue'
import AchievedItem from './AchievedItem.vue'
export default {
	components: {
		KtTable,
        HeaderColumn,
        AchievedItem
	},
	data() {
	return {
	  size: 'small',
      showOperation: false,
	  currentRow: undefined,
      insideLoading: false,
      dataFormRules: {xName: [{ required: true, message: '请输入用户名', trigger: 'blur' }]},
      sonColumns: [
        {
          title:  this.getDisplayName('material'),
          key: 'material',
          minWidth: 80
        },
        {
          title:  this.getDisplayName('packageUnit'),
          key: 'packageUnit',
          minWidth: 110
        },
        {
          title:  this.getDisplayName('xStatus'),
          key: 'xStatus',
          minWidth: 130,
          items: this.$Enum.WmsInventoryStatus.map2,
          render: (h, params) => {
            return h('span', this.$Enum.WmsInventoryStatus.map2[params.row.xStatus] || '')
          }
        },
        {
          title: this.getDisplayName('qcStatus'),
          key: 'qcStatus',
          minWidth: 150,
          items: this.$Enum.WmsInventoryStatus.map1,
          render: (h, params) => {
            return h('span', this.$Enum.WmsInventoryStatus.map1[params.row.qcStatus] || '')
          }
        },
        {
          title: this.getDisplayName('smallUnitQuantity'),
          key: 'smallUnitQuantity',
          minWidth: 140 
        },
        {
          title:  this.getDisplayName('packageQuantity'),
          key: 'packageQuantity',
          minWidth: 140
        },
        {
          title:  this.getDisplayName('allocatedSmallUnitQuantity'),
          key: 'allocatedSmallUnitQuantity',
          minWidth: 140
        },
        {
          title:   this.getDisplayName('allocatedPackageQuantity'),
          key: 'allocatedPackageQuantity',
          minWidth: 140
        },
         {
          title: this.getDisplayName('isLocked'),
          key: 'isLocked',
          minWidth: 150,
          items: this.$Enum.YesOrNo.map6,
          render: (h, params) => {
            return h('span', this.$Enum.YesOrNo.map6[params.row.isLocked] || '')
          }
        },
        {
          title: this.getDisplayName('isSealed'),
          key: 'isSealed',
          minWidth: 150,
          items: this.$Enum.YesOrNo.map6,
          render: (h, params) => {
            return h('span', this.$Enum.YesOrNo.map6[params.row.isSealed] || '')
          }
        },
        {
          title: this.getDisplayName('isScattered'),
          key: 'isScattered',
          minWidth: 150,
          items: this.$Enum.YesOrNo.map6,
          render: (h, params) => {
            return h('span', this.$Enum.YesOrNo.map6[params.row.isScattered] || '')
          }
        },
        {
          title: this.getDisplayName('isExpired'),
          key: 'isExpired',
          minWidth: 150,
          items: this.$Enum.YesOrNo.map6,
          render: (h, params) => {
            return h('span', this.$Enum.YesOrNo.map6[params.row.isExpired] || '')
          }
        },
        {
          title:  this.getDisplayName('expiredTime'),
          key: 'expiredTime',
          minWidth: 140
        },
        {
          title: this.getDisplayName('comments'),
          key: 'comments',
          minWidth: 140
        },
        {
          title:  this.getDisplayName('str1'),
          key: 'str1',
          minWidth: 140
        },
        {
          title:  this.getDisplayName('str2'),
          key: 'str2',
          minWidth: 140
        },
        {
          title:  this.getDisplayName('str3'),
          key: 'str3',
          minWidth: 140
        },
        {
          title:  this.getDisplayName('str4'),
          key: 'str4',
          minWidth: 140
        },
        {
          title: this.getDisplayName('str5'),
          key: 'str5',
          minWidth: 140
        }
      ],
	  columns: [
		{
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: this.getDisplayName('whid'),
          key: 'whid',
          minWidth: 150,
          items: this.$store.state.my.warehouseDic,
          render: (h, params) => {
            return h('span', this.$store.state.my.warehouseDic[params.row.whid] || '')
          }
        },
        {
          title: this.getDisplayName('locationId'),
          key: 'locationId',
          minWidth: 150,
          items: this.$store.state.my.locationDic,
          render: (h, params) => {
              return h('span', this.$store.state.my.locationDic[params.row.locationId] || '')
            }
        },
        {
          title: this.getDisplayName('pallet'),
          key: 'pallet',
          minWidth: 150
        },
        {
          title:  this.getDisplayName('xStatus'),
          key: 'xStatus',
          minWidth: 130,
          items: this.$Enum.WmsInventoryStatus.map2,
          render: (h, params) => {
            return h('span', this.$Enum.WmsInventoryStatus.map2[params.row.xStatus] || '')
          }
        },
        {
          title: this.getDisplayName('qcStatus'),
          key: 'qcStatus',
          minWidth: 150,
          items: this.$Enum.WmsInventoryStatus.map1,
          render: (h, params) => {
            return h('span', this.$Enum.WmsInventoryStatus.map1[params.row.qcStatus] || '')
          }
        },
        {
          title: this.getDisplayName('isLocked'),
          key: 'isLocked',
          minWidth: 150,
          items: this.$Enum.YesOrNo.map6,
          render: (h, params) => {
            return h('span', this.$Enum.YesOrNo.map6[params.row.isLocked] || '')
          }
        },
        {
          title: this.getDisplayName('isSealed'),
          key: 'isSealed',
          minWidth: 150,
          items: this.$Enum.YesOrNo.map6,
          render: (h, params) => {
            return h('span', this.$Enum.YesOrNo.map6[params.row.isSealed] || '')
          }
        },
        {
          title: this.getDisplayName('isScattered'),
          key: 'isScattered',
          minWidth: 150,
          items: this.$Enum.YesOrNo.map6,
          render: (h, params) => {
            return h('span', this.$Enum.YesOrNo.map6[params.row.isScattered] || '')
          }
        },
        {
          title: this.getDisplayName('isExpired'),
          key: 'isExpired',
          minWidth: 150,
          items: this.$Enum.YesOrNo.map6,
          render: (h, params) => {
            return h('span', this.$Enum.YesOrNo.map6[params.row.isExpired] || '')
          }
        },
        {
          title: this.getDisplayName('comments'),
          key: 'comments',
          minWidth: 150
        },
        {
          title: this.getDisplayName('weight'),
          key: 'weight',
          minWidth: 150
        },
         {
          title: this.getDisplayName('length'),
          key: 'length',
          minWidth: 150
        },
        {
          title: this.getDisplayName('width'),
          key: 'width',
          minWidth: 150
        },
        {
          title: this.getDisplayName('height'),
          key: 'height',
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
      showExpand:true, //点击主表，下拉展示子表
		}
	},
	methods: {
   // 获取语言
	 getDisplayName (key) {
      return getDisplayName('inventoryAchieved', key)[0]
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
      let ret = await this.$http.postAsync("/app/InventoryAchieved/GetList", param).catch(error=>{})  
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
	    this.$http.postAsync("/app/InventoryAchieved/GetList",params).then((res) => {
          if(res!=undefined){
            this.tableData = res.data.data
          }
      })
	},
    rowCurrentRow(row){
      this.$refs.InventoryItem.dialogVisible = true
      this.$refs.InventoryItem.operation = false
      this.currentRow = row.index
    },
     handleExpandChild(data){
      // 用于点击单行表格数据时，通过查询带出子表格的数据
      let len = data.expandData.inventoryItemAchieveds.length
      if(len>0) {
         this.$set(data.expandData,"tableExpandData", data.expandData.inventoryItemAchieveds) 
      }
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