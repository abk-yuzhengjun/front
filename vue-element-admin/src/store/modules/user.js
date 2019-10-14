// import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeMyToken, setMyToken, setCookiUser} from '@/utils/auth'
import router, { resetRouter } from '@/router'
import axios from 'axios'
import {getMyToken} from "../../utils/auth"
const host = 'http://localhost:5000'
const state = {
  token: getToken(),
  name: 'admin',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // login({ username: username.trim(), password: password })
      axios.post(host + '/login/', { username: username.trim(), password: password })
      .then(response => {

        //const { data } = response
        //commit('SET_TOKEN', data.token)
        //setToken(data.token)
        // console.log("login response:", response)
        setMyToken(true)
        console.log("login response data res = ", response["data"]["authRest"])
        commit('SET_NAME', username)
        // commit('SET_ROLES', response["data"]["role"])
        if(response["data"]["authRest"] == 1)
        {
          setCookiUser(response["data"])
          console.log("setCookiUser = ", response["data"])
        }
        resolve(response["data"])
      }).catch(error => {
        reject(error)
      })
    })
  },



  userEdit({ commit }, userInfo ){
    console.log("userEdit enter----------------")
    return new Promise((resolve, reject) => {
      const { username, password, pwd } = userInfo
      // console.log("username:", userInfo.name)
      // console.log("password:", userInfo.passWord)
      // console.log("passwordAgain:", userInfo.passwordAgain)
      axios.post(host + '/login/userEdit', { username: userInfo.name.trim(), password: userInfo.passWord })
        .then(response => {
          console.log("userEdit response data res = ", response["data"]["result"])
          resolve(response["data"])
        }).catch(error => {
        console.log("userEdit error----------------")
        reject(error)
      })
    })
  },

  queryAllUser({ commit }){
    // console.log("queryAllUser enter----------------")
    return new Promise((resolve, reject) => {
      axios.post(host + '/login/queryAllUser')
        .then(response => {

          resolve(response["data"])
        }).catch(error => {
        console.log("queryAllUser error----------------")
        reject(error)
      })
    })
  },

  userDel({ commit }, userName){
    return new Promise((resolve, reject) => {
      axios.post(host + '/login/userDel',  { username: userName.trim()})
        .then(response => {
          console.log("userDel response data = ", response)
          resolve(response["data"])
        }).catch(error => {

        reject(error)
      })
    })
  },
  userAdd({ commit }, account){
    return new Promise((resolve, reject) => {
      axios.post(host + '/login/userAdd',  { userName: account.name.trim(), userPwd:account.pwd,
                role:account.role, icon:account.icon})
        .then(response => {
          console.log("userAdd response data = ", response)
          resolve(response["data"])
        }).catch(error => {

        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar, introduction } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    // setMyToken(false)
    removeMyToken()
    console.log("logOut token=", getMyToken())
    // resetRouter()
    console.log("logOut SET_ROLES before=", state.roles)
    commit('SET_ROLES', [])
    console.log("logOut SET_ROLES=", state.roles)
    // return new Promise((resolve, reject) => {
    //   //logout(state.token)
    //
    //     .then(() => {
    //     // commit('SET_TOKEN', '')
    //     // commit('SET_ROLES', [])
    //     // removeToken()
    //     // resetRouter()
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  setToken({ commit }) {
    setMyToken(true)
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
