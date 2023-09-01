<template>
<el-dialog  v-dialogDrag :title="$t('applyShipOrder')" :before-close="handleClose" :append-to-body="true" width="80%"  :visible.sync="dialogVisible" :close-on-click-modal="false" >
    <!--表格内容栏-->
    <el-form  ref="applyShipOrderConverter" :model="currModel" label-width="95px">
      <el-row>
      <el-col :span="6">
        <el-form-item :label="getDisplayName('xCode')">
          <el-input v-model="currModel.xCode" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getDisplayName('applyShipOrderId')" prop="applyShipOrderId"> 
              <el-select v-model="currModel.applyShipOrderId" @change="applyShipOrderSelect"  :remote-method="applyShiptFilter" 
              :loading="loading" filterable remote>
                <el-option v-for="item in applyShipOrderData " :key="item.id" :value="item.id" :label="item.xCode"></el-option>
              </el-select> 
          </el-form-item>
      </el-col>
    </el-row>
    
    <el-form-item> 
    <kt-table
      :data="applyShipOrderItems"
      :columns="columns"
      :loading="insideLoading"  
      :showBatchDelete="showBatchDelete"
      :showOperation="showOperation"
      @selectionChange="selectionChange"  
    >
    </kt-table>
    </el-form-item>
    <div  style= " display:flex ;justify-content: end;  "> 
    <kt-button :size="size" icon="fa fa-plus" :label="$t('action.comfirm')" perms="sys:dict:add" type="primary"  @click="SubmitApplications" />
    </div>
    </el-form>
      </el-dialog>
</template>
<script>
import KtTable from "@/views/core/KtTableData"
import KtButton from "@/views/core/KtButton"
import { getDisplayName,  getPropertyDisplayName1 } from '@/libs/common'
import {  getApplyShipOrderData }   from '@/api/webapi'
export default {
  props: {
    CurrentEntity: Object, 
  },
  components: {
    KtTable,
    KtButton 
  },
  computed: {
    currModel () {
      console.log("编辑出来的数据---》",this.CurrentEntity) 
      return this.CurrentEntity   || {xCode:'',applyShipOrderCode:''}
    },
  },
  data() {
    return {  
      size: 'small',
      applyShipOrderData:[],
      applyShipOrderItems:[],
      selectionCheckData:[],
      dialogVisible: false, // 新增编辑界面是否显示
      lastCondition: undefined,
      currentRow: undefined,
      showOperation: false, 
      showBatchDelete:true,
      insideLoading: false,
      loading:false,
      queryType: 0,
      pageRequest: { pageNum: 1, pageSize: 10 },
      columns:[
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
      ] 
    };
  },
  methods: {
    getDisplayName (key) {
      return getDisplayName('applyShipOrder', key)[0]
    },
    handleClose(done){
     this.$refs.applyShipOrderConverter.resetFields()
     this.$emit("on-close")
     done()
    },
    applyShiptFilter: _.debounce(async function (value) {
        if (!value) return
        // 根据输入过滤内容
         let item = this.applyShipOrderData.find(x => { return x.xCode === value })
         if (item) return
        this.loading = true
        // 获取所有的申请单
        this.applyShipOrderData = await getApplyShipOrderData(value)       
        this.loading = false
    }, 1000),
    // 获取分页数据
    //  findPage: function (data) {
    //   console.log(data, '获取所有发货单数据');
    //   if (data !== null) {
    //     this.pageRequest = data.pageRequest;
    //   }
    //   let condition = {
    //     skipCount: this.pageRequest.pageNum,
    //     maxResultCount: this.pageRequest.pageSize,
    //     sorting: "id desc",
    //     conditionItems: []
    //   }
    //   this.$http.postAsync("/app/ApplyShipOrderItem/GetList", condition).then((res) => { 
    //     console.log(res, '获取所有发货单数据');
    //     if (res.data.result) { 
    //       // this.applyShipOrderItems = res.data.data.items
    //     }
    //   });
    // },
    // 获取发货单明细
    applyShipOrderSelect(val){
      console.log(val, '获取发货单明细');
        let condition = {
          skipCount: 1,
          maxResultCount:10000,
          sorting: "id desc",
          conditionItems: [
            {
              "key": "applyShipOrderId",
              "value": String(val),
              "operator": 1
            }
          ]
        }
      this.$http.postAsync("/app/ApplyShipOrderItem/GetList", condition).then(res=>{
         console.log(res,'数据')
         if (res.data.result) {
           this.applyShipOrderItems = res.data.data.items
         }
      })
    },
    // 获取勾选的数据
    selectionChange(row){
      // console.log("选中的数据--->",row)
      this.selectionCheckData = row.selections
    },
    // 提交申请
    SubmitApplications(){
     console.log("数据提交--》",this.selectionCheckData)
     this.$confirm('确认提交吗？', '提交' , {}).then(() => {
        this.selectionCheckData.map(item => {
          console.log(item)
          let params = Object.assign({},item)
          console.log(params)
          console.log(this.CurrentEntity,'数据12312313')
          let Obj = {
            shipOrderId: this.CurrentEntity.id,
            allocatedNumber:  params.allocatedNumber==null ? 0 : params.allocatedNumber,
            applyShipOrderItemId: params.applyShipOrderId
          }
          let condition = []
          condition.push(Obj)
          console.log(condition)
          let data = res => {
          if(res.status) {
            this.$message({message: '新增成功', type: 'success'}) 
        
          } else {
            this.$message({message: '新增失败, ' + res.msg, type: 'error'})
          }
           this.$refs.applyShipOrderConverter.reset()
        }
          this.$http.postAsync('/app/ShipOrderItem/AddShipOrderItemByApplyShipOrderItem', condition).then(data!=null?data:'').catch(error=>{})
          this.dialogVisible = false
        })
     }) 
    },
  }, 
};
</script>
  