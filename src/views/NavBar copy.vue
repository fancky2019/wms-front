<template>
	<div  class="menu-bar-container" >
    <!-- logo -->
    <div class="logo" :style="{'background-color':themeColor}" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'"
      @click="$router.push('/')">
        <img v-if="collapse" src="@/assets/logo-min1.jpg"/> 
          <img v-else  src="@/assets/images/gensong.png" style="width:100%;height:80%"/>
        <!-- <div>{{collapse?'':appName}}</div> -->
    </div>
    <!-- 导航菜单 -->
    <el-menu ref="navmenu" default-active="1" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'"
      :collapse="collapse" :collapse-transition="false" :unique-opened="true  "
      @open="handleopen" @close="handleclose" @select="handleselect">
      <!-- 导航菜单树组件，动态加载菜单 -->
      <!-- <div id="menuch" :class="this.$i18n.locale ==='zh-CN'?'menu-lang-bar-width':'menu-lang-barHidden-width'" > -->
        <menu-tree v-for="item in navTree" :key="item.id" :menu="item"></menu-tree>
      <!-- </div>
      <div id="menuen"  :class="this.$i18n.locale ==='en_US'?'menu-lang-bar-width':'menu-lang-barHidden-width'" >
      <menu-tree-en v-for="item in navTree" :key="item.id" :menu="item"></menu-tree-en>
      </div> -->
    </el-menu>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import MenuTree from "@/components/MenuTree"
// import MenuTreeEn from "@/components/MenuTreeEn"
export default {
  components:{
        MenuTree,
        // MenuTreeEn
  }, 
  computed: {
    ...mapState({
      appName: state=>state.app.appName,
      themeColor: state=>state.app.themeColor,
      collapse: state=>state.app.collapse,
      navTree: state=>state.menu.navTree
    }),
    mainTabs: {
      get () { return this.$store.state.tab.mainTabs },
      set (val) { this.$store.commit('updateMainTabs', val) }
    },
    mainAllTabs:{
      get(){ return this.$store.state.tab.mainAllTabs},
      set(val){ this.$store.commit('updateMainAllTabs',val)}
    },
    mainTabsActiveName: {
      get () { return this.$store.state.tab.mainTabsActiveName },
      set (val) { this.$store.commit('updateMainTabsActiveName', val) }
    }
  },
  watch: {
    $route: 'handleRoute'
  },
  created () {
    this.handleRoute(this.$route)


  },
  methods: {
    handleopen() {
    },
    handleclose() {
    },
    handleselect(a, b) {
    },
    // 路由操作处理
    handleRoute (route) {  
      // var langJudge =   this.$i18n.locale
      var langJudge ="zh-CN"
            var routename = route.name
     // 默认中文
      // var routename = route.name.split("/")[0]

      // if(langJudge=="zh-CN"){
      //   routename = route.name.split("/")[0]

      // }else{
      //   routename = route.name.split("/")[1]
      // }

           // tab标签页选中, 如果不存在则先添加
      var tab = this.mainTabs.filter(item => item.name === routename)[0]
      if (!tab) {
  
        tab = {

          path:route.path,
          name:routename,
          title:routename,
          icon: route.meta.icon
        }

      var  tabAll = { 
          path:route.path,
          name: route.name, 
          title: route.name, 
          icon: route.meta.icon
        }

        this.mainTabs = this.mainTabs.concat(tab)
        this.mainAllTabs = this.mainAllTabs.concat(tabAll)
      }


      this.mainTabsActiveName = tab.name
      // 切换标签页时同步更新高亮菜单
      if(this.$refs.navmenu != null) {
        this.$refs.navmenu.activeIndex = '' + route.meta.index
        this.$refs.navmenu.initOpenedMenu()
      }
    }

  },
 
}
</script>

<style scoped lang="scss">
.menu-bar-container {
  position: fixed;
  top: 0px;
  left: 0;
  bottom: 0;
  z-index: 1020;
  .el-menu {
    position:absolute;
    top: 60px;
    bottom: 0px;
    text-align: left;
    // background-color: #2968a30c;
  }
  .logo {
    position:absolute;
    top: 0px;
    height: 60px;
    line-height: 60px;
    background: #545c64;
    cursor:pointer;
    img {
        width: 40px;
        height: 40px;
        border-radius: 0px;
        margin: 10px 10px 10px 10px;
        float: left;
    }
    div {
      font-size: 14px;
      color: white;
      text-align: left;
      padding-left: 20px;
    }
  }
  .menu-bar-width {
    width: 200px; 
  }
  .menu-bar-collapse-width {
    width: 65px;
  }

  .menu-lang-bar-width {

    bottom: 0px;
    text-align: left;
    height: 100%;
    overflow-y:auto
  }
  .menu-lang-barHidden-width{
    height: 0;
    width: 0; 
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }


}

</style>
