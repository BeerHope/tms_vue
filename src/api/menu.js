import request from '@/utils/request'

export function getList() {
  return request({
    url: '/menu/list',
    method: 'get'
  })
}

/* 新增菜单 */
export function addMenu(params) {
  return request({
    url: '/menu/list',
    method: 'post'
  })
}

/* 保存菜单列表 */
export function saveMenu() {

}

/* 编辑修改菜单详情 */
export function editMenu(params) {
  return request({
    url: '/menu/list',
    method: 'post',
    params
  })
}
