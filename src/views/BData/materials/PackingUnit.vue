<template>
  <div class="page-container">
    <!--工具栏-->
    <div v-if="currModelID!= undefined"  class="toolbar" style="float: left; padding-top:10px; padding-left: 15px;display:flex;flex-direction:row">
    <header-column :columns="columns" highSearch     @on-search='handleSearch'   ></header-column>
    <div  style="display:flex;align-items:center;margin-left:10px">
       <kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:dict:add" type="primary" @click="handleAdd" />
    </div>
    </div>
    <!--表格内容栏 
     -->
    <kt-table
      :data="currModel"
      :columns="columns" 
      :showOperation="showOperation"
      :loading="insideLoading"
      :showBatchDelete="showBatchDelete"
      @handleDelete="handleDelete"
      @handleEdit="handleEdit"

    >
    </kt-table>
<PackingUnitManager ref="managerUnit" @on-close="$refs.pages.refresh()" :CurrentEntity="currentRow"    @findPage="findPage" :currModelIDUnit ='currModelID' />

  </div>
</template>

<script>
import KtTable from "@/views/core/KtTable"
import KtButton from "@/views/core/KtButton"
import HeaderColumn from '../../core/HeaderColumn.vue'
import { getDisplayName } from '@/libs/common' 
import PackingUnitManager from './PackingUnitManager.vue'
import { CreatePackageUnitDto  }   from '@/libs/createDto'
export default {
    props: {
    CurrentMaterial: Object,
    currModelID:Number
  },
  components: {
    KtTable, 
    HeaderColumn,
    KtButton,
    PackingUnitManager
  },
  computed: {
    currModel () {
      return this.CurrentMaterial || CreatePackageUnitDto()
    }
  },
  data() {
    return {  
      size: 'small',
      lastCondition: undefined,
      currentRow: undefined,
      insideLoading: false,
      showOperation: true,
      showBatchDelete: false,
      queryType: 0,
      columns: [
        {
          title: this.getDisplayName('unit'),
          key: 'unit',
          minWidth: 100
        },
        {
          title: this.getDisplayName('convertFigureSmallUnit'),
          key: 'convertFigureSmallUnit',
          minWidth: 150
        },
        {
          title: this.getDisplayName('length'),
          key: 'length',
          minWidth: 100
        },
        {
          title: this.getDisplayName('width'),
          key: 'width',
          minWidth: 100
        },
        {
          title: this.getDisplayName('height'),
          key: 'height',
          minWidth: 100
        },
        {
          title: this.getDisplayName('weight'),
          key: 'weight',
          minWidth: 100
        },
        {
          title: this.getDisplayName('volume'),
          key: 'volume',
          minWidth: 100
        },
        {
          title: this.getDisplayName('fullPalletQuantity'),
          key: 'fullPalletQuantity',
          minWidth: 100
        },
        {
          title: this.getDisplayName('str1'),
          key: 'str1',
          minWidth: 100
        },
        {
          title: this.getDisplayName('str2'),
          key: 'str2',
          minWidth: 100
        }, 
        {
          title: this.getDisplayName('str3'),
          key: 'str3',
          minWidth: 100
        }, 
        {
          title: this.getDisplayName('str4'),
          key: 'str4',
          minWidth: 100
        }, 
        {
          title:  this.getDisplayName('str5'),
          key: 'str5',
          minWidth: 100
        }, 
      ],
      // tableData: {},
      pageRequest: { pageNum: 1, pageSize: 10 },
    };
  },
  methods: {
    handleSearch (condition) {
      this.pageRequest.pageNum = 1
      this.search(condition)
    },
 
    async search (condition) {  

      this.insideLoading = true 
      let lastConditions =  {
            "key":"materialId",
            "value":String(this.currModelID),
            "operator":"1"
          } 
        condition.push(lastConditions)
 

      let param = {
        skipCount: this.pageRequest.pageNum ,
        maxResultCount: this.pageRequest.pageSize, 
        conditionItems:condition,
        sorting: "id desc",
      } 
      // 还需要最外层的基础物料的id 
      let ret = await this.$http.postAsync("/app/PackageUnit/GetList", param)  
            if(ret.data.data.totalCount!=0) {
            this.$message({message: '查询成功', type: 'success'})
           this.currModel.packageUnits = ret.data.data.items
          } else {
            this.$message({message: '未查询到数据', type: 'error'})
          }


      this.insideLoading = false 
      this.tableData =ret.data.data
      
      
    },

        // 获取分页数据
    findPage: function (data) {
      if (data !== null) {
        this.pageRequest = data.pageRequest;
      }
      let pageNumber = this.pageRequest.pageNum
      if(pageNumber>1) {
        pageNumber = (this.pageRequest.pageNum-1)*this.pageRequest.pageSize+1
      }
      let condition = {
        skipCount: pageNumber,
        maxResultCount: this.pageRequest.pageSize,
        sorting: "id desc",
        conditionItems: [
          {
            "key":"materialId",
            "value":String(this.currModelID),
            "operator":"1"
          }
        ]
      }
      this.$http.postAsync("/app/PackageUnit/GetList", condition).then((res) => {
        if (res.data.result) { 
            this.currModel.packageUnits = res.data.data.items
        }
      });
    },

    // 文字
    getDisplayName (key) {
      return getDisplayName('packageUnit', key)[0]
    },

    findPageUnit(data){
      let currentRow = data.datares.data.data
      if(data.mode=="add"){
            this.currModel.packageUnits.push(currentRow)
    
      }else{
        //更新的操作 ---删除后再push
          let currIndex = this.currModel.packageUnits.indexOf(currentRow)
          this.currModel.packageUnits.splice(currIndex, 1)
          this.currModel.packageUnits.push(currentRow)
      }
    },
    onSelectChange (row, index) {
       //console.log('2e');
      //console.log(row, index)
    },
    // 新增
    handleAdd() {
      this.currentRow = CreatePackageUnitDto()
      this.$refs.managerUnit.dialogVisible = true
			this.$refs.managerUnit.operation = true
    },
    // 编辑
    handleEdit(params) {
      this.$refs.managerUnit.dialogVisible = true
      this.$refs.managerUnit.operation = false
      this.currentRow = Object.assign({}, params.row)
    },
    // 删除
	  handleDelete: function (data) {
		 //console.log("删除的数据显示---》",data )
			this.$http.deleteAsync('/app/PackageUnit/Delete',data.params[0]).then(data!=null?data.callback:'')
      // 更新界面数据 
      let currentRow =   this.currModel.packageUnits.find(x => x.id === Number(data.params[0].id)) 
      let currIndex = this.currModel.packageUnits.indexOf(currentRow) 
      this.currModel.packageUnits.splice(currIndex, 1)
      
		},
    // 导出
    exportExcelUser: function () {
      this.pageRequest.pageSize = 100000
      // this.pageRequest.params = [{name:'name',value: this.filters.name}]
      let params = {
        skipCount: this.pageRequest.pageNum,
        maxResultCount: this.pageRequest.pageSize,
        sorting: "id desc",
        conditionItems: []
      }
      this.$http.postAsync('/app/PackageUnit/GetListExcel', params).then((res) => {
        this.$alert(res.data, '导出成功', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
      })
    }
  },
  mounted() {
        this.$store.dispatch('getPropertyRuleData')
  },
};
</script>
  