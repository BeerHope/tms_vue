import request from '@/utils/request'

export function getAppList() {
  return request({
    url: '/machine/details/app',
    method: 'get'
  })
}
