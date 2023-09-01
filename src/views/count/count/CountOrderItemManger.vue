<template>
<!-- 编辑发货单明细、新建发货单明细 -->
  <el-dialog
    width="90%"
     v-dialogDrag
    :visible.sync="dialogVisible" :close-on-click-modal="false" :append-to-body="true"
     :title="operation.id ? $t('editCountOrderItem') : $t('addCountOrderItem')">
      <el-form ref="form" :model="currProptery" label-width="100px" :size="size" label-position="right">
        <!-- <el-row>
          <el-col  :span="16">
            <el-form-item :label="getDisplayName('materialId')">
            <el-select  v-model="currProptery.materialId" @change="materialSelect" :remote-method="materialFilter"
            :loading="loading" remote filterable>
            <el-option v-for="item in materialData" :value="item.id" :key="item.id" :label="item.xCode">
                {{ item.xCode }} {{ item.xName }} {{ item.spec }} {{ item.barcode }}
            </el-option>
          </el-select>
            </el-form-item>
          </el-col>
        </el-row> -->

        <el-row >
          <!-- 包装单位 -->
          <el-col  :span="6">
            <el-form-item :label="getDisplayName('rowNo')" prop="rowNo">
              <el-input type="number"   v-model="currProptery.rowNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item :label="getDisplayName('inventoryItemDetailId')">
              <el-select v-model="currProptery.inventoryItemDetailId" :placeholder="$t('pleaseChoose')" :disabled="currProptery.xStatus==1||currProptery.xStatus==2" style="width:100%">
                 <el-option v-for="item in packageUnits" :key="item.id" :value="item.id" :label="item.unit">
                 </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item :label="getDisplayName('comments')" prop="comments">
              <el-input v-model.trim="currProptery.comments"  />
            </el-form-item>
          </el-col>
        </el-row >
      <el-row >
          <el-col :span="6" >
            <el-form-item :label="getDisplayName('str1')" prop="str1">
            <el-input  v-model='currProptery.str1' clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6" >
            <el-form-item :label="getDisplayName('str2')" prop="str2">
            <el-input  v-model='currProptery.str2' clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6" >
            <el-form-item :label="getDisplayName('str3')" prop="str3">
            <el-input  v-model='currProptery.str3' clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="getDisplayName('str4')" prop="str4">
            <el-input  v-model='currProptery.str4' clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="dialogMaterial">
          <el-col :span="6" >
            <el-form-item :label="getDisplayName('str5')" prop="str5">
            <el-input  v-model='currProptery.str5' clearable/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row  style="padding-left:90px;">
       <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
         <el-button :size="size" @click.native="dialogVisible = false">{{$t('action.cancel')}}</el-button>
      </el-row >
    <div slot="footer" />
  </el-dialog>
</template>

