<template>
  <div style="width: 100%;height: 100%;"  class="search-con search-con-top">
      <div  style="display:inline">
        <el-select v-model="searchKey"  :size="size" class="search-col">
          <el-option v-for="item in simpleSearchColumns" :value="item.key" :label="item.title" :key="`search-col-${item.key}`"></el-option>
        </el-select>
        <el-select v-if="isAutoCombox()"  :size="size" class="search-col search-input" v-model="searchValue" filterable multiple  allow-create clearable>
          <el-option v-for="(v, k) in items" :value="k" :key="`search-col-${k}`" :label="v" ></el-option>
        </el-select>
        <el-select v-else-if="isCombox()"  :size="size" class="search-col search-input" v-model="searchValue" filterable clearable>
          <el-option v-for="(v, k) in items" :value="k" :key="`search-col-${k}`"  :label="v"></el-option>
        </el-select>
        <el-select v-else-if="isRemoteMethod()"  :size="size" class="search-col search-input" v-model="searchValue" :remote-method="remoteMethod" filterable clearable>
          <el-option v-for="item in itemArray" :value="item.k" :key="`search-col-${item.k}`"   :label="item.v " ></el-option>
        </el-select>
        <el-date-picker v-else-if="isDate()"   :size="size" type="datetime" placeholder="Select date" @on-change="handelDateChange"  v-model="searchValue" clearable></el-date-picker>
        <el-date-picker v-else-if="isDateRange()"  :size="size" type="datetimerange" placeholder="Select date" @on-change="handelDateChange"  v-model="searchValue" clearable></el-date-picker>
        <!-- <NumberRange v-else-if="isNumberRange()" @on-change="handelDateChange" v-model="searchValue"/> -->
        <el-input v-else   :size="size" @on-change="handleClear" clearable class="search-input" v-model="searchValue"/>
          <kt-button icon="fa fa-search" :label="$t('search')" perms="sys:dict:add" type="primary" class="search-btn" @click="handleSearch" />
          <kt-button icon="fa fa-search" :label="$t('highSearch')" perms="sys:dict:add" style="color:#2d8cf0;border-color:#2d8cf0;margin-left:10px;"  class="search-btn" v-if='highSearch' @click="IsExpand = !IsExpand"  />

        <!-- <el-button @click="handleSearch" class="search-btn" icon="ios-search" type="primary">{{$t('search')}}</el-button>  -->
        <!-- <el-button v-if='highSearch' @click.prevent="IsExpand = !IsExpand" style="color:#2d8cf0;border-color:#2d8cf0;margin-left:10px;">{{$t('highSearch')}}</el-button> -->
      </div>
      <el-dialog title="高级查询"  :append-to-body="true"  width="70%" :visible.sync="IsExpand" :close-on-click-modal="false">
          <el-form ref="highSearchForm" v-if="highSearch" label-width="120px" label-position="right" :model="highCondition">
            <el-row v-for="(items, i) in highSearchColumns" :key="i">
              <el-col v-for="(item, j) in items" :key="j" :span="8">
              <el-form-item :label="item.title">
                 <el-select  :size="size" transfer v-if="(item.items && Object.keys(item.items).length === 0) || item.operator === 'in'" class="search-col search-input" v-model="highCondition[item.key]" filterable multiple  allow-create clearable>
                    <el-option v-for="(v, k) in item.items" :value="k" :key="`search-col-${k}`" :label="v"></el-option>
                  </el-select>
                  <el-select  :size="size" transfer v-else-if="item.items" class="search-col search-input" v-model="highCondition[item.key]" filterable clearable>
                    <el-option v-for="(v, k) in item.items" :value="k" :key="`search-col-${k}`" :label="v"> </el-option>
                  </el-select>
                  <el-select  :size="size" transfer v-else-if="item.remoteMethod" class="search-col search-input" @on-query-change="setCurrentSearchCol(item)" :remote-method="remoteMethod2" v-model="highCondition[item.key]"  filterable clearable>
                    <el-option v-for="item2 in itemArray" :value="item2.k" :key="`search-col-${item2.k}`" :label="item2.v"> </el-option>
                  </el-select>
                  <el-date-picker  :size="size" transfer v-else-if="item.type === 'date'"  style="width:100%" type="datetime"  @on-change="highCondition[item.key] = $event" v-model="highCondition[item.key]"></el-date-picker>
                  <el-date-picker  :size="size" transfer  v-else-if="item.type === 'daterange'" style="width:100%" class=" search-input" type="datetimerange" @on-change="highCondition[item.key] = $event" v-model="highCondition[item.key]"></el-date-picker>
                  <!-- <NumberRange v-else-if="item.type === 'numberrange'" @on-change="highCondition[item.key] = $event" v-model="highCondition[item.key]"/> -->
                  <el-input  :size="size" v-else clearable class="search-input" v-model="highCondition[item.key]"/>
              </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item>
              <el-col :span="12">
                <kt-button icon="fa fa-search" :label="$t('search')" perms="sys:dict:add" type="primary"   @click="handleHighSearch" />
                <kt-button icon="fa fa-trash" :label="$t('reset')" perms="sys:dict:add" type="success"   @click="resetHighSearch" />
               

                <!-- <el-button type="primary" @click="handleHighSearch" icon="ios-search">{{$t('search')}}</el-button>
                <el-button type="success" @click="resetHighSearch" icon="md-trash" style="margin:0px 20px">{{$t('reset')}}</el-button>
               -->
              </el-col>
              </el-form-item>
            </el-row>
          </el-form> 
      </el-dialog>
  </div>
