<template>
    <el-dialog :title="operation?$t('action.add') : $t('edit')" width="80%"  :visible.sync="dialogVisible" :close-on-click-modal="false" >
    <!-- el-tab 标签分为两类 -->
    <el-form ref="form" :model="currModel" label-width="95px" >
      <el-row>
        <el-col :span="6">
          <el-form-item :label="getDisplayName('xCode')">
            <el-input v-model="currModel.xCode" disabled/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="getDisplayName('xStatus')">
            <el-select v-model="currModel.xStatus" disabled>
              <el-option v-for="item in $store.state.my.billTypes " :key="item.id" :value="item.id" :label="item.xName"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item> 
        <kt-table
        :data="currModel.applyReceiptOrderItems"
        :columns="columns"   
        :loading="insideLoading"  
        :showOperationEdit="showOperationEdit"
        @handleDelete="handleDelete"
        @findPage="findPage"  
        >
        </kt-table> 
      </el-form-item>
    </el-form>
    </el-dialog>
 
</template>
<script> 
import KtTable from "@/views/core/KtTableData"
import { getPropertyDisplayName1, getDisplayName } from '@/libs/common'
import { CreateReceiptOrderDto } from '@/libs/createDto'
 
export default {
  components: {
      KtTable
    },
 
  props: {
    CurrentEntity: Object
  },
  computed: {
    currModel () {
      return this.CurrentEntity   ||  CreateReceiptOrderDto()
    }
  },
  data () {
    return {
      size: 'small',
        lastCondition: undefined,
        currentRow: undefined,
        insideLoading: false,
        showOperation: false, 
        showOperationEdit:false,
        operation: false, // true:新增, false:编辑
        dialogVisible:false,
        queryType: 0,
        insideColumns: [],  
        tableData: {}, 
        pageRequest: { pageNum: 1, pageSize: 10 },
        columns: [
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
    }
  },
  methods: {
          // 删除
          handleDelete: function (data) { 
              this.$http.deleteAsync('/app/ApplyReceiptOrderItem/Delete',data.params[0]).then(data!=null?data.callback:'')
              this.$emit("findReceiprOrder",{pageRequest:this.pageRequest})
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
            this.currModel.applyReceiptOrderItems = res.data.data.items
       
          }
        });
      },
    getDisplayName (key) {
      return getDisplayName('applyReceiptOrderManager', key)[0]
    },
 
 
  }
}
</script>
 