<script>
import { getMaterial } from '@/api/webapi'
import { CreateCountPlanDto,CreateMaterialPropertyDto } from '@/libs/createDto'
import { getDisplayName, getPropertyDisplayName } from '@/libs/common'
export default {
   props: {
    CurrentEntity: Object,
    currModelIDUnit:Number,
    currModMaterial:Object
   },
   computed: {
    currProptery () {
      return  this.CurrentEntity || CreateCountPlanDto()
    },
    currMaterial(){
      return this.currModMaterial || {}
    }
   },
   // 获取祖父事件
   inject:['findPage'],
   data () {
    return {
		    pageRequest: {
          pageNum: 1,
          pageSize: 100
        }, 
        size: 'small',
        loading:false,
        editLoading: false, 
        operation: false, // true:新增, false:编辑
        dialogVisible: false, // 新增编辑界面是否显示
        dialogMaterial:false,
        roles: [],
        materialData: [],
        packageUnits: [],
        dataFormRules: {
        xCode: [ { required: true, message: this.$t('required'), trigger: 'change' } ],
		    xName: [ { required: true, message: this.$t('required'), trigger: 'change' } ]
		},
    }
   },
   methods: {
  // 获取语言
	getDisplayName (key) {
      return getDisplayName('count', key)[0]
    },
  getPropertyDisplayName (key) {
      return getPropertyDisplayName((key))
  },
	// 分页查询
	getfindPage () {
      this.$emit('findPageItem', {pageRequest:this.pageRequest})
	},
  // 出库单数据

	// 提交
	submitForm () {
		this.$refs.form.validate((valid) => {
				if (valid) {
					this.$confirm(this.$t('confirmSubmission'), this.$t('presentation'), {}).then(() => {
					let params = Object.assign({}, this.currProptery)
                    //   params.shipOrderId = this.currModelIDUnit
				  if (params.id) {
					let data = res => {
                   if (res!=undefined) {
                     if (res.status) {
					  this.$message({message: this.$t('updateSuccessfully'), type: 'success'})
                      this.getfindPage()
                      this.findPage()
					} else {
					  this.$message({message: this.$t('updateFailure') + res.msg, type: 'error'})
					}
                     }
					}
					  this.$http.putAsync(`/app/CountOrderItem/UpdateShipOrderItem?id=${params.id}`, params).then(data!=null?data:'').catch(error=>{})
					  this.dialogVisible = false
					  this.editLoading = false
					} else {
					let data = res => {
                 if (res!=undefined) {
                   if(res.status) {
                    this.$message({message: this.$t('addSuccessfully'), type: 'success'})
                    this.getfindPage()
                    this.findPage()
                  } else {
                    this.$message({message: this.$t('addFailure') + res.msg, type: 'error'})
                  }
                }
               }
               this.$http.postAsync('/app/CountOrderItem/AddShipOrderItem', params).then(data!=null?data:'').catch(error=>{})
					this.dialogVisible = false
						}
					})
				}
			})
	},
  // debounced（防抖动函数）
  materialFilter: _.debounce(async function (value) {
     if (!value) return
     let item = this.materialData.find(x => { return x.xCode === value })
     if (item) return
     this.loading = true
     this.materialData = await getMaterial(value)
     //  console.log("this.materialData-->",this.materialData)
     this.loading = false
    }, 500),
  async materialSelect (value) {
    this.dialogMaterial = true
    console.log("materialSelect-->",value)
    if (!value) return
    let material = this.materialData.find((x) => { return x.id === value })
    this.packageUnits = material.packageUnits 
   console.log("单位粗来的数据---》",   this.packageUnits )
    this.currProptery.packageUnitId = material.packageUnits[0].id
    console.log(this.currProptery.packageUnitId)
    await this.setInfor(material)
    },
  async setInfor (material) {
      if (material) {
        this.setPropertyRules(material.materialPropertyRule)
        this.setProperty(material)
        this.setMaterial(material)
        console.log(this.setProperty(material),this.setProperty(material));
        // if (this.currModel.id) {
        //   this.setExpandProperty()
        // }
        // 
        // console.log(matematerial.materialCategoryIdrial)
        await this.getAllPropertyRule(material.materialCategoryId)
        // await getAllWebApiPropertyItems(this.ruleCode)
        // this.getInvenotryQty(material.id)
      }
    },
    // 根据物料规则判断那些需要展示
    isShowProperty (property) {
      return this.currMaterial&&this.currMaterial.materialPropertyRule&&this.currMaterial.materialPropertyRule[property] > 0
    },
      setMaterial (material) {
      // console.log(material, '物料')
      //  if(material.packageUnits.length===1){
      //   this.$set(this.currProptery,"packageUnitId", material.packageUnits[0].id)
      //  }
      // this.currMaterial = material
      // this.currModel.materialId = material.id
      // this.$set(this.currProptery,"materialId", material.id)
      // this.currModel.material = material
      // this.currModel.packageUnit = material.packageUnit[0]
    },
    setProperty (material) {
      console.log(material)
      // 根据选中的物料带出基础物料中的明细并显示再界面上 
      // this.currProptery =  CreateMaterialPropertyDto()
      this.$set(this.currProptery,"materialId", material.id),
      this.$set(this.currProptery,"comments",  material.comments), 
      this.$set(this.currProptery,"str1",  material.str1),
      this.$set(this.currProptery,"str2",  material.str2),
      this.$set(this.currProptery,"str3",  material.str3),
      this.$set(this.currProptery,"str4",  material.str4),
      this.$set(this.currProptery,"str5",  material.str5),
      this.$set(this.currProptery,"str6",  material.str6),
      this.$set(this.currProptery,"str7",  material.str7),
      this.$set(this.currProptery,"str8",  material.str8),
      this.$set(this.currProptery,"str9",  material.str9),
      this.$set(this.currProptery,"str10", material.str10),
      this.$set(this.currProptery,"str11", material.str11),
      this.$set(this.currProptery,"str12", material.str12),
      this.$set(this.currProptery,"str13", material.str13),
      this.$set(this.currProptery,"str14", material.str14),
      this.$set(this.currProptery,"str15", material.str15),
      this.$set(this.currProptery,"str16", material.str16),
      this.$set(this.currProptery,"str17", material.str17),
      this.$set(this.currProptery,"str18", material.str18),
      this.$set(this.currProptery,"str19", material.str19),
      this.$set(this.currProptery,"str20", material.str20) 
      // if (this.$configuration.isMutiWarehouse) {
      //   this.currProptery.warehouseId = this.$store.state.my.currentWarehouse.id
      // }
    },
    setPropertyRules (rule) {
      if (!rule) return
      Object.keys(rule).forEach(k => {
        if (rule[k] && (rule[k] === 0 || rule[k] === 1)) {
          this.propertyRuleValidate[k] = []
        } else if (rule[k] && rule[k] === 2) {
          this.propertyRuleValidate[k] = [ { required: true, message: this.$t('required'), trigger: 'change' } ]
        } else if (rule[k] && rule[k] === 4) {
          this.propertyRuleValidate[k] = [ { required: true, message: this.$t('required'), trigger: 'change' } ]
        }
      })
      let customRule = getPropertyRuleValidate(rule.xCode, this)
      Object.keys(customRule).forEach(k => {
        this.propertyRuleValidate[k] = customRule[k]
      })
    },
    async getInvenotryQty (materialId) {
      let factoryId = this.factoryId
      let qty = await this.$http.postAsync('sqlManager/query', { configSql: 'QuerySql:InventoryPkgQty', Parameter: { materialId, factoryId } })
      if (qty && Array.isArray(qty)) {
        this.inventoryQty = qty[0].PkgQty ? qty[0].PkgQty : qty[0].PKGQTY
      }
    },
    async getAllPropertyRule(materialCategoryId){
      // 通过物料类目的ID查找到对应的属性规则的ID，然后获取属性规则中字段的显示还是不显示
      let condition = {
           "skipCount": 1,
           "maxResultCount": 10000,
           "sorting": "id desc",
           "conditionItems": [
              {
                "key": "id",
                "value": String(materialCategoryId),
                "operator": 1
              }
                ]
            }
       this.$http.postAsync("/app/MaterialCategory/GetList", condition).then((res) => { 
        if (res.data.result) {
          let innerMaterialPropertyRuleId = res.data.data.items[0].materialPropertyRuleId 
          let innerCondition = {
            "skipCount": 1,
            "maxResultCount": 10000,
            "sorting": "id desc",
            "conditionItems": [
              {
                "key": "id",
                "value": String(innerMaterialPropertyRuleId),
                "operator": 1
              }
            ]
          }
          this.$http.postAsync("/app/MaterialPropertyRule/GetList", innerCondition).then((res)=>{
            if (res.data.result) {  
              this.$set(this.currMaterial,"materialPropertyRule", res.data.data.items[0])
            }
          }).catch(error=>{})
        }
      }).catch(error=>{}) 
    } 
   }
}
</script>

<style>

</style>