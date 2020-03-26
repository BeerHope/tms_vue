export default {
  terminal: {
    list: {
      filter: {
        merchantNo: '商户编号',
        merchantName: '商户名称',
        company: '渠道商',
        terminalNo: '终端号',
        state: '状态'
      },
      search: '搜索',
      add: '添加',
      edit: '编辑',
      details: '详情',
      bind: '绑定',
      unbind: '解绑',
      batchImport: '批量导入终端',
      batchBind: '批量绑定',
      merchantNo: '商户编号',
      terminalNo: '终端号：',
      sn: '绑定设备：', // 设备sn（即机身号）
      companyName: '所属渠道商：',
      createTime: '创建时间：',
    },
    batchBind: {
      title: '批量绑定机具',
      templateName: '绑定机具模板'
    },
    batchImport: {
      title: '批量导入终端',
      templateName: '终端导入模板'
    },
    unbind: {
      content: '请确认是否解除设备${设备SN号}与${商户名称}(终端号${终端号})的绑定关系?',
      content1: '请确认是否接触设备',
      content2: '与',
      content3: '终端号',
      content4: '的绑定关系',
      title: '提示'
    },
    bind: {
      title: '绑定设备',
      label: {
        deviceSN: '设备序列号',
        merchantName: '商户名称：',
        terminalNo: '终端号',
        sn: 'SN'
      },
      tips: {
        sn: '请输入设备序列号',
      },
      query: '查询',
      replace: '更换',
      bind: '绑定',
    },
    add: {
      title: '添加终端',
    },
    edit: {
      title: '添加终端',
    },
    details: {
      title: '添加终端',
    },
    form: {
      label: {
        merchantId: '所属商户',
        terminalNos: '终端号',
        remark: '备注',
        createPerson: '创建人'
      },
      tips: {
        merchantId: '请选择渠道商',
        terminalNos: '请输入终端号',
      }
    },
    states: [
      {
        label: '全部',
        value: ''
      },
      {
        label: '绑定',
        value: 1
      },
      {
        label: '未绑定',
        value: 2
      },
    ],
  }
}
