
const state = {
  phone_info : []
}
const mutations = {
  getPhoneInfo: (state, data) => {
    state.phone_info.push(data)
    console.log('vuex get phone_info')
    console.log(state.phone_info)
  },

}


export default {
  namespaced: true,
  state,
  mutations,
  // actions
}
