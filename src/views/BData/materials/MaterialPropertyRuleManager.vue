<template>
  <div>
    <el-dialog :title="operation?$t('action.add') : $t('edit')" width="80%"  :visible.sync="dialogVisible" :close-on-click-modal="false" >
		<el-form  :model="currModel" label-width="100px" :rules="ruleValidate" ref="form" :size="size"
			label-position="right"> 
    <el-row>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('xCode')" prop="xCode">
          <el-input v-model="currModel.xCode"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('xName')" prop="xName">
          <el-input v-model="currModel.xName"></el-input>
        </el-form-item>
      </el-col>
        <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('inboundTime')">
          <el-select disabled v-model="currModel.inboundTime" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('receivedTime')">
          <el-select disabled v-model="currModel.receivedTime" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
    
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('productionTime')">
          <el-select v-model="currModel.productionTime" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('expiredTime')">
          <el-select v-model="currModel.expiredTime" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('qcStartTime')">
          <el-select v-model="currModel.qcStartTime" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('preservationDays')">
          <el-select v-model="currModel.preservationDays" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>


       <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('batchNo')">
          <el-select v-model="currModel.batchNo" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
             <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('batchNo2')">
          <el-select v-model="currModel.batchNo2" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
             <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('batchNo3')">
          <el-select v-model="currModel.batchNo3" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>

    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str1')">
          <el-select v-model="currModel.m_Str1" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str2')">
          <el-select v-model="currModel.m_Str2" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str3')">
          <el-select v-model="currModel.m_Str3" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str4')">
          <el-select v-model="currModel.m_Str4" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str5')">
          <el-select v-model="currModel.m_Str5" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str6')">
          <el-select v-model="currModel.m_Str6" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str7')">
          <el-select v-model="currModel.m_Str7" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str8')">
          <el-select v-model="currModel.m_Str8" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str9')">
          <el-select v-model="currModel.m_Str9" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str10')">
          <el-select v-model="currModel.m_Str10" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str11')">
          <el-select v-model="currModel.m_Str11" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str12')">
          <el-select v-model="currModel.m_Str12" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str13')">
          <el-select v-model="currModel.m_Str13" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str14')">
          <el-select v-model="currModel.m_Str14" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str15')">
          <el-select v-model="currModel.m_Str15" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str16')">
          <el-select v-model="currModel.m_Str16" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str17')">
          <el-select v-model="currModel.m_Str17" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str18')">
          <el-select v-model="currModel.m_Str18" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str19')">
          <el-select v-model="currModel.m_Str19" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str20')">
          <el-select v-model="currModel.m_Str20" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
     <el-row>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str21')">
          <el-select v-model="currModel.m_Str21" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str22')">
          <el-select v-model="currModel.m_Str22" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str23')">
          <el-select v-model="currModel.m_Str23" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str24')">
          <el-select v-model="currModel.m_Str24" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str25')">
          <el-select v-model="currModel.m_Str25" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str26')">
          <el-select v-model="currModel.m_Str26" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str27')">
          <el-select v-model="currModel.m_Str27" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str28')">
          <el-select v-model="currModel.m_Str28" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str29')">
          <el-select v-model="currModel.m_Str29" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str30')">
          <el-select v-model="currModel.m_Str30" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str31')">
          <el-select v-model="currModel.m_Str31" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str32')">
          <el-select v-model="currModel.m_Str32" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str33')">
          <el-select v-model="currModel.m_Str33" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str34')">
          <el-select v-model="currModel.m_Str34" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str35')">
          <el-select v-model="currModel.m_Str35" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str36')">
          <el-select v-model="currModel.m_Str36" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str37')">
          <el-select v-model="currModel.m_Str37" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str38')">
          <el-select v-model="currModel.m_Str38" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str39')">
          <el-select v-model="currModel.m_Str39" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="getPropertyDisplayName('m_Str40')">
          <el-select v-model="currModel.m_Str40" >
            <el-option v-for="(v, k) in $Enum.MaterialPropertyRuleE.map1" :key="k" :value="Number(k)" :label="v"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row> 
		</el-form>
		<div slot="footer" class="dialog-footer">
			<!-- :loading="editLoading" -->
			<el-button :size="size" @click.native="dialogVisible = false">{{$t('action.cancel')}}</el-button>
			<el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('save')}}</el-button>
		</div>
	</el-dialog>
  </div>
</template>

<script>
import { CreateMaterialPropertyRuleDto } from '@/libs/createDto'
import { getPropertyDisplayName } from '@/libs/common'
export default {
   props: {
    EntityData: Object
   },
   computed: {
    currModel () {
      return this.EntityData ||  CreateMaterialPropertyRuleDto()
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
        ruleValidate: {
          xCode: [
            { required: true, message: this.$t('required'), trigger: 'change' }
          ],
          xName: [
            { required: true, message: this.$t('required'), trigger: 'change' }
          ]
        }
    }
   },
   methods: {
         // 分页查询
    findPage() { 
      this.$emit('findPage', {pageRequest:this.pageRequest})
    },
    // 获取语言
    getPropertyDisplayName (property) {
      return getPropertyDisplayName(property, this.currModel.xCode)
    },
	submitForm() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						let params = Object.assign({}, this.currModel)
						if (params.id) { 
              let data = res => {
              if(res.status) {
                  this.$message({message: '更新成功', type: 'success'})
                  this.findPage()
                } else {
                  this.$message({message: '更新失败, ' + res.msg, type: 'error'})
                }
              } 
              this.$http.putAsync(`/app/MaterialPropertyRule/Update?id=${params.id}`, params).then(data!=null?data:'') 
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
              this.$http.postAsync('/app/MaterialPropertyRule/Create', params).then(data!=null?data:'')
              this.dialogVisible = false
						} 
					})
				}
			}) 
		},
   },
 
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
