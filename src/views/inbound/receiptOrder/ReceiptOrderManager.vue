<template>
        <el-dialog      v-dialogDrag :title="operation?$t('action.add') : $t('edit')" width="80%"  :visible.sync="dialogVisible" :close-on-click-modal="false" >
      <!-- el-tab 标签分为两类 -->
      <el-tabs value="tab1" type="card" :animated="false">
      <el-tab-pane :label="$t('basicMessage')" name="tab1">

    <el-form ref="form" :model="currModel" label-width="110px" :rules="ruleValidate"  >
        <el-row>
          <el-col :span="12"  >
              <el-form-item :label="getDisplayName('xCode')" prop="xCode"  >
                <el-input v-model="currModel.xCode" auto-complete="off" disabled></el-input>
              </el-form-item> 
          </el-col>  
          <el-col :span="6"  >
          <el-form-item :label="getDisplayName('applyReceiptOrderCode')" prop="applyReceiptOrderCode">
              <el-input v-model="currModel.applyReceiptOrderCode"  :disabled="disabled" />
              <!-- <el-select v-model="currModel.applyReceiptOrderCode"  :disabled="disabled">
                <el-option v-for="item in $store.state.my.applyReceipt " :key="item.id" :value="item.id" :label="item.xCode"></el-option>
              </el-select>  -->
 
          </el-form-item>
          </el-col>

        <el-col :span="6" v-if="!getIsHide('xStatus')">
          <el-form-item :label="getDisplayName('xStatus')" prop="xStatus"> 
              <el-select v-model="currModel.xStatus" filterable disabled>
                <el-option v-for="(v, k) in $Enum.WmsROStatus.map1" :key="k" :value="Number(k)" :label="v"  ></el-option>
              </el-select> 
            </el-form-item>
        </el-col> 

        </el-row>
        <el-row>
          <el-col :span="6" v-if="!getIsHide('organiztion')">
            <el-form-item :label="getDisplayName('organiztion')" prop="organiztion">
              <el-select v-model="currModel.organiztion" filterable :disabled="disabled">
                <el-option v-for="item in $store.state.my.orgnizations.filter(x => x.type == '2')" :key="item.id" :value=String(item.id) :label="item.xName"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="!getIsHide('billTypeId')">
            <el-form-item :label="getDisplayName('billTypeId')" prop="billTypeId">
              <el-select v-model="currModel.billTypeId"  :disabled="disabled">
                <el-option v-for="item in $store.state.my.billTypes.filter(x=>x.billTypeType==1)" :key="item.id" :value="item.id" :label="item.xName"></el-option>
              </el-select> 
            </el-form-item>
          </el-col> 
            <!-- <el-col :span="6" v-if="!getIsHide('expectedPkgQuantity')">
          <el-form-item :label="getDisplayName('expectedPkgQuantity')" prop="expectedPkgQuantity">
              <el-input v-model="currModel.expectedPkgQuantity" :disabled="disabled"/>
            </el-form-item>
        </el-col>

        <el-col :span="6" v-if="!getIsHide('receivedPkgQuantity')">
          <el-form-item :label="getDisplayName('receivedPkgQuantity')" prop="receivedPkgQuantity">
              <el-input v-model="currModel.receivedPkgQuantity" :disabled="disabled"/>
            </el-form-item>
        </el-col> -->


        </el-row> 
        <el-row>
          <!-- <el-col :span="6" v-if="!getIsHide('movedPkgQuantity')">
          <el-form-item :label="getDisplayName('movedPkgQuantity')" prop="movedPkgQuantity">
              <el-input v-model="currModel.movedPkgQuantity" :disabled="disabled"/>
            </el-form-item>
        </el-col> -->

        <el-col :span="6" v-if="!getIsHide('comments')">
          <el-form-item :label="getDisplayName('comments')" prop="comments">
              <el-input v-model="currModel.comments" :disabled="disabled"/>
            </el-form-item>
        </el-col> 
          <el-col :span="6" v-if="!getIsHide('str1')">
            <el-form-item :label="getDisplayName('str1')" prop="str1">
              <el-select v-if="getItems('str1')" v-model="currModel.str1" filterable clearable :disabled="disabled">
              <el-option v-for="v in getItems('str1')" :value="v.key" :key="v.key" :label="v.value"> </el-option>
            </el-select>
            <el-input v-else v-model='currModel.str1' clearable :disabled="disabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="!getIsHide('str2')">
            <el-form-item :label="getDisplayName('str2')" prop="str2">
              <el-select :disabled="disabled" v-if="getItems('str2')" v-model="currModel.str2" filterable clearable>
              <el-option v-for="v in getItems('str2')" :value="v.key" :key="v.key" :label="v.value"> </el-option>
            </el-select>
            <el-input :disabled="disabled" v-else v-model='currModel.str2' clearable/>
            </el-form-item>
          </el-col>
         
        </el-row>

        <el-row>
          <el-col :span="6" v-if="!getIsHide('str3')">
            <el-form-item :label="getDisplayName('str3')" prop="str3">
              <el-select :disabled="disabled" v-if="getItems('str3')" v-model="currModel.str3" filterable clearable>
              <el-option v-for="v in getItems('str3')" :value="v.key" :key="v.key" :label="v.value"> </el-option>
            </el-select>
            <el-input :disabled="disabled" v-else v-model='currModel.str3' clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="!getIsHide('str4')">
            <el-form-item :label="getDisplayName('str4')" prop="str4" >
                 <el-select :disabled="disabled" v-if="getItems('str4')" v-model="currModel.str4" filterable clearable>
              <el-option v-for="v in getItems('str4')" :value="v.key" :key="v.key" :label="v.value"> </el-option>
            </el-select>
            <el-input :disabled="disabled" v-else v-model='currModel.str4' clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="!getIsHide('str5')">
            <el-form-item :label="getDisplayName('str5')" prop="str5">
              <el-select :disabled="disabled"  v-if="getItems('str5')" v-model="currModel.str5" filterable clearable>
              <el-option v-for="v in getItems('str5')" :value="v.key" :key="v.key" :label="v.value"> </el-option>
            </el-select>
            <el-input :disabled="disabled" v-else v-model='currModel.str5' clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="!getIsHide('str6')">
            <el-form-item :label="getDisplayName('str6')" prop="str6">
              <el-select :disabled="disabled" v-if="getItems('str6')" v-model="currModel.str6" filterable clearable>
              <el-option v-for="v in getItems('str6')" :value="v.key" :key="v.key" :label="v.value"> </el-option>
            </el-select>
            <el-input :disabled="disabled" v-else v-model='currModel.str6' clearable/>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col :span="6" v-if="!getIsHide('str7')">
            <el-form-item :label="getDisplayName('str7')" prop="str7">
              <el-select :disabled="disabled"  v-if="getItems('str7')" v-model="currModel.str7" filterable clearable>
              <el-option v-for="v in getItems('str7')" :value="v.key" :key="v.key" :label="v.value"> </el-option>
            </el-select>
            <el-input :disabled="disabled" v-else v-model='currModel.str7' clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="!getIsHide('str8')">
            <el-form-item :label="getDisplayName('str8')" prop="str8" >
                 <el-select :disabled="disabled"  v-if="getItems('str8')" v-model="currModel.str8" filterable clearable>
              <el-option v-for="v in getItems('str8')" :value="v.key" :key="v.key" :label="v.value"> </el-option>
            </el-select>
            <el-input :disabled="disabled"  v-else v-model='currModel.str8' clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="!getIsHide('str9')">
            <el-form-item :label="getDisplayName('str9')" prop="str9">
              <el-select :disabled="disabled"  v-if="getItems('str9')" v-model="currModel.str9" filterable clearable>
              <el-option v-for="v in getItems('str9')" :value="v.key" :key="v.key" :label="v.value"> </el-option>
            </el-select>
            <el-input :disabled="disabled" v-else v-model='currModel.str9' clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="!getIsHide('str10')">
            <el-form-item :label="getDisplayName('str10')" prop="str10">
              <el-select :disabled="disabled" v-if="getItems('str10')" v-model="currModel.str10" filterable clearable>
              <el-option v-for="v in getItems('str10')" :value="v.key" :key="v.key" :label="v.value"> </el-option>
            </el-select>
            <el-input :disabled="disabled"  v-else v-model='currModel.str10' clearable/>
            </el-form-item>
          </el-col>

        </el-row>
         <el-row>
          <el-col :span="6" v-if="!getIsHide('str11')">
            <el-form-item :label="getDisplayName('str11')" prop="str11">
              <el-select :disabled="disabled" v-if="getItems('str11')" v-model="currModel.str11" filterable clearable>
              <el-option v-for="v in getItems('str11')" :value="v.key" :key="v.key" :label="v.value"> </el-option>
            </el-select>
            <el-input :disabled="disabled"  v-else v-model='currModel.str11' clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="!getIsHide('str12')">
            <el-form-item :label="getDisplayName('str12')" prop="str12" >
                 <el-select :disabled="disabled"  v-if="getItems('str12')" v-model="currModel.str12" filterable clearable>
              <el-option v-for="v in getItems('str12')" :value="v.key" :key="v.key" :label="v.value"> </el-option>
            </el-select>
            <el-input :disabled="disabled"  v-else v-model='currModel.str12' clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="!getIsHide('str13')">
            <el-form-item :label="getDisplayName('str13')" prop="str13">
              <el-select :disabled="disabled" v-if="getItems('str13')" v-model="currModel.str13" filterable clearable>
              <el-option v-for="v in getItems('str13')" :value="v.key" :key="v.key" :label="v.value"> </el-option>
            </el-select>
            <el-input :disabled="disabled" v-else v-model='currModel.str13' clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="!getIsHide('str14')">
            <el-form-item :label="getDisplayName('str14')" prop="str14">
              <el-select :disabled="disabled" v-if="getItems('str14')" v-model="currModel.str14" filterable clearable>
              <el-option v-for="v in getItems('str14')" :value="v.key" :key="v.key" :label="v.value"> </el-option>
            </el-select>
            <el-input :disabled="disabled" v-else v-model='currModel.str14' clearable/>
            </el-form-item>
          </el-col>

       </el-row>
        <el-row>
          <el-col :span="6" v-if="!getIsHide('str15')">
            <el-form-item :label="getDisplayName('str15')" prop="str15">
              <el-select  :disabled="disabled" v-if="getItems('str15')" v-model="currModel.str15" filterable clearable>
              <el-option v-for="v in getItems('str15')" :value="v.key" :key="v.key" :label="v.value"> </el-option>
            </el-select>
            <el-input :disabled="disabled"  v-else v-model='currModel.str15' clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="!getIsHide('str16')">
            <el-form-item :label="getDisplayName('str16')" prop="str16" >
                 <el-select  :disabled="disabled" v-if="getItems('str16')" v-model="currModel.str16" filterable clearable>
              <el-option v-for="v in getItems('str16')" :value="v.key" :key="v.key" :label="v.value"> </el-option>
            </el-select>
            <el-input :disabled="disabled" v-else v-model='currModel.str16' clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="!getIsHide('str17')">
            <el-form-item :label="getDisplayName('str17')" prop="str17">
              <el-select :disabled="disabled" v-if="getItems('str17')" v-model="currModel.str17" filterable clearable>
              <el-option v-for="v in getItems('str17')" :value="v.key" :key="v.key" :label="v.value"> </el-option>
            </el-select>
            <el-input :disabled="disabled"  v-else v-model='currModel.str17' clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="!getIsHide('str18')">
            <el-form-item :label="getDisplayName('str18')" prop="str18">
              <el-select :disabled="disabled"  v-if="getItems('str18')" v-model="currModel.str18" filterable clearable>
              <el-option v-for="v in getItems('str18')" :value="v.key" :key="v.key" :label="v.value"> </el-option>
            </el-select>
            <el-input :disabled="disabled"  v-else v-model='currModel.str18' clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="!getIsHide('str19')">
            <el-form-item :label="getDisplayName('str19')" prop="str19">
              <el-select :disabled="disabled"  v-if="getItems('str19')" v-model="currModel.str19" filterable clearable>
              <el-option v-for="v in getItems('str19')" :value="v.key" :key="v.key" :label="v.value"> </el-option>
            </el-select>
            <el-input :disabled="disabled" v-else v-model='currModel.str19' clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="!getIsHide('str20')">
            <el-form-item :label="getDisplayName('str20')" prop="str20" >
                 <el-select  :disabled="disabled" v-if="getItems('str20')" v-model="currModel.str20" filterable clearable>
              <el-option v-for="v in getItems('str20')" :value="v.key" :key="v.key" :label="v.value"> </el-option>
            </el-select>
            <el-input :disabled="disabled"  v-else v-model='currModel.str20' clearable/>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row style="padding-left:100px;">
 
        <el-button :size="size" @click.native="dialogVisible = false">{{$t('action.cancel')}}</el-button>
        <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
        </el-row>
      </el-form>   

          </el-tab-pane>
      <el-tab-pane :label="$t('receiptOrderDetail')" name="tab2">
        <ReceiptOrderItem ref="manager" :columns="columns" @on-close="$refs.pages.refresh()" :CurrentEntity="currModel"    :currModelID="currModel.id"   />
      </el-tab-pane> 
    </el-tabs>
    
  
