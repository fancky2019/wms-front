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
      <el-form-item :label="getDisplayName('materialPropertyRuleId')" prop="materialPropertyRuleId" >
        <el-select v-model="dataForm.materialPropertyRuleId">
          <el-option v-for="item in $store.state.my.propertyRules" :key="item.id" :value="item.id" :label="item.xName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="getDisplayName('str1')" prop="str1">
				<el-input v-model="dataForm.str1" auto-complete="off"></el-input>
			</el-form-item>
      <el-form-item :label="getDisplayName('str2')" prop="str2">
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
			<!-- :loading="editLoading" -->
			<el-button :size="size" @click.native="dialogVisible = false">{{$t('action.cancel')}}</el-button>
			<el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
		</div>
	</el-dialog>
  </div>
</template>

<script>
import { CreateMaterialCategoryDto } from '@/libs/createDto'
import { getDisplayName, getRuleValidate } from '@/libs/common'
export default {
   props: {
    EntityData: Object
   },
   computed: {
    dataForm () {
      return this.EntityData ||  CreateMaterialCategoryDto()
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
          xCode: [ { required: true, message:this.$t('required'), trigger: 'change' } ],

          xName: [ { required: true, message:this.$t('required'), trigger: 'change' } ]
		  },
    }
   },
   methods: {
         // 分页查询
    findPage() {
  //console.log("fffffffffindpage--->")
      this.$emit('findPage', {pageRequest:this.pageRequest})
    },
    // 获取语言
	getDisplayName (key) {
      return getDisplayName('materialCategory', key)[0]
    },
	submitForm() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						// this.editLoading = true
						 //console.log(this.$refs.form)
						let params = Object.assign({}, this.dataForm)
						if (params.id) { 
              let data = res => {
              if(res.status) {
                  this.$message({message: '更新成功', type: 'success'})
                  this.findPage()
                } else {
                  this.$message({message: '更新失败, ' + res.msg, type: 'error'})
                }
              } 
              this.$http.putAsync(`/app/MaterialCategory/Update?id=${params.id}`, params).then(data!=null?data:'') 
              this.dialogVisible = false
              this.editLoading = false
						} else {
              let data = res => {
                if(res.status) {
                  this.$message({message: '新增成功', type: 'success'})
                  this.findPage()
                } else {
                  this.$message({message: '新增失败, ' + res.msg, type: 'error'})
                }
              }
              this.$http.postAsync('/app/MaterialCategory/Create', params).then(data!=null?data:'')
              this.dialogVisible = false
						} 
					})
				}
			}) 
		},
   },
     created () {
    this.ruleValidate = getRuleValidate('materialCategory', this)
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
