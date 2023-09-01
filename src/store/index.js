import Vue from 'vue'
import Vuex from 'vuex' 
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

// 引入子模块
import user from './module/user'
import app from './module/app'
import my from './module/my'
import tab from './module/tab'
import menu from './module/menu'



const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    my,
    tab,
    menu
  },
  plugins: [vuexLocal.plugin]
})