</template>
<script>  

import KtButton from "@/views/core/KtButton"
// import NumberRange from '_c/number-range'
import './index.less'
export default {
  name: 'HeaderColumn',
  components: {
    KtButton
    // NumberRange
  },
  props: { 
    size: {  // 按钮尺寸
      type: String,
      default: 'mini'
    },
    value: {
      type: Array,
      default () {
        return []
      }
    },
    columns: {
      type: Array,
      default () {
        return []
      }
    },   
 
    highSearch: {
      type: Boolean,
      default: false
    },
    // IsExpandJudge:{
    //   type:Boolean,
    //   default:false
    // }
  }, 
  data () {
    return {
      IsExpanddialog:false,
      isSelected: true,
      items: undefined,
      itemArray: [],
      itemArrayDic: {},
      IsExpand: false,
      columnDic: {},
      currentSearchCol: {},
      highCondition: {},
      insideColumns: [],
      insideTableData: [], 
      searchValue: '',
      searchKey: '', 
      // label: (h) => {
      //   return h('div', [
      //     h('span', this.$t('highSearch')),
      //     h('Button', {
      //       props: {
      //         type: 'text',
      //         icon: 'md-close',
      //         size: 'small'
      //       },
      //       style: {
      //         marginTop: '-4px',
      //         marginLeft: '4px'
      //       },
      //       on: {
      //         click: () => {
      //           this.IsExpand = false
      //         }
      //       }
      //     })
      //   ])
      // }
    }
  },
  methods: {
 
  
    surportHandle (item) { 
      let insideBtns = [] 
      let btns = item.button ? [].concat(insideBtns, item.button) : insideBtns
      item.render = (h, params) => {
        params.tableData = this.value
        return h('div', btns.map(item => item(h, params, this)))
      }
      return item
    },
    handleColumns (columns) {
      columns.forEach(x => {
        this.columnDic[x.key] = x
      })
      this.insideColumns = columns.filter(x => !x.ishide).map((item, index) => {
        let res = item
        if (res.key === 'handle') res = this.surportHandle(res)
        return res
      })
    },
    setDefaultSearchKey () {
      if (this.columns && this.columns.length > 0) {
        this.searchKey = this.columns[0].key !== 'handle' ? this.columns[0].key : (this.columns.length > 1 ? this.columns[1].key : '')
      }
    },
    handelDateChange (e) {
      if (!e) {
        this.insideTableData = this.value
        this.$emit('on-search', null)
      } else {
        this.searchValue = e
      }
    },
    handleClear (e) {
      if (e.target.value === '') {
        this.insideTableData = this.value
        this.$emit('on-search', null)
      }
    },
    handleSearch () {
      this.$emit('on-search', this.createSimpleCondition())
    },
    handleTableData () {
      this.insideTableData = this.value.map((item, index) => {
        let res = item
        res.initRowIndex = index
        return res
      })
    },
    handleCreate1 (val) {
      this.items[val] = val
    },
  
    createSimpleCondition () {
       //console.log("查看当前数据是否存在---》",this.searchKey,this.searchValue)
      let paramArr = []
      let param = {}
     // Contains = 0,
       // Equal=1,
        /// 大于
        //Greater=2,
        /// 大于等于
        //GreaterEqual=3,
        /// 小于
        //Less=4,
        /// 小于等于
        //LessEqual=5,
        /// 不等于
       // NotEqual=6,

        /// 包含 in
        /// Condition.Value值用 英文逗号间隔
       // In=7,

        /// 范围 数值之间 只允许数值类型
        /// Condition.Value值用 英文逗号间隔
       // Between=8

      if (this.searchKey && this.searchKey !== 'expand' && this.searchValue) {
        let operator = '0'
        let serachVal = this.searchValue
        if (this.columnDic[this.searchKey].operator) {
          operator = this.columnDic[this.searchKey].operator
        } else if (this.columnDic[this.searchKey].items) {
          operator = '1'
        } else if (this.columnDic[this.searchKey].type === 'date') {
          operator = '3'
        }
        if (this.columnDic[this.searchKey].type === 'daterange' || this.columnDic[this.searchKey].type === 'numberrange') {
          if (serachVal && serachVal.length > 1) {
            if (serachVal[0] && serachVal[1]) {
              param = {
              key:this.searchKey,
              value:serachVal[0] +','+ serachVal[1],
              operator:'8'
            } 
            } 
     
          }
        } else {
          serachVal = operator === '0' ? `${this.searchValue}` : serachVal
          param = {
              key:this.searchKey,
              value:serachVal,
              operator:operator
            }
        }
        paramArr.push(param)
      }
      return paramArr
    },
    createCondition () {
      let paramArr = []
      let param = {}
      for (let searchKey in this.highCondition) {
        let operator = 0
        let serachVal = this.highCondition[searchKey]
        if (!serachVal || (Array.isArray(serachVal) && serachVal.length === 0)) continue
        if (this.columnDic[searchKey].operator) {
          operator = this.columnDic[searchKey].operator
        } else if (this.columnDic[searchKey].items) {
          operator = '1'
        } else if (this.columnDic[searchKey].type === 'date') {
          operator = '3'
        }
        if (this.columnDic[searchKey].type === 'daterange' || this.columnDic[searchKey].type === 'numberrange') {
          if (serachVal && serachVal.length > 1) {
            if (serachVal[0] && serachVal[1]) {
              param = {
              key:searchKey,
              value:serachVal[0] +','+ serachVal[1],
              operator:'8'
            } 
            } 

            // if (serachVal[0] && serachVal[1]) {
            //   param[searchKey] = { '>=': serachVal[0], '<=': serachVal[1] }
            // } else if (serachVal[0]) {
            //   param[searchKey] = { '>=': serachVal[0] }
            // } else if (serachVal[1]) {
            //   param[searchKey] = { '<=': serachVal[1] }
            // }
          }
        } else {
          serachVal = operator === '0' ? `${this.searchValue}` : serachVal
          param = {
              key:searchKey,
              value:serachVal,
              operator:operator
            }

          // serachVal = operator === 'like' ? `%${serachVal}%` : serachVal
          // param[searchKey] = { [operator]: serachVal }
        }
        paramArr.push(param)
      }
       //console.log("高级查询出来数据---》", paramArr)
      return paramArr
    },
    handleHighSearch () {
      let param = this.createCondition()
      this.$emit('on-search', param)
      this.IsExpand = false
    },
    resetHighSearch () {
      this.highCondition = {}
    },
  
    isDate () {
      if (!this.searchKey) return false
      let col = this.columnDic[this.searchKey]
      if (col && col.type === 'date') {
        return true
      }
      return false
    },
    isDateRange () {
      if (!this.searchKey) return false
      let col = this.columnDic[this.searchKey]
      if (col && col.type === 'daterange') {
        return true
      }
      return false
    },
    isNumberRange () {
      if (!this.searchKey) return false
      let col = this.columnDic[this.searchKey]
      if (col && col.type === 'numberrange') {
        return true
      }
      return false
    },
    isAutoCombox () {
      if (!this.searchKey) return false
      let col = this.columnDic[this.searchKey]
      if (col && col.operator === 'in') {
        this.items = col.items
        return true
      }
      return false
    },
    isCombox () {
      if (!this.searchKey) return false
      let col = this.columnDic[this.searchKey]
      if (col && col.items) {
        this.items = col.items
        return true
      }
      return false
    },
    isRemoteMethod () {
      if (!this.searchKey) return false
      let col = this.columnDic[this.searchKey]
      if (col && col.remoteMethod) {
        return true
      }
      return false
    },
    remoteMethod (value) {
      if (!value) return
      if (this.itemArray && this.itemArray.some(x => x.v === value)) return
      let col = this.columnDic[this.searchKey]
      if (col && col.remoteMethod) {
        col.remoteMethod(value, (arr) => {
          this.itemArray = arr
        })
      }
    },
    setCurrentSearchCol (item) {
      this.currentSearchCol = item
    },
    remoteMethod2 (value) {
      if (!value) return
      let col = this.currentSearchCol
      if (col && col.remoteMethod) {
        col.remoteMethod(value, (arr) => {
          this.itemArrayDic[col.key] = arr
          this.itemArray = arr
        })
      }
    }
  },
  computed: {
    simpleSearchColumns () {
      return this.columns.filter(item => !item.noSearch && item.key !== 'handle' && item.type !== 'selection' && item.type !== 'expand' && item.type !== 'index')
    },
    searchColumns () {
      let cols = []
      let c = this.columns.filter(x => !x.noSearch && x.key !== 'handle' && x.type !== 'selection' && x.type !== 'expand' && x.type !== 'index')
      let n = Math.ceil(c.length / 4)
      for (let index = 0; index < n; index++) {
        cols.push(c.splice(0, Math.min(c.length, 4)))
      }
      return cols
    },
 
    highSearchColumns () {
      let cols = []
      let c = this.columns.filter(x => !x.noSearch && x.key !== 'handle' && x.type !== 'selection' && x.type !== 'expand' && x.type !== 'index' && !x.isHighSearch)
      let n = Math.ceil(c.length / 2)
      for (let index = 0; index < n; index++) {
        cols.push(c.splice(0, Math.min(c.length, 3)))
      }
       //console.log("colsss---->",cols)
      return cols
    }
  },
  watch: {
    columns (columns) {
      this.handleColumns(columns)
      this.setDefaultSearchKey()
    },
    value (val) {
      this.handleTableData() 
    },

  },
  mounted () {
    this.handleColumns(this.columns)
    this.setDefaultSearchKey()
    this.handleTableData()
  }
}
</script>
<style lang="less" scope>
.leftFooter{
  margin-top: 10px;
}
.main .content-wrapper {
  padding:0px !important;
}
.ivu-tabs-bar{
  margin-bottom:0px !important;
  padding:10px 0  0 10px;
}
.ivu-card-body{
  padding:0 15px 10px 10px !important;
}
.ivu-table-wrapper-with-border {
    border-bottom:1px solid #dcdee2 !important;
}
.deaultTable .ivu-table-wrapper {
  border: 1px solid #C9CACA;
  border-bottom: 0;
  border-right: 0;
  /*background: none!important;*/
}
.deaultTable.ivu-table-wrapper{
  position:static !important;
}
.deaultTable .ivu-table-border td, .deaultTable .ivu-table-border th {
  border-color: #C9CACA;
  background: none;
  color: inherit;
}
.deaultTable .ivu-table-border {
  background: none;
  color: inherit;
}
.deaultTable .ivu-table th {
  background: #4F81BD !important;
  color: white !important;
}
.deaultTable .ivu-table td {
  background: transparent ;
}
.deaultTable .ivu-table-row:nth-child(2n){
  background:#DCE6F1;
}
.deaultTable .ivu-table-row-hover td {
  background: #FFD173 !important;
  cursor: pointer;
}
.deaultTable .ivu-table-row-highlight td {
  background: orange !important;
  cursor: pointer;
}

