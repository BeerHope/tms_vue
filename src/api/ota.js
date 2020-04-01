/* 文件管理 -- 我的系统包接口 */

import request from '@/utils/request'

export function getOtaList(params) {
  return request({
    url: '/ota',
    method: 'get',
    params
  })
}

export function addOta(data) {
  return request({
    url: '/ota',
    method: 'post',
    data
  })
}

export function getOtaDetails(otaId) {
  return request({
    url: `/ota/${otaId}`,
    method: 'get'
  })
}

export function getDeletedOtaList(params) {
  return request({
    url: '/ota/deletedOta',
    method: 'get',
    params
  })
}

