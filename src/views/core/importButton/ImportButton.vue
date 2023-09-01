<template>
  <a :href="template" class="file">
    <!-- <slot></slot> -->
    <input ref="import" type="file" style="display:none" @change="importFile" :accept="accept"/>
    <el-button type="primary" @click="handleIn"  size="small" ><i  class="fa fa-cloud-download" style="margin-right:6px"></i>{{$t('Import')}}</el-button>
  </a>
</template>

<script>
import { Excel2Obj } from '@/libs/excel'
export default {
  name: 'ImportButton',
  props: {
    accept: {
     type: String,
     default: '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
    },
    template: {
     type: String,
     default: 'javascrit:;'
    }
  },
  data () {
    return {
        value: Object,
        token: String
    }
  },
  methods: {
    // 打开导入
    handleIn() {
     this.$refs.import.click()
    },
    importFile (e) {
        if (!e.target.files) {
            return
        }
        let file = e.target.files[0] // 获得文件
        this.$refs.import.value = ''
        Excel2Obj({
            file:file,
            callBack: json => {
                this.$emit('on-success', json, file.name)
            }
        })
    }
  }
}
</script>

<style lang="less"  scoped>
.file {
    position: relative;
    float: left;
    background: #2d8cf0;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    // padding: 4px 12px;
    overflow: hidden;
    color: white;
    text-decoration: none;
    text-indent: 0;
    line-height: 21px;
    margin: 0 0 0 10px;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    width: 100px;
}
.file:hover {
    background: #5cadff;
    border-color: #78C3F3;
    color: white;
    text-decoration: none;
}
.el-button--small {
  padding: 7px 15px;
}
</style>