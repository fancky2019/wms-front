<template>
  <div>
    <el-dialog  :append-to-body="true" :title="operation?$t('action.add') : $t('edit')" width="60%"  :visible.sync="dialogVisible" :close-on-click-modal="false" >
		<el-form  :model="currModel" label-width="100px" :rules="ruleInline" ref="form" :size="size"
			label-position="right">
        <el-row>
          <el-col :span="8">
          <el-form-item :label="getDisplayName('unit')" prop="unit">
            <el-input v-model="currModel.unit"/>
          </el-form-item>
          </el-col>
          <el-col :span="8">
          <el-form-item :label="getDisplayName('convertFigureSmallUnit')" prop="convertFigureSmallUnit">
            <el-input v-model="currModel.convertFigureSmallUnit" type="number"/>
          </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="getDisplayName('length')">
              <el-input v-model="currModel.length"  type="number"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="getDisplayName('width')">
              <el-input v-model="currModel.width"  type="number"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="getDisplayName('height')">
              <el-input v-model="currModel.height" type="number"/>
            </el-form-item>
          </el-col> 
          <el-col :span="8">
            <el-form-item :label="getDisplayName('weight')">
              <el-input v-model="currModel.weight" type="number"/>
            </el-form-item>
          </el-col>
          </el-row> 
          <el-row> 
          <el-col :span="8">
            <el-form-item :label="getDisplayName('volume')">
              <el-input v-model="currModel.volume" type="number"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="getDisplayName('fullPalletQuantity')">
              <el-input v-model="currModel.fullPalletQuantity"  type="number"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="getDisplayName('str1')">
              <el-input v-model="currModel.str1" />
            </el-form-item>
          </el-col>
          </el-row> 
                    <el-row> 
          <el-col :span="8">
            <el-form-item :label="getDisplayName('str2')">
              <el-input v-model="currModel.str2" type="str2"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="getDisplayName('str3')">
              <el-input v-model="currModel.str3"  />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="getDisplayName('str4')">
              <el-input v-model="currModel.str4" />
            </el-form-item>
          </el-col>
                    <el-col :span="8">
            <el-form-item :label="getDisplayName('str5')">
              <el-input v-model="currModel.str5" />
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
import { CreatePackageUnitDto } from '@/libs/createDto'
import { getDisplayName, getRuleValidate } from '@/libs/common'
export default {
   props: {
    CurrentEntity: Object,
    currModelIDUnit:Number
   },
   computed: {
    currModel () {
      return this.CurrentEntity ||  CreatePackageUnitDto()
    }
   },
   data () {
    return {
        pageRequest: {
          pageNum: 1,
          pageSize: 10
        }, 
        size: 'small',
        editLoading: false, 
        operation: false, // true:新增, false:编辑
        dialogVisible: false, // 新增编辑界面是否显示
        roles: [],
        ruleInline: {
        unit: [
          { required: true, message: this.$t('required'), trigger: 'change' }
        ],
        pkgLevel: [
          { required: true, message: this.$t('required'), trigger: 'change' }
        ]
        }
    }
   },
   methods: {
         // 分页查询
    findPageUnit(res,mode) {
      this.$emit('findPageUnit', {datares:res,mode:mode})
    },

             // 分页查询
    findPage() {
      this.$emit('findPage', {pageRequest:this.pageRequest})
    },
    
    // 获取语言
    getDisplayName (key) {
        return getDisplayName('packageUnit', key)[0]
      },
    submitForm() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              // this.editLoading = true
               //console.log(this.$refs.form)
              let params = Object.assign({}, this.currModel)
              params.materialId = this.currModelIDUnit
              if (params.id) { 
                let data = res => {
                if(res.status) {
                    this.$message({message: '更新成功', type: 'success'})
                    // this.findPageUnit(res,"update")
                    this.findPage()
                  } else {
                    this.$message({message: '更新失败, ' + res.msg, type: 'error'})
                  }
                } 
                this.$http.putAsync(`/app/PackageUnit/Update?id=${params.id}`, params).then(data!=null?data:'') 
                this.dialogVisible = false
                this.editLoading = false
              } else {
                let data = res => {
                  if(res.status) {
                    this.$message({message: '新增成功', type: 'success'})
                    // this.findPageUnit(res,"add")
                             this.findPage()
                  } else {
                    this.$message({message: '新增失败, ' + res.msg, type: 'error'})
                  }
                }
                this.$http.postAsync('/app/PackageUnit/Create', params).then(data!=null?data:'')
                this.dialogVisible = false
              } 
            })
          }
        }) 
      },
    },
     created () {
    this.ruleValidate = getRuleValidate('packageUnit', this)
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
