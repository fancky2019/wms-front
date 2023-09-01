export default {
  state: {
    // 主入口标签页
    mainTabs: [],
    mainAllTabs:[],
    // 当前标签页名
    mainTabsActiveName: ''
  },
  mutations: {
    updateMainTabs (state, tabs) {
      state.mainTabs = tabs
    },
    updateMainAllTabs(state,tabs){
      state.mainAllTabs = tabs

    },
    updateMainTabsActiveName (state, name) {
      state.mainTabsActiveName = name
    }
  }
}
