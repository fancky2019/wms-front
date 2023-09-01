<template>
<el-dialog :title="operation?$t('action.add') : $t('edit')" width="80%"  :visible.sync="dialogVisible" :close-on-click-modal="false" >
    <el-tabs value="tab1" type="card" :animated="false">
    <el-tab-pane :label="$t('basicMessage')" name="tab1">
<el-form ref="form" :model="currModel" label-width="95px" >
      <el-row>
        <el-col :span="6">
          <el-form-item :label="getDisplayName('xCode')">
            <el-input v-model="currModel.xCode" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="getDisplayName('xStatus')">
            <el-select v-model="currModel.xStatus" style="width:100%">
              <el-option v-for="(v, k) in $Enum.WmsApplyShipOrder.map1" :key="k" :value="Number(k)" :label="v"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" >
            <el-form-item :label="getDisplayName('whid')" prop="whid">
               <el-select v-model="currModel.whid" filterable    :placeholder="$t('pleaseChoose')" style="width:100%">
                 <el-option v-for="item in $store.state.my.warehouses" :key="item.id" :value="item.id" :label="item.xName"></el-option>
              </el-select>
			</el-form-item>
          </el-col>
         <el-col :span="6" >
            <el-form-item :label="getDisplayName('billTypeId')" prop="billTypeId">
              <el-select v-model="currModel.billTypeId" filterable  style="width:100%">
                <el-option v-for="item in $store.state.my.billTypes" :key="item.id" :value="item.id" :label="item.xName"></el-option>
              </el-select>
            </el-form-item>
          </el-col> 
      </el-row>
       <el-row>
        <el-col :span="6">
          <el-form-item :label="getDisplayName('dockId')">
              <el-select v-model="currModel.dockId" filterable  style="width:100%">
                <el-option v-for="item in $store.state.my.locations.filter(x => x.xType=='3')" :key="item.id" :value="item.id" :label="item.xName"></el-option>
              </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="getDisplayName('destination')">
            <el-input v-model="currModel.destination" />
          </el-form-item>
        </el-col>
         <el-col :span="6" >
            <el-form-item :label="getDisplayName('comments')" prop="comments">
                  <el-input v-model="currModel.comments" />
            </el-form-item>
          </el-col> 
        <el-col :span="6" >
            <el-form-item :label="getDisplayName('isOutBoundWork')" prop="isOutBoundWork">
               <el-input v-model="currModel.isOutBoundWork" />
			</el-form-item>
          </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item :label="getDisplayName('str1')">
            <el-input v-model="currModel.str1" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="getDisplayName('str2')">
            <el-input v-model="currModel.str2" />
          </el-form-item>
        </el-col>
        <el-col :span="6" >
            <el-form-item :label="getDisplayName('str3')" prop="str3">
               <el-input v-model="currModel.str3" />
			</el-form-item>
          </el-col>
         <el-col :span="6" >
            <el-form-item :label="getDisplayName('str4')" prop="str4">
                  <el-input v-model="currModel.str4" />
            </el-form-item>
          </el-col> 
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item :label="getDisplayName('str5')">
            <el-input v-model="currModel.str5" />
          </el-form-item>
        </el-col>
      </el-row>
              <el-row>
      <el-col :span="8" style="margin-left:90px">
           <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
           <el-button :size="size" @click.native="dialogVisible = false">{{$t('action.cancel')}}</el-button>
      </el-col>
        </el-row>
    </el-form>
     </el-tab-pane>
          <el-tab-pane :label="$t('CountOrderItem')" name="tab2">
    <CountOrderItem  :columns="columns"  :CurrentEntity="currModel" :currModelID="currModel.id" />
	</el-tab-pane> 
       </el-tabs>
      </el-dialog>
