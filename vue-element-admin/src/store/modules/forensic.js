
const state = {
  case_info: '',
  case_id: '',
  task_id: ''
}
const mutations = {
  getCaseInfo: (state, data) => {
    state.case_info = data
    console.log('vuex get case info')
    console.log('case_info :' + state.case_info)
  },
  getTreeCaseInfo: (state, caseData) => {
    state.case_id = caseData
    console.log('vuex get case_id: ' + state.case_id)
  },
  getTreeTaskInfo: (state, taskData) => {
    state.task_id = taskData
    console.log('vuex get task_id: '  + state.task_id)
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
