
const state = {
  case_info: '',
  case_name: '',
  task_name: ''
}
const mutations = {
  getCaseInfo: (state, data) => {
    state.case_info = data
    console.log('vuex get case info')
    console.log('case_info :' + state.case_info)
  },
  getTreeCaseInfo: (state, caseData) => {
    state.case_name = caseData
    console.log('vuex get case name')
    console.log('case_name: ' + state.case_name)
  },
  getTreeTaskInfo: (state, taskData) => {
    state.task_name = taskData
    console.log('vuex get task name')
    console.log('task_name: ' + state.task_name)
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
