<template>
  <el-dialog   v-dialogDrag  :append-to-body="true"  :title="operation?$t('action.add') : $t('edit')" width="80%"  :visible.sync="dialogVisible" :before-close="handleClose" :close-on-click-modal="false" >
  <!-- el-tab 标签分为两类 -->
  <el-form  ref="applyReceiptOrderConverter" :model="currModel" label-width="95px" >
    <el-row>
      <el-col :span="6">
        <el-form-item :label="getDisplayName('xCode')" prop="xCode">
          <el-input v-model="currModel.xCode" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getDisplayName('applyReceiptOrderId')" prop="applyReceiptOrderId"> 
              <el-select v-model="currModel.applyReceiptOrderId" @change="applyReceiptSelect"  :remote-method="applyReceiptFilter" 
              :loading="loading" filterable remote>
                <el-option v-for="item in applyReceiptData " :key="item.id" :value="item.id" :label="item.xCode"></el-option>
              </el-select> 

              <!-- <el-select  v-model="currModel.applyReceiptOrderId" @change="applyReceiptSelect" :remote-method="materialFilter"
            :loading="loading" remote filterable >
            <el-option v-for="item in materialData" :value="item.id" :key="item.id" :label="item.xCode">
                {{ item.xCode }} {{ item.xName }} {{ item.spec }} {{ item.barcode }}
            </el-option> 
          </el-select> -->

          </el-form-item>
      </el-col>
    </el-row>
    <el-form-item> 
      <kt-table
      :data="applyReceiptOrderItems"
      :columns="columns"   
      :loading="insideLoading" 
      :showOperation = "showOperation" 
      :showBatchDelete="showBatchDelete" 
      @selectionChange="selectionChange" 
      >
      </kt-table> 
    </el-form-item>
    <div  style= " display:flex ;justify-content: end;  "> 
    <kt-button :size="size" icon="fa fa-plus" :label="$t('action.comfirm')" perms="sys:dict:add" type="primary"  @click="selectionDataConfirm" />
    </div>
  </el-form>
  </el-dialog>
 
</template>
<script> 
 import KtButton from "@/views/core/KtButton"
import KtTable from "@/views/core/KtTableData"
import { getPropertyDisplayName1, getDisplayName } from '@/libs/common'
import { getApplyReceiptData } from '@/api/webapi'