</template>
<script>
import { getDisplayName } from '@/libs/common'
import {  CreateCountDetailDto }   from '@/libs/createDto'
import CountOrderItem from './CountOrderItem'
export default {
    props: {
    columns: Array,
    CurrentEntity: Object
  },
  components: {
    CountOrderItem
  },
  computed: {
    currModel () { 
      return this.CurrentEntity   || CreateCountDetailDto()
    },
  },
  data() {
    return {  
      size: 'small',
      editLoading: false,
      operation: false, // true:新增, false:编辑
      dialogVisible: false, // 新增编辑界面是否显示
      lastCondition: undefined,
      currentRow: undefined,
      pageRequest: { pageNum: 1, pageSize: 10 },
    //   columns:[
    //     {
    //       title:  getPropertyDisplayName1('rowNo'),
    //       key: 'rowNo',
    //       minWidth: 80
    //     },
    //     {
    //       title:  getPropertyDisplayName1('thirdPartyRowNo'),
    //       key: 'thirdPartyRowNo',
    //       minWidth: 110
    //     },
    //     // {
    //     //   title:  getPropertyDisplayName1('applyShipOrderId'),
    //     //   key: 'applyShipOrderId',
    //     //   minWidth: 150
    //     // },
    //     {
    //       title:  getPropertyDisplayName1('xStatus'),
    //       key: 'xStatus',
    //       minWidth: 130,
    //       items: this.$Enum.WmsApplyShipOrder.map1,
    //       render: (h, params) => {
    //         return h('span', this.$Enum.WmsApplyShipOrder.map1[params.row.xStatus] || '')
    //       }
    //     },
    //     // {
    //     //   title:  getPropertyDisplayName1('material'),
    //     //   key: 'material',
    //     //   minWidth: 150
    //     // },
    //     {
    //       title: getPropertyDisplayName1('materialId'),
    //       key: 'materialId',
    //       minWidth: 150,
    //       items: this.$store.state.my.BasisMaterialDic,
    //       render: (h, params) => {
    //         return h('span', this.$store.state.my.BasisMaterialDic[params.row.materialId] || '')
    //       }
    //     },
    //     {
    //       title:  getPropertyDisplayName1('batchNo'),
    //       key: 'batchNo',
    //       minWidth: 150
    //     },
    //     {
    //       title:  getPropertyDisplayName1('batchNo2'),
    //       key: 'batchNo2',
    //       minWidth: 150
    //     },
    //     {
    //       title:  getPropertyDisplayName1('batchNo3'),
    //       key: 'batchNo3',
    //       minWidth: 150
    //     },
    //     {
    //       title:  getPropertyDisplayName1('comments'),
    //       key: 'comments',
    //       minWidth: 150
    //     },
    //     // {
    //     //   title:  getPropertyDisplayName1('packageUnit'),
    //     //   key: 'packageUnit',
    //     //   minWidth: 130
    //     // },
    //     {
    //       title: getPropertyDisplayName1('packageUnitId'),
    //       key: 'packageUnitId',
    //       minWidth: 130,
    //       items: this.$store.state.my.PackageUnitDic,
    //       render: (h, params) => {
    //         return h('span', this.$store.state.my.PackageUnitDic[params.row.packageUnitId] || '')
    //       }
    //     },
    //     {
    //       title:  getPropertyDisplayName1('requiredNumber'),
    //       key: 'requiredNumber',
    //       minWidth: 110
    //     },
    //     {
    //       title:  getPropertyDisplayName1('requiredUnit'),
    //       key: 'requiredUnit',
    //       minWidth: 110
    //     },
    //     {
    //       title:  getPropertyDisplayName1('allocatedNumber'),
    //       key: 'allocatedNumber',
    //       minWidth: 110
    //     },
    //     {
    //       title:  getPropertyDisplayName1('pickedNumber'),
    //       key: 'pickedNumber',
    //       minWidth: 110
    //     },
    //      {
    //       title:  getPropertyDisplayName1('str1'),
    //       key: 'str1',
    //       minWidth: 140  
    //     },
    //     {
    //       title:   getPropertyDisplayName1('str2'),
    //       key: 'str2',
    //       minWidth: 140             
    //     },
    //     {
    //       title:  getPropertyDisplayName1('str3'),
    //       key: 'str3',
    //       minWidth: 140            
    //     },
    //     {
    //       title: getPropertyDisplayName1('str4'),
    //       key: 'str4',
    //       minWidth: 140       
    //     },
    //     {
    //       title:  getPropertyDisplayName1('str5'),
    //       key: 'str5',
    //       minWidth: 140         
    //     },
    //     {
    //       title:  getPropertyDisplayName1('str6'),
    //       key: 'str6',
    //       minWidth: 140      
    //     },
    //     {
    //       title:  getPropertyDisplayName1('str7'),
    //       key: 'str7',
    //       minWidth: 140         
    //     },
    //     {
    //       title:  getPropertyDisplayName1('str8'),
    //       key: 'str8',
    //       minWidth: 140 
    //     },
    //     {
    //       title: getPropertyDisplayName1('str9'),
    //       key: 'str9',
    //       minWidth: 140 
    //     },
    //     {
    //       title:  getPropertyDisplayName1('str10'),
    //       key: 'str10',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('str11'),
    //       key: 'str11',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('str12'),
    //       key: 'str12',
    //       minWidth: 140
    //     },
    //     {
    //       title:   getPropertyDisplayName1('str13'),
    //       key: 'str13',
    //       minWidth: 140
    //     },
    //     {
    //       title:   getPropertyDisplayName1('str14'),
    //       key: 'str14',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('str15'),
    //       key: 'str15',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('str16'),
    //       key: 'str16',
    //       minWidth: 140         
    //     },
    //     {
    //       title:  getPropertyDisplayName1('str17'),
    //       key: 'str17',
    //       minWidth: 140  
    //     },
    //     {
    //       title:  getPropertyDisplayName1('str18'),
    //       key: 'str18',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('str19'),
    //       key: 'str19',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('str20'),
    //       key: 'str20',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('m_Str1'),
    //       key: 'm_Str1',
    //       minWidth: 140
    //     },
    //     {
    //       title:   getPropertyDisplayName1('m_Str2'),
    //       key: 'm_Str2',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('m_Str3'),
    //       key: 'm_Str3',
    //       minWidth: 140
    //     },
    //     {
    //       title: getPropertyDisplayName1('m_Str4'),
    //       key: 'm_Str4',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('m_Str5'),
    //       key: 'm_Str5',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('m_Str6'),
    //       key: 'm_Str6',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('m_Str7'),
    //       key: 'm_Str7',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('m_Str8'),
    //       key: 'm_Str8',
    //       minWidth: 140
    //     },
    //     {
    //       title: getPropertyDisplayName1('m_Str9'),
    //       key: 'm_Str9',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('m_Str10'),
    //       key: 'm_Str10',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('m_Str11'),
    //       key: 'm_Str11',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('m_Str12'),
    //       key: 'm_Str12',
    //       minWidth: 140
    //     },
    //     {
    //       title:   getPropertyDisplayName1('m_Str13'),
    //       key: 'm_Str13',
    //       minWidth: 140
    //     },
    //     {
    //       title:   getPropertyDisplayName1('m_Str14'),
    //       key: 'm_Str14',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('m_Str15'),
    //       key: 'm_Str15',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('m_Str16'),
    //       key: 'm_Str16',
    //       minWidth: 140         
    //     },
    //     {
    //       title:  getPropertyDisplayName1('m_Str17'),
    //       key: 'm_Str17',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('m_Str18'),
    //       key: 'm_Str18',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('m_Str19'),
    //       key: 'm_Str19',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('m_Str20'),
    //       key: 'm_Str20',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('m_Str21'),
    //       key: 'm_Str21',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('m_Str22'),
    //       key: 'm_Str22',
    //       minWidth: 140
    //     },
    //     {
    //       title: getPropertyDisplayName1('m_Str23'),
    //       key: 'm_Str23',
    //       minWidth: 140
    //     },
    //     {
    //       title: getPropertyDisplayName1('m_Str24'),
    //       key: 'm_Str24',
    //       minWidth: 140
    //     },
    //     {
    //       title: getPropertyDisplayName1('m_Str25'),
    //       key: 'm_Str25',
    //       minWidth: 140
    //     },
    //     {
    //       title: getPropertyDisplayName1('m_Str26'),
    //       key: 'm_Str26',
    //       minWidth: 140
    //     },
    //     {
    //       title: getPropertyDisplayName1('m_Str27'),
    //       key: 'm_Str27',
    //       minWidth: 140
    //     },
    //     {
    //       title: getPropertyDisplayName1('m_Str28'),
    //       key: 'm_Str28',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('m_Str29'),
    //       key: 'm_Str29',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('m_Str30'),
    //       key: 'm_Str30',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('m_Str31'),
    //       key: 'm_Str31',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('m_Str32'),
    //       key: 'm_Str32',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('m_Str33'),
    //       key: 'm_Str33',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('m_Str34'),
    //       key: 'm_Str34',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('m_Str35'),
    //       key: 'm_Str35',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('m_Str36'),
    //       key: 'm_Str36',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('m_Str37'),
    //       key: 'm_Str37',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('m_Str38'),
    //       key: 'm_Str38',
    //       minWidth: 140
    //     },
    //     {
    //       title:  getPropertyDisplayName1('m_Str39'),
    //       key: 'm_Str39',
    //       minWidth: 140,
    //     },
    //     {
    //       title:  getPropertyDisplayName1('m_Str40'),
    //       key: 'm_Str40',
    //       minWidth: 140
    //     }
    //   ] 
    };
  },
  methods: {
    getDisplayName (key) {
      return getDisplayName('count', key)[0]
    },
    	// 提交
	submitForm () {
		this.$refs.form.validate((valid) => {
				if (valid) {
					this.$confirm(this.$t('confirmSubmission'), this.$t('presentation'), {}).then(() => {
						let params = Object.assign({}, this.currModel)

            console.log(params)
						if (params.id) {
							 let data = res => {
                  if (res.status) {
							   this.$message({message: this.$t('updateSuccessfully'), type: 'success'})
                 this.findPage()
							} else {
							   this.$message({message: this.$t('updateFailure') + res.msg, type: 'error'})
							}
						  }
              if (params.xStatus===1) {
                this.$http.putAsync(`/app/CountOrder/Update?id=${params.id}`, params).then(data!=null?data:'').catch(error=>{})
							  this.editLoading = false
              }
						} else {
							let data = res => {
                if(res.status) {
                 this.$message({message: this.$t('addSuccessfully'), type: 'success'})
                 this.findPage()
                //  将数据展示到页面
                  this.$set(this.currModel,"xCode",res.data.data.xCode ) 
                  this.$set(this.currModel,"id",res.data.data.id )
               } else {
                 this.$message({message: this.$t('addFailure') + res.msg, type: 'error'})
                }
               }
               console.log(params)
               this.$http.postAsync('/app/CountOrder/Create', params).then(data!=null?data:'').catch(error=>{})
						}
					})
				}
			})
	}
  }, 
};
</script>
  