export default {
  terminal: {
    list: {
      filter: {
        merchantNo: 'merchant number',
        merchantName: 'merchant name',
        company: 'company',
        terminalNo: 'terminal number',
        state: 'State'
      },
      search: 'Search',
      add: 'Add',
      edit: 'Edit',
      details: 'Details',
      bind: 'Bind',
      unbind: 'Unbind',
      batchImport: 'Batch import',
      batchBind: 'Batch unbind',
      merchantNo: 'Merchant number: ',
      terminalNo: 'Terminal number: ',
      sn: 'SN: ', // 设备sn（即机身号）
      companyName: 'Attribute company: ',
      createTime: 'Created time: ',
    },
    add: {
      title: 'Add Terminal',
    },
    edit: {
      title: 'Edit Terminal',
    },
    details: {
      title: 'Terminal Details',
    },
    batchBind: {
      title: 'Batch bind machine',
      templateName: 'binding-machine-template',
      header: [
        'Merchant Number',
        'Terminal Number',
        'Reason'
      ],
      fileName: 'terminal-bind-failed-list'
    },
    batchImport: {
      title: 'Batch import terminal',
      templateName: 'importing-terminal-template',
      header: [
        'Merchant Number',
        'Terminal Number',
        'Reason'
      ],
      fileName: 'terminal-import-failed-list'
    },
    unbind: {
      content: '请确认是否解除设备${设备SN号}与${商户名称}(终端号${终端号})的绑定关系?',
      content1: 'Please confirm whether the binding relationship between device ',
      content2: 'and',
      content3: 'terminal number',
      content4: 'is broken or not.',
      title: 'Tips'
    },
    bind: {
      title: 'Bind machine',
      label: {
        deviceSN: 'machine SN:',
        merchantName: 'Merchant name：',
        terminalNo: 'Terminal number: ',
        model: 'Model: ',
        sn: 'SN: '
      },
      tips: {
        sn: 'Please input a machine sn',
        querySnTips: 'No data found, please check whether the machine number entered is correct'
      },
      query: 'Query',
      replace: 'Replace',
      bind: 'Bind',
    },
    form: {
      label: {
        merchantId: 'Attributive Merchant',
        terminalNos: 'Terminal Numbers',
        remark: 'Remark',
        createPerson: 'Creator'
      },
      tips: {
        merchantId: 'Please Select merchant',
        terminalNos: 'Please input terminal numbers',
      }
    },
    states: [
      {
        label: 'All',
        value: '',
      },
      {
        label: 'Bound',
        value: 1
      },
      {
        label: 'Unbound',
        value: 2
      },
    ]
  }
}
