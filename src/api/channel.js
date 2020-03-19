import request from '@/utils/request'

export function getCompanyList(params) {
  return request({
    url: '/company',
    method: 'get',
    params
  })
}