</el-dialog>
  </template>
  <script>  
  import {  getDisplayName, getRuleValidate, getIsHide, getManagerItems } from '@/libs/common'
  import { CreateReceiptOrderDto } from '@/libs/createDto'
  import ReceiptOrderItem from './ReceiptOrderItem.vue' 
  
  export default {
    components: { 
      ReceiptOrderItem , 
    },
    props: {
      CurrentEntity: Object,
      columns:Array, 
    },
    computed: {
      currModel () { 
        return this.CurrentEntity ||   CreateReceiptOrderDto()
      },
       
    },
 
    data () {
      return { 
        disabled:false,
        size:'small',
        editLoading:false,
        currentRow: undefined,
        insideLoading: false,
        operation:false,
        dialogVisible:false, 
        pageRequest: { pageNum: 1, pageSize: 10 },
        ruleValidate: {
          organiztion: [
            { required: true, message: this.$t('required'), trigger: 'change' }
          ],
          billTypeId: [
            { required: true, message: this.$t('required'), trigger: 'change' }
          ],
          xStatus: [
            { required: true, message: this.$t('xStatus'), trigger: 'change' }
          ]
        }
      }
    },
    created () { 
      // this.getRule()  
    },
    methods: {
 
         // 分页查询
         findPage() {
      this.$emit('findPage', {pageRequest:this.pageRequest})
    },
      getDisplayName (key) {
        return getDisplayName('receiptOrderManager', key)[0]
      },
      getIsHide (key) {
        return getIsHide('receiptOrderManager', key)
      },
      getItems (key) {
        return getManagerItems('receiptOrderManager', key)
      },
 
      getRule () {
        this.ruleValidate = getRuleValidate('receiptOrderManager', this)
      }, 
      submitForm() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						// this.editLoading = true
						 //console.log(this.$refs.form)
						let params = Object.assign({}, this.currModel)
						if (params.id) { 
              let data = res => {
              if(res.status) {
                  this.$message({message: '更新成功', type: 'success'})
                  this.findPage()
                } else {
                  this.$message({message: '更新失败, ' + res.msg, type: 'error'})
                }
              } 
              this.$http.putAsync(`/app/ReceiptOrder/Update?id=${params.id}`, params).then(data!=null?data:'').catch(error=>{}) 
              // this.dialogVisible = false
              this.disabled = true
              this.editLoading = false
						} else {
              let data = res => {
                if(res.status) {
                  this.$message({message: '新增成功', type: 'success'})
                  this.findPage()
                  // 将成功的数据反写在界面上 
                  this.$set(this.currModel,"xCode",res.data.data.xCode ) 
                  this.$set(this.currModel,"id",res.data.data.id ) 
                  this.disabled = true
                  
                } else {
                  this.$message({message: '新增失败, ' + res.msg, type: 'error'})
                }
              }
              this.$http.postAsync('/app/ReceiptOrder/Create', params).then(data!=null?data:'').catch(error=>{})
 
						} 
					})
				}
			}) 
		},
    }
  }
  
  </script>
  