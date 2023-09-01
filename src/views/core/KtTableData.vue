<template>
  <div>
    <!--表格栏-->
    <el-table 
    :data="data" 
    :header-cell-style="headClass"
    :highlight-current-row="highlightCurrentRow" 
    @selection-change="selectionChange" 
    @current-change="handleCurrentChange" 
    @row-click="handelRowClick"
    :loading="loading" 
    :element-loading-text="$t('action.loading')" 
    :border="border" 
    :stripe="stripe"
    :show-overflow-tooltip="showOverflowTooltip" 
    :height="tHeight" 
    :size="size" 
    :align="align" 
    row-key="id"
    :expand-row-keys="expands"
  @expand-change="handleExpandChange"
    style="width:100%;" >
    <!-- 点击主表下拉查看明细 showExpand表示是下拉 -->
    <el-table-column type="expand" v-if="showExpand"  > 
      <template slot-scope="scope"  > 
        <el-table stripe border   
            max-height="350" 
            :element-loading-text="$t('action.loading')"
            :data="scope.row.tableExpandData" 
            style="width: 100%;margin-left:60px">  
          <el-table-column 
          v-for="(column,index) in ExpandChangeColumns" 
          header-align="center" 
          align="center"
          :prop="column.key" 
          :label="column.title" 
          :width="column.width" 
          :min-width="column.minWidth" 
          :fixed="column.fixed" 
          :key="column.key+index" 
          :type="column.type">
          </el-table-column> 
        </el-table> 
      </template>
    </el-table-column>

    <!-- 多选 -->
      <el-table-column type="selection" width="40" v-if="showBatchDelete"></el-table-column>
      <el-table-column 
      v-for="column in simpleSearchColumns" 
      header-align="center" 
      align="center"
      :prop="column.key" 
      :label="column.title" 
      :width="column.width" 
      :min-width="column.minWidth" 
      :fixed="column.fixed" 
      :key="column.key" 
      :type="column.type" 
      :formatter="column.formatter"
      :sortable="column.sortable==null?true:column.sortable">
 
      <template slot-scope="scope"> 
        <div v-if="column.switch">
          <el-switch 
          v-model="scope.row[column.key]"
          :active-text="column.actSwitch"
          :inactive-text="column.inactSwitch"
          :active-value="1"
          :inactive-value="0"
          @change="switchReceive($event,scope.row)"
          >
        </el-switch>
        </div>
        <div v-if="column.editcol">
          <el-input
            placeholder="请输入内容"
            v-model="scope.row[column.key]"
            clearable>
          </el-input> 
        </div>
        <span v-else-if="column.items">
          {{column.items[scope.row[column.key]]}}
        </span>
        <span v-else>
          {{scope.row[column.key]}}
          </span>
      </template> 
      </el-table-column>
      <!-- 操作 -->
      <el-table-column 
      :label="$t('action.operation')" 
      width="185" 
      fixed="right" 
      v-if="showOperation" 
      header-align="center" 
      align="center">
        <template slot-scope="scope">
          <kt-button        v-if="showOperationEdit" 
          icon="fa fa-edit" 
          :label="$t('action.edit')" 
          :perms="permsEdit" 
          :size="size" 
          @click="handleEdit(scope.$index, scope.row)" />
          <kt-button   
          icon="fa fa-trash" 
          :label="$t('action.delete')" 
          :perms="permsDelete" 
          :size="size" 
          type="danger" 
          @click="handleDelete(scope.$index, scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <!--分页栏-->
    <!-- <div class="toolbar" style="padding:10px;"> 
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="refreshPageRequest"
        :current-page="pageRequest.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageRequest.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.totalCount"
        style="float:right;">
      </el-pagination>

    </div> -->
  </div>
</template>

