<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
.ivu-table-cell {
  cursor: pointer !important;
}
.ivu-dropdown-item:hover {
  background-color: transparent !important;
}
.ivu-modal-header-inner {
  font-weight: bold !important;
}
.ivu-dropdown-item {
  padding: 1px 17px !important;
}
/* 弹出框滚动条 */
/* 设置滚动条的样式 */
/**解决了滚动条之间发生错位的现象 */
::-webkit-scrollbar {
  width: 1px !important;
  height: 10px !important;
  border-radius: 5px;
}
 ::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);  
  /* 滚动条的颜色 */
  background-color: #e4e4e4; 
 } 
 
 *{
     // 火狐下隐藏
  scrollbar-width: thin; 
  
 }

</style>
