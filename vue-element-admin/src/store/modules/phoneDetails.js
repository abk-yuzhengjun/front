
const state = {
  phone_info : [],
  evidence_info : [],
  phone_imsi_info : [],
}
const mutations = {
  SOCKET_webPhoneUpdate: (state, data) => {
    state.phone_info.push(data);
    // state.phone_info.sort(state.phone_info.timestr)
    console.log('vuex get phone_info')
  },
  SOCKET_webEvidenceUpdate(state, data) {
    console.log('vuex get webEvidenceUpdate')
    state.evidence_info.push(data);
  },
  SOCKET_webPhoneUpdateData(state, data) {
    console.log('vuex get webPhoneUpdate')
    state.phone_imsi_info.push(data);
  },
}


export default {
  namespaced: true,
  state,
  mutations,
  // actions
}
