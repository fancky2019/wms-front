<template>
  <div>
    <el-dialog :title="operation?$t('action.add') : $t('edit')" width="40%"  :visible.sync="dialogVisible" :close-on-click-modal="false" >
		<el-form  :model="dataForm" label-width="80px" :rules="dataFormRules" ref="form" :size="size"
			label-position="right">
			<el-form-item :label="getDisplayName('xCode')" prop="xCode">
				<el-input v-model="dataForm.xCode" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item :label="getDisplayName('xName')" prop="xName">
				<el-input v-model="dataForm.xName" type="xName" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item :label="getDisplayName('xType')" prop="xType">
			  <el-select v-model="dataForm.xType" :placeholder="$t('pleaseChoose')" style="width:100%">
                 <el-option v-for="(v, k) in $Enum.WmsWarehouse.map2" :key="k" :value="Number(k)" :label="v"></el-option>
              </el-select>
			</el-form-item>
			<el-form-item :label="getDisplayName('xStatus')" prop="allocatRelationId">
			 <el-select v-model="dataForm.xStatus" :placeholder="$t('pleaseChoose')" style="width:100%">
                 <el-option v-for="(v, k) in $Enum.WmsWarehouse.map3" :key="k" :value="Number(k)" :label="v"></el-option>
              </el-select>
			</el-form-item>
		   <el-form-item :label="getDisplayName('inIsAuto')" prop="inIsAuto">
			  <el-select v-model="dataForm.inIsAuto" :placeholder="$t('pleaseChoose')" style="width:100%">
                 <el-option v-for="(v, k) in $Enum.WmsWarehouse.map1" :key="k" :value="JSON.parse(k)" :label="v"></el-option>
              </el-select>
			</el-form-item>
			<el-form-item :label="getDisplayName('outIsAuto')" prop="outIsAuto">
			  <el-select v-model="dataForm.outIsAuto" :placeholder="$t('pleaseChoose')" style="width:100%">
                 <el-option v-for="(v, k) in $Enum.WmsWarehouse.map1" :key="k" :value="JSON.parse(k)" :label="v"></el-option>
              </el-select>
			</el-form-item>
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
// import {  wmsWarehouseInForm } from '@/libs/convertStatus'
import { getDisplayName } from '@/libs/common'
import { mapActions } from 'vuex'
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
         xType: [ { required: true, message: '请输入用户名', trigger: 'blur' } ],
		 xName: [ { required: true, message: '请输入用户名', trigger: 'blur' } ]
		},
    }
   },
   methods: {
   ...mapActions(['getWarehouseData']),
    // 获取语言
	getDisplayName (key) {
      return getDisplayName('warehouse', key)[0]
    },
	// 分页查询
	findPage () {
      this.$emit('findPage', {pageRequest:this.pageRequest})
	},
	submitForm() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
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
							this.$http.putAsync(`/app/Warehouse/Update?id=${params.id}`, params).then(data!=null?data:'').catch(error=>{})
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
                           this.$http.postAsync('/app/Warehouse/Create', params).then(data!=null?data:'').catch(error=>{})
						   this.getWarehouseData()
						   this.dialogVisible = false
						}
					})
				}
			})
		},
   }
}
</script>

<style>

</style>