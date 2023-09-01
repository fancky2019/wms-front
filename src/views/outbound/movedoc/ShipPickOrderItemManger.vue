<template>
  <el-dialog
    width="90%"
    :visible.sync="dialogVisible" :close-on-click-modal="false" :append-to-body="true"
     :title="operation.id ? $t('editShipOrderPickDetail') : $t('addShipOrderPickDetail')">
      <el-form ref="form" :model="currProptery" label-width="100px" :size="size" label-position="right">
        <el-row>
         <el-col  :span="6">
            <el-form-item :label="getDisplayName('shipPickOrderId')">
              <el-select v-model="currProptery.shipPickOrderId" :placeholder="$t('pleaseChoose')" style="width:100%">
                 <el-option v-for="item in $store.state.my.BasisMaterials" :key="item.id" :value="item.id" :label="item.xName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        <el-col  :span="6">
          <el-form-item :label="getDisplayName('planPkgQuantity')" prop="planPkgQuantity">
            <el-input v-model="currProptery.planPkgQuantity" />
          </el-form-item>
        </el-col>
        <el-col   :span="6">
          <el-form-item :label="getDisplayName('allocatedPkgQuantity')" prop="allocatedPkgQuantity">
            <el-input v-model="currProptery.allocatedPkgQuantity" />
          </el-form-item>
        </el-col>
        <el-col  :span="6">
          <el-form-item :label="getDisplayName('movedPkgQuantity')" prop="movedPkgQuantity">
            <el-input v-model="currProptery.movedPkgQuantity" />
          </el-form-item>
        </el-col>
        </el-row>
        <el-row >
          <el-col :span="6">
            <el-form-item :label="getDisplayName('fromLocId')" prop="fromLocId">
              <el-input   v-model="currProptery.fromLocId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="getDisplayName('fromLocCode')" prop="fromLocCode">
              <el-input   v-model="currProptery.fromLocCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item :label="getDisplayName('toLocCode')" prop="toLocCode">
              <el-input    v-model="currProptery.toLocCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item :label="getDisplayName('toLocCode')" prop="toLocCode">
              <el-input  v-model="currProptery.toLocCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row >
        <el-row >
          <el-col  :span="6">
            <el-form-item :label="getDisplayName('shipOrderItemId')">
              <el-select v-model="currProptery.shipOrderItemId" :placeholder="$t('pleaseChoose')" style="width:100%">
                 <el-option v-for="item in $store.state.my.BasisMaterials" :key="item.id" :value="item.id" :label="item.xName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row >
      </el-form>
      <el-row  style="padding-left:100px;">
       <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
         <el-button :size="size" @click.native="dialogVisible = false">{{$t('action.cancel')}}</el-button>
      </el-row >
    <div slot="footer" />
  </el-dialog>
</template>

<script>
import { CreateShipPickOrderItemDto } from '@/libs/createDto'
import { getDisplayName } from '@/libs/common'
export default {
   props: {
    CurrentEntity: Object
   },
   computed: {
    currProptery () {
      return  this.CurrentEntity || CreateShipPickOrderItemDto()
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
		    xName: [ { required: true, message: this.$t('required'), trigger: 'change' } ]
		},
    }
   },
   methods: {
    // 获取语言
	getDisplayName (key) {
      return getDisplayName('ShipPickOrderItem', key)[0]
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
						let params = Object.assign({}, this.currProptery)
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
							this.$http.putAsync(`/app/ShipPickOrderItem/Update?id=${params.id}`, params).then(data!=null?data:'').catch(error=>{})
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
                     this.$http.postAsync('/app/ShipPickOrderItem/Create', params).then(data!=null?data:'').catch(error=>{})
						   this.dialogVisible = false
						}
					}).catch(error=>{})
				}
			})
	}
   }
}
</script>

<style>

</style>