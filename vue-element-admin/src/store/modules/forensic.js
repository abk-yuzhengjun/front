
const state = {
  case_info: '',
  case_id: '',
  task_id: ''
}
const mutations = {
  getCaseInfo: (state, data) => {
    state.case_info = data
    console.log('vuex get case info')
  },
  getTreeCaseInfo: (state, caseData) => {
    state.case_id = caseData
    console.log('vuex get case_id: '  + state.case_id)
  },
  getTreeTaskInfo: (state, taskData) => {
    state.task_id = taskData
    console.log('vuex get task_id: '  + state.task_id)
  },
  SOCKET_webChangeTaskStatusAck(state, data) {
    console.log('vuex get webChangeTaskStatusAck')
    state.case_info = data;
  },
  SOCKET_webEvidenceUpdateData(state, data) {
    console.log('vuex get webEvidenceUpdateData')
    state.case_info = data;
  },

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
