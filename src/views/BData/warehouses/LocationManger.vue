<template>
  <div>
    <el-dialog :title="operation?$t('action.add') : $t('edit')" width="55%"  :visible.sync="dialogVisible" :close-on-click-modal="false" >
		<el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="form" :size="size" 
			label-position="right">
			<el-row :gutter="10">
              <el-col :span="6">
           		  <el-form-item :label="getDisplayName('xCode')" prop="xCode">
           		     <el-input v-model="dataForm.xCode" ></el-input>
           		  </el-form-item>
             </el-col>
             <el-col :span="6">
				        <el-form-item :label="getDisplayName('xName')" prop="xName">
				           <el-input v-model="dataForm.xName" type="xName" auto-complete="off"></el-input>
			          </el-form-item>
              </el-col>
             <el-col :span="6">
           	<el-form-item :label="getDisplayName('xType')" prop="xType">
           		<el-select v-model="dataForm.xType" :placeholder="$t('pleaseChoose')" style="width:100%">
                    <el-option v-for="(v, k) in  $Enum.WmsLocationType.map5" :key="k" :value="Number(k)" :label="v"></el-option>
                </el-select>
           	</el-form-item>
             </el-col>
             <el-col :span="6">
              	<el-form-item :label="getDisplayName('xStatus')" prop="xStatus">
           		  <el-select v-model="dataForm.xStatus" :placeholder="$t('pleaseChoose')" style="width:100%">
                      <el-option v-for="(v, k) in  $Enum.WmsLocation.map1" :key="k" :value="Number(k)" :label="v"></el-option>
                  </el-select>
           		</el-form-item>
             </el-col>
           </el-row>
		   <el-row :gutter="10">
			<el-col :span="6">
               <el-form-item :label="getDisplayName('xRack')" prop="xRack">
				<el-input v-model="dataForm.xRack" auto-complete="off"></el-input>
			  </el-form-item>
			</el-col>
            <el-col :span="6">
               <el-form-item :label="getDisplayName('xColumn')" prop="xColumn">
				<el-input v-model="dataForm.xColumn" auto-complete="off"></el-input>
			  </el-form-item>
			</el-col>
            <el-col :span="6">
               <el-form-item :label="getDisplayName('xLevel')" prop="xLevel">
				<el-input v-model="dataForm.xLevel" auto-complete="off"></el-input>
			  </el-form-item>
			</el-col>
            <el-col :span="6">
               <el-form-item :label="getDisplayName('xDepth')" prop="xDepth">
				<el-input v-model="dataForm.xDepth" auto-complete="off"></el-input>
			  </el-form-item>
			</el-col>
           </el-row>
		    <el-row :gutter="10">

                         <el-col :span="6">
           	<el-form-item :label="getDisplayName('lanwayId')" prop="lanwayId">
           		<el-select v-model="dataForm.lanwayId" :placeholder="$t('pleaseChoose')" style="width:100%">
                    <el-option v-for="item in  $store.state.my.Laneways" :key="item.id" :value="item.id" :label="item.xName"></el-option>
                </el-select>
           	</el-form-item>
             </el-col>
             <el-col :span="6">
              	<el-form-item :label="getDisplayName('rackId')" prop="rackId">
           		  <el-select v-model="dataForm.rackId" :placeholder="$t('pleaseChoose')" style="width:100%">
                      <el-option v-for="item in  $store.state.my.Racks" :key="item.id" :value="item.id" :label="item.xName"></el-option>
                  </el-select>
           		</el-form-item>
             </el-col>
           </el-row>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button :size="size" @click.native="dialogVisible = false">{{$t('action.cancel')}}</el-button>
			<el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
		</div>
	</el-dialog>
  </div>
</template>

<script>
import { CreateLocationDto } from '@/libs/createDto'
import { getDisplayName, getRuleValidate } from '@/libs/common'
export default {
   props: {
    EntityData: Object
   },
   computed: {
    dataForm () {
      return this.EntityData ||  CreateLocationDto()
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
        xCode: [ { required: true, message: this.$t('required'), trigger: 'change' } ],
        xType: [ { required: true, message: this.$t('required'), trigger: 'blur' } ],
		    xName: [ { required: true, message: this.$t('required'), trigger: 'change' } ]
		},
    }
   },
   methods: {
    // 获取语言
	getDisplayName (key) {
      return getDisplayName('location', key)[0]
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
							this.$http.putAsync(`/app/Location/Update?id=${params.id}`, params).then(data!=null?data:'').catch(error=>{})
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
               this.$http.postAsync('/app/Location/Create', params).then(data!=null?data:'').catch(error=>{})
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