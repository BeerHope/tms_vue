import request from '@/utils/request'

export function getModelList(params) {
  return request({
    url: '/model',
    method: 'get',
    params
  })
}
