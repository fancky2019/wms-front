<template>
  <div class="page-container">
	<!--工具栏-->
	<div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;display:flex;flex-direction:row">
    <header-column :columns="columns" highSearch     @on-search='handleSearch'   ></header-column>
     <div style="display:flex;align-items:center;margin-left:10px">
       <kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:dict:add" type="primary" @click="handleAdd" />
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
	<!--表格内容栏 permsEdit = "sys:dict:edit"-->
	<kt-table
    :data="tableData" 
    :sonColumns="sonColumns"
    :columns="columns" 
    permsEdit = "sys:dict:edit"
    permsDelete='sys:dict:delete'
    :showExpand="showExpand" 
    :showOperation="showOperation"
    :loading="insideLoading"
    @findPage="findPage"
    @handleEdit="handleEdit"
    @handleDelete="handleDelete"
    @handleExpandChild="handleExpandChild"
    >
	</kt-table>
  	<!--新增编辑界面-->
	<ShipOrderManger ref="manager" :columns="sonColumns"  @on-close="$refs.pages.refresh()"   :CurrentEntity="currentRow"  @findPage="findPage" />
  </div>
</template>

<script>
import KtTable from "@/views/core/KtTable"
import KtButton from "@/views/core/KtButton"
import { format } from "@/utils/datetime"
import { getDisplayName, getPropertyDisplayName1 } from '@/libs/common'
import { CreateShipOrderDto }   from '@/libs/createDto'
import ShipOrderManger from './ShipOrderManger'
import HeaderColumn from '../../core/HeaderColumn.vue'
export default {
	components: {
		KtTable,
		KtButton,
		ShipOrderManger,
    HeaderColumn
	},
  // 祖父事件
  provide () {
    return {
      findPage: this.findPage
    }
  },
	data() {
	return {
	    size: 'small',
      dialogVisible: false, // 新增编辑界面是否显示
	    currentRow: undefined,
      insideLoading: false,
      showOperation:true,
      tableData: {}, 
      dataFormRules: {xName: [{ required: true, message: '请输入用户名', trigger: 'blur' }]},
      sonColumns: [
        {
          title: getPropertyDisplayName1('rowNo'),
          key: 'rowNo',
          minWidth: 80
        },
        {
          title: getPropertyDisplayName1('thirdPartyRowNo'),
          key: 'thirdPartyRowNo',
          minWidth: 110
        },
        {
          title: getPropertyDisplayName1('xStatus'),
          key: 'xStatus',
          minWidth: 130,
          items: this.$Enum.WmsApplyShipOrder.map1,
          // render: (h, params) => {
          //   return h('span', this.$Enum.WmsApplyShipOrder.map1[xStatus] || '')
          // }
        },
        {
          title: getPropertyDisplayName1('materialId'),
          key: 'material',
          minWidth: 150
        },
        {
          title: getPropertyDisplayName1('batchNo'),
          key: 'batchNo',
          minWidth: 150
        },
        {
          title: getPropertyDisplayName1('batchNo2'),
          key: 'batchNo2',
          minWidth: 150
        },
        {
          title: getPropertyDisplayName1('batchNo3'),
          key: 'batchNo3',
          minWidth: 150
        },
        {
          title: getPropertyDisplayName1('comments'),
          key: 'comments',
          minWidth: 150
        },
        {
          title: getPropertyDisplayName1('packageUnitId'),
          key: 'packageUnit',
          minWidth: 130
        },
        {
          title: getPropertyDisplayName1('pickedNumber'),
          key: 'pickedNumber',
          minWidth: 110
        },
        {
          title: getPropertyDisplayName1('requiredNumber'),
          key: 'requiredNumber',
          minWidth: 110
        },
        {
          title: getPropertyDisplayName1('requiredUnit'),
          key: 'requiredUnit',
          minWidth: 110
        },
        {
          title: getPropertyDisplayName1('allocatedNumber'),
          key: 'allocatedNumber',
          minWidth: 110
        },
        {
          title:  getPropertyDisplayName1('str1'),
          key: 'str1',
          minWidth: 140  
        },
        {
          title:   getPropertyDisplayName1('str2'),
          key: 'str2',
          minWidth: 140             
        },
        {
          title:  getPropertyDisplayName1('str3'),
          key: 'str3',
          minWidth: 140            
        },
        {
          title: getPropertyDisplayName1('str4'),
          key: 'str4',
          minWidth: 140       
        },
        {
          title:  getPropertyDisplayName1('str5'),
          key: 'str5',
          minWidth: 140         
        },
        {
          title:  getPropertyDisplayName1('str6'),
          key: 'str6',
          minWidth: 140      
        },
        {
          title:  getPropertyDisplayName1('str7'),
          key: 'str7',
          minWidth: 140         
        },
        {
          title:  getPropertyDisplayName1('str8'),
          key: 'str8',
          minWidth: 140 
        },
        {
          title: getPropertyDisplayName1('str9'),
          key: 'str9',
          minWidth: 140 
        },
        {
          title:  getPropertyDisplayName1('str10'),
          key: 'str10',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('str11'),
          key: 'str11',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('str12'),
          key: 'str12',
          minWidth: 140
        },
        {
          title:   getPropertyDisplayName1('str13'),
          key: 'str13',
          minWidth: 140
        },
        {
          title:   getPropertyDisplayName1('str14'),
          key: 'str14',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('str15'),
          key: 'str15',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('str16'),
          key: 'str16',
          minWidth: 140         
        },
        {
          title:  getPropertyDisplayName1('str17'),
          key: 'str17',
          minWidth: 140  
        },
        {
          title:  getPropertyDisplayName1('str18'),
          key: 'str18',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('str19'),
          key: 'str19',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('str20'),
          key: 'str20',
          minWidth: 140
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
          minWidth: 150
        },
        {
          title: this.getDisplayName('xStatus'),
          key: 'xStatus',
          minWidth: 130,
          items: this.$Enum.WmsApplyShipOrder.map1,
        },
        {
          title: this.getDisplayName('applyShipOrderCode'),
          key: 'applyShipOrderCode',
          minWidth: 150
        },
        {
          title: this.getDisplayName('billTypeId'),
          key: 'billTypeId',
          minWidth: 150,
          items: this.$store.state.my.shipBillTypeDic,
          render: (h, params) => {
            return h('span', this.$store.state.my.billTypeDic[params.row.billTypeId] || '')
          }
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
          title: this.getDisplayName('expectedPkgQuantity'),
          key: 'expectedPkgQuantity',
          minWidth: 150
        },
        {
          title: this.getDisplayName('alloactedPkgQuantity'),
          key: 'alloactedPkgQuantity',
          minWidth: 150
        },
        {
          title: this.getDisplayName('pickedPkgQuantity'),
          key: 'pickedPkgQuantity',
          minWidth: 150
        },
        {
          title: this.getDisplayName('comments'),
          key: 'comments',
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
      showExpand:true, //点击主表，下拉展示子表
		}
	},
	methods: {
    // 获取语言
	  getDisplayName (key) {
      return getDisplayName('shipOrder', key)[0]
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
        sorting: "id desc"
      } 
      let ret = await this.$http.postAsync("/app/ShipOrder/GetList", param)  
          if(ret.data.data.totalCount!=0) {
            this.$message({message: this.$t('查询成功'), type: 'success'})
          } else {
            this.$message({message: this.$t('查询失败'), type: 'error'})
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
        conditionItems: [],
      }
	    this.$http.postAsync("/app/ShipOrder/GetList",params).then((res) => {
		  if(res!=undefined) {
      this.tableData = res.data.data
      }
      }).catch(error=>{})
		},
    handleExpandChild(data){
      let len = data.expandData.shipOrderItems.length
      if(len>0) {
         this.$set(data.expandData,"tableExpandData", data.expandData.shipOrderItems) 
      }
      // 用于点击单行表格数据时，通过查询带出子表格的数据
      // let condition = {
      //   skipCount: this.pageRequest.pageNum,
      //   maxResultCount: this.pageRequest.pageSize,
      //   sorting: "id desc",
      //   conditionItems: []
      // }
      // 根据实际主表条件查询
      // this.$http.postAsync("/app/ShipOrder/GetList", condition).then((res) => {
      //   if (res.data.result) {
      //     let sontableData = res.data.data
      //    const shipOrderObject = sontableData.items.find(shipOrderObject=>{
      //         return shipOrderObject.id === data.expandData.id
      //     })
      //     // 查询到子表数据后挂在主表上
      //     this.$set(data.expandData,"tableExpandData", shipOrderObject.shipOrderItems) 
      //   }
      // });
    },
    // 显示新增界面
	  handleAdd: function () {
       this.currentRow = CreateShipOrderDto()
       this.$refs.manager.dialogVisible = true
	     this.$refs.manager.operation = true
       this.$refs.manager.disabled =false
		},
    // 编辑
    handleEdit(params) {
      this.$refs.manager.operation = false
      this.$refs.manager.disabled =false
      this.currentRow = Object.assign({}, params.row)
      this.findPage(null)
      if (this.currentRow.xStatus===1) {
          this.$refs.manager.dialogVisible = true
      } else{
        this.$message({message: '该状态无法编辑' , type: 'error'})
      } 
    },
    // 导出
    exportExcelUser() {
    let params = {
        skipCount: 1,
        maxResultCount: 10000,
        sorting: "id desc",
        conditionItems: [],
      }
	    this.$http.postAsync("/app/ShipOrder/GetListExcel",params).catch(error=>{})
    },
    // 删除
	 handleDelete: function (data) {
		  this.$http.deleteAsync('/app/ShipOrder/Delete',data.params[0]).then(data!=null?data.callback:'').catch(error=>{})
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