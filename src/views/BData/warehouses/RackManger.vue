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
			<el-form-item :label="getDisplayName('lanewayId')" prop="lanewayId">
			  <el-select v-model="dataForm.lanewayId" :placeholder="$t('pleaseChoose')" style="width:100%">
                 <el-option v-for="item in $store.state.my.Laneways" :key="item.id" :value="item.id" :label="item.xName"></el-option>
              </el-select>
			</el-form-item>
			<el-form-item :label="getDisplayName('xStatus')" prop="xStatus">
			  <el-select v-model="dataForm.xStatus" :placeholder="$t('pleaseChoose')" style="width:100%">
                 <el-option v-for="(v, k) in $Enum.WmsConveyor.map1" :key="k" :value="Number(k)" :label="v"></el-option>
              </el-select>
			</el-form-item>
			<el-form-item :label="getDisplayName('column')" prop="column">
				<el-input v-model="dataForm.column" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item :label="getDisplayName('level')" prop="level">
				<el-input v-model="dataForm.level" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item :label="getDisplayName('deep')" prop="deep">
				<el-input v-model="dataForm.deep" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item :label="getDisplayName('totalLocationCount')" prop="totalLocationCount">
				<el-input v-model="dataForm.totalLocationCount" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item :label="getDisplayName('loadLocationCount')" prop="loadLocationCount">
				 <el-input v-model="dataForm.loadLocationCount" auto-complete="off"></el-input>
			</el-form-item>
      		<el-form-item :label="getDisplayName('usageRate')" prop="usageRate" >
				<el-input v-model="dataForm.usageRate" auto-complete="off"></el-input>
			</el-form-item>
            <el-form-item :label="getDisplayName('usageRateUpper')" prop="usageRateUpper">
				<el-input v-model="dataForm.usageRateUpper" auto-complete="off"></el-input>
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
import { CreateRackDto } from '@/libs/createDto'
import { getDisplayName } from '@/libs/common'
import { mapActions } from 'vuex'
export default {
   props: {
    EntityData: Object
   },
   computed: {
    dataForm () {
      return this.EntityData ||  CreateRackDto()
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
	...mapActions(['getRackData']),
    // 获取语言
	getDisplayName (key) {
      return getDisplayName('rack', key)[0]
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
							this.$http.putAsync(`/app/Rack/Update?id=${params.id}`, params).then(data!=null?data:'').catch(error=>{})
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
                           this.$http.postAsync('/app/Rack/Create', params).then(data!=null?data:'').catch(error=>{})
						   this.getRackData()  
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