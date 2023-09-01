<template>
<el-dialog :title="$t('AchievedItemDetail')" width="80%"  :visible.sync="dialogVisible" :close-on-click-modal="false" >
    <!--表格内容栏--> 
    <kt-table
      :data="currModel"
      :columns="columns" 
      :showOperation="showOperation"
      @handleDelete="handleDelete"
    >
    </kt-table>
      </el-dialog>
</template>
<script>
import KtTable from "@/views/core/KtTableData"
import {  CreateCountingInventoryItemDto }   from '@/libs/createDto'
import { getDisplayName,  getPropertyDisplayName1 } from '@/libs/common'
export default {
  props: {
    CurrentEntity: Object, 
  },
  components: {
    KtTable, 
  },
  computed: {
    currModel () { 
      return this.CurrentEntity.inventoryItemAchieveds[0].inventoryItemDetailAchieveds   || CreateCountingInventoryItemDto()
    },
  },
  data() {
    return {  
      size: 'small',
      dialogVisible: false, // 新增编辑界面是否显示
      lastCondition: undefined,
      currentRow: undefined,
      showOperation: false, 
      showOperationEdit:false,
      queryType: 0,
      pageRequest: { pageNum: 1, pageSize: 10 },
      columns:[
        {
          title:  this.getDisplayName('serialNo'),
          key: 'serialNo',
          minWidth: 150
        },
        {
          title:  getPropertyDisplayName1('material'),
          key: 'material',
          minWidth: 100
        },
        {
          title:   this.getDisplayName('packageUnit'),
          key: 'packageUnit',
          minWidth: 110
        },
        {
          title:  getPropertyDisplayName1('xStatus'),
          key: 'xStatus',
          minWidth: 130,
          items: this.$Enum.WmsInventoryStatus.map2,
          render: (h, params) => {
            return h('span', this.$Enum.WmsInventoryStatus.map2[params.row.xStatus] || '')
          }
        },
        {
          title: this.getDisplayName('qcStatus'),
          key: 'qcStatus',
          minWidth: 150,
          items: this.$Enum.WmsInventoryStatus.map1,
          render: (h, params) => {
            return h('span', this.$Enum.WmsInventoryStatus.map1[params.row.qcStatus] || '')
          }
        },
        {
          title:  getPropertyDisplayName1('batchNo'),
          key: 'batchNo',
          minWidth: 150
        },
        {
          title:  getPropertyDisplayName1('batchNo2'),
          key: 'batchNo2',
          minWidth: 150
        },
        {
          title:  getPropertyDisplayName1('batchNo3'),
          key: 'batchNo3',
          minWidth: 150
        },
        {
          title:  this.getDisplayName('smallUnitQuantity'),
          key: 'smallUnitQuantity',
          minWidth: 130
        },
        {
          title:  this.getDisplayName('packageQuantity'),
          key: 'packageQuantity',
          minWidth: 110
        },
        {
          title:  this.getDisplayName('allocatedSmallUnitQuantity'),
          key: 'allocatedSmallUnitQuantity',
          minWidth: 110
        },
        {
          title:  this.getDisplayName('allocatedPackageQuantity'),
          key: 'allocatedPackageQuantity',
          minWidth: 110
        },
        {
          title: this.getDisplayName('isLocked'),
          key: 'isLocked',
          minWidth: 150,
          items: this.$Enum.YesOrNo.map6,
          render: (h, params) => {
            return h('span', this.$Enum.YesOrNo.map6[params.row.isLocked] || '')
          }
        },
        {
          title: this.getDisplayName('isSealed'),
          key: 'isSealed',
          minWidth: 150,
          items: this.$Enum.YesOrNo.map6,
          render: (h, params) => {
            return h('span', this.$Enum.YesOrNo.map6[params.row.isSealed] || '')
          }
        },
        {
          title: this.getDisplayName('isScattered'),
          key: 'isScattered',
          minWidth: 150,
          items: this.$Enum.YesOrNo.map6,
          render: (h, params) => {
            return h('span', this.$Enum.YesOrNo.map6[params.row.isScattered] || '')
          }
        },
        {
          title: this.getDisplayName('isExpired'),
          key: 'isExpired',
          minWidth: 150,
          items: this.$Enum.YesOrNo.map6,
          render: (h, params) => {
            return h('span', this.$Enum.YesOrNo.map6[params.row.isExpired] || '')
          }
        },
        {
          title:  this.getDisplayName('expiredTime'),
          key: 'expiredTime',
          minWidth: 110
        },
        {
          title:  getPropertyDisplayName1('comments'),
          key: 'comments',
          minWidth: 110
        },
        {
          title:  getPropertyDisplayName1('m_Str1'),
          key: 'm_Str1',
          minWidth: 140
        },
        {
          title:   getPropertyDisplayName1('m_Str2'),
          key: 'm_Str2',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str3'),
          key: 'm_Str3',
          minWidth: 140
        },
        {
          title: getPropertyDisplayName1('m_Str4'),
          key: 'm_Str4',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str5'),
          key: 'm_Str5',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str6'),
          key: 'm_Str6',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str7'),
          key: 'm_Str7',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str8'),
          key: 'm_Str8',
          minWidth: 140
        },
        {
          title: getPropertyDisplayName1('m_Str9'),
          key: 'm_Str9',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str10'),
          key: 'm_Str10',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str11'),
          key: 'm_Str11',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str12'),
          key: 'm_Str12',
          minWidth: 140
        },
        {
          title:   getPropertyDisplayName1('m_Str13'),
          key: 'm_Str13',
          minWidth: 140
        },
        {
          title:   getPropertyDisplayName1('m_Str14'),
          key: 'm_Str14',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str15'),
          key: 'm_Str15',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str16'),
          key: 'm_Str16',
          minWidth: 140         
        },
        {
          title:  getPropertyDisplayName1('m_Str17'),
          key: 'm_Str17',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str18'),
          key: 'm_Str18',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str19'),
          key: 'm_Str19',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str20'),
          key: 'm_Str20',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str21'),
          key: 'm_Str21',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str22'),
          key: 'm_Str22',
          minWidth: 140
        },
        {
          title: getPropertyDisplayName1('m_Str23'),
          key: 'm_Str23',
          minWidth: 140
        },
        {
          title: getPropertyDisplayName1('m_Str24'),
          key: 'm_Str24',
          minWidth: 140
        },
        {
          title: getPropertyDisplayName1('m_Str25'),
          key: 'm_Str25',
          minWidth: 140
        },
        {
          title: getPropertyDisplayName1('m_Str26'),
          key: 'm_Str26',
          minWidth: 140
        },
        {
          title: getPropertyDisplayName1('m_Str27'),
          key: 'm_Str27',
          minWidth: 140
        },
        {
          title: getPropertyDisplayName1('m_Str28'),
          key: 'm_Str28',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str29'),
          key: 'm_Str29',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str30'),
          key: 'm_Str30',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str31'),
          key: 'm_Str31',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str32'),
          key: 'm_Str32',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str33'),
          key: 'm_Str33',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str34'),
          key: 'm_Str34',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str35'),
          key: 'm_Str35',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str36'),
          key: 'm_Str36',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str37'),
          key: 'm_Str37',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str38'),
          key: 'm_Str38',
          minWidth: 140
        },
        {
          title:  getPropertyDisplayName1('m_Str39'),
          key: 'm_Str39',
          minWidth: 140,
        },
        {
          title:  getPropertyDisplayName1('m_Str40'),
          key: 'm_Str40',
          minWidth: 140
        }
      ] 
    };
  },
  methods: {
    getDisplayName (key) {
      return getDisplayName('inventory', key)[0]
    },
    // 删除
	handleDelete: function (data) { 
	  this.$http.deleteAsync('/app/InventoryItemDetail/Delete',data.params[0]).then(data!=null?data.callback:'').catch(error=>{})
	},
  }, 
};
</script>
  