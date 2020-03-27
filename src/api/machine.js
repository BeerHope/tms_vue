import request from '@/utils/request'

export function getMachineList(params) {
  return request({
    url: '/machine',
    method: 'get',
    params
  })
}

export function addMachine(data) {
  return request({
    url: '/machine',
    method: 'post',
    data
  })
}

export function updateMachine(machineId, data) {
  return request({
    url: `/machine/${machineId}`,
    method: 'put',
    data
  })
}

export function getMachineDetails(machineId) {
  return request({
    url: `/machine/${machineId}`,
    method: 'get',
  })
}

/* 批量导入机具 */
export function batchMachine(machineId) {
  return request({
    url: '/machine/batch',
    method: 'post',
  })
}

/* 查询商户终端 */
export function queryTerminals() {
  return request({
    url: '/machine/queryMerchantTerminal',
    method: 'get',
  })
}

/* 获取模板 */
export function getTemplate() {
  return request({
    url: '/machine/template',
    method: 'get',
    responseType: 'blob'
  })
}

/* 查询解绑相关信息 - 解绑商户终端使用 */
export function queryMerchant(machineId) {
  return request({
    url: `/machine/${machineId}/merchantTerminal`,
    method: 'get'
  })
}

/* 绑定商户终端 */
export function bindTerminal(machineId, data) {
  return request({
    url: `/machine/${machineId}/merchantTerminal`,
    method: 'post',
    data
  })
}

/* 解绑商户终端 */
export function unbindTerminal(machineId) {
  return request({
    url: `/machine/${machineId}/merchantTerminal`,
    method: 'delete',
  })
}
