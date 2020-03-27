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
        merchant: 'Merchant'
      },
      edit: 'Edit',
      details: 'Details',
      remote: 'Remote control',
      bind: 'Bind',
      unbind: 'Unbind',
      merchantName: 'Merchant name：',
      terminalNo: 'Terminal number：',
      companyName: 'Attributive company：',
      createTime: 'Created time: ',
      bindTimeText: 'Bound time：',
      unbindTimeText: 'Unbound time：',
    },
    batchImport: {
      title: 'Batch import'
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
