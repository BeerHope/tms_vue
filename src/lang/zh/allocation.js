export default {
  allocation: {
    list: {
      search: '搜索',
      batchAllocate: '批量调拨',
      details: '详情',
      filter: {
        companyName: '渠道商'
      },
      thead: {
        batchNo: '调拨批次',
        createTime: '调拨时间',
        companyName: '接收机具渠道商',
        createPerson: '操作人',
        machineAmount: '调拨机具数量',
        operation: '操作'
      }
    },
    batch: {
      title: '批量调拨',
      templateName: '机具调拨模板',
      company: '渠道商',
      tips: {
        file: '请上传文件',
        company: '请选择渠道商'
      },
      fileName: '机具调拨导入失败清单',
      header: [
        '机身号',
        '原因'
      ]
    },
    details: {
      title: '机器调拨详情',
      export: '导出',
      thead: {
        modelName: '机型',
        sn: '机身号'
      },
      resultText: '机器调拨详情为空',
      exportFileName: '机器调拨详情',
      header: [
        '机型',
        '机身号'
      ]
    }
  }
}
