<template>
  <div id="main-container" class="main-container"
    :class="$store.state.app.collapse?'position-collapse-left':'position-left'">
    <!-- 标签页 -->
    <div class="tab-container">
      <el-tabs class="tabs" :class="$store.state.app.collapse?'position-collapse-left':'position-left'"
        v-model="mainTabsActiveName" :closable="true" type="card" @tab-click="selectedTabHandle"
        @tab-remove="removeTabHandle">
        <el-dropdown class="tabs-tools" :show-timeout="0" trigger="hover">
          <div style="font-size:20px;width:50px;"><i class="el-icon-arrow-down"></i></div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="tabsCloseCurrentHandle">关闭当前标签</el-dropdown-item>
            <el-dropdown-item @click.native="tabsCloseOtherHandle">关闭其它标签</el-dropdown-item>
            <el-dropdown-item @click.native="tabsCloseAllHandle">关闭全部标签</el-dropdown-item> 
          </el-dropdown-menu>
        </el-dropdown>
        <el-tab-pane v-for="item in mainTabs" :key="item.name" :label="item.title" :name="item.name">
          <span slot="label"><i :class="item.icon"></i> {{item.title}} </span>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 主内容区域 -->
    <div class="main-content">
      <keep-alive>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
  export default {
    data() {
      return {
      }
    },
    computed: {
      mainTabs: {
        get() { return this.$store.state.tab.mainTabs },
        set(val) { this.$store.commit('updateMainTabs', val) }
      },
      mainTabsActiveName: {
        get() { return this.$store.state.tab.mainTabsActiveName },
        set(val) { this.$store.commit('updateMainTabsActiveName', val) }
      },
      mainAllTabs: {
        get() { return this.$store.state.tab.mainAllTabs },
        set(val) { this.$store.commit('updateMainAllTabs', val) }
      },  
    },
    methods: {
    ...mapActions([ 
'getBasicStrategyData', 
'getPropertyRuleData',
'getWarehouseData',
'getLanewayData',
'getRackData',
'getBillTypeData',
'getBasisMaterialData',
'getShipOrderData',
'getPackageUnitData',
'getOrgnizationData',
'getApplyReceiptData',
'getLocationData',
'getShipPickOrderData',
'getShipOrderItemData'
]),
      // tabs, 选中tab
      selectedTabHandle(tab) { 
        tab = this.mainTabs.filter(item => item.name === tab.name)
        if (tab.length >= 1) {
           //console.log(this.$router)
          // this.$router.push({ name: tab[0].name })
          this.$router.push(tab[0].path).catch(err=>{})
        } 
      },
      // tabs, 删除tab
      removeTabHandle(tabName, mode) {
        this.mainTabs = this.mainTabs.filter(item => item.name !== tabName)
        // debugger
        if (this.mainTabs.length >= 1) {
          // 当前选中tab被删除
          if (tabName === this.mainTabsActiveName) {
            this.$router.push({ path: this.mainTabs[this.mainTabs.length - 1].path }, () => {
              // this.mainTabsActiveName = this.$route.name
              this.mainTabsActiveName = this.mainTabs[this.mainTabs.length - 1].name
            })
          }
        } else { 
          // debugger
          this.$router.push("/").catch((err) => err)  
          if(this.mainAllTabs.length == 1 ){
            if(this.mainAllTabs[0].icon =="fa fa-home fa-lg"){
                this.$store.commit('updateMainTabs', this.mainAllTabs)
            } 
          } 
        }
        if (mode != "refresh") {
          //同步总菜单
          // var langJudge = this.$i18n.locale
          var langJudge = "zh-CN"

          // 默认中文 
          if (langJudge == "zh-CN") {
            this.mainAllTabs = this.mainAllTabs.filter(item => item.name.split("/")[0] !== tabName)
          } else {
            this.mainAllTabs = this.mainAllTabs.filter(item => item.name.split("/")[1] !== tabName)
          } 
        }

        if(this.mainTabs.length == 1 ){
          if(this.mainTabs[0].icon =="fa fa-home fa-lg"){
                  this.$store.commit('updateMainAllTabs', this.mainTabs)
          } 
        } 
      },
      // tabs, 关闭当前
      tabsCloseCurrentHandle() {
        this.removeTabHandle(this.mainTabsActiveName, "")
      },
      // tabs, 关闭其它
      tabsCloseOtherHandle() {
        this.mainTabs = this.mainTabs.filter(item => item.name === this.mainTabsActiveName)

        //同步总菜单
        // var langJudge = this.$i18n.locale
            var langJudge = "zh-CN"
        // 默认中文
        if (langJudge == "zh-CN") {
          this.mainAllTabs = this.mainAllTabs.filter(item => item.name.split("/")[0] === this.mainTabsActiveName)
        } else {
          this.mainAllTabs = this.mainAllTabs.filter(item => item.name.split("/")[1] === this.mainTabsActiveName)
        }

      },
      // tabs, 关闭全部
      tabsCloseAllHandle() {
        if(this.mainTabs.length == 1 ){
          if(this.mainTabs[0].icon !="fa fa-home fa-lg"){
              this.mainTabs = []
              this.mainAllTabs = []
              this.$router.push("/")  
          } 
        }else{
            this.mainTabs = this.mainTabs.filter(item => item.icon== "fa fa-home fa-lg")
            this.mainAllTabs = this.mainAllTabs.filter(item => item.icon == "fa fa-home fa-lg")
            this.$router.push("/")
        } 
      }, 
    },
    mounted(){
      this.getBasicStrategyData()
      this.getPropertyRuleData()
      this.getWarehouseData()
      this.getLanewayData()
      this.getBillTypeData()
      this.getRackData()
      this.getBasisMaterialData()
      this.getShipOrderData()
      this.getPackageUnitData()
      this.getOrgnizationData()
      this.getApplyReceiptData()
      this.getLocationData()
      this.getShipPickOrderData()
      this.getShipOrderItemData()
    }
  }
</script>

<style scoped lang="scss">
  .main-container {
    padding: 0 5px 5px;
    position: absolute;
    top: 28px;
    left: 1px;
    right: 1px;
    bottom: 0px;

    // background: rgba(56, 5, 114, 0.5);
    .tabs {
      position: fixed;
      top: 60px;
      right: 50px;
      padding-left: 0px;
      padding-right: 2px;
      z-index: 1000;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      background: rgb(255, 253, 255);
      border-color: rgba(200, 206, 206, 0.5);
      // border-left-width: 1px;
      // border-left-style: solid;
      border-bottom-width: 1px;
      border-bottom-style: solid;
    }

    .tabs-tools {
      position: fixed;
      top: 60px;
      right: 0;
      z-index: 1020;
      height: 40px;
      // padding: 0 10px;
      font-size: 14px;
      line-height: 40px;
      cursor: pointer;
      border-color: rgba(200, 206, 206, 0.5);
      border-left-width: 1px;
      border-left-style: solid;
      border-bottom-width: 1px;
      border-bottom-style: solid;
      background: rgba(255, 255, 255, 1);
    }

    .tabs-tools:hover {
      background: rgba(200, 206, 206, 1);
    }

    .main-content {
      position: absolute;
      top: 80px;
      left: 5px;
      right: 5px;
      bottom: 5px;
      // padding: 5px;
      // background: rgba(209, 212, 212, 0.5);
    }
  }

  .position-left {
    left: 200px;
  }

  .position-collapse-left {
    left: 65px;
  }
</style>
