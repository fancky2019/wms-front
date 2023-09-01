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
    @rightClick="rightClick"
    @handleEdit="handleEdit"
    @handleDelete="handleDelete"
    @handleExpandChild="handleExpandChild"
    >
	</kt-table>
  	<!--新增编辑界面-->
	<ApplyShipOrderItem ref="manager"  @on-close="$refs.pages.refresh()" :CurrentEntity="currentRow" @findPage="findPage"/>
  
        
      <!-- 右键菜单 -->
      <right-menu
      :class-index="0"
      :rightclickInfo="rightclickInfo" 
      @editxStatus="editxStatus" 
      ></right-menu>
   <el-dialog title="修改状态" width="20%"  :visible.sync="isShowdialogxStatus">
    <el-form ref="form" :model="currModel" label-width="95px" >
            <el-form-item :label="getDisplayName('xStatus')">
            <el-select v-model="currModel.xStatus" >
              <el-option v-for="(v, k) in $Enum.WmsApplyShipOrder.map1" :key="k" :value="Number(k)" :label="v"></el-option>
            </el-select>
          </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <!-- @click="isShowdialogxStatus = false" -->
    <el-button type="primary" @click.native="submitForm" >确 定</el-button>
  </div>
   </el-dialog>
  </div>
</template>

<script>
import KtTable from "@/views/core/KtTable"
import { format } from "@/utils/datetime"
import { getDisplayName, getPropertyDisplayName1 } from '@/libs/common'
import HeaderColumn from '../../core/HeaderColumn.vue'
import ApplyShipOrderItem from './ApplyShipOrderItem.vue'
import {  CreateApplyShipOrderItemDto }   from '@/libs/createDto'
import rightMenu from '@/views/core/RightMenu.vue'
export default {
	components: {
		KtTable,
    ApplyShipOrderItem,
    HeaderColumn,
    rightMenu
	},
	data() {
	return {
	  size: 'small',
	  currentRow: undefined,
    currModel: CreateApplyShipOrderItemDto(),
    isShowdialogxStatus: false,
    insideLoading: false,
    dataFormRules: {xName: [{ required: true, message: '请输入用户名', trigger: 'blur' }]},
    sonColumns: [
        {
          title:  getPropertyDisplayName1('rowNo'),
          key: 'rowNo',
          minWidth: 80
        },
        {
          title:  getPropertyDisplayName1('thirdPartyRowNo'),
          key: 'thirdPartyRowNo',
          minWidth: 110
        },
        // {
        //   title:  getPropertyDisplayName1('applyShipOrderId'),
        //   key: 'applyShipOrderId',
        //   minWidth: 150
        // },
        {
          title:  getPropertyDisplayName1('xStatus'),
          key: 'xStatus',
          minWidth: 130,
          items: this.$Enum.WmsApplyShipOrder.map1,
          render: (h, params) => {
            return h('span', this.$Enum.WmsApplyShipOrder.map1[params.row.xStatus] || '')
          }
        },
        {
          title:  getPropertyDisplayName1('material'),
          key: 'material',
          minWidth: 150
        },
        {
          title:  getPropertyDisplayName1('batchNo'),
          key: 'batchNo',
          minWidth: 150
        },
        {
          title:  getPropertyDisplayName1('batchNo2'),
          key: 'batchNo2',
          minWidth: 150
        },
        {
          title:  getPropertyDisplayName1('batchNo3'),
          key: 'batchNo3',
          minWidth: 150
        },
        {
          title:  getPropertyDisplayName1('comments'),
          key: 'comments',
          minWidth: 150
        },
        {
          title:  getPropertyDisplayName1('packageUnit'),
          key: 'packageUnit',
          minWidth: 130
        },
        {
          title:  getPropertyDisplayName1('requiredNumber'),
          key: 'requiredNumber',
          minWidth: 110
        },
        {
          title:  getPropertyDisplayName1('requiredUnit'),
          key: 'requiredUnit',
          minWidth: 110
        },
        {
          title:  getPropertyDisplayName1('allocatedNumber'),
          key: 'allocatedNumber',
          minWidth: 110
        },
        {
          title:  getPropertyDisplayName1('pickedNumber'),
          key: 'pickedNumber',
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
          title: this.getDisplayName('billTypeId'),
          key: 'billTypeId',
          minWidth: 150,
          items: this.$store.state.my.billTypeDic,
          render: (h, params) => {
              return h('span', this.$store.state.my.billTypeDic[params.row.billTypeId] || '')
            }
          },
        {
          title: this.getDisplayName('xStatus'),
          key: 'xStatus',
          minWidth: 130,
          items: this.$Enum.WmsApplyShipOrder.map1,
          render: (h, params) => {
            return h('span', this.$Enum.WmsApplyShipOrder.map1[params.row.xStatus] || '')
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
          title: this.getDisplayName('organiztion'),
          key: 'organiztion',
          minWidth: 150,
          items: this.$store.state.my.customerDic,
          render: (h, params) => {
            return h('span', this.$store.state.my.customerDic[params.row.organiztion] || '')
          }
        },
        {
          title: this.getDisplayName('auditStatus'),
          key: 'auditStatus',
          minWidth: 150,
           items: this.$Enum.WmsApplyShipOrder.map2,
          render: (h, params) => {
            return h('span', this.$Enum.WmsApplyShipOrder.map2[params.row.xStatus] || '')
          }
        },
        {
          title: this.getDisplayName('auditorId'),
          key: 'auditorId',
          minWidth: 150
        },
        {
          title: this.getDisplayName('auditTime'),
          key: 'auditTime',
          minWidth: 150
        },
        {
          title: this.getDisplayName('destination'),
          key: 'destination',
          minWidth: 150
        },
        {
          title: this.getDisplayName('comments'),
          key: 'comments',
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
    showOperation:true,
    showExpand:true, //点击主表，下拉展示子表
    rightclickInfo:{}
		}
	},
	methods: {
    // 获取语言
	  getDisplayName (key) {
      return getDisplayName('shipOrderManager', key)[0]
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
      let ret = await this.$http.postAsync("/app/ApplyShipOrder/GetList", param).catch(error=>{})  
          if(ret.data.data.totalCount!=0) {
            this.$message({message: this.$t('查询成功'), type: 'success'})
          } else {
            this.$message({message: this.$t('查询失败'), type: 'error'})
          }
      this.insideLoading = false 
      this.tableData =ret.data.data
    },
    // 右键修改状态
    rightClick(data){
     let row = data.rightclickInfo.row
     let column = data.rightclickInfo.column
     let  event = data.rightclickInfo.event
     this.rightclickInfo = {
       position: {
        x: data.rightclickInfo.x,
        y: data.rightclickInfo.y
       },
       menulists:[
        {
         fnName: "editxStatus",
         params: { row, column,event },
         icoName: "el-icon-edit",
         btnName: "修改状态",
        }
       ]
     }
      event.preventDefault()
    },
    // 编辑状态
    editxStatus(params){
       this.currModel =  Object.assign({}, params.row)
       this.isShowdialogxStatus = true
    },
    // 提交修改状态
    submitForm(){
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$confirm('确认修改申请单状态吗？', '提示',{}).then(() => {
            let condition = {
              id: this.currModel.id,
              xStatus:this.currModel.xStatus
            }
            if (this.currModel.id) {
              let data = res => {
                if (res.data.result) {
                this.$message({message: '更新成功', type: 'success'})
                this.isShowdialogxStatus = false
                this.findPage(null)
                } else {
                this.$message({message: '更新失败, ' + res.msg, type: 'error'})
                this.isShowdialogxStatus = false 
                }
              }
              this.$http.postAsync(`/app/ApplyShipOrder/CancelApplyShipOrder`, condition).then(data!=null?data:'').catch(error=>{}) 
            }
          })
        }
      })
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
	    this.$http.postAsync("/app/ApplyShipOrder/GetList",params).then((res) => {
      if(res!=undefined){
        this.tableData = res.data.data
      }
      })
		},
     handleExpandChild(data){
      let len = data.expandData.applyShipOrderItems.length
      if(len>0) {
         this.$set(data.expandData,"tableExpandData", data.expandData.applyShipOrderItems) 
      }
    },
    // 编辑
    handleEdit(params) {
      this.$refs.manager.dialogVisible = true
      this.$refs.manager.operation = false
      this.currentRow = Object.assign({}, params.row)
    },
        // 删除
	  handleDelete: function (data) {
		  this.$http.deleteAsync('/app/ApplyShipOrder/Delete',data.params[0]).then(data!=null?data.callback:'').catch(error=>{})
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