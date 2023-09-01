<template>
  <div>
    <el-dialog 
    width="80%"  
    :title="operation?$t('action.add') : $t('edit')" 
    :visible.sync="dialogVisible" :close-on-click-modal="false" >
    <el-tabs value="tab1" type="card" :animated="false">
    <el-tab-pane :label="$t('basicMessage')" name="tab1">
		<el-form :model="currModel" label-width="100px"  ref="form" :size="size" 
			label-position="right">
        <el-row>
          <el-col :span="6"  >
			<el-form-item :label="getDisplayName('warehouseId')" prop="warehouseId">
			  <el-select v-model="currModel.warehouseId" :placeholder="$t('pleaseChoose')" style="width:100%">
                 <el-option v-for="item in $store.state.my.warehouses" :key="item.id" :value="item.id" :label="item.xName"></el-option>
              </el-select>
			</el-form-item> 
          </el-col>  
          <el-col :span="6"  >
            <el-form-item :label="getDisplayName('shipOrderId')">
              <el-select v-model="currModel.shipOrderId" :placeholder="$t('pleaseChoose')" style="width:100%">
                 <el-option v-for="item in $store.state.my.ShipOrders" :key="item.id" :value="item.id" :label="item.applyShipOrderCode"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        <el-col :span="6" >
          <el-form-item :label="getDisplayName('status')" prop="status">
              <el-select v-model="currModel.status" :placeholder="$t('pleaseChoose')" style="width:100%">
                 <el-option v-for="(v, k) in $Enum.WmsApplyShipOrder.map1" :key="k" :value="Number(k)" :label="v"></el-option>
              </el-select>
            </el-form-item>
        </el-col>
          <el-col :span="6" >
            <el-form-item :label="getDisplayName('billTypeId')" prop="billTypeId">
              <el-select v-model="currModel.billTypeId" >
                <el-option v-for="item in $store.state.my.billTypes" :key="item.id" :value="item.id" :label="item.xName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">
              <el-form-item :label="getDisplayName('planPkgQuantity')" prop="planPkgQuantity">
			     <el-input v-model="currModel.planPkgQuantity" auto-complete="off"></el-input>
			  </el-form-item>
             </el-col>
			<el-col :span="6">
            <el-form-item :label="getDisplayName('allocatedPkgQuantity')" prop="allocatedPkgQuantity" >
				<el-input v-model="currModel.allocatedPkgQuantity" auto-complete="off"></el-input>
			</el-form-item>
			</el-col>
            <el-col :span="6">
            <el-form-item :label="getDisplayName('movedPkgQuantity')" prop="movedPkgQuantity">
				<el-input v-model="currModel.movedPkgQuantity" auto-complete="off"></el-input>
			</el-form-item>
			</el-col>
        </el-row>
        <el-row>
        <el-col :span="8" style="margin-left:90px">
            <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
            <el-button :size="size" @click.native="dialogVisible = false">{{$t('action.cancel')}}</el-button>
        </el-col>
        </el-row>
		</el-form>
     </el-tab-pane>
     <el-tab-pane :label="$t('PickManagement')" name="tab2">
    <ShipPickOrderItem  :columns="columns"   :EntityItemData="currModel" :currModelID="currModel.id"/>
	</el-tab-pane> 
  </el-tabs>
  </el-dialog>
  </div>
</template>

<script>
import { CreateShipPickOrderDto } from '@/libs/createDto'
import { getDisplayName } from '@/libs/common'
import ShipPickOrderItem from './ShipPickOrderItem'
export default {
 components: {
     ShipPickOrderItem
   },
   props: {
    columns:Array,
    EntityItemData: Object
   },
   computed: {
    currModel () {
      return this.EntityItemData ||  CreateShipPickOrderDto()
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
        currentRow: undefined,
        operation: false, // true:新增, false:编辑
        dialogVisible: false, // 新增编辑界面是否显示
        showOperation:true,
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
      return getDisplayName('ShipPickOrder', key)[0]
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
						let params = Object.assign({}, this.currModel)
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
							this.$http.putAsync(`/app/ShipPickOrder/Update?id=${params.id}`, params).then(data!=null?data:'').catch(error=>{})
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
              this.$http.postAsync('/app/ShipPickOrder/Create', params).then(data!=null?data:'').catch(error=>{})
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