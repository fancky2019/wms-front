<template>
  <div class="headbar" :style="{'background':themeColor}" :class="collapse?'position-collapse-left':'position-left'">
    <!-- 导航收缩 -->
    <span class="hamburg">
      <el-menu class="el-menu-demo" :background-color="themeColor" text-color="#fff" :active-text-color="themeColor"
        mode="horizontal" >
        <el-menu-item index="1" @click="onCollapse">
          <hamburger :isActive="collapse"></hamburger>
        </el-menu-item>
      </el-menu>
    </span>
    <!-- 导航菜单 -->
    <span class="navbar">
      <el-menu :default-active="activeIndex" class="el-menu-demo" :background-color="themeColor" text-color="#fff"
        active-text-color="#ffd04b" mode="horizontal" @select="selectNavBar()">
        <el-menu-item index="1" @click="$router.push('/')">{{$t("common.home")}}</el-menu-item>
        <el-menu-item index="2" v-popover:interface>
          <li style="color:#fff;">{{$t("common.systemTool")}}</li>
          <el-popover ref="interface" placement="bottom-start" trigger="click">
            <div class="lang-item" @click="openWindow('http://localhost:8081/swagger-ui.html')">
              {{$t("common.masterinterface")}}</div>
            <div class="lang-item" @click="openWindow('http://localhost:8084/swagger-ui.html')">
              {{$t("common.agvinterface")}}</div>
            <div class="lang-item" @click="openWindow('http://localhost:8085/swagger-ui.html')">
              {{$t("common.wcsinterface")}}</div>
            <div class="lang-item" @click="openWindow('http://localhost:8083/')">{{$t("common.serviceMonitor")}}</div>
          </el-popover>
        </el-menu-item>
      </el-menu>
    </span>
    <!-- 工具栏 -->
    <span class="toolbar">
      <el-menu class="el-menu-demo" :background-color="themeColor" text-color="#14889A" :active-text-color="themeColor"
        mode="horizontal">
        <el-menu-item index="1">
          <!-- 主题切换 -->
          <theme-picker class="theme-picker" :default="themeColor" @onThemeChange="onThemeChange">
          </theme-picker>
        </el-menu-item>
        <el-menu-item index="2" v-popover:popover-lang>
          <!-- 语言切换 -->
          <li style="color:#fff;" class="fa fa-language fa-lg"></li>
          <el-popover ref="popover-lang" placement="bottom-start" trigger="click" v-model="langVisible">
            <div class="lang-item" @click="changeLanguage('zh-CN')">简体中文</div>
            <div class="lang-item" @click="changeLanguage('en_US')">English</div>
          </el-popover>
        </el-menu-item>
        <el-menu-item index="3" v-popover:popover-message>
          <!-- 我的私信 -->
          <el-badge :value="5" :max="99" class="badge">
            <li style="color:#fff;" class="fa fa-envelope-o fa-lg"></li>
          </el-badge>
          <el-popover ref="popover-message" placement="bottom-end" trigger="click">
            <!-- <message-panel></message-panel> -->
          </el-popover>
        </el-menu-item>
        <el-menu-item index="4" v-popover:popover-notice>
          <!-- 系统通知 -->
          <el-badge :value="4" :max="99" class="badge">
            <li style="color:#fff;" class="fa fa-bell-o fa-lg"></li>
          </el-badge>
          <el-popover ref="popover-notice" placement="bottom-end" trigger="click">
            <!-- <notice-panel></notice-panel> -->
          </el-popover>
        </el-menu-item>
        <el-menu-item index="5" v-popover:popover-personal>
          <!-- 用户信息 -->
          <span class="user-info"><img :src="user.avatar" />{{user.nickName}}</span>
          <el-popover ref="popover-personal" placement="bottom-end" trigger="click" :visible-arrow="false">
            <personal-panel :user="user"></personal-panel>
          </el-popover>
        </el-menu-item>
      </el-menu>
    </span>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Hamburger from "@/components/Hamburger"
  import ThemePicker from "@/components/ThemePicker"
  // import NoticePanel from "@/views/Core/NoticePanel"
  // import MessagePanel from "@/views/Core/MessagePanel"
  import PersonalPanel from "@/views/core/PersonalPanel"
  export default {
    components: {
      Hamburger,
      ThemePicker,
      // NoticePanel,
      // MessagePanel,
      PersonalPanel,
    },
    data() {
      return {
        user: {
          avatar:''
        },
        activeIndex: '1',
        langVisible: false
      }
    },
    methods: {
      openWindow(url) {
        window.open(url)
      },
      selectNavBar(key, keyPath) {
         //console.log(key, keyPath)
      },
      // 折叠导航栏
      onCollapse: function () {
        this.$store.commit('onCollapse')
        // let language = this.$i18n.locale;
        // language === '' ? 'zh-CN' : language
        // this.changeLanguage(language)
      },
      // 切换主题
      onThemeChange: function (themeColor) {
        this.$store.commit('setThemeColor', themeColor)
      },
      // 语言切换
      changeLanguage(lang) {
         //console.log('语言切换')
        lang === '' ? 'zh-CN' : lang
        this.$i18n.locale = lang
        window.localStorage.setItem('lang', lang)
         //console.log(this.$i18n.locale)
        this.langVisible = false
        //深拷贝防止对原菜单的修改
        let mainAllTabsCopy = [...this.mainAllTabs.map(aInfo => {
          return Object.assign({}, aInfo)
        })]

        let tabs = []
        //根据中英文切换对应的菜单
        if (lang == "zh-CN") {
          document.getElementById("menuen").style.display = "none"
          document.getElementById("menuch").style.display = "block"
          tabs = mainAllTabsCopy.map(state => {
             //console.log(state)
            state.name = state.name.split("/")[0]
            state.title = state.title.split("/")[0]
            return state
          })
        } else {
          document.getElementById("menuen").style.display = "block"
          document.getElementById("menuch").style.display = "none"
          tabs = mainAllTabsCopy.map(state => {
            state.name = state.name.split("/")[1]
            state.title = state.title.split("/")[1]
            return state
          })
        }
        this.mainTabs = tabs
      }
    },
    mounted() {
      this.user.avatar = require("@/assets/Engineer.gif")
      // var user = sessionStorage.getItem("user")
      // if (user) {
      //   let params = { name: user }
      // this.$api.user.findByName(params).then((res) => {
      //   if (res.code == 200) {
      //     this.user = res.data
      //     this.user.avatar = require("@/assets/Engineer.png")
      //   }
      // })
      // }

    },
    computed: {
      ...mapState({
        themeColor: state => state.app.themeColor,
        collapse: state => state.app.collapse
      }),
      mainAllTabs: {
        get() { return this.$store.state.tab.mainAllTabs },
        set(val) { this.$store.commit('updatemainAllTabs', val) }
      },
      mainTabs: {
        get() { return this.$store.state.tab.mainTabs },
        set(val) { this.$store.commit('updateMainTabs', val) }
      },
    }
  }
</script>

<style scoped lang="scss">
  .headbar {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1030;
    height: 60px;
    line-height: 60px;
    border-color: rgba(180, 190, 190, 0.8);
    border-left-width: 1px;
    border-left-style: solid;
  }

  .hamburg {
    float: left;
  }

  .navbar {
    float: left;
  }

  .toolbar {
    float: right;
  }

  .lang-item {
    font-size: 16px;
    padding-left: 8px;
    padding-top: 8px;
    padding-bottom: 8px;
    cursor: pointer;
  }

  .lang-item:hover {
    font-size: 18px;
    background: #b0d6ce4d;
  }

  .user-info {
    font-size: 20px;
    color: #fff;
    cursor: pointer;

    img {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      margin: 10px 0px 10px 10px;
      float: right;
    }
  }

  .badge {
    line-height: 18px;
  }

  .position-left {
    left: 200px;
  }

  .position-collapse-left {
    left: 65px;
  }
</style>