<script>
import KtButton from "@/views/core/KtButton" 
// import './switch.less'
export default {
  name: 'KtTable',
  components:{
    KtButton, 
},
  computed: {
    simpleSearchColumns () {
      return this.columns.filter(item => !item.noSearch && item.key !== 'handle' && item.type !== 'selection' && item.type !== 'expand' && item.type !== 'index')
    },
    ExpandChangeColumns () {
      return this.sonColumns.filter(item => !item.noSearch && item.key !== 'handle' && item.type !== 'selection' && item.type !== 'expand' && item.type !== 'index')
    },

  },
  props: {
    sonColumns: Array, // 表格列配置
    columns: Array, // 表格列配置
    data: Array, // 表格分页数据 
    permsEdit: String,  // 编辑权限标识
    permsDelete: String,  // 删除权限标识
    size: { // 尺寸样式
      type: String,
      default: 'mini'
    },
    align: {  // 文本对齐方式
      type: String,
      default: 'left'
    },
    maxHeight: {  // 表格最大高度
      type: Number,
      default: null
    },
    showOperation: {  // 是否显示操作组件
      type: Boolean,
      default: true
    },
    showOperationEdit:{
      type: Boolean,
      default: true
    },
    border: {  // 是否显示边框
      type: Boolean,
      default: false
    },
    stripe: {  // 是否显示斑马线
      type: Boolean,
      default: true
    },
    highlightCurrentRow: {  // // 是否高亮当前行
      type: Boolean,
      default: true
    },
    showOverflowTooltip: {  // 是否单行显示
      type: Boolean,
      default: true
    },
    showBatchDelete: {  // 是否显示操作组件
      type: Boolean,
      default: true
    },
    showExpand:{ //默认不显示下拉
      type:Boolean,
      default:false
    },
    loading:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      expands:[],
      tHeight: null,
      // 分页信息
			pageRequest: {
				pageNum: 1,
        pageSize: 10
      }, 
      selections: []  // 列表选中列
    }
  },
  methods: {
    handleExpandChange(expandData, expandedRows){ 
  
         //console.log('qqqqq', expandData, expandedRows);
        //只展开一行
        if (expandedRows.length&& !expandData.loaded ) { 
          this.expands = []
          if (expandData) {
            this.expands.push(expandData.id) //只展开当前行id
            this.innerloading = true
            this.$emit("handleExpandChild",{expandData})
          }
        } else { //说明收起了,再次点击的时候不调用后端查询数据了 
          if (this.expands.includes(expandData.id)) {
            this.expands = this.expands.filter(val => val !== expandData.id);
          }  
        } 
    },

    // 开关状态
    switchReceive(val,row){
       //console.log("点击出来的状态并修改---》",val,"row---->",row)
    },
    // 表格头部样式
       headClass() {
      return 'background-color: #F0F0F0;'
    },
    // 表格高度
      initPage() {
      window.onresize = () => {
        this.tHeight = document.body.clientHeight - 260
      };
      this.tHeight = document.body.clientHeight - 260
    },
    // 分页查询
    findPage: function () {
 
      this.$emit('findPage', {pageRequest:this.pageRequest})
    },
    // 选择切换
    selectionChange: function (selections) {
             //console.log("选择切换selections---》",selections)
      this.selections = selections
      this.$emit('selectionChange', {selections:selections})
    },
    // 选择切换
    handleCurrentChange: function (val) {
         //console.log("选择切换11---》",val)
      this.$emit('handleCurrentChange', {val:val})
    },
    // 点击单行获取数据
    handelRowClick(row){
      this.$emit('handelRowClick',row)
console.log("点击单行获取数据---》",{row:row})
    },
    // 换页刷新
		refreshPageRequest: function (pageNum) {
      this.pageRequest.pageNum = pageNum
      this.findPage()
    },
    // 设置每个页面显示多少条数据 maxResultCount
    handleSizeChange: function (pageSize) {
      this.pageRequest.pageSize = pageSize
      this.findPage()
    },
    // 编辑
		handleEdit: function (index, row) {
      this.$emit('handleEdit', {index:index, row:row})
		},
    // 删除
		handleDelete: function (index, row) {
			this.delete(row.id,row)
       //console.log("this22--->", this)
		},
		// 批量删除
		handleBatchDelete: function () {
			// let ids = this.selections.map(item => item.id).toString()
			// this.delete(ids)
		},
		// 删除操作
		delete(ids,row) {
       //console.log("this--->", this)
			this.$confirm('确认删除选中记录吗？', '提示', {
				type: 'warning'
			}).then(() => {
				let params = []
				let idArray = (ids+'').split(',')
				for(var i=0; i<idArray.length; i++) {
					params.push({'id':idArray[i],'row':row})
        }
        let callback = res => {
           //console.log("删除后的数据111-《",res )
          if(res.status == 200) {
            this.$message({message: '删除成功', type: 'success'})
            this.findPage()
          } else {
            this.$message({message: '操作失败, ' + res.msg, type: 'error'})
          }
    
        }
        this.$emit('handleDelete', {params:params, callback:callback})
			}).catch(() => {
			})
		}
  },
  mounted() {
    if (this.maxHeight) {
      this.tHeight = this.maxHeight
    } else {
      this.initPage()
    }
    this.refreshPageRequest(1)
  }
}
</script>

  <style lang="less"  scoped>
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
    right: 5px;
  }
  /*关闭时文字位置设置*/
/deep/.el-switch__label--left {
    z-index: 1;
    left: 5px;
  }
  /*显示文字*/
/deep/.el-switch__label.is-active {
    display: block;
  }
   /*开关宽度*/
/deep/.el-switch .el-switch__core,
 /deep/.el-switch .el-switch__label {
    width: 50px !important;
  }
</style>


