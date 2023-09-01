<template>
  <div>
    <el-dialog    v-dialogDrag  :title="operation?$t('action.add') : $t('edit')" width="40%"  :visible.sync="dialogVisible" :close-on-click-modal="false" >
		<el-form  :model="dataForm" label-width="80px" :rules="dataFormRules" ref="form" :size="size"
			label-position="right">
			<el-form-item :label="getDisplayName('xType')" prop="xType">
				<el-input v-model="dataForm.xType" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item :label="getDisplayName('xCode')" prop="xCode">
				<el-input v-model="dataForm.xCode" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item :label="getDisplayName('xName')" prop="xName">
				<el-input v-model="dataForm.xName" type="xName" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item :label="getDisplayName('xStatus')" prop="allocatRelationId">
				<el-input v-model="dataForm.xStatus" auto-complete="off"></el-input>
			</el-form-item>
			<!-- <el-form-item :label="getDisplayName('shipmentRuleId')" prop="shipmentRuleId">
				<el-input v-model="dataForm.shipmentRuleId" auto-complete="off"></el-input>
			</el-form-item> -->
			<!-- <el-form-item :label="getDisplayName('telephone')" prop="telephone">
				<el-input v-model="dataForm.telephone" auto-complete="off"></el-input>
			</el-form-item> -->
			<!-- <el-form-item :label="getDisplayName('address')" prop="address">
				<el-input v-model="dataForm.address" auto-complete="off"></el-input>
				<el-select v-model="dataForm.address" multiple placeholder="请选择"
					 style="width: 100%;">
					<el-option v-for="item in roles" :key="item.id"
						:label="item.remark" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item> -->
      		<!-- <el-form-item :label="getDisplayName('postCode')" prop="postCode" >
				<el-input v-model="dataForm.postCode" auto-complete="off"></el-input>
			</el-form-item> -->
		</el-form>
		<div slot="footer" class="dialog-footer">
			<!-- :loading="editLoading" -->
			<el-button :size="size" @click.native="dialogVisible = false">{{$t('action.cancel')}}</el-button>
			<el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
		</div>
	</el-dialog>
  </div>
</template>

<script>
import { CreateWarehouseDto } from '@/libs/createDto'
import { getDisplayName } from '@/libs/common'
export default {
   props: {
    EntityData: Object
   },
   computed: {
    dataForm () {
      return this.EntityData ||  CreateWarehouseDto()
    }
   },
   data () {
    return {
        size: 'small',
        editLoading: false, 
        operation: false, // true:新增, false:编辑
        dialogVisible: false, // 新增编辑界面是否显示
        roles: [],
        dataFormRules: {
         xCode: [ { required: true, message: '请输入用户名', trigger: 'blur' } ],
         xType: [ { required: true, message: '请输入用户名', trigger: 'blur' } ],
		 xName: [ { required: true, message: '请输入用户名', trigger: 'blur' } ]
		},
    }
   },
   methods: {
    // 获取语言
	getDisplayName (key) {
      return getDisplayName('warehouse', key)[0]
    },
	submitForm() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						// this.editLoading = true
						 //console.log(this.$refs.form)
						let params = Object.assign({}, this.dataForm)
						if (params.id) {
							this.$http.putAsync(`/app/Warehouse/Update?id=${params.id}`, params)
							this.$emit('childEvent');
							this.dialogVisible = false
							this.editLoading = false
						} else {
                           this.$http.postAsync('/app/Warehouse/Create', params)
						   this.dialogVisible = false
						}
						// let userRoles = []
						// for(let i=0,len=params.userRoles.length; i<len; i++) {
						// 	let userRole = {
						// 		userId: params.id,
						// 		roleId: params.userRoles[i]
						// 	}
						// 	userRoles.push(userRole)
						// }
						// params.userRoles = userRoles
						// this.$api.user.save(params).then((res) => {
						// 	this.editLoading = false
						// 	if(res.code == 200) {
						// 		this.$message({ message: '操作成功', type: 'success' })
						// 		this.dialogVisible = false
						// 		this.$refs['dataForm'].resetFields()
						// 	} else {
						// 		this.$message({message: '操作失败, ' + res.msg, type: 'error'})
						// 	}
						// 	this.findPage(null)
						// })
					})
				}
			})
		},
   }
}
</script>

<style>

</style>