.deaultTable2 .ivu-table-wrapper {
  border: 1px solid #C9CACA;
  border-bottom: 0;
  border-right: 0;
  /*background: none!important;*/
}
.deaultTable2.ivu-table-wrapper{
  position:static !important;
}
.deaultTable2 .ivu-table-border td, .deaultTable2 .ivu-table-border th {
  border-color: #C9CACA;
  background: none;
  color: inherit;
}
.deaultTable2 .ivu-table-border {
  background: none;
  color: inherit;
}
.deaultTable2 .ivu-table th {
  background: #4F81BD !important;
  color: white !important;
}
.deaultTable2 .ivu-table td {
  background: transparent ;
}
.deaultTable2 .ivu-table-row:nth-child(2n){
  background:#DCE6F1;
}
.deaultTable2 .ivu-table-row-hover td {
  background: #FFD173 !important;
  cursor: pointer;
}
.deaultTable2 .ivu-table-row-highlight td {
  cursor: pointer;
}
.ivu-table-header thead > .ivu-table-cell-with-selection .ivu-checkbox{
  display: none !important;
}
.ivu-table-header thead tr th {
  position:static !important;
}
.tables-edit-outer .tables-edit-con{
  position: static !important;
}
.ivu-poptip-rel{
  position: static !important;
}

.tabs-style {
  background: #e3e8ee;
  padding: 0 5px 5px 5px !important;
  margin: 0 !important;
}
.tabs-style > .ivu-tabs, .ivu-tabs-card {
  overflow: visible;
}
.tabs-style > .ivu-tabs-card > .ivu-tabs-content > .ivu-tabs-tabpane {
  background: #fff;
  padding: 16px 16px 0 0;
}

.tabs-style > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
  border-color: transparent;
}

.tabs-style > .ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
  border-color: #fff;
}
</style>
