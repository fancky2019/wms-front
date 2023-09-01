<template>
  <div>
    <el-dialog :title="operation?$t('action.add') : $t('edit')" width="40%"  :visible.sync="dialogVisible" :close-on-click-modal="false" >
		<el-form  :model="dataForm" label-width="80px" :rules="dataFormRules" ref="form" :size="size"
			label-position="right">
			<el-form-item :label="getDisplayName('warehouseId')" prop="warehouseId">
				<el-input v-model="dataForm.warehouseId" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item :label="getDisplayName('xCode')" prop="xCode">
				<el-input v-model="dataForm.xCode" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item :label="getDisplayName('xName')" prop="xName">
				<el-input v-model="dataForm.xName" type="xName" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item :label="getDisplayName('xStatus')" prop="allocatRelationId">
				<el-switch v-model="dataForm.xStatus"  active-text="开启" inactive-text="禁用"></el-switch>
			</el-form-item>
			<el-form-item :label="getDisplayName('description')" prop="description">
				<el-input v-model="dataForm.description" auto-complete="off"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer" >
			<!-- :loading="editLoading" -->
			<el-button :size="size" @click.native="dialogVisible = false">{{$t('action.cancel')}}</el-button>
			<el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
		</div>
	</el-dialog>
  </div>
</template>

<script>
import { CreateZoneDto } from '@/libs/createDto'
import { getDisplayName } from '@/libs/common'
export default {
   props: {
    EntityData: Object
   },
   computed: {
    dataForm () {
      return this.EntityData ||  CreateZoneDto()
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
      return getDisplayName('zone', key)[0]
    },
	submitForm() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
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
					})
				}
			})
		},
   }
}
</script>

<style lang="less" scoped>
/deep/.el-switch__label * {
    line-height: 1;
    font-size: 12px;
    display: inline-block;
  }
 /deep/.el-switch__label {
    position: absolute;
    display: none;
    color: #fff !important;
    font-size: 8px !important;
  }
 /*打开时文字位置设置*/
/deep/.el-switch__label--right {
    z-index: 1;
    // right: 5px;
  }
  /*关闭时文字位置设置*/
/deep/.el-switch__label--left {
    z-index: 1;
    left: 19px;
  }
  /*显示文字*/
/deep/.el-switch__label.is-active {
    display: block;
  }
   /*开关宽度*/
/deep/.el-switch .el-switch__core,
 /deep/ .el-switch .el-switch__label {
    width: 50px !important;
  }
</style>