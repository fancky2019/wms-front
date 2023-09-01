<template>
  <div>
    <el-dialog :title="operation?$t('action.add') : $t('edit')" width="80%"  :visible.sync="dialogVisible" :close-on-click-modal="false" >
		<el-form  :model="dataForm" label-width="100px" :rules="dataFormRules" ref="form" :size="size"
			label-position="right"> 
      <el-row>
        <el-col :span="6">
          <el-form-item :label="getDisplayName('xCode')" prop="xCode">
            <el-input v-model="dataForm.xCode" :disabled="dataForm.id != undefined"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="getDisplayName('xName')" prop="xName">
            <el-input v-model="dataForm.xName"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
        <el-form-item :label="getDisplayName('type')" prop="type">
          <el-select v-model="dataForm.type" placeholder="请选择" style="width:100%">
            <el-option v-for="(item, k) in $Enum.Orgnization.map2" :key="item" :value="item" :label="k"></el-option>
          </el-select> 
        </el-form-item>
        </el-col>

      </el-row>
      <el-row>
                <el-col :span="6">
          <el-form-item :label="getDisplayName('xStatus')">
            <el-switch v-model="dataForm.xStatus" size="large" :active-value="1" :inactive-value="0"  :inactive-text="$t('disable')" :active-text="$t('enable')" >
            
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="getDisplayName('contactName')">
              <el-input v-model="dataForm.contactName" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="getDisplayName('mobile')">
            <el-input v-model="dataForm.mobile" />
          </el-form-item>
        </el-col>

 
      </el-row>
      <el-row>
 
     
                  <el-col :span="6">
          <el-form-item :label="getDisplayName('telephone')">
            <el-input v-model="dataForm.telephone" />
          </el-form-item>
        </el-col>
           <el-col :span="6">
          <el-form-item :label="getDisplayName('address')">
            <el-input v-model="dataForm.address" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="getDisplayName('postcode')">
            <el-input v-model="dataForm.postcode" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
                <el-col :span="6">
          <el-form-item :label="getDisplayName('city')">
            <el-input v-model="dataForm.city" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          
          <el-form-item :label="getDisplayName('province')">
            <el-input v-model="dataForm.province" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="getDisplayName('country')">
            <el-input v-model="dataForm.country" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="getDisplayName('str1')">
            <el-input v-model="dataForm.str1" />
          </el-form-item>
        </el-col>
  
      </el-row>
      <el-row>

         <el-col :span="6">
          <el-form-item :label="getDisplayName('str2')">
            <el-input v-model="dataForm.str2" />
          </el-form-item>
        </el-col>
 
                <el-col :span="6">
          <el-form-item :label="getDisplayName('str3')">
            <el-input v-model="dataForm.str3" />
          </el-form-item>
        </el-col>
                <el-col :span="6">
          <el-form-item :label="getDisplayName('str4')">
            <el-input v-model="dataForm.str4" />
          </el-form-item>
        </el-col>
                <el-col :span="6">
          <el-form-item :label="getDisplayName('str5')">
            <el-input v-model="dataForm.str5" />
          </el-form-item>
        </el-col> 
      </el-row>
                  
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
import { CreateOrgnizationDto } from '@/libs/createDto'
import { getDisplayName, getRuleValidate } from '@/libs/common'
export default {
   props: {
    EntityData: Object
   },
   computed: {
    dataForm () {
      return this.EntityData ||  CreateOrgnizationDto()
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
      this.$emit('findPage', {pageRequest:this.pageRequest})
    },
    // 获取语言
	getDisplayName (key) {
      return getDisplayName('orgnization', key)[0]
    },
	submitForm() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => { 
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
              this.$http.putAsync(`/app/Orgnization/Update?id=${params.id}`, params).then(data!=null?data:'') 
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
              this.$http.postAsync('/app/Orgnization/Create', params).then(data!=null?data:'')
              this.dialogVisible = false
						} 
					})
				}
			}) 
		},
   },
     created () {
    this.dataFormRules = getRuleValidate('orgnization', this)
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
    left: 1px;
  }
  /*关闭时文字位置设置*/
/deep/.el-switch__label--left {
    z-index: 1;
    left: 18px;
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
