export default {
  allocation: {
    list: {
      search: 'Search',
      batchAllocate: 'Batch allocate',
      details: 'Details',
      filter: {
        companyName: 'Company name'
      },
      thead: {
        batchNo: 'Allocation Number',
        createTime: 'Create Time',
        companyName: 'Receiving Machine Company',
        createPerson: 'Operator',
        machineAmount: 'Machine Amount',
        operation: 'Operation'
      }
    },
    batch: {
      title: 'Batch Allocation',
      templateName: 'machine-allocation-template',
      company: 'Company',
      tips: {
        file: 'Please upload file',
        company: 'Please select company'
      },
      fileName: 'allocation-import-failed-list',
      header: [
        'SN',
        'Reason'
      ]
    },
    details: {
      title: 'Machine Allocation Details',
      export: 'Export',
      thead: {
        modelName: 'Model Name',
        sn: 'SN'
      },
      resultText: 'The details of Machine allocation  is empty',
      exportFileName: 'machine-allocation-details'
    }
  }
}
