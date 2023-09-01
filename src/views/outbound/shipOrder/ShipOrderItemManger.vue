<template>
<!-- 编辑发货单明细、新建发货单明细 -->
  <el-dialog
    width="90%"
     v-dialogDrag
    :visible.sync="dialogVisible" :close-on-click-modal="false" :append-to-body="true"
     :title="operation.id ? $t('editShipOrderDetail') : $t('addShipOrderDetail')">
      <el-form ref="form" :model="currProptery" label-width="100px" :size="size" label-position="right">
        <el-row>
          <el-col  :span="16">
            <el-form-item :label="getDisplayName('materialId')">
            <el-select  v-model="currProptery.materialId" @change="materialSelect" :remote-method="materialFilter"
            :loading="loading" remote filterable>
            <el-option v-for="item in materialData" :value="item.id" :key="item.id" :label="item.xCode">
                {{ item.xCode }} {{ item.xName }} {{ item.spec }} {{ item.barcode }}
            </el-option>
          </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
			      <el-form-item :label="getDisplayName('xStatus')" prop="xStatus">
			        <el-select v-model="currProptery.xStatus" :placeholder="$t('pleaseChoose')" disabled style="width:100%">
                  <el-option v-for="(v, k) in $Enum.WmsApplyShipOrder.map1" :key="k" :value="Number(k)" :label="v"></el-option>
              </el-select>
			      </el-form-item>
          </el-col>
        <el-col v-if="isShowProperty('batchNo')"  :span="6">
          <el-form-item :label="getDisplayName('batchNo')" prop="batchNo">
            <el-input v-model="currProptery.batchNo" />
          </el-form-item>
        </el-col>
        <el-col v-if="isShowProperty('batchNo')" :span="6">
          <el-form-item :label="getDisplayName('batchNo2')" prop="batchNo2">
            <el-input v-model="currProptery.batchNo2" />
          </el-form-item>
        </el-col>
        <el-col v-if="isShowProperty('batchNo')" :span="6">
          <el-form-item :label="getDisplayName('batchNo3')" prop="batchNo2">
            <el-input v-model="currProptery.batchNo3" />
          </el-form-item>
        </el-col>
        </el-row>
        <el-row >
          <!-- <el-col  :span="6">
            <el-form-item :label="getDisplayName('shipOrderId')">
              <el-select v-model="currProptery.shipOrderId" :placeholder="$t('pleaseChoose')" style="width:100%">
                 <el-option v-for="item in $store.state.my.ShipOrders" :key="item.id" :value="item.id" :label="item.xCode"></el-option>
              </el-select>
            </el-form-item>
          </el-col>-->
            <!--<el-col  :span="6">
            <el-form-item :label="getDisplayName('requiredUnit')" prop="requiredUnit">
              <el-input  v-model="currProptery.requiredUnit"></el-input>
            </el-form-item>
          </el-col> -->
        </el-row >
        <el-row >
          <!-- 包装单位 -->
          <el-col  :span="6">
            <el-form-item :label="getDisplayName('requiredPkgQuantity')" prop="requiredPkgQuantity">
              <el-input type="number"   v-model="currProptery.requiredPkgQuantity"></el-input>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item :label="getDisplayName('packageUnitId')">
              <el-select v-model="currProptery.packageUnitId" :placeholder="$t('pleaseChoose')" :disabled="currProptery.xStatus==1||currProptery.xStatus==2" style="width:100%">
                 <el-option v-for="item in packageUnits" :key="item.id" :value="item.id" :label="item.unit">
                 </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item :label="getDisplayName('pickedPkgQuantity')" prop="pickedPkgQuantity">
              <el-input type="number"  v-model="currProptery.pickedPkgQuantity"></el-input>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item :label="getDisplayName('alloactedPkgQuantity')" prop="alloactedPkgQuantity">
              <el-input type="number"   v-model="currProptery.alloactedPkgQuantity"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col  :span="6">
            <el-form-item :label="getDisplayName('comments')" prop="comments">
              <el-input v-model.trim="currProptery.comments"  />
            </el-form-item>
          </el-col>
        </el-row >
      <el-row v-show="dialogMaterial">
          <el-col :span="6" >
            <el-form-item :label="getDisplayName('str1')" prop="str1">
            <el-input  v-model='currProptery.str1' clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6" >
            <el-form-item :label="getDisplayName('str2')" prop="str2">
            <el-input  v-model='currProptery.str2' clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6" >
            <el-form-item :label="getDisplayName('str3')" prop="str3">
            <el-input  v-model='currProptery.str3' clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="getDisplayName('str4')" prop="str4">
            <el-input  v-model='currProptery.str4' clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="dialogMaterial">
          <el-col :span="6" >
            <el-form-item :label="getDisplayName('str5')" prop="str5">
            <el-input  v-model='currProptery.str5' clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="getDisplayName('str6')" prop="str6">
            <el-input  v-model='currProptery.str6' clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6" >
            <el-form-item :label="getDisplayName('str7')" prop="str7" >
            <el-input v-model='currProptery.str7' clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6" >
            <el-form-item :label="getDisplayName('str8')" prop="str8" >       
            <el-input  v-model='currProptery.str8' clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="dialogMaterial">
          <el-col :span="6" >
            <el-form-item :label="getDisplayName('str9')" prop="str9">   
            <el-input v-model='currProptery.str9' clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="getDisplayName('str10')" prop="str10">
            <el-input v-model='currProptery.str10' clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6" >
            <el-form-item :label="getDisplayName('str11')" prop="str11">  
            <el-input  v-model='currProptery.str11' clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6" >
            <el-form-item :label="getDisplayName('str12')" prop="str12" >
            <el-input  v-model='currProptery.str12' clearable/>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row v-show="dialogMaterial">
          <el-col :span="6">
            <el-form-item :label="getDisplayName('str13')" prop="str13">
            <el-input v-model='currProptery.str13' clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="getDisplayName('str14')" prop="str14">
            <el-input v-model='currProptery.str14' clearable/>
            </el-form-item>
          </el-col>
           <el-col :span="6" >
            <el-form-item :label="getDisplayName('str15')" prop="str15">    
            <el-input v-model='currProptery.str15' clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="getDisplayName('str16')" prop="str16" >
            <el-input  v-model='currProptery.str16' clearable/>
            </el-form-item>
          </el-col>
       </el-row>
        <el-row v-show="dialogMaterial">
          <el-col :span="6" >
            <el-form-item :label="getDisplayName('str17')" prop="str17">
            <el-input v-model='currProptery.str17' clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6" >
            <el-form-item :label="getDisplayName('str18')" prop="str18">
            <el-input  v-model='currProptery.str18' clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6" >
            <el-form-item :label="getDisplayName('str19')" prop="str19">
            <el-input  v-model='currProptery.str19' clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6" >
            <el-form-item :label="getDisplayName('str20')" prop="str20" >
            <el-input  v-model='currProptery.str20' clearable/>
            </el-form-item>
          </el-col>
        </el-row> 
      <el-row >
        <el-col   v-if="isShowProperty('m_Str1')"   :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str1')" prop="m_Str1">
            <el-input  v-model="currProptery.m_Str1" />
          </el-form-item>
        </el-col>
        <el-col  v-if="isShowProperty('m_Str2')"    :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str2')" prop="m_Str2">
            <el-input  v-model="currProptery.m_Str2" />
          </el-form-item>
        </el-col>
        <el-col   v-if="isShowProperty('m_Str3')"   :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str3')" prop="m_Str3">       
            <el-input  v-model="currProptery.m_Str3" />
          </el-form-item>
        </el-col>
        <el-col   v-if="isShowProperty('m_Str4')"   :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str4')" prop="m_Str4">
            <el-input v-model="currProptery.m_Str4" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col   v-if="isShowProperty('m_Str5')"   :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str5')" prop="m_Str5">
            <el-input   v-model="currProptery.m_Str5" />
          </el-form-item>
        </el-col>
        <el-col  v-if="isShowProperty('m_Str6')"   :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str6')" prop="m_Str6">
            <el-input   v-model="currProptery.m_Str6" />
          </el-form-item>
        </el-col>
        <el-col  v-if="isShowProperty('m_Str7')"    :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str7')" prop="m_Str7">
            <el-input  v-model="currProptery.m_Str7" />
          </el-form-item>
        </el-col>
        <el-col  v-if="isShowProperty('m_Str8')"   :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str8')" prop="m_Str8">
            <el-input   v-model="currProptery.m_Str8" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col  v-if="isShowProperty('m_Str9')"    :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str9')" prop="m_Str9">
            <el-input  v-model="currProptery.m_Str9" />
          </el-form-item>
        </el-col>
        <el-col   v-if="isShowProperty('m_Str10')"   :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str10')" prop="m_Str10">
            <el-input  v-model="currProptery.m_Str10" />
          </el-form-item>
        </el-col>
        <el-col  v-if="isShowProperty('m_Str11')"   :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str11')" prop="m_Str11">
            <el-input   v-model="currProptery.m_Str11" />
          </el-form-item>
        </el-col>
        <el-col v-if="isShowProperty('m_Str12')"   :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str12')" prop="m_Str12">
            <el-input  v-model="currProptery.m_Str12" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col v-if="isShowProperty('m_Str13')"    :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str13')" prop="m_Str13">
            <el-input  v-model="currProptery.m_Str13" />
          </el-form-item>
        </el-col>
        <el-col  v-if="isShowProperty('m_Str14')"   :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str14')" prop="m_Str14">
            <el-input   v-model="currProptery.m_Str14" />
          </el-form-item>
        </el-col>
        <el-col v-if="isShowProperty('m_Str15')"    :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str15')" prop="m_Str15">
            <el-input   v-model="currProptery.m_Str15" />
          </el-form-item>
        </el-col>
        <el-col v-if="isShowProperty('m_Str16')"   :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str16')" prop="m_Str16">
            <el-input  v-model="currProptery.m_Str16" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col v-if="isShowProperty('m_Str17')"   :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str17')" prop="m_Str17">
            <el-input v-model="currProptery.m_Str17" />
          </el-form-item>
        </el-col>
        <el-col v-if="isShowProperty('m_Str18')"    :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str18')" prop="m_Str18">
            <el-input  v-model="currProptery.m_Str18" />
          </el-form-item>
        </el-col>
        <el-col v-if="isShowProperty('m_Str19')"   :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str19')" prop="m_Str19">
            <el-input v-model="currProptery.m_Str19" />
          </el-form-item>
        </el-col>
        <el-col v-if="isShowProperty('m_Str20')"   :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str20')" prop="m_Str20">
            <el-input   v-model="currProptery.m_Str20" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col  v-if="isShowProperty('m_Str21')"  :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str21')" prop="m_Str21">
            <el-input  v-model="currProptery.m_Str21" />
          </el-form-item>
        </el-col>
        <el-col v-if="isShowProperty('m_Str22')"  :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str22')" prop="m_Str22">
            <el-input   v-model="currProptery.m_Str22" />
          </el-form-item>
        </el-col>
        <el-col v-if="isShowProperty('m_Str23')"   :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str23')" prop="m_Str23">
            <el-input   v-model="currProptery.m_Str23" />
          </el-form-item>
        </el-col>
        <el-col v-if="isShowProperty('m_Str24')"   :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str24')" prop="m_Str24">
            <el-input  v-model="currProptery.m_Str24" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col v-if="isShowProperty('m_Str25')"  :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str25')" prop="m_Str25">
            <el-input   v-model="currProptery.m_Str25" />
          </el-form-item>
        </el-col>
        <el-col  v-if="isShowProperty('m_Str26')"   :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str26')" prop="m_Str26">
            <el-input   v-model="currProptery.m_Str26" />
          </el-form-item>
        </el-col>
        <el-col  v-if="isShowProperty('m_Str27')"  :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str27')" prop="m_Str27">
            <el-input  v-model="currProptery.m_Str27" />
          </el-form-item>
        </el-col>
        <el-col v-if="isShowProperty('m_Str28')"  :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str28')" prop="m_Str28">
            <el-input  v-model="currProptery.m_Str28" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col  v-if="isShowProperty('m_Str29')"  :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str29')" prop="m_Str29">
            <el-input  v-model="currProptery.m_Str29" />
          </el-form-item>
        </el-col>
        <el-col v-if="isShowProperty('m_Str30')"   :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str30')" prop="m_Str30">
            <el-input v-model="currProptery.m_Str30" />
          </el-form-item>
        </el-col>
        <el-col   v-if="isShowProperty('m_Str31')"  :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str31')" prop="m_Str31">
            <el-input   v-model="currProptery.m_Str31" />
          </el-form-item>
        </el-col>
        <el-col  v-if="isShowProperty('m_Str32')"   :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str32')" prop="m_Str32"> 
            <el-input   v-model="currProptery.m_Str32" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col  v-if="isShowProperty('m_Str33')"  :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str33')" prop="m_Str33">
            <el-input   v-model="currProptery.m_Str33" />
          </el-form-item>
        </el-col>
        <el-col  v-if="isShowProperty('m_Str34')"  :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str34')" prop="m_Str34">
            <el-input v-model="currProptery.m_Str34" />
          </el-form-item>
        </el-col>
        <el-col   v-if="isShowProperty('m_Str35')"  :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str35')" prop="m_Str35">
            <el-input  v-model="currProptery.m_Str35" />
          </el-form-item>
        </el-col>
        <el-col  v-if="isShowProperty('m_Str36')"  :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str36')" prop="m_Str36">
            <el-input  v-model="currProptery.m_Str36" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col  v-if="isShowProperty('m_Str37')"   :span="6">
          <el-form-item :label=" getPropertyDisplayName('m_Str37')" prop="m_Str37">
            <el-input v-model="currProptery.m_Str37" />
          </el-form-item>
        </el-col>
        <el-col  v-if="isShowProperty('m_Str38')"  :span="6">
          <el-form-item :label="getPropertyDisplayName('m_Str38')" prop="m_Str38">     
            <el-input  v-model="currProptery.m_Str38" />
          </el-form-item>
        </el-col>
        <el-col   v-if="isShowProperty('m_Str39')"  :span="6">
          <el-form-item :label="getPropertyDisplayName('m_Str39')" prop="m_Str39">      
            <el-input  v-model="currProptery.m_Str39" />
          </el-form-item>
        </el-col>
        <el-col  v-if="isShowProperty('m_Str40')"   :span="6">
          <el-form-item :label="getPropertyDisplayName('m_Str40')" prop="m_Str40">    
            <el-input  v-model="currProptery.m_Str40" />
          </el-form-item>
        </el-col>
      </el-row>
      </el-form>
      <el-row  style="padding-left:90px;">
       <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
         <el-button :size="size" @click.native="dialogVisible = false">{{$t('action.cancel')}}</el-button>
      </el-row >
    <div slot="footer" />
  </el-dialog>