export default {
components: {
    KtTable,
    KtButton
  },

props: {
  CurrentEntity: Object
},
computed: {
  currModel () {
    console.log("编辑出来的数据---》",this.CurrentEntity)
    return this.CurrentEntity ||{xCode:'',applyReceiptOrderCode:''}   
  }
},
data () {
  return {
    applyReceiptData:[],
    applyReceiptOrderItems:[],
    size: 'small',
      lastCondition: undefined,
      currentRow: undefined,
      loading:false,
      insideLoading: false,
      showOperation: false, 
      showBatchDelete:true,
      showOperationEdit:false, 
      operation: false, // true:新增, false:编辑
      dialogVisible:false,
      queryType: 0,
      insideColumns: [],  
      tableData: {}, 
      pageRequest: { pageNum: 1, pageSize: 10 },
      columns: [
        {   
          title:  getPropertyDisplayName1('allocatedNumber'),
            key: 'allocatedNumber',
            minWidth: 150,
            editcol:true 
        },
        {
            title:  getPropertyDisplayName1('rowNo'),
            key: 'rowNo',
            minWidth: 150
          },
          {
            title:  getPropertyDisplayName1('thirdPartyRowNo'),
            key: 'thirdPartyRowNo',
            minWidth: 150
          },
          {
            title:  getPropertyDisplayName1('xStatus'),
            key: 'xStatus',
            minWidth: 150
          },
          {
            title:  getPropertyDisplayName1('materialId'),
            key: 'materialId',
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
            title:  getPropertyDisplayName1('packageUnitId'),
            key: 'packageUnitId',
            minWidth: 150
          },
          {
            title:  getPropertyDisplayName1('expectedNumber'),
            key: 'expectedNumber',
            minWidth: 150
          },
          {
            title:  getPropertyDisplayName1('expectedUnit'),
            key: 'expectedUnit',
            minWidth: 150
          },
          {
            title:  getPropertyDisplayName1('receivedNumber'),
            key: 'receivedNumber',
            minWidth: 150
          },
          {
            title:  getPropertyDisplayName1('receivedUnit'),
            key: 'receivedUnit',
            minWidth: 150
          },
          
        {
          // waitallocatenumber
          title:  getPropertyDisplayName1('waitallocatenumber'),
            key: 'waitallocatenumber',
            minWidth: 150 
        },
          {
            title:  getPropertyDisplayName1('comments'),
            key: 'comments',
            minWidth: 150
          },
          {
          title:  getPropertyDisplayName1('str1'),
          key: 'str1',
          minWidth: 140,
          
    
        },
        {
          title:   getPropertyDisplayName1('str2'),
          key: 'str2',
          minWidth: 140,
          
      
        },
        {
          title:  getPropertyDisplayName1('str3'),
          key: 'str3',
          minWidth: 140,
          
    
        },
        {
          title: getPropertyDisplayName1('str4'),
          key: 'str4',
          minWidth: 140,
          
  
        },
        {
          title:  getPropertyDisplayName1('str5'),
          key: 'str5',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('str6'),
          key: 'str6',
          minWidth: 140,
          
  
        },
        {
          title:  getPropertyDisplayName1('str7'),
          key: 'str7',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('str8'),
          key: 'str8',
          minWidth: 140,
          

        },
        {
          title: getPropertyDisplayName1('str9'),
          key: 'str9',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('str10'),
          key: 'str10',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('str11'),
          key: 'str11',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('str12'),
          key: 'str12',
          minWidth: 140,
          

        },
        {
          title:   getPropertyDisplayName1('str13'),
          key: 'str13',
          minWidth: 140,
          

        },
        {
          title:   getPropertyDisplayName1('str14'),
          key: 'str14',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('str15'),
          key: 'str15',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('str16'),
          key: 'str16',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('str17'),
          key: 'str17',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('str18'),
          key: 'str18',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('str19'),
          key: 'str19',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('str20'),
          key: 'str20',
          minWidth: 140,
          

        },

        {
          title:  getPropertyDisplayName1('m_Str1'),
          key: 'm_Str1',
          minWidth: 140,
          
    
        },
        {
          title:   getPropertyDisplayName1('m_Str2'),
          key: 'm_Str2',
          minWidth: 140,
          
      
        },
        {
          title:  getPropertyDisplayName1('m_Str3'),
          key: 'm_Str3',
          minWidth: 140,
          
    
        },
        {
          title: getPropertyDisplayName1('m_Str4'),
          key: 'm_Str4',
          minWidth: 140,
          
  
        },
        {
          title:  getPropertyDisplayName1('m_Str5'),
          key: 'm_Str5',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('m_Str6'),
          key: 'm_Str6',
          minWidth: 140,
          
  
        },
        {
          title:  getPropertyDisplayName1('m_Str7'),
          key: 'm_Str7',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('m_Str8'),
          key: 'm_Str8',
          minWidth: 140,
          

        },
        {
          title: getPropertyDisplayName1('m_Str9'),
          key: 'm_Str9',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('m_Str10'),
          key: 'm_Str10',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('m_Str11'),
          key: 'm_Str11',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('m_Str12'),
          key: 'm_Str12',
          minWidth: 140,
          

        },
        {
          title:   getPropertyDisplayName1('m_Str13'),
          key: 'm_Str13',
          minWidth: 140,
          

        },
        {
          title:   getPropertyDisplayName1('m_Str14'),
          key: 'm_Str14',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('m_Str15'),
          key: 'm_Str15',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('m_Str16'),
          key: 'm_Str16',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('m_Str17'),
          key: 'm_Str17',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('m_Str18'),
          key: 'm_Str18',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('m_Str19'),
          key: 'm_Str19',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('m_Str20'),
          key: 'm_Str20',
          minWidth: 140,
          

        },
        {
          title:  getPropertyDisplayName1('m_Str21'),
          key: 'm_Str21',
          minWidth: 140,
          
  
        },
        {
          title:  getPropertyDisplayName1('m_Str22'),
          key: 'm_Str22',
          minWidth: 140,
          

        },
        {
          title: getPropertyDisplayName1('m_Str23'),
          key: 'm_Str23',
          minWidth: 140,
          
  
        },
        {
          title: getPropertyDisplayName1('m_Str24'),
          key: 'm_Str24',
          minWidth: 140,
          
    
        },
        {
          title: getPropertyDisplayName1('m_Str25'),
          key: 'm_Str25',
          minWidth: 140,
          

        },
        {
          title: getPropertyDisplayName1('m_Str26'),
          key: 'm_Str26',
          minWidth: 140,
          
  
        },
        {
          title: getPropertyDisplayName1('m_Str27'),
          key: 'm_Str27',
          minWidth: 140,
          
      
        },
        {
          title: getPropertyDisplayName1('m_Str28'),
          key: 'm_Str28',
          minWidth: 140,
          
    
        },
        {
          title:  getPropertyDisplayName1('m_Str29'),
          key: 'm_Str29',
          minWidth: 140,
          
      
        },
        {
          title:  getPropertyDisplayName1('m_Str30'),
          key: 'm_Str30',
          minWidth: 140,
          
    
        },
        {
          title:  getPropertyDisplayName1('m_Str31'),
          key: 'm_Str31',
          minWidth: 140,
          
    
        },
        {
          title:  getPropertyDisplayName1('m_Str32'),
          key: 'm_Str32',
          minWidth: 140,
          
    
        },
        {
          title:  getPropertyDisplayName1('m_Str33'),
          key: 'm_Str33',
          minWidth: 140,
          
  
        },
        {
          title:  getPropertyDisplayName1('m_Str34'),
          key: 'm_Str34',
          minWidth: 140,
          
  
        },
        {
          title:  getPropertyDisplayName1('m_Str35'),
          key: 'm_Str35',
          minWidth: 140,
          
    
        },
        {
          title:  getPropertyDisplayName1('m_Str36'),
          key: 'm_Str36',
          minWidth: 140,
          
    
        },
        {
          title:  getPropertyDisplayName1('m_Str37'),
          key: 'm_Str37',
          minWidth: 140,
          
    
        },
        {
          title:  getPropertyDisplayName1('m_Str38'),
          key: 'm_Str38',
          minWidth: 140,
          
    
        },
        {
          title:  getPropertyDisplayName1('m_Str39'),
          key: 'm_Str39',
          minWidth: 140,
          
      
        },
        {
          title:  getPropertyDisplayName1('m_Str40'),
          key: 'm_Str40',
          minWidth: 140,
          
      
        }
        ], 
      selectionChgData:[],
      addReceiptOrderItemByApplyListDtoList:[]
  }
},
methods: {
    applyReceiptFilter: _.debounce(async function (value) {
      if (!value) return
      let item = this.applyReceiptData.find(x => { return x.xCode === value })
      if (item) return
      this.loading = true
      // 获取所有的申请单
      this.applyReceiptData = await getApplyReceiptData(value)
      this.loading = false
    }, 1000),

 


  handleClose(done){
    this.$refs.applyReceiptOrderConverter.resetFields()
    this.$emit("on-close")
    done()
  },
  selectionDataConfirm(){ 
    console.log("选中的数据出来", this.selectionChgData.length,"this.selectionChgData-->",this.selectionChgData.length)
    if(this.selectionChgData.length==0){
      this.$message({message: '请选择入库数据', type: 'error'})
      return
    }else{
      this.$confirm('确认提交吗？', '提示', {}).then(() => { 
        this.selectionChgData.map(item=>{
          let params = {}
          params.applyReceiptOrderItemId = item.id 
          params.allocatedNumber = item.allocatedNumber
          this.addReceiptOrderItemByApplyListDtoList.push(params) 
        })
        let paramsdata = {
          "addReceiptOrderItemByApplyListDtoList":this.addReceiptOrderItemByApplyListDtoList,
          "receiptOrderId":this.CurrentEntity.id
        }
        
        let data = res => {
            if(res.status) {
              this.$message({message: '新增成功', type: 'success'})  
            } else {
              this.$message({message: '新增失败, ' + res.msg, type: 'error'})
            } 
            this.$refs.applyReceiptOrderConverter.reset()
          }
          this.$http.postAsync('/app/ReceiptOrderItem/AddReceiptOrder', paramsdata).then(data!=null?data:'').catch(error=>{})

      }) 
    }
 },
  selectionChange(row){
      console.log("选中的数据--->",row)
      this.selectionChgData= row.selections
  },
  //收货单明细
  applyReceiptSelect(val ){ 
        let condition = {
          skipCount: 1,
          maxResultCount:10000,
          sorting: "id desc",
          conditionItems: [
            {
              "key": "applyReceiptOrderId",
              "value": String(val),
              "operator": 1
            }
          ]
        }
        this.$http.postAsync("/app/ApplyReceiptOrderItem/GetList", condition).then((res) => { 

          console.log(res,'数据');
          if (res.data.result) { 
            this.applyReceiptOrderItems = res.data.data.items
       
          }
        }); 
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
      this.$http.postAsync("/app/ApplyReceiptOrderItem/GetList", condition).then((res) => { 
        if (res.data.result) { 
          // this.currModel.applyReceiptOrderItems = res.data.data.items
     
        }
      });
    },
  getDisplayName (key) {
    return getDisplayName('applyReceiptOrderManager', key)[0]
  },


}
}
</script>

