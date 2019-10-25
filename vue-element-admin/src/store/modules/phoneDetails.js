
const state = {
  phone_info : [],
  evidence_info : [],
  phone_imsi_info : [],
  task_status_error : [],
  task_status_error_flag : 0,
}
const mutations = {
  SOCKET_webPhoneUpdate: (state, data) => {
    state.phone_info.push(data);
    console.log('vuex get phone_info')
  },
  SOCKET_webEvidenceUpdate(state, data) {
    console.log('vuex get webEvidenceUpdate')
    state.evidence_info.push(data);
  },
  SOCKET_webPhoneUpdateData(state, data) {
    console.log('vuex get webPhoneUpdate')
    state.phone_imsi_info = data;
  },
  SOCKET_webChangeTaskStatusError(state, data) {
    console.log('vuex get webChangeTaskStatusError')
    state.task_status_error = data;
    state.task_status_error_flag = 0;
    console.log(state.task_status_error)
  },
  webSetTaskStatusErrorFlag: (state,data) => {
    console.log('vuex get webSetTaskStatusErrorFlag')
    state.task_status_error_flag = data;
    console.log(state.task_status_error_flag)
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  // actions
}
