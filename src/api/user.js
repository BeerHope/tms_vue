import request from '@/utils/request'

/* 用户登录 */
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

/* 获取用户信息和菜单权限 */
export function getInfo() {
  return request({
    url: '/user/currentUser',
    method: 'get',
  })
}

/* 登出 */
export function logout(data) {
  return request({
    url: '/user/logout',
    method: 'get',
    data
  })
}

/* 用户列表 */
export function getUsers(data) {
  return request({
    url: '/user/logout',
    method: 'get',
    data
  })
}
