<template>

  <el-submenu v-if="menu.children && menu.children.length >= 1" :index="'' + menu.id" :popper-append-to-body="false">
    <template slot="title">
      <i :class="menu.icon" ></i>
      <span slot="title">{{menu.name.split('/')[1]}}</span>
    </template>
    <MenuThreeEn v-for="item in menu.children" :key="item.id" :menu="item"></MenuThreeEn>
  </el-submenu>
  <el-menu-item v-else :index="'' + menu.id" @click="handleRoute(menu)">
    <i :class="menu.icon"></i>
    <span slot="title">{{menu.name.split('/')[1]}}</span>
  </el-menu-item>

</template>

<script>
// import { getIFrameUrl, getIFramePath } from '@/utils/iframe'
export default {
  name: 'MenuThreeEn',
  props: {
    menu: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleRoute (menu) {

      // 如果是嵌套页面，转换成iframe的path
      // let path = getIFramePath(menu.url)

      // if(!path) {
      //   path = menu.url
      // } 
      // this.$router.push("/" + path)
    }
  }
}
</script>

<style  lang="scss">
 .el-menu--collapse > div > .el-submenu > .el-submenu__title span {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
.el-menu--collapse > div > .el-submenu > .el-submenu__title .el-submenu__icon-arrow {
  display: none;
}

</style>
