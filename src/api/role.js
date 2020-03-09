import request from '@/utils/request'

/* add role */
export function addRole(data) {
  return request({
    url: '/role/add',
    method: 'add',
    data
  })
}

/* role details */
export function getRoleDetails(data) {
  return request({
    url: '/role/detail',
    method: 'get',
    data
  })
}

// get role list
export function getRoles(data) {
  return request({
    url: '/role/list',
    method: 'post',
    data
  })
}


/* delete users of a role  */
export function deleteUserOfRole(data) {
  return request({
    url: '/role/delete',
    method: 'delete',
    data
  })
}

/* update role */
export function updateMenu(data) {
  return request({
    url: '/role/update',
    method: 'post',
    data
  })
}


