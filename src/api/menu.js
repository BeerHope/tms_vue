import request from '@/utils/request'

// get menu
export function getMenus() {
  return request({
    url: '/menu/list',
    method: 'get'
  })
}

/* add menu */
export function addMenu(data) {
  return request({
    url: '/menu/create',
    method: 'post',
    data
  })
}

/* menu details */
export function editMenu(id) {
  return request({
    url: '/menu/detail',
    method: 'get',
    params: {
      id
    }
  })
}

/* update menu */
export function updateMenu(data) {
  return request({
    url: '/menu/update',
    method: 'post',
    data
  })
}
