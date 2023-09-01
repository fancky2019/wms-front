<template>
  <div>
    <el-dialog :title="operation?$t('action.add') : $t('edit')" width="35%"  :visible.sync="dialogVisible" :close-on-click-modal="false" >
		<el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="form" :size="size"
			label-position="right">
			<el-form-item :label="getDisplayName('xCode')" prop="xCode">
				<el-input v-model="dataForm.xCode" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item :label="getDisplayName('xName')" prop="xName">
				<el-input v-model="dataForm.xName" type="xName" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item :label="getDisplayName('xStatus')" prop="xStatus">
			   <el-select v-model="dataForm.xStatus" :placeholder="$t('pleaseChoose')" style="width:100%">
                 <el-option v-for="(v, k) in $Enum.TypeOfBill.map5" :key="k" :value="Number(k)" :label="v"></el-option>
              </el-select>
			</el-form-item>
			<el-form-item :label="getDisplayName('billTypeType')" prop="billTypeType">
              <el-select v-model="dataForm.billTypeType" :placeholder="$t('pleaseChoose')" style="width:100%">
                <el-option v-for="(v, k) in $Enum.TypeOfBill.map6" :key="k" :value="Number(k)" :label="v"></el-option>
              </el-select>
            </el-form-item>
			<el-form-item :label="getDisplayName('basicStrategyId')" prop="basicStrategyId">
				<el-select v-model="dataForm.basicStrategyId" :placeholder="$t('pleaseChoose')" style="width:100%">
                 <el-option v-for="item in $store.state.my.basicStrategies" :key="item.id" :value="item.id" :label="item.xName"></el-option>
              </el-select>
			</el-form-item>
			<el-form-item :label="getDisplayName('shipmentRuleId')" prop="shipmentRuleId">
				<el-select v-model="dataForm.shipmentRuleId" :placeholder="$t('pleaseChoose')" style="width:100%">
                 <el-option v-for="item in $store.state.my.basicStrategies" :key="item.id" :value="item.id" :label="item.xName"></el-option>
              </el-select>
			</el-form-item>
			<!-- <el-form-item :label="getDisplayName('shipLocation1')" prop="shipLocation1">
				<el-input v-model="dataForm.shipLocation" auto-complete="off"></el-input>
			</el-form-item> -->
			<!-- <el-form-item :label="getDisplayName('class1')" prop="class1">
				 <el-select v-model="dataForm.class1" :placeholder="$t('pleaseChoose')" style="width:100%">
                 <el-option v-for="(item, k) in $Enum.TypeOfBill.map3" :key="k"  :value="item"></el-option>
              </el-select>
			</el-form-item>
      		<el-form-item :label="getDisplayName('class2')" prop="class2" >
				<el-input v-model="dataForm.class2" auto-complete="off"></el-input>
			</el-form-item> -->
      <!-- <el-form-item :label="getDisplayName('description')" prop="description">
				<el-input v-model="dataForm.description" auto-complete="off"></el-input>
			</el-form-item> -->
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button :size="size" @click.native="dialogVisible = false">{{$t('action.cancel')}}</el-button>
			<el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
		</div>
	</el-dialog>
  </div>
</template>

<script>
import { CreateBillTypeDto } from '@/libs/createDto'
import { getDisplayName } from '@/libs/common'
import { mapActions } from 'vuex'
export default {
   props: {
    EntityData: Object
   },
   computed: {
    dataForm () {
      return this.EntityData ||  CreateBillTypeDto()
    }
   },
   data () {
    return {
		 pageRequest: {
          pageNum: 1,
          pageSize: 100
        }, 
        size: 'small',
        editLoading: false, 
        operation: false, // true:新增, false:编辑
        dialogVisible: false, // 新增编辑界面是否显示
        roles: [],
        dataFormRules: {
         xCode: [ { required: true, message: '请输入用户名', trigger: 'blur' } ],
        //  xType: [ { required: true, message: '请输入用户名', trigger: 'blur' } ],
		 xName: [ { required: true, message: '请输入用户名', trigger: 'blur' } ]
		},
    }
   },
   methods: {
	...mapActions(['getBillTypeData']),
    // 获取语言
	getDisplayName (key) {
      return getDisplayName('billTypeManage', key)[0]
    },
	// 分页查询
	findPage () {
      this.$emit('findPage', {pageRequest:this.pageRequest})
	},
	// 提交
	submitForm () {
		this.$refs.form.validate((valid) => {
				if (valid) {
					this.$confirm(this.$t('confirmSubmission'), this.$t('presentation'), {}).then(() => {
						let params = Object.assign({}, this.dataForm)
						  //console.log(params);
						if (params.id) {                        
						  let data = res => {
					    if (res!=undefined) {
							if (res.status) {
							   this.$message({message: this.$t('updateSuccessfully'), type: 'success'})
                               this.findPage()
							} else {
							   this.$message({message: this.$t('updateFailure') + res.msg, type: 'error'})
							}
						  }
						  }
							this.$http.putAsync(`/app/BillType/Update?id=${params.id}`, params).then(data!=null?data:'').catch(error=>{})
							this.dialogVisible = false
							this.editLoading = false
						} else {
						 let data = res => {
					        if (res!=undefined) {
                               if(res.status) {
                                 this.$message({message: this.$t('addSuccessfully'), type: 'success'})
                                 this.findPage()
                               } else {
                                 this.$message({message: this.$t('addFailure') + res.msg, type: 'error'})
                               }
                            }
						 }
                           this.$http.postAsync('/app/BillType/Create', params).then(data!=null?data:'').catch(error=>{})
						   this.getBillTypeData()
						   this.dialogVisible = false
						}
					})
				}
			})
	}
   }
}
</script>

<style>

</style>