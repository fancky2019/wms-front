<template>
  <div class="page-container">
	<!--工具栏-->
	<div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
		<el-form :inline="true" :model="filters" :size="size">
      <el-form-item>
      <el-select v-model="type" placeholder="请选择">
         <el-option
           v-for="item in options"
           :key="item.type"
           :label="item.label"
           :value="item.type">
         </el-option>
      </el-select>
     </el-form-item>
  			<el-form-item>
				<el-input v-model="filters.name"></el-input>
			</el-form-item>
			<el-form-item>
				<kt-button icon="fa fa-search" :label="$t('action.search')" perms="sys:loginlog:view" type="primary" @click="findPage(null)"/>
			</el-form-item>
      <el-form-item>
				<kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:user:add" type="primary" @click="handleAdd" />
			</el-form-item>
		</el-form>
	</div>
	<!--表格内容栏-->
	<kt-table
    :data="pageResult" 
    permsEdit = "sys:dict:edit"
    :columns="columns" 
    :showOperation="showOperation" 
    @findPage="findPage">
	</kt-table>
  	<!--新增编辑界面-->
	<el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="dialogVisible" :close-on-click-modal="false" center>
		<el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size"
			label-position="right">
			<el-form-item label="类型" prop="type">
				<el-input v-model="dataForm.name" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="代码" prop="code">
				<el-input v-model="dataForm.nickName" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="名称" prop="name">
				<el-input v-model="dataForm.password" type="password" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="入库策略" prop="allocatRelationId">
				<el-input v-model="dataForm.allocatRelationId" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="出库策略" prop="shipmentRuleId">
				<el-input v-model="dataForm.shipmentRuleId" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="发运货位" prop="shipLocation">
				<el-input v-model="dataForm.shipLocation" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="分类1" prop="class1">
				<el-select v-model="dataForm.class1" multiple placeholder="请选择"
					 style="width: 100%;">
					<el-option v-for="item in roles" :key="item.id"
						:label="item.remark" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
      		<el-form-item label="分类2" prop="class2" >
				<el-select v-model="dataForm.class2" multiple placeholder="请选择"
					 style="width: 100%;">
					<el-option v-for="item in roles" :key="item.id"
						:label="item.remark" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
      <el-form-item label="描述" prop="description">
				<el-input v-model="dataForm.description" auto-complete="off"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button :size="size" @click.native="dialogVisible = false">{{$t('action.cancel')}}</el-button>
			<el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
		</div>
	</el-dialog>
  </div>
</template>

