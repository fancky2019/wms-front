<template>
  <div>
    <el-dialog :title="operation?$t('action.add') : $t('edit')" width="80%"  :visible.sync="dialogVisible" :close-on-click-modal="false" >
      <!-- el-tab 标签分为两类 -->
  <el-tabs value="tab1" type="card" :animated="false">
      <el-tab-pane :label="$t('basicMessage')" name="tab1">
        <el-form :model="currModel" label-width="100px" :rules="ruleValidate" ref="form" :size="size"
			label-position="right">
          <el-row>
            <el-col :span="6">
              <el-form-item :label="getDisplayName('xCode')" prop="xCode">
                <el-input v-model="currModel.xCode" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="getDisplayName('xName')" prop="xName">
                <el-input v-model="currModel.xName" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="getDisplayName('smallestUnit')" prop="smallestUnit">
                <el-input v-model="currModel.smallestUnit" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="getDisplayName('spec')" prop="spec">
                <el-input v-model="currModel.spec" />
              </el-form-item>
            </el-col>
          </el-row>
      
          <el-row>
                        <el-col :span="6">
              <el-form-item :label="getDisplayName('materialCategoryId')" prop="materialCategoryId">
                <el-select v-model="currModel.materialCategoryId" >
                  <el-option v-for="item in $store.state.my.materialCategories" :key="item.id" :value="item.id" :label="item.xName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="getDisplayName('shortName')" prop="shortName">
                <el-input v-model="currModel.shortName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="getDisplayName('mnemonicCode')" prop="mnemonicCode">
                <el-input v-model="currModel.mnemonicCode" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="getDisplayName('barcode')" prop="barcode">
                <el-input v-model="currModel.barcode" />
              </el-form-item>
            </el-col>
          
          </el-row>
          <el-row>
 
            <el-col :span="6">
              <el-form-item :label="getDisplayName('upper')" prop="upper">
                <el-input v-model="currModel.upper" type="number" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="getDisplayName('lower')" prop="lower">
                <el-input v-model="currModel.lower" type="number" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item :label="getDisplayName('days')" prop="days">
                <el-input v-model="currModel.days" type="number" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="getDisplayName('str1')" prop="str1">
                <el-select v-if="getItems('str1')" v-model="currModel.str1" filterable clearable>
                <el-option v-for="v in getItems('str1')" :value="v.key" :key="v.key"> {{ v.value }} </el-option>
              </el-select>
              <el-input v-else v-model='currModel.str1' clearable/>
              </el-form-item>
            </el-col>

          </el-row>

          <el-row>
       
            <el-col :span="6">
              <el-form-item :label="getDisplayName('str2')" prop="str2">
                <el-select v-if="getItems('str2')" v-model="currModel.str2" filterable clearable>
                <el-option v-for="v in getItems('str2')" :value="v.key" :key="v.key"> {{ v.value }} </el-option>
              </el-select>
              <el-input v-else v-model='currModel.str2' clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="getDisplayName('str3')" prop="str3">
                <el-select v-if="getItems('str3')" v-model="currModel.str3" filterable clearable>
                <el-option v-for="v in getItems('str3')" :value="v.key" :key="v.key"> {{ v.value }} </el-option>
              </el-select>
              <el-input v-else v-model='currModel.str3' clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="getDisplayName('str4')" prop="str4">
                <el-select v-if="getItems('str4')" v-model="currModel.str4" filterable clearable>
                <el-option v-for="v in getItems('str4')" :value="v.key" :key="v.key"> {{ v.value }} </el-option>
              </el-select>
              <el-input v-else v-model='currModel.str4' clearable/>
              </el-form-item>
            </el-col>
                        <el-col :span="6">
              <el-form-item :label="getDisplayName('str5')" prop="str5">
                <el-input v-model="currModel.str5" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>

            <el-col :span="6">
              <el-form-item :label="getDisplayName('str6')" prop="str6">
                <el-input v-model="currModel.str6"  />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="getDisplayName('str7')" prop="str7">
                <el-input v-model="currModel.str7" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="getDisplayName('str8')" prop="str8">
                <el-input v-model="currModel.str8"  />
              </el-form-item>
            </el-col>
                        <el-col :span="6">
              <el-form-item :label="getDisplayName('str9')" prop="str9">
                <el-input v-model="currModel.str9" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>

            <el-col :span="6">
              <el-form-item :label="getDisplayName('str10')" prop="str10">
                <el-input v-model="currModel.str10"  />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="getDisplayName('str11')" prop="str11">
                <el-input v-model="currModel.str11" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="getDisplayName('str12')" prop="str12">
                <el-input v-model="currModel.str12"  />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="getDisplayName('str13')" prop="str13">
                <el-input v-model="currModel.str13" />
              </el-form-item>
            </el-col>

          </el-row>

          <el-row>
              <el-col :span="6">
              <el-form-item :label="getDisplayName('str14')" prop="str14">
                <el-input v-model="currModel.str14" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="getDisplayName('str15')" prop="str15">
                <el-input v-model="currModel.str15" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="getDisplayName('str16')" prop="str16">
                <el-input v-model="currModel.str16"  />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="getDisplayName('str17')" prop="str17">
                <el-input v-model="currModel.str17" />
              </el-form-item>
            </el-col>

          </el-row>
          <el-row> 
                        <el-col :span="6">
              <el-form-item :label="getDisplayName('str18')" prop="str18">
                <el-input v-model="currModel.str18"  />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="getDisplayName('str19')" prop="str19">
                <el-input v-model="currModel.str19" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="getDisplayName('str20')" prop="str20">
                <el-input v-model="currModel.str20"  />
              </el-form-item>
            </el-col>
          </el-row>


          <el-row>
            <el-col :span="6">
              <el-form-item :label="getDisplayName('isForbidden')" style="width: 280px"  prop="isForbidden">
                <el-switch v-model="currModel.isForbidden" size="large" true-value='Y' false-value='N' >
                  <span slot="open">On</span>
                  <span slot="close">Off</span>
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="getDisplayName('forbiddenComments')" prop="forbiddenComments">
                <el-input v-model="currModel.forbiddenComments" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="getDisplayName('comments')" prop="comments">
                <el-input v-model="currModel.comments"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="padding-left:100px;">
            <el-button type="primary" @click="submitForm">{{$t('save')}}</el-button>
            <el-button v-if="!currModel.id" @click="$refs.form.resetFields()" style="margin-left:50px;">{{$t('reset')}}</el-button>
          </el-row>  
        </el-form>
      </el-tab-pane>
      <el-tab-pane :label="$t('packingUnit')" name="tab2">
        <PackingUnitPage :CurrentMaterial="currModel" :currModelID="currModel.id"/>
      </el-tab-pane> 
    </el-tabs>

	</el-dialog>
  </div>
