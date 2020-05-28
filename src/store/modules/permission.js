import { asyncRoutes, constantRoutes, routes404 } from '@/router'

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(frontendRoutes, backendRoutes) {
  const res = []
  _.forEach(frontendRoutes, (frontRoute) => {
    const tempRoute = { ...frontRoute }
    _.forEach(backendRoutes, (backRoute) => {
      if (frontRoute.path === backRoute.className) {
        debugger
        if (backRoute.child && backRoute.child.length) {
          tempRoute.children = filterAsyncRoutes(tempRoute.children, backRoute.child)
        }
        res.push(tempRoute)
      }
    })
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes, routes404)
  }
}

const actions = {
  generateRoutes({ commit }, backendRoutes) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, backendRoutes)
      const asyncRoutesRes = _.concat(accessedRoutes, routes404)
      // 保存动态权限
      commit('SET_ROUTES', accessedRoutes)
      resolve(asyncRoutesRes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