<script>
import KtTable from "@/views/core/KtTable"
import KtButton from "@/views/core/KtButton"
import { format } from "@/utils/datetime"
export default {
	components: {
		KtTable,
		KtButton
	},
	data() {
		return {
			size: 'small',
      operation: false, // true:新增, false:编辑
			dialogVisible: false, // 新增编辑界面是否显示
      editLoading: false, 
      roles: [],
			filters: {
				name: '',
        type: ['代码', '名称', '类型', '状态', '描述', '入库']
			},
      dataFormRules: {
				name: [
					{ required: true, message: '请输入用户名', trigger: 'blur' }
				]
			},
      // 新增编辑界面数据
			dataForm: {
				type: '', // 类型
        code: '',  // 代码
				name: '', // 名称
				allocatRelationId: '', // 入库
        shipmentRuleId: '', // 出库
				description: 1,  // 描述
				class1: '13889700023', // 类型1
				class2: 1, // 类型2
				shipLocation: []
			},
			columns: [
				{prop:"code", label:"代码", minWidth:80},
				{prop:"name", label:"名称", minWidth:100},
				{prop:"type", label:"类型", minWidth:120},
				{prop:"state", label:"状态", minWidth:120},
				{prop:"description", label:"描述", minWidth:80},
				{prop:"allocatRelationId", label:"入库策略", minWidth:100},
				{prop:"shipmentRuleId", label:"出库策略", minWidth:120, formatter:this.dateFormat},
				{prop:"shipLocation", label:"发运货位", minWidth:100},
				{prop:"class1", label:"分类1", minWidth:120, formatter:this.dateFormat},
        {prop:"class2", label:"分类2", minWidth:120, formatter:this.dateFormat},
        {prop:"creator", label:"创建人", minWidth:120, formatter:this.dateFormat},
        {prop:"creationTime", label:"创建时间", minWidth:120, formatter:this.dateFormat},
        {prop:"lastModifier", label:"更新人", minWidth:120, formatter:this.dateFormat},
        {prop:"lastModificationTime", label:"更新时间", minWidth:120, formatter:this.dateFormat}
			],
			pageRequest: { pageNum: 1, pageSize: 10 },
      pageResult: {},
      showOperation:true
		}
	},
	methods: {
		// 获取分页数据
		findPage: function (data) {
			if(data !== null) {
				this.pageRequest = data.pageRequest
			}
			this.pageRequest.params = [{name:'userName', value:this.filters.name}]
      this.pageResult =  { 
      "pageNum": 1,
      "pageSize": 9,
      "totalSize": 88,
      "totalPages": 10,
      "content": [
        {
          "id": 1,
          "createBy": "admin",
          "createTime": "2018-09-23T11:54:16.000+0000",
          "lastUpdateBy": null,
          "lastUpdateTime": null,
          "userName": "admin",
          "status": "login",
          "ip": "0:0:0:0:0:0:0:1"
        },
        {
          "id": 2,
          "createBy": "admin",
          "createTime": "2018-09-23T11:54:17.000+0000",
          "lastUpdateBy": null,
          "lastUpdateTime": null,
          "userName": "admin",
          "status": "logout",
          "ip": "0:0:0:0:0:0:0:1"
        },
        {
          "id": 3,
          "createBy": "admin",
          "createTime": "2018-09-23T11:54:18.000+0000",
          "lastUpdateBy": null,
          "lastUpdateTime": null,
          "userName": "admin",
          "status": "login",
          "ip": "0:0:0:0:0:0:0:1"
        },
        {
          "id": 4,
          "createBy": "admin",
          "createTime": "2018-09-23T11:54:20.000+0000",
          "lastUpdateBy": null,
          "lastUpdateTime": null,
          "userName": "admin",
          "status": "logout",
          "ip": "0:0:0:0:0:0:0:1"
        },
        {
          "id": 5,
          "createBy": "admin",
          "createTime": "2018-09-23T11:54:20.000+0000",
          "lastUpdateBy": null,
          "lastUpdateTime": null,
          "userName": "admin",
          "status": "login",
          "ip": "0:0:0:0:0:0:0:1"
        },
        {
          "id": 6,
          "createBy": "admin",
          "createTime": "2018-09-23T11:54:21.000+0000",
          "lastUpdateBy": null,
          "lastUpdateTime": null,
          "userName": "admin",
          "status": "logout",
          "ip": "0:0:0:0:0:0:0:1"
        },
        {
          "id": 7,
          "createBy": "admin",
          "createTime": "2018-09-23T11:54:22.000+0000",
          "lastUpdateBy": null,
          "lastUpdateTime": null,
          "userName": "admin",
          "status": "login",
          "ip": "0:0:0:0:0:0:0:1"
        },
        {
          "id": 8,
          "createBy": "admin",
          "createTime": "2018-09-23T11:54:23.000+0000",
          "lastUpdateBy": "admin",
          "lastUpdateTime": "2019-01-21T02:15:43.000+0000",
          "userName": "admin",
          "status": "login",
          "ip": "0:0:0:0:0:0:0:1"
        },
        {
          "id": 2798,
          "createBy": "admin",
          "createTime": "2019-01-21T02:15:43.000+0000",
          "lastUpdateBy": null,
          "lastUpdateTime": null,
          "userName": "admin",
          "status": "logout",
          "ip": "0:0:0:0:0:0:0:1"
        }
      ]
    }
			// this.$api.loginlog.findPage(this.pageRequest).then((res) => {
			// 	this.pageResult = res.data
			// }).then(data!=null?data.callback:'')
      this.params = {
        skipCount: 1,
        maxResultCount: 10000,
        sorting: "id desc",
        conditionItems: [],
      }
      this.$api.type.findPage(this.params).then(() => {
           //console.log(res.daata)
      })
		},
    // // 显示新增界面
		handleAdd: function () {
			this.dialogVisible = true
			this.operation = true
			// this.dataForm = {
			// 	id: 0,
			// 	name: '',
			// 	password: '',
			// 	deptId: 1,
			// 	deptName: '',
			// 	email: 'test@qq.com',
			// 	mobile: '13889700023',
			// 	status: 1,
			// 	userRoles: []
			// }
		},
		// 时间格式化
   	dateFormat: function (row, column, cellValue, index){
        	return format(row[column.property])
     	}
	},
	mounted() {
	}
}
</script>

<style scoped>

</style>