</template>

<script> 
import { CreateMaterialDto } from '@/libs/createDto'
import { getDisplayName, getRuleValidate , getManagerItems} from '@/libs/common'
import PackingUnitPage from './PackingUnit'
 

export default {
   props: {
    CurrentEntity: Object, 
   },
   computed: {
    currModel () {
      return this.CurrentEntity ||  CreateMaterialDto()
    },
   },
  components: {
    PackingUnitPage
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
        ruleValidate: {
            xCode: [
              { required: true, message: this.$t('required'), trigger: 'change' }
            ],
            xName: [
              { required: true, message: this.$t('required'), trigger: 'change' }
            ],
            materialCategoryId: [
              { required: true, message: this.$t('required'), trigger: 'change' }
            ],
            smallestUnit: [
              { required: true, message: this.$t('required'), trigger: 'change' }
            ],
            materialPropertyRuleId: [
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
    getDisplayName (key) {
      return getDisplayName('material', key)[0]
    },
    getItems (key) {
      return getManagerItems('material', key)
    },
	submitForm() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						// this.editLoading = true
						 //console.log(this.$refs.form)
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
              this.$http.putAsync(`/app/Material/Update?id=${params.id}`, params).then(data!=null?data:'') 
              // this.dialogVisible = false
              this.editLoading = false
						} else {
              let data = res => {
                if(res.status) {
                  this.$message({message: '新增成功', type: 'success'})
                  this.$set(this.currModel,"id",res.data.data.id ) 
                  this.findPage()
                } else {
                  this.$message({message: '新增失败, ' + res.msg, type: 'error'})
                }
              }
              this.$http.postAsync('/app/Material/Create', params).then(data!=null?data:'')
              // this.dialogVisible = false
						} 
					})
				}
			}) 
		},
    },
    created () {
    this.ruleValidate = getRuleValidate('material', this)
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
