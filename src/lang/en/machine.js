export default {
  machine: {
    list: {
      search: 'Search',
      add: 'Add machine',
      batchImport: 'Batch import machines',
      filter: {
        sn: 'SN',
        state: 'Binding state',
        companyId: 'Attributive company',
        merchantNo: 'Merchant number',
        merchantName: 'Merchant name'
      },
      edit: 'Edit',
      details: 'Details',
      remote: 'Remote control',
      bind: 'Bind',
      unbind: 'Unbind',
      merchant: 'Merchant: ',
      terminalNo: 'Terminal number：',
      companyName: 'Attributive company：',
      createTime: 'Created time: ',
      bindTimeText: 'Bound time：',
      unbindTimeText: 'Unbound time：',
    },
    batchImport: {
      title: 'Batch import',
      templateName: 'machine-import-template',
      fileName: 'machine-import-failed-list',
      header: [
        'SN',
        'Reason'
      ]
    },
    add: {
      title: 'Add machine'
    },
    edit: {
      title: 'Edit machine'
    },
    details: {
      machineDetails: 'Machine Details',
      basicInfo: 'Basic Information',
      model: 'Model：',
      sn: 'SN：',
      reportCycle: 'Report Cycle：',
      heartbeatCycle: 'Heartbeat Cycle(min)：',
      createPerson: 'Create Person(sec)：',
      remark: 'Remark：'
    },
    bind: {
      title: 'Bind Merchant Terminal',
      selectionTitle: 'Select Merchant Terminal',
      label: {
        sn: 'SN',
        merchant: 'Merchant Terminal',
      },
      placeholder: {
        merchant: 'Please input merchant number or merchant name'
      },
      thead: {
        merchantNo: 'Merchant Number',
        merchantName: 'Merchant Name',
        terminalNo: 'Terminal Number',
        selection: 'Selection'
      },
      tips: {
        merchant: 'Please click the search button to select terminal',
        selection: 'Only support for binding one merchant terminal'
      }
    },
    unbind: {
      content1: 'Please confirm whether the binding relationship between device ',
      content2: 'and',
      content3: 'terminal number',
      content4: 'is broken or not.',
      title: 'Tips'
    },
    form: {
      label: {
        model: 'Model',
        sn: 'SN',
        reportCycle: 'Report Cycle',
        heartbeatCycle: 'Heartbeat Cycle',
        remark: 'Remark'
      },
      tips: {
        sn1: 'Please input SN',
        sn2: 'Support uppercase lowercase English, Numbers, 11~20 characters',
        model: 'Please select model',
        reportCycle: 'Please input report cycle',
        heartbeatCycle: 'Please input heartbeat cycle'
      }
    },
    states: [
      {
        value: null,
        label: 'All'
      },
      {
        value: 1,
        label: 'Bound'
      },
      {
        value: 2,
        label: 'Unbound'
      }
    ]
  }
}
