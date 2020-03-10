import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  user: null
}

const mutations = {
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username: account, password } = userInfo
    /* 对密码进行rsa加密传输 */
    return new Promise((resolve, reject) => {
      login({ account, password }).then(res => {
        const { data: token } = res
        commit('SET_TOKEN', token)
        commit('SET_USER', userInfo)
        setToken(token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info and auth
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        console.log(response, 'currentuser response！！！！')
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const { name, avatar } = data
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.user).then((res) => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
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