</template>

<script>
import { getMaterial } from '@/api/webapi'
import { CreateApplyShipOrderItemDto,CreateMaterialPropertyDto } from '@/libs/createDto'
import { getDisplayName, getPropertyDisplayName } from '@/libs/common'
export default {
   props: {
    CurrentEntity: Object,
    currModelIDUnit:Number,
    currModMaterial:Object
   },
   computed: {
    currProptery () {
      return  this.CurrentEntity || CreateApplyShipOrderItemDto()
    },
    currMaterial(){
      return this.currModMaterial || {}
    }
   },
   // 获取祖父事件
   inject:['findPage'],
   data () {
    return {
		    pageRequest: {
          pageNum: 1,
          pageSize: 100
        }, 
        size: 'small',
        loading:false,
        editLoading: false, 
        operation: false, // true:新增, false:编辑
        dialogVisible: false, // 新增编辑界面是否显示
        dialogMaterial:false,
        roles: [],
        materialData: [],
        packageUnits: [],
        dataFormRules: {
        xCode: [ { required: true, message: this.$t('required'), trigger: 'change' } ],
		    xName: [ { required: true, message: this.$t('required'), trigger: 'change' } ]
		},
    }
   },
   methods: {
  // 获取语言
	getDisplayName (key) {
      return getDisplayName('shipOrderItemManager', key)[0]
    },
  getPropertyDisplayName (key) {
      return getPropertyDisplayName((key))
  },
	// 分页查询
	getfindPage () {
      this.$emit('findPageItem', {pageRequest:this.pageRequest})
	},
  // 出库单数据

	// 提交
	submitForm () {
		this.$refs.form.validate((valid) => {
				if (valid) {
					this.$confirm(this.$t('confirmSubmission'), this.$t('presentation'), {}).then(() => {
						let params = Object.assign({}, this.currProptery)
            params.shipOrderId = this.currModelIDUnit
						if (params.id) {
							 let data = res => {
              if (res!=undefined) {
                if (res.status) {
							   this.$message({message: this.$t('updateSuccessfully'), type: 'success'})
                 this.getfindPage()
                 this.findPage()
							} else {
							   this.$message({message: this.$t('updateFailure') + res.msg, type: 'error'})
							}
                }
						  }
							this.$http.putAsync(`/app/ShipOrderItem/UpdateShipOrderItem?id=${params.id}`, params).then(data!=null?data:'').catch(error=>{})
							this.dialogVisible = false
							this.editLoading = false
						} else {
							let data = res => {
              if (res!=undefined) {
                if(res.status) {
                 this.$message({message: this.$t('addSuccessfully'), type: 'success'})
                 this.getfindPage()
                 this.findPage()
               } else {
                 this.$message({message: this.$t('addFailure') + res.msg, type: 'error'})
               }
                }
               }
               this.$http.postAsync('/app/ShipOrderItem/AddShipOrderItem', params).then(data!=null?data:'').catch(error=>{})
						   this.dialogVisible = false
						}
					})
				}
			})
	},
  // debounced（防抖动函数）
  materialFilter: _.debounce(async function (value) {
     if (!value) return
     let item = this.materialData.find(x => { return x.xCode === value })
     if (item) return
     this.loading = true
     this.materialData = await getMaterial(value)
     //  console.log("this.materialData-->",this.materialData)
     this.loading = false
    }, 500),
  async materialSelect (value) {
    this.dialogMaterial = true
    console.log("materialSelect-->",value)
    if (!value) return
    let material = this.materialData.find((x) => { return x.id === value })
    this.packageUnits = material.packageUnits 
   console.log("单位粗来的数据---》",   this.packageUnits )
    this.currProptery.packageUnitId = material.packageUnits[0].id
    console.log(this.currProptery.packageUnitId)
    await this.setInfor(material)
    },
  async setInfor (material) {
      if (material) {
        this.setPropertyRules(material.materialPropertyRule)
        this.setProperty(material)
        this.setMaterial(material)
        console.log(this.setProperty(material),this.setProperty(material));
        // if (this.currModel.id) {
        //   this.setExpandProperty()
        // }
        // 
        // console.log(matematerial.materialCategoryIdrial)
        await this.getAllPropertyRule(material.materialCategoryId)
        // await getAllWebApiPropertyItems(this.ruleCode)
        // this.getInvenotryQty(material.id)
      }
    },
    // 根据物料规则判断那些需要展示
    isShowProperty (property) {
      return this.currMaterial&&this.currMaterial.materialPropertyRule&&this.currMaterial.materialPropertyRule[property] > 0
    },
      setMaterial (material) {
      // console.log(material, '物料')
      //  if(material.packageUnits.length===1){
      //   this.$set(this.currProptery,"packageUnitId", material.packageUnits[0].id)
      //  }
      // this.currMaterial = material
      // this.currModel.materialId = material.id
      // this.$set(this.currProptery,"materialId", material.id)
      // this.currModel.material = material
      // this.currModel.packageUnit = material.packageUnit[0]
    },
    setProperty (material) {
      console.log(material)
      // 根据选中的物料带出基础物料中的明细并显示再界面上 
      // this.currProptery =  CreateMaterialPropertyDto()
      this.$set(this.currProptery,"materialId", material.id),
      this.$set(this.currProptery,"comments",  material.comments), 
      this.$set(this.currProptery,"str1",  material.str1),
      this.$set(this.currProptery,"str2",  material.str2),
      this.$set(this.currProptery,"str3",  material.str3),
      this.$set(this.currProptery,"str4",  material.str4),
      this.$set(this.currProptery,"str5",  material.str5),
      this.$set(this.currProptery,"str6",  material.str6),
      this.$set(this.currProptery,"str7",  material.str7),
      this.$set(this.currProptery,"str8",  material.str8),
      this.$set(this.currProptery,"str9",  material.str9),
      this.$set(this.currProptery,"str10", material.str10),
      this.$set(this.currProptery,"str11", material.str11),
      this.$set(this.currProptery,"str12", material.str12),
      this.$set(this.currProptery,"str13", material.str13),
      this.$set(this.currProptery,"str14", material.str14),
      this.$set(this.currProptery,"str15", material.str15),
      this.$set(this.currProptery,"str16", material.str16),
      this.$set(this.currProptery,"str17", material.str17),
      this.$set(this.currProptery,"str18", material.str18),
      this.$set(this.currProptery,"str19", material.str19),
      this.$set(this.currProptery,"str20", material.str20) 
      // if (this.$configuration.isMutiWarehouse) {
      //   this.currProptery.warehouseId = this.$store.state.my.currentWarehouse.id
      // }
    },
    setPropertyRules (rule) {
      if (!rule) return
      Object.keys(rule).forEach(k => {
        if (rule[k] && (rule[k] === 0 || rule[k] === 1)) {
          this.propertyRuleValidate[k] = []
        } else if (rule[k] && rule[k] === 2) {
          this.propertyRuleValidate[k] = [ { required: true, message: this.$t('required'), trigger: 'change' } ]
        } else if (rule[k] && rule[k] === 4) {
          this.propertyRuleValidate[k] = [ { required: true, message: this.$t('required'), trigger: 'change' } ]
        }
      })
      let customRule = getPropertyRuleValidate(rule.xCode, this)
      Object.keys(customRule).forEach(k => {
        this.propertyRuleValidate[k] = customRule[k]
      })
    },
    async getInvenotryQty (materialId) {
      let factoryId = this.factoryId
      let qty = await this.$http.postAsync('sqlManager/query', { configSql: 'QuerySql:InventoryPkgQty', Parameter: { materialId, factoryId } })
      if (qty && Array.isArray(qty)) {
        this.inventoryQty = qty[0].PkgQty ? qty[0].PkgQty : qty[0].PKGQTY
      }
    },
    async getAllPropertyRule(materialCategoryId){
      // 通过物料类目的ID查找到对应的属性规则的ID，然后获取属性规则中字段的显示还是不显示
      let condition = {
           "skipCount": 1,
           "maxResultCount": 10000,
           "sorting": "id desc",
           "conditionItems": [
              {
                "key": "id",
                "value": String(materialCategoryId),
                "operator": 1
              }
                ]
            }
       this.$http.postAsync("/app/MaterialCategory/GetList", condition).then((res) => { 
        if (res.data.result) {
          let innerMaterialPropertyRuleId = res.data.data.items[0].materialPropertyRuleId 
          let innerCondition = {
            "skipCount": 1,
            "maxResultCount": 10000,
            "sorting": "id desc",
            "conditionItems": [
              {
                "key": "id",
                "value": String(innerMaterialPropertyRuleId),
                "operator": 1
              }
            ]
          }
          this.$http.postAsync("/app/MaterialPropertyRule/GetList", innerCondition).then((res)=>{
            if (res.data.result) {  
              this.$set(this.currMaterial,"materialPropertyRule", res.data.data.items[0])
            }
          }).catch(error=>{})
        }
      }).catch(error=>{}) 
    } 
   }
}
</script>

<style>

</style>