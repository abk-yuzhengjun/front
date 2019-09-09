const state = {
  dev_list: [],
  app_list: [],
  oper_list: [],
  case_list:[]
}
const mutations = {
  setDevList: (state, data) => {
    state.dev_list = data;
    console.log('dev_list: ' + state.dev_list)

  }
  ,
  setAppList: (state, data) => {
    state.app_list = data;
  },
  setOperList: (state, data) => {
      state.oper_list = data;

    },
  setCaseList: (state, data) => {
    state.case_list = data;
  }

}
// const actions = {
//   setRowData({commit}, data) {
//     commit('SET_ROW', data)
//   }
// }


export default {
  namespaced: true,
  state,
  mutations,
  // actions
}
