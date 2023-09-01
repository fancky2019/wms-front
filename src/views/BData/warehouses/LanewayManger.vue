<template>
  <div>
    <el-dialog :title="operation?$t('action.add') : $t('edit')" width="35%"  :visible.sync="dialogVisible" :close-on-click-modal="false" >
		<el-form :model="dataForm" label-width="150px" :rules="dataFormRules" ref="form" :size="size"
			label-position="right">
			<el-form-item :label="getDisplayName('xCode')" prop="xCode">
				<el-input v-model="dataForm.xCode" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item :label="getDisplayName('xName')" prop="xName">
				<el-input v-model="dataForm.xName" type="xName" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item :label="getDisplayName('warehouseId')" prop="warehouseId">
			  <el-select v-model="dataForm.warehouseId" :placeholder="$t('pleaseChoose')" style="width:100%">
                 <el-option v-for="item in $store.state.my.warehouses" :key="item.id" :value="item.id" :label="item.xName"></el-option>
              </el-select>
			</el-form-item>
			<!-- <el-form-item :label="getDisplayName('allocatRelationId')" prop="allocatRelationId">
				<el-select v-model="dataForm.allocatRelationId" :placeholder="$t('pleaseChoose')" style="width:100%">
                 <el-option v-for="(item, k) in $store.state.my.basicStrategies" :key="k"  :value="item"></el-option>
              </el-select>
			</el-form-item>-->
			<el-form-item :label="getDisplayName('disallowWcsToClearError')" prop="disallowWcsToClearError">
				<el-select v-model="dataForm.disallowWcsToClearError" :placeholder="$t('pleaseChoose')" style="width:100%">
                 <el-option v-for="(v, k) in $Enum.WmsWarehouse.map1" :key="k" :value="JSON.parse(k)" :label="v"></el-option>
              </el-select>
			</el-form-item> 
			<el-form-item :label="getDisplayName('relateDeviceCode')" prop="relateDeviceCode">
				<el-input v-model="dataForm.relateDeviceCode" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item :label="getDisplayName('str1')" prop="str1">
				<el-input v-model="dataForm.str1" auto-complete="off"></el-input>
			</el-form-item>
      		<el-form-item :label="getDisplayName('str2')" prop="str2" >
				<el-input v-model="dataForm.str2" auto-complete="off"></el-input>
			</el-form-item>
            <el-form-item :label="getDisplayName('str3')" prop="str3">
				<el-input v-model="dataForm.str3" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item :label="getDisplayName('str4')" prop="str4">
				<el-input v-model="dataForm.str4" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item :label="getDisplayName('str5')" prop="str5">
				<el-input v-model="dataForm.str5" auto-complete="off"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button :size="size" @click.native="dialogVisible = false">{{$t('action.cancel')}}</el-button>
			<el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
		</div>
	</el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { CreateLanewayDto } from '@/libs/createDto'
import { getDisplayName } from '@/libs/common'
export default {
   props: {
    EntityData: Object
   },
   computed: {
    dataForm () {
      return this.EntityData ||  CreateLanewayDto()
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
		 xName: [ { required: true, message: '请输入用户名', trigger: 'blur' } ]
		},
    }
   },
   methods: {
	  ...mapActions([
      'getLanewayData'
    ]),
    // 获取语言
	getDisplayName (key) {
      return getDisplayName('laneway', key)[0]
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
							this.$http.putAsync(`/app/Laneway/Update?id=${params.id}`, params).then(data!=null?data:'').catch(error=>{})
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
                           this.$http.postAsync('/app/Laneway/Create', params).then(data!=null?data:'').catch(error=>{})
						   this.getLanewayData